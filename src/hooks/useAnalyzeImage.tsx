import { useDispatch, useSelector } from 'react-redux';
import { analyzeImage, resetState } from '../redux/slices/googleVisionSlice';
import { RootState } from '../redux/reducers';
import { AppDispatch } from '../redux/store';

export const useAnalyzeImage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector((state: RootState) => state.googleVision);

  const analyze = async (imagePath: string) => {
    try {
      const result = await dispatch(analyzeImage(imagePath)).unwrap();
      return result;
    } catch (err) {
      console.error('Error analyzing image:', err);
      throw err;
    }
  };

  const reset = () => {
    dispatch(resetState());
  };

  return {
    data,
    status,
    error,
    analyze,
    reset,
  };
};
