export interface ProductCardItem {
  objectID: string | number,
  title: string,
  primary_description: string,
  isProgram?: boolean,
  tagText?: string,
  url: string,
  thumbnail?: string,
  content_type: string,
  product: string,
  partner?: string,
  weeks_to_complete?: number,
  level?: string,
}

export interface ProductCardProps {
  item: ProductCardItem,
  isLoading: boolean,
}
