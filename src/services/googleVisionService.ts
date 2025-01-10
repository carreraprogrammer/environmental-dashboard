// services/googleVisionService.ts
import axios from 'axios';
import environment from '../../environment';
import { RequestData, GoogleVisionResponse } from '../types/googleVision';

class GoogleVisionService {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.apiKey = environment.VISION_API_KEY;
    this.apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${this.apiKey}`;
  }

  private isBase64(str: string): boolean {
    try {
      return btoa(atob(str)) === str;
    } catch (err) {
      return false;
    }
  }

  public async analyzeImage(imagePath: string): Promise<GoogleVisionResponse> {
    if (!this.isBase64(imagePath)) {
      throw new Error('The provided image is not in base64 format');
    }

    const requestData: RequestData = {
      requests: [{
        image: {
          content: imagePath,
        },
        features: [{
          type: 'TEXT_DETECTION',
          maxResults: 10,
        }],
      }],
    };

    try {
      const response = await axios.post(this.apiUrl, requestData);
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to analyze image: ${error.message}`);
    }
  }
}

export const googleVisionService = new GoogleVisionService();