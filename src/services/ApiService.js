import axios from 'axios';

const API_BASE_URL = '';

const ApiService = {

    postPriceProposal: async (proposeData) => {
        //Gets latest price for a specific contract.
        //https://api.deriv.com/api-explorer#proposal
        const response = await axios.post(`${API_BASE_URL}/price_proposal`, proposeData);
        return response.data;
    },
    
    postBuyContract: async (buyData) => {
        //Buy a Contract
        //https://api.deriv.com/api-explorer#buy
        const response = await axios.post(`${API_BASE_URL}/buy_contract`, buyData);
        return response.data;
    },

    postPortfolio: async (portfolioData) => {
        //Receive information about my current portfolio of outstanding options
        //https://api.deriv.com/api-explorer#portfolio
        const response = await axios.post(`${API_BASE_URL}/portfolio`, portfolioData);
        return response.data;
    },

    postSellContract: async (sellData) => {
        //Sell a Contract as identified from a previous `portfolio` call.
        //https://api.deriv.com/api-explorer#sell
        const response = await axios.post(`${API_BASE_URL}/sell_contract`, sellData);
        return response.data;
    },

};

export default ApiService;
