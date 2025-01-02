interface Environment {
  VISION_API_KEY: string;
}

const environment: Environment = {
  VISION_API_KEY: import.meta.env.VITE_VISION_API_KEY
}

export default environment;