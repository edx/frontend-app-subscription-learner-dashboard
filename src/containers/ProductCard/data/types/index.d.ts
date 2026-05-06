export interface ProductCardItem {
  id: string | number,
  title: string,
  body: string,
  isProgram?: boolean,
  tagText?: string,
  url: string,
  thumbnail?: string,
  footerLabel: string,
}

export interface ProductCardProps {
  item: ProductCardItem,
  isLoading: boolean,
}
