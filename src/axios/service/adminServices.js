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
export const updateCourse = async (token,updateCourseId,updaetCourseDetails) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.put(`/updatecourse/${updateCourseId}`,updaetCourseDetails, config);
    return data;

};
export const deleteCourse = async (token,deleteCourseId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.delete(`/category/deleteCourseCategory/${deleteCourseId}`, config);
    return data;

};
export const getAllCourses = async (token) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.get('/courses', config);
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

export const updateCategory = async (token,categoryId,updatedcategoryDetails) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.put(`/updatecategory/${categoryId}`,updatedcategoryDetails, config);
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
    console.log("rtyui")
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
export const getUsers = async (token) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.get(`/users`, config);
    return data;

};

export const updateUser = async (token, updateUserId,updateduserDetails) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.put(`/update/${updateUserId}`, updateduserDetails, config);
    return data;
};
export const addUser = async (token, userDetails) => {
    console.log("--------------------------")
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    console.log("--------------------------")
    const { data } = await axiosAdminInstance.post('/addNewuser', userDetails, config);
    console.log("data",data)
    return data;
};
export const addCategory = async (token, categoryDetails) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.post(`/category/createCategory`,categoryDetails, config);
    return data;
};

export const addCourseCategory = async (token, categoryDetails) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.post(`/coursecategory/createCategory`,categoryDetails, config);
    return data;
};

export const deleteUser = async (token,deleteUserId ) => {
    console.log("rtyui")
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.delete(`/delete/${deleteUserId}`,  config);
    console.log("yddhsgojchofjdhk")
    return data;
};
export const deleteCategory = async (token,deletecategoryId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAdminInstance.delete(`/category/deleteCategory/${deletecategoryId}`, config);
    return data;

};


export const changeStatus = async (token, changeStatusUserId) => {
    console.log(token);

    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };

    console.log("rtyui");

    try {
        const { data } = await axiosAdminInstance.put(`/updatestatus/${changeStatusUserId}`, null, config);
        console.log("Status updated:", data);
        return data;
    } catch (error) {
        console.error("Error while updating status:", error);
        throw error; // Re-throw the error to handle it in the caller function
    }
};


