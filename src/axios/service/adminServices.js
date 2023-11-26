import { axiosAdminInstance } from '../axios';

export const getCourses = async (token,category) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.get(`/course/${category}`, config);
    return data;

};
export const getUniversities = async (token) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.get('/universities', config);
    return data;

};
export const getsubcategory = async (token) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.get('/subcategory', config);
    return data;

};
export const getcategory = async (token) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.get('/category', config);
    return data;

};
export const getSubjects = async (token, course) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.get(`/subjects/${course}`, config);
    return data;

};
export const getsemester = async (token, category) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.get(`/semester/${category}`, config);
    return data;
};


export const createProduct = async (token, productDetails) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.post(`/product/createProduct`, productDetails, config);
    return data;
};
export const updateProduct = async (token, updateProductId,updatedproductDetails) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.put(`/product/updateProduct/${updateProductId}`, updatedproductDetails, config);
    return data;
};

export const getProducts = async (token, ) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.get(`/showproducts`,  config);
    console.log("yddhsgojchofjdhk")
    return data;
};
export const deleteProduct = async (token,deleteProdcuctId ) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.delete(`/product/deleteProduct/${deleteProdcuctId}`,  config);
    console.log("yddhsgojchofjdhk")
    return data;
};



