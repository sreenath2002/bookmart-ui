import { axiosCountriesCitiesStateInstance } from "../axios";

export const getAllCountries = async () => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosCountriesCitiesStateInstance .get(`/countries`);
    return data;

};

export const getAllStates = async (countynameDetails) => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosCountriesCitiesStateInstance .post(`/countries/states`,countynameDetails);
    return data;

};

export const getAllCities = async (countrystateDetails) => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosCountriesCitiesStateInstance .post(`/countries/state/cities`,countrystateDetails);
    return data;

};