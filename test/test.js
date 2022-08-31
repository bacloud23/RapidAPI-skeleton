/*
* This is an example of a client request
*
*/

import axios from "axios";

const api1Parameters = (params) => {
    return {
        method: 'GET',
        url: 'https://my-api-skeleton1.p.rapidapi.com/api/api1',
        params,
        headers: { 'X-RapidAPI-Key': 'YOUR RAPID API GOES HERE' }
    }
};

const api2Parameters = (params) => {
    return {
        method: 'GET',
        url: 'https://my-to-api-skeleton1.p.rapidapi.com/api/api2',
        params,
        headers: { 'X-RapidAPI-Key': 'YOUR RAPID API GOES HERE' }
    }
};


const api1 = async (params) => {
    return await axios.request(api1Parameters(params))
}

const api2 = async (params) => {
    return await axios.request(api2Parameters(params))
}