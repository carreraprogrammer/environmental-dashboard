import axios from 'axios';

interface RequestData {
  prompt: string;
  max_tokens?: number;
  n?: number;
}

interface OpenAiResponse {
  choices: { text: string }[];
}

const openAiService = async (prompt: string): Promise<string> => {
  const apiKey = 'YOUR_OPENAI_API_KEY';  // Reemplaza con tu API key de OpenAI
  const url = 'https://api.openai.com/v1/engines/davinci-codex/completions'; // Cambia si utilizas otro modelo

  const requestData: RequestData = {
    prompt,                // Envia el prompt para la interpretación de los datos
    max_tokens: 100,        // Opcional: Cantidad de tokens para el resultado
    n: 1,                  // Opcional: Número de respuestas generadas
  };

  try {
    const response = await axios.post<OpenAiResponse>(url, requestData, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.choices[0].text; // Devuelve la respuesta de OpenAI
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw error;
  }
};

export default openAiService;
