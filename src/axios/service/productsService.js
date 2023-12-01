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