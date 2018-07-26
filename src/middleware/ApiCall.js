const get = url => {
    return fetch(`/mock/response.json`, {
        method: 'GET'
      }).then(response => response.json());
};

export default {
    get
}