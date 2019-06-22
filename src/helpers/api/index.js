import { API } from './core';

const base = 'https://xkcd.now.sh/';

const instance = new API(base);

const preloadImage = imageUrl => {
  const img = new Image();
  img.src = imageUrl;
};

export const fetchToday = () => {
  return instance.get({ url: '', type: 'session' });
};

export const fetchNumber = number => {
  return instance.get({ url: number }).then(data => {
    data.url = data.imgRetina || data.img;
    preloadImage(data.url);

    return data;
  });
};
