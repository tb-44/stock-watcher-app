const baseUrl = new URL('https://www.alphavantage.co/query');
const apiKey = 'HY0JP87WH3PG17X6';

/**
 * Will only return the data from alphavantage if it contains the stock quote info.
 * Note that alphavantage only allows 5 api requests per minute up to 500 requests per day.
 * @param symbol
 * @returns {Promise<any>}
 */
export const getGlobalQuoteBySymbol = (symbol) => {
    if (typeof symbol !== 'string' || symbol.length < 1) {
        throw new Error("symbol must be a string with a length greater than 0")
    }

    return getApiData(symbol);
}

const getApiData = async (symbol) => {
    let url = baseUrl;
    url.search = new URLSearchParams({
        function: "GLOBAL_QUOTE",
        symbol,
        apikey: apiKey,
    }).toString();

    try {
        const response = await fetch(url.toString(), { method: "GET" });
        const data = await response.json();

        if (!data["Global Quote"]) {
            throw new Error("No searched symbol data or API limit reached: " + symbol);
        }

        return data["Global Quote"];

    } catch (error) {
        console.warn("Error for Global Quote search: ", error.message);
        throw new Error("Error for Global Quote search: ", error.message);
    }
};