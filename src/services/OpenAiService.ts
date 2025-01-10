// openAiService.ts
import axios from 'axios';
import environment from '../../environment';

export interface Invoice {
  billingPeriod: string; // ISO format
  monthlyConsumption: number;
  publicLightingTax: number;
  lightingTotal: number;
  totalPayment: number;
  propertyAddress: string;
  customerName: string;
  internalCode: string;
}

export class OpenAiService {
  private readonly apiUrl: string;
  private readonly apiKey: string;
  private readonly systemPrompt: string;

  constructor() {
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
    this.apiKey = environment.OPENAI_API_KEY;
    this.systemPrompt = `
You are a specialized assistant for extracting information from utility bills.
Your task is to extract specific data points and return them in a structured JSON format.
Only return the JSON object, no additional text or explanations.
`;
  }

  public async extractInvoiceData(purifiedData: Record<string, string>): Promise<Invoice> {
    try {
      const response = await this.makeOpenAiRequest(purifiedData);
      const extractedData = this.parseResponse(response);
      
      if (!this.isValidInvoice(extractedData)) {
        throw new Error('Invalid invoice data structure returned from OpenAI');
      }

      return extractedData;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private async makeOpenAiRequest(purifiedData: Record<string, string>) {
    try {
      const response = await axios.post(
        this.apiUrl,
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { 
              role: 'system', 
              content: this.systemPrompt 
            },
            { 
              role: 'user', 
              content: this.generatePrompt(purifiedData) 
            }
          ],
          max_tokens: 500,
          temperature: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new Error(`OpenAI API request failed: ${this.getErrorMessage(error)}`);
    }
  }

  private parseResponse(response: any): any {
    try {
      const content = response.choices[0].message.content.trim();
      return JSON.parse(content);
    } catch (error) {
      throw new Error('Failed to parse OpenAI response');
    }
  }

  private generatePrompt(purifiedData: Record<string, string>): string {
    return `
Extract the following information from this utility bill data:

${JSON.stringify(purifiedData, null, 2)}

Return a JSON object with these fields (use null for missing values):
{
  "billingPeriod": "YYYY-MM-DD", // Convert period to ISO date
  "monthlyConsumption": number,   // Extract consumption in kWh, look usually the number betweena a phrase like \nPERIODO\n(number)\nDATOS DEL CONSUMO\nCALCULADO\nPOR, in this example the number 132 is the monthly consumption, adjust this to your specific case
  "publicLightingTax": number,    // Extract lighting tax value
  "lightingTotal": number,        // TotalPayment minus lighting tax
  "totalPayment": number,         // Total payment amount
  "propertyAddress": string,      // Property address
  "customerName": string,         // Customer name
  "internalCode": string          // Internal code
}`;
  }

  private isValidInvoice(data: any): data is Invoice {
    const requiredFields: (keyof Invoice)[] = [
      'billingPeriod',
      'monthlyConsumption',
      'publicLightingTax',
      'lightingTotal',
      'totalPayment',
      'propertyAddress',
      'customerName',
      'internalCode'
    ];

    return requiredFields.every(field => {
      const value = data[field];
      switch (field) {
        case 'billingPeriod':
          return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
        case 'monthlyConsumption':
        case 'publicLightingTax':
        case 'lightingTotal':
        case 'totalPayment':
          return typeof value === 'number' && !isNaN(value);
        default:
          return typeof value === 'string' && value.length > 0;
      }
    });
  }

  private getErrorMessage(error: any): string {
    if (error.response?.data?.error?.message) {
      return error.response.data.error.message;
    }
    return error.message || 'Unknown error';
  }

  private handleError(error: any): Error {
    const message = this.getErrorMessage(error);
    console.error('OpenAI Service Error:', message);
    return new Error(`Invoice extraction failed: ${message}`);
  }
}

export const openAiService = new OpenAiService();