// hooks/useAnalyzeImage.ts
import { useDispatch, useSelector } from 'react-redux';
import { analyzeImage, resetState } from '../redux/slices/googleVisionSlice';
import { RootState } from '../redux/reducers';
import { AppDispatch } from '../redux/store';

export const useAnalyzeImage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { data, status, error } = useSelector((state: RootState) => state.googleVision);

  const analyze = (imagePath: string) => {
    dispatch(analyzeImage(imagePath));
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
