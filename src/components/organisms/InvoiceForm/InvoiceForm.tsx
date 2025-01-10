import React, { useEffect } from 'react';
import ImagesInput from '../../atoms/ImageInput/ImageInput';
import { useAnalyzeImage } from '../../../hooks/useAnalyzeImage';
import { useExtractObject } from '../../../hooks/useExtractObject';
import purifyText, { anchorsForElectricBill } from '../../../utils/optimizePrompt';

const InvoiceForm: React.FC = () => {
  const [imageUrl, setImageUrl] = React.useState('assets/images/no-image.jpg');
  const { 
    data: analyzedData, 
    status: analyzeStatus, 
    error: analyzeError, 
    analyze 
  } = useAnalyzeImage();

  const { 
    data: extractedObject, 
    status: extractStatus, 
    error: extractError, 
    initiateExtraction 
  } = useExtractObject();

  useEffect(() => {
    console.log(extractedObject);
  }, [extractedObject]);

  const handleAnalyze = async () => {
    try {
      // Analizar la imagen
      const result = await analyze(imageUrl);
  
      // Si tenemos texto en el resultado, procedemos con la extracción
      if (result?.text) {
        const purifiedData = purifyText(result.text, anchorsForElectricBill);
        console.log('Purified data:', purifiedData);
        await initiateExtraction({ text: purifiedData });
      }
    } catch (err) {
      console.error('Error in handleAnalyze:', err);
    }
  };

  return (
    <div className="p-4">
      <ImagesInput
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
      />
      <button 
        onClick={handleAnalyze}
        disabled={analyzeStatus === 'loading' || extractStatus === 'loading'}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {analyzeStatus === 'loading' ? 'Analyzing...' : 
         extractStatus === 'loading' ? 'Extracting...' : 'Analyze'}
      </button>

      {(analyzeStatus === 'loading' || extractStatus === 'loading') && (
        <div className="mt-4">
          {analyzeStatus === 'loading' ? 'Processing image...' : 'Extracting data...'}
        </div>
      )}

      {extractStatus === 'succeeded' && extractedObject && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Extracted Invoice Data:</h3>
          <pre className="mt-2 p-4 bg-gray-100 rounded">
            {JSON.stringify(extractedObject, null, 2)}
          </pre>
        </div>
      )}

      {(analyzeError || extractError) && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {analyzeError && <p>Error analyzing image: {analyzeError}</p>}
          {extractError && <p>Error extracting data: {extractError}</p>}
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;