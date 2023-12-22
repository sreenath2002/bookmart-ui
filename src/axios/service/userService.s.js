import { axiosUserInstance } from "../axios";

export const addToCart = async (token, productInfo) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.post('/addtocart', productInfo, config);
    return data;

};

export const removeFromCart = async (token, itemId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.delete(`/removefromcart/${itemId}`, config);
    return data;

};
export const addAddress = async (token, addresDetails) => {
    console.log("Remove from Cart")
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.post('/addaddress', addresDetails, config);
    return data;

};
export const payMentRequest = async (token, userId,payMentDetails) => {
   
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.post(`/paymentrequest/${userId}`, payMentDetails, config);
    return data;

};
export const shopOrderRequest = async (token, userId,shopOrderDetails) => {
   
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.post(`/shoporder/${userId}`, shopOrderDetails, config);
    return data;

};

export const updateAddress = async (token, addresId, addressDetails) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.put(`/updateaddress/${addresId}`, addressDetails, config);
    return data;

};

export const addProfilrImage = async (token, userId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.put(`/addprofileImage/${userId}`, config);
    return data;

};



export const userCartDetails = async (token, userId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/usercart/${userId}`, config);
    return data;


};


export const allAddress = async (token, userId) => {
    console.log(userId);
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    console.log("++++++++++++++++++")
    const { data } = await axiosUserInstance.get(`/getaddresses/${userId}`, config);
    return data;


};



export const userInfo = async (token, userId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/getuser/${userId}`, config);
    return data;


};

export const incrementQuantity = async (token, cartId) => {
    
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.put(`/incrementquantity/${cartId}`, null, config);
    return data;

};

export const  decrementQuantity= async (token, cartId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.put(`/decrementquantity/${cartId}`, null,config);
    return data;

};
export const  editProfile = async (token, userId,updateduserDetails) => {
    
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.put(`editprofile/${userId}`, updateduserDetails, config);
    return data;

};

export const  passwordUpdate = async (token, userId,updateduserPassword) => {
    
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.put(`/updatepassword/${userId}`, updateduserPassword, config);
    return data;

};

export const  getAllPaymentMethods = async (token) => {
    
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/paymenttypes`,config);
    return data;

};


export const cancelorderReasons = async (token) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/cancelresons`, config);
    return data;


};

export const cancelorder = async (token,cancelOrderDetails) => {
   
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.post(`/cancelorder`, cancelOrderDetails, config);
    return data;

};
export const getShoporderId = async (token,userId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/shopOrderId/${userId}`, config);
    return data;


};
export const getOrderLine = async (token,shoporderId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/orderline/${shoporderId}`, config);
    return data;


};