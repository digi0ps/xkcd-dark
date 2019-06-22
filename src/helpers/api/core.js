export class API {
  constructor(base) {
    this.base = base;
  }

  makeRequest(url) {
    return fetch(this.base + url).then(res => res.json());
  }

  get({ url, type = 'local' }) {
    const cache = new Cache(type);
    const _url = url === undefined ? url : '';
    console.log('uff', url, _url);

    if (cache.isValid && cache.get(_url)) {
      return cache.get(_url);
    }

    return this.makeRequest(_url).then(data => {
      cache.set(_url, data);
      return data;
    });
  }
}

class Cache {
  constructor(cacheType) {
    this.cache = window[cacheType + 'Storage'];
  }

  get isValid() {
    return !!this.cache;
  }

  get(key) {
    const value = this.cache.getItem(key);

    if (!value) {
      return false;
    }

    return new Promise(resolve => {
      resolve(JSON.parse(value));
    });
  }

  set(key, value) {
    this.cache.setItem(key, JSON.stringify(value));
  }
}
