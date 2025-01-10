import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { openAiService } from '../../services/OpenAiService';

export const extractObject = createAsyncThunk(
  'openAi/extractObject',
  async (purifiedData: Record<string, string>) => {
    const response = await openAiService.extractInvoiceData(purifiedData);
    return response;
  }
);

interface OpenAiState {
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OpenAiState = {
  data: null,
  status: 'idle',
  error: null
};

const openAiSlice = createSlice({
  name: 'openAi',
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
      .addCase(extractObject.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(extractObject.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        console.log(action.payload);
        state.error = null;
      })
      .addCase(extractObject.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  }
});

export const { resetState } = openAiSlice.actions;
export default openAiSlice.reducer;