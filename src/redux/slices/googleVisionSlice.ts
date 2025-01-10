import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { googleVisionService } from '../../services/googleVisionService';
import { FullTextAnnotation, GoogleVisionResponse } from '../../types/googleVision';

export const analyzeImage = createAsyncThunk(
  'googleVision/analyzeImage',
  async (imagePath: string, { rejectWithValue }) => {
    try {
      const response: FullTextAnnotation = await googleVisionService.analyzeImage(imagePath);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An error occurred');
    }
  }
);

interface GoogleVisionState {
  data: FullTextAnnotation | null;
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
        state.error = null;
      })
      .addCase(analyzeImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload
        state.error = null;
      })
      .addCase(analyzeImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string || 'Something went wrong';
      });
  }
});

export const { resetState } = googleVisionSlice.actions;
export default googleVisionSlice.reducer;
