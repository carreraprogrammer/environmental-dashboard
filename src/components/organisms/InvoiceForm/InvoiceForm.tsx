import React from 'react';
import ImagesInput from '../../atoms/ImageInput/ImageInput';
import { useAnalyzeImage } from '../../../hooks/useAnalyzeImage';

const InvoiceForm: React.FC = () => {

  const [imageUrl, setImageUrl] = React.useState('assets/images/no-image.jpg');
  const { data, status, error, analyze, reset } = useAnalyzeImage();

  const handleAnalyze = () => {
    analyze(imageUrl);
  }


  return (
    <div >
      <ImagesInput
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
      <button onClick={handleAnalyze}>Analyze</button>
    </div>
      
  );
};

export default InvoiceForm;