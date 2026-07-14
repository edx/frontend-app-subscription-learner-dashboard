export interface ProductCardItem {
  objectID: string | number,
  title: string,
  primary_description: string,
  isProgram?: boolean,
  tagText?: string,
  url: string,
  thumbnail?: string,
  footerLabel: string,
  product: string,
}

export interface ProductCardProps {
  item: ProductCardItem,
  isLoading: boolean,
}
