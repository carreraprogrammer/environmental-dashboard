interface RequestData {
  requests: Request[];
}

interface Request {
  image: Image;
  features: Feature[];
}

interface Image {
  content: string;
}

interface Feature {
  type: string;
  maxResults: number;
}


interface GoogleVisionResponse {
  responses: Response[];
}

interface Response {
  labelAnnotations: LabelAnnotation[];
}

interface LabelAnnotation {
  mid: string;
  description: string;
  score: number;
}

export type { RequestData, GoogleVisionResponse };