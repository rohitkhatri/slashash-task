const axios = require('axios').default;

const client = axios.create({
    baseURL: 'https://www.omdbapi.com',
});

class OMDB {
    /**
     * @constructor
     */
    constructor() {
        this.client = client;
    }

    /**
     * Get movie by imdbId
     * 
     * @param {string} id
     */
    async getById(id) {
        return this._request('GET', '/', {
            params: { i: id }
        }).then(result => {
            if (result['Response'] === 'False') {
                return null;
            }

            return result;
        });
    }

    /**
     * Search for movies based on title
     * 
     * @param {string} query
     */
    async search(query) {
        return this._request('GET', '/', {
            params: { s: query }
        }).then(result => {
            const isSuccess = result['Response'] !== 'False';
            return {
                data: isSuccess ? result['Search'] : [],
                totalResults: isSuccess ? result['totalResults'] : 0,
            };
        });
    }

    /**
     * Send request
     * @param {'GET'|'POST'|'PATCH'} method - Method
     * @param {String} endpoint - Endpoint
     * @param {import('axios').AxiosRequestConfig} options - Options
     */
    async _request(method, endpoint, options = {}) {
        options.params = {
            ...options.params,
            apikey: process.env.OMDB_API_KEY,
        };
        return this.client.request({
            ...options,
            method: method,
            url: endpoint,
        }).then(response => {
            return response;
        }).then(this._responseHandler.bind(this)).catch(this._errorHandler.bind(this));
    }

    /**
     * Response handler
     * @param {any} response - Response
     */
    _responseHandler(response) {
        return response.data;
    }

    /**
     * Error Handler
     * @param {Object} error - Error
     */
    _errorHandler(error) {
        throw error;
    }
}

module.exports = new OMDB();
