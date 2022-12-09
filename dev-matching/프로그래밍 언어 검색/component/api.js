export const API_URL = 'https://wr4a6p937i.execute-api.ap-northeast-2.amazonaws.com/dev';

const cache = {};

const request = async (url) => {
    if (cache[url]) {
        return cache[url]
    }

    const res = await fetch(url, {method: 'GET'});
    if (res.ok) {
        const json = await res.json();
        cache[url] = json;
        return json;
    }

    throw new Error('request fail!');
}

export const fetchLanguages = async (keyword) => {
    const url = `${API_URL}/languages?keyword=${keyword}`;
    return await request(url);
}