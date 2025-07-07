// coreApi.js
require('dotenv').config({ path: '../../.env' }); // Load environment variables from .env file in the project root
const axios = require('axios');

/**
 * Searches the CORE dataset for a given entity.
 * @param {string} entity - The entity to search (e.g., 'works', 'journals', 'data-providers').
 * @param {string} searchQuery - The search query string.
 * @param {number} offset - The offset for pagination.
 * @param {number} limit - The maximum number of results to return.
 * @returns {Promise<object>} A promise that resolves to the JSON response from the API.
 */
async function searchCoreDataset(entity, searchQuery, offset, limit) {
    const coreApiKey = process.env.CORE_API_KEY;
    if (!coreApiKey) {
        throw new Error("CORE_API_KEY is not set in the environment variables.");
    }

    const headers = {
        "Authorization": `Bearer ${coreApiKey}`
    };
    const url = `https://api.core.ac.uk/v3/search/${entity}`;
    const payload = {
        q: searchQuery,
        offset: offset,
        limit: limit,
    };

    try {
        const response = await axios.post(url, payload, { headers: headers });
        return response.data; // Axios puts the JSON response in .data
    } catch (error) {
        // Axios throws an error for non-2xx status codes, similar to requests.raise_for_status()
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error(`Error response from CORE API: ${error.response.status} - ${error.response.statusText}`);
            console.error('Response data:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from CORE API:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
        }
        throw error; // Re-throw the error after logging
    }
}

/**
 * Searches for works in the CORE dataset.
 * @param {string} searchQuery - The search query string.
 * @param {number} [offset=0] - The offset for pagination.
 * @param {number} [limit=10] - The maximum number of results to return.
 * @returns {Promise<object>} A promise that resolves to the JSON response from the API.
 */
async function searchWorks(searchQuery, offset = 0, limit = 10) {
    return searchCoreDataset('works', searchQuery, offset, limit);
}

/**
 * Searches for journals in the CORE dataset.
 * @param {string} searchQuery - The search query string.
 * @param {number} [offset=0] - The offset for pagination.
 * @param {number} [limit=10] - The maximum number of results to return.
 * @returns {Promise<object>} A promise that resolves to the JSON response from the API.
 */
async function searchJournals(searchQuery, offset = 0, limit = 10) {
    return searchCoreDataset('journals', searchQuery, offset, limit);
}

/**
 * Searches for data providers in the CORE dataset.
 * @param {string} searchQuery - The search query string.
 * @param {number} [offset=0] - The offset for pagination.
 * @param {number} [limit=10] - The maximum number of results to return.
 * @returns {Promise<object>} A promise that resolves to the JSON response from the API.
 */
async function searchDataProviders(searchQuery, offset = 0, limit = 10) {
    return searchCoreDataset('data-providers', searchQuery, offset, limit);
}

// Example usage (optional, for testing)
async function main() {
    try {
        console.log("Searching for works...");
        const worksResult = await searchWorks("machine learning", 0, 5);
        console.log("Works search result:", JSON.stringify(worksResult, null, 2));

        console.log("\nSearching for journals...");
        const journalsResult = await searchJournals("nature", 0, 2);
        console.log("Journals search result:", JSON.stringify(journalsResult, null, 2));

        console.log("\nSearching for data providers...");
        const dataProvidersResult = await searchDataProviders("university", 0, 3);
        console.log("Data Providers search result:", JSON.stringify(dataProvidersResult, null, 2));

    } catch (error) {
        console.error("An error occurred during example usage:", error.message);
    }
}

// Uncomment the following line to run the example when this file is executed directly
// main();

module.exports = {
    searchCoreDataset,
    searchWorks,
    searchJournals,
    searchDataProviders,
};