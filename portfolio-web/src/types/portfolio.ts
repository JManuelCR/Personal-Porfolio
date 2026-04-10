export interface CatalogProject {
  id: string;
  category: string;
  name: string;
  stack: string[];
  impact: string;
  visual: string;
}

export interface CatalogSource {
  project_logic: Record<
    string,
    {
      name: string;
      stack: string[];
      impact: string;
      visual: string;
    }
  >;
}
