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
  fullTextAnnotation: FullTextAnnotation;
  textAnnotations: TextAnnotation[];
}

export interface FullTextAnnotation {
  text: string;
}

interface TextAnnotation {
  description: string;
  locale: string;
  boundingPoly: BoundingPoly;
}

interface BoundingPoly {
  vertices: Vertex[];
}

interface Vertex {
  x: number;
  y: number;
}

export type { RequestData, GoogleVisionResponse };