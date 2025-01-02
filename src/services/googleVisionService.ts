import axios from 'axios';

// Configuración de la Google Vision API
interface Image {
  content: string;
}

interface Feature {
  type: string;
  maxResults: number;
}

interface Request {
  image: Image;
  features: Feature[];
}

interface RequestData {
  requests: Request[];
}

interface GoogleVisionResponse {
  data: any; // You can replace 'any' with a more specific type if you know the structure of the response
}

const googleVisionService = async (imagePath: string): Promise<GoogleVisionResponse> => {
  const apiKey = 'YOUR_GOOGLE_VISION_API_KEY';  // Reemplaza con tu API key de Google Vision
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`;

  const requestData: RequestData = {
    requests: [
      {
        image: {
          content: imagePath,  // Ruta o base64 de la imagen
        },
        features: [
          {
            type: 'LABEL_DETECTION', // Puedes cambiar el tipo de análisis según necesites
            maxResults: 10,
          },
        ],
      },
    ],
  };

  try {
    const response: GoogleVisionResponse = await axios.post(url, requestData);
    return response.data; // Devuelve los resultados de la API
  } catch (error) {
    console.error('Error calling Google Vision API:', error);
    throw error;
  }
};

export default googleVisionService;
