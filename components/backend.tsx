interface thumbnail {
  url: string;
}

interface medium {
  url: string;
}

interface small {
  url: string;
}

interface large {
  url: string;
  width: number;
  height: number;
}


interface Tag {
    id: number;
    Tag: string;
    documentId: string;
    blogs :Blog[];
  }
  
  interface ImageCover {
    id: number;
    url: string;
    alternativeText: string;
    formats: formats;
  }

  interface formats {
    thumbnail: thumbnail;
    medium: medium;
    small: small;
    large: large;
    type: string;
    children:children[];
  }

  interface Image {
    name: string;
    url: string;
    alternativeText: string;
    formats: formats;
    caption: string;
  }

  interface MainContent {
    type: string;
    children: children[];
    level: string;
    image: Image;
    format: string;
  }

  interface children {
    type: string;
    text: string;
    code: boolean;
    url: string;
    children: children[];
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    image: Image
  }
  
  interface Blog {
    id: number;
    documentId: string;
    Title: string;
    Description: string;
    tags: Tag[];
    Images_cover: ImageCover;
    createdAt: string;
    updatedAt: string;
    Content: string;
    MainContent: MainContent[];
  }