import axios from 'axios';

const API_BASE_URL = '';

const ApiService = {

    postPriceProposal: async (proposeData) => {
        //Gets latest price for a specific contract.
        //https://api.deriv.com/api-explorer#proposal
        const response = await axios.post(`${API_BASE_URL}/price_proposal`, proposeData);
        return response.data;
    },
    
    buyContract: async (buyData) => {
        //Buy a Contract
        //https://api.deriv.com/api-explorer#buy
        const response = await axios.post(`${API_BASE_URL}/buy_contract`, buyData);
        return response.data;
    },

};

export default ApiService;
