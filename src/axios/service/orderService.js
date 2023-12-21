import { axiosOrderInstance} from '../axios';

export const addNewOrder = async (token, orderDetails) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosOrderInstance.post(`/addorder`, orderDetails, config);
    return data;
};