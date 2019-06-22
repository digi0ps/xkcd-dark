import { API } from './core';

const base = 'https://xkcd.now.sh/';

const instance = new API(base);

export const fetchToday = () => {
  return instance.get({ url: '', type: 'session' });
};

export const fetchNumber = number => {
  return instance.get({ url: number });
};
