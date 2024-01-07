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
export const addToWishlist= async (token, productInfo) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.post('/addtowishlist', productInfo, config);
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
export const removeFromWishlist = async (token, itemId) => {         
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.delete(`/removefromwishlist/${itemId}`, config);
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

export const addProfileImage = async (token, addprofileimagedetails,userId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.put(`/addprofileImage/${userId}`, addprofileimagedetails,config);
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
export const userWishlistDetails = async (token, userId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/userwishlist/${userId}`, config);
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
export const getOrderLine = async (token,userId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/orderline/${userId}`, config);
    return data;


};
export const getCancelOrderResons = async (token) => {
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
export const showStatus = async (token,orderLineId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/stauses/${orderLineId}`, config);
    return data;


};

export const getspecificCart = async (token,wishlistId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/getcart/${wishlistId}`, config);
    return data;


};
export const getspecificWishlist = async (token,cartId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/getwishlist/${cartId}`, config);
    return data;


};

export const setCancelStatus = async (token,orderLineId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.put(`/setcancelstatus/${orderLineId}`,null, config);
    return data;


};
export const gettheorderStatus = async (token,orderLineId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/stauses/${orderLineId}`, config);
    return data;


};

export const getcoupondiscount = async (token,couponId) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/getCouponDiscount/${couponId}`, config);
    return data;


};
export const getcouponslist = async (token) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/getCouponsList`, config);
    return data;


};
export const getvalidcouponslist = async (token) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/getValidCouponsList`, config);
    return data;


};
export const getProductIdFromCart = async (userId) => {

    const { data } = await axiosUserInstance.get(`/productidsfromcart/${userId}`);
    return data;


};
export const getProductIdFromWishlist= async (userId) => {
    
   
    const { data } = await axiosUserInstance.get(`/productidsfromwishlist/${userId}`);
    return data;


};



export const addReviewRequest = async (token, productId,reviewDetails) => {
   
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.post(`/addreview/${productId}`, reviewDetails, config);
    return data;

};

export const getallreviews = async (token, productId) => {
   
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/reviews/${productId}`, config);
    return data;

};

export const getwalletamt = async (token,userId) => {
   
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/walletamt/${userId}`, config);
    return data;

};
export const gettransactionamt = async (token,userId) => {
   
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosUserInstance.get(`/transaction/${userId}`, config);
    return data;

};



