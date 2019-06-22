export class API {
  constructor(base) {
    this.base = base;
    this.middlewares = [];
  }

  /**
   * Pushes to the middleware array only if it is a function.
   * @param {} middlewarefn Middleware function which takes and returns data.
   */
  use(middlewarefn) {
    if (typeof middlewarefn === 'function') {
      this.middlewares.push(middlewarefn);
      return;
    }

    console.error('Middleware must be a function');
  }

  /**
   * Used after fetching the data, loops over all the middlewares
   * and executes them with the received data.
   */
  applymiddlewares = data => {
    for (const middleware of this.middlewares) {
      data = middleware(data);
    }

    return data;
  };

  /**
   * Makes a fetch request to the url, coverts it to json
   * and applies the middleware.
   */
  makeRequest(url) {
    return fetch(url)
      .then(res => res.json())
      .then(this.applymiddlewares);
  }

  /**
   * First hits to cache to check whether request has been cached.
   * Else makes a request.
   */
  get({ url, type = 'local' }) {
    const cache = new Cache(type);
    const _url = url === undefined ? this.base : this.base + url;

    if (cache.isValid && cache.get(_url)) {
      return cache.get(_url);
    }

    return this.makeRequest(_url).then(data => {
      cache.set(_url, data);
      return data;
    });
  }
}

/**
 * Abstracts the localStorage / sessionStorage
 * based on the cacheType.
 */
class Cache {
  constructor(cacheType) {
    this.cache = window[cacheType + 'Storage'];
  }

  /**
   * The cache is invalid if the user passes a type other than local or session
   */
  get isValid() {
    return !!this.cache;
  }

  /**
   * Fetches the item, if it is not present returns false.
   * Else returns a promise. Promise is returned so as to
   * maintain a consistency with request-fetch and cache-fetch.
   * @param {*} key Storage key to retrieve
   */
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
