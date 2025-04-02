export interface Folder {
    id: number;
    name: string;
    order:number;
  }
  
  export interface Image {
    id: number;
    title: string;
    imageUrl: string;
    isVisible: boolean;
    folderId?: number | null;
  }
  