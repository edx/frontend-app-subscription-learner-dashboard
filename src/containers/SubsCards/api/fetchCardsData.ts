import { CardItem } from "../types";

const optimizedData = (data : string, size: number) => {
    return data.length > size ? `${data.slice(0, size)}...` : data;
}

export const fetchCardsData = async (): Promise<CardItem[]> => {
    const res = await fetch("https://dummyjson.com/products?limit=4");
    const data = await res.json();
    const finalData:CardItem[] = data?.products?.map((item) => ({
        id: item.id,
        title: optimizedData(item.title, 15),
        body: optimizedData(item.description, 80),
        url: item?.images?.[0] || "",
        thumbnail: item?.thumbnail || "",
        hasTag: item.rating > 4.5,
        tagText: item.rating > 4.5 ? "Top Rated" : "",
        footerLabel: item.category
    })) || [];

    return finalData;
};