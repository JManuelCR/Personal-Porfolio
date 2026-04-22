export interface CatalogProject {
  id: string;
  category: string;
  name: string;
  stack: string[];
  impact: string;
  visual: string;
  imageUrl: string;
  videUrl: string
}

export interface CatalogRawProject {
  name: string;
  stack: string[];
  impact: string;
  visual: string;
  firebase_image_url: string;
  firebase_video_url: string;
}

export interface CatalogSource {
  project_logic: Record<string, CatalogRawProject>;
}
