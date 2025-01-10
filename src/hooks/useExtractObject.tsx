import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { extractObject, resetState } from '../redux/slices/openAiSlice';
import { AppDispatch } from '../redux/store';

export const useExtractObject = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: RootState) => state.openai);

  const initiateExtraction = async (purifiedData: Record<string, string>) => {
    try {
      await dispatch(extractObject(purifiedData)).unwrap();
    } catch (err) {
      console.error('Error extracting object:', err);
    }
  }

  const resetExtractionState = () => {
    dispatch(resetState());
  };

  return {
    data,
    status,
    error,
    initiateExtraction,
    resetExtractionState,
  };
};
