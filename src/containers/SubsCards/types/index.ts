export interface CardItem {
  id: string | number,
  title: string,
  body: string,
  hasTag?: boolean,
  tagText?: string,
  url: string,
  thumbnail: string,
  footerLabel: string,
}

export interface CarouselProps {
  data: CardItem[],
  isLoading: boolean,
  isError: boolean,
}
