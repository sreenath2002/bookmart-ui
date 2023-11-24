import { axiosAuthInstance } from '../axios';

export const getCourses = async (token) => {
    const config = {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
        },
    };
    const { data } = await axiosAuthInstance.get('/courses', config);
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
    const { data } = await axiosAuthInstance.get('/universities', config);
    return data;

};