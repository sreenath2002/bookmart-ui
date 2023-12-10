import { axiosProductInstance } from "../axios";

export const getNewArrivals = async () => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosProductInstance.get(`/getProducts`);
    return data;

};
export const getScienceBooks = async () => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosProductInstance.get(`/getsciencproducts`);
    return data;

};
export const getCommerceBooks = async () => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosProductInstance.get(`/getcommerceproducts`);
    return data;

};
export const getLanguageBooks = async () => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosProductInstance.get(`/getlanguageproducts`);
    return data;

};
export const getProductSelectedProductDetails = async (token, idofTheProduct) => {
    console.log(token)
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosProductInstance.get(`/getproduct/${idofTheProduct}`,config);
    console.log(data);
    return data;

};
export const getCatgoriesFilter = async () => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosProductInstance.get(`/categoryfilter`);
    return data;

};
export const getUniversityFilter = async () => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosProductInstance.get(`/universityfilter`);
    return data;

};
export const getCoursefilter = async (category) => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosProductInstance.get(`/coursefilter/${category}`);
    return data;

};
export const getSubjcetFilter = async (course) => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosProductInstance.get(`/subjectsFilter/${course}`);
    return data;

};
export const getSemesterFilter = async (category) => {
    // const config = {
    //     headers: {
    //         Accept: 'application/json',
    //         Authorization: 'Bearer ' + token,
    //         'Content-Type': 'application/json',
    //     },
    // };
    const { data } = await axiosProductInstance.get(`/semesterfilter/${category}`);
    return data;

};
