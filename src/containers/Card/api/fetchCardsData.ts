import { CardItem } from '../types';

const optimizedData = (data: string, size: number) => {
  return data.length > size ? `${data.slice(0, size)}...` : data;
};

export const fetchCardsData = async (): Promise<CardItem[]> => {
  try {
    const finalData: CardItem[] = [
      {
        id: 1,
        title: optimizedData('Essence Mascara Lash Princess', 30),
        body: optimizedData('The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.', 100),
        url: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp',
        thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
        hasTag: false,
        tagText: '',
        footerLabel: 'Course'
      },
      {
        id: 2,
        title: optimizedData('Eyeshadow Palette with Mirror', 30),
        body: optimizedData("The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.", 100),
        url: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp',
        thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp',
        hasTag: false,
        tagText: '',
        footerLabel: 'Course'
      },
      {
        id: 3,
        title: optimizedData('Powder Canister', 30),
        body: optimizedData('The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.', 100),
        url: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp',
        thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp',
        hasTag: true,
        tagText: 'Professional Certificate',
        footerLabel: '2 Courses'
      },
      {
        id: 4,
        title: optimizedData('Red Lipstick', 30),
        body: optimizedData('The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.', 100),
        url: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp',
        thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp',
        hasTag: false,
        tagText: '',
        footerLabel: 'Course'
      }
    ];

    return finalData;
  } catch (error) {
    console.error('Error fetching cards data:', error);
    throw error;
  }
};
