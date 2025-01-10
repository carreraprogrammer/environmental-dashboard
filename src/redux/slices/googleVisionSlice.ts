// slices/googleVisionSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { googleVisionService } from '../../services/googleVisionService';

export const analyzeImage = createAsyncThunk(
  'googleVision/analyzeImage',
  async (imagePath: string) => {
    const response = await googleVisionService.analyzeImage(imagePath);
    return response;
  }
);

interface GoogleVisionState {
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GoogleVisionState = {
  data: null,
  status: 'idle',
  error: null
};

const googleVisionSlice = createSlice({
  name: 'googleVision',
  initialState,
  reducers: {
    resetState: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(analyzeImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(analyzeImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(analyzeImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export const { resetState } = googleVisionSlice.actions;
export default googleVisionSlice.reducer;