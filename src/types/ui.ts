export interface UIMeta {
  id: string;
  name: string;
  description: string;
  style: string[];
  entry: string;
  theme: string;
  industry: string;
  density: string;
  recommendedFor: string[];
}

export interface RawUIMeta {
  id?: string;
  name?: string;
  description?: string;
  style?: string[];
  entry?: string;
  theme?: string;
  industry?: string;
  density?: string;
  recommendedFor?: string[];
}
