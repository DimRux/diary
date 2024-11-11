import { Dispatch, SetStateAction } from "react";
import { ImageItem } from "@components/index";

interface ImageApi {
  alt_description: 'string',
  height: number,
  width: number,
  urls: {
    small: string;
  };
}

export const fetchImages = async (
  debouncedValue: string,
  setLoading: Dispatch<SetStateAction<boolean>>, 
  setImages: Dispatch<SetStateAction<Array<ImageItem>>>) => {
  setLoading(true);
  const url = debouncedValue 
    ? `https://api.unsplash.com/search/photos?query=${debouncedValue}&client_id=${import.meta.env.VITE_API_ACCESS_KEY}&per_page=10`
    : `https://api.unsplash.com/photos/random?count=10&client_id=${import.meta.env.VITE_API_ACCESS_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    
    const dataUrl = debouncedValue 
      ? data.results.map((img: ImageApi) => ({ isVertical: img.height > img.width, imgPath: img.urls.small, alt: img.alt_description }))
      : data.map((img: ImageApi) => ({ isVertical: img.height > img.width, imgPath: img.urls.small, alt: img.alt_description }));

    setImages(dataUrl);
  } catch (error) {
    console.error('Ошибка при получении изображений:', error);
  } finally {
    setLoading(false);
  }
};
