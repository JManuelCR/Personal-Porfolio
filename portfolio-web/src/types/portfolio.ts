export interface CatalogProject {
  id: string;
  category: string;
  name: string;
  stack: string[];
  impact: string;
  visual: string;
  firebaseImageUrl: string;
  firebaseVideoUrl: string;
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

export interface CertificationCatalogItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: string;
  skills: string[];
  impact: string;
  firebaseImageUrl: string;
  credentialUrl: string;
}

export interface CertificationCatalogRawItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  category: string;
  skills: string[];
  impact: string;
  firebase_image_url: string;
  credential_url: string;
}

export interface CertificationCatalogSource {
  certifications: CertificationCatalogRawItem[];
}

export interface ProfileStoryPhase {
  id: string;
  stage: string;
  title: string;
  description: string;
  imageGallery: string[];
  backgroundLayer: string;
  floatingElement: string;
  parallaxSpeed: number;
}

export interface ProfileStoryRawPhase {
  id: string;
  stage: string;
  title: string;
  description: string;
  image_gallery: string[];
  visual_assets: {
    background_layer: string;
    floating_element: string;
  };
  parallax_speed: number;
}

export interface ProfileStorySource {
  narrative_parallax: ProfileStoryRawPhase[];
}
