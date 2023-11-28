import * as Yup from 'yup';

const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const registrationValidation = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required!!'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').matches(passwordRule, 'Please create a stronger password').required('Password is required'),
  firstName: Yup.string().required('First name is required').matches(/^[A-Z]/, 'First name must start with a capital letter'),
  lastName: Yup.string().required('Last name is required'),
  mobile: Yup.string().matches(/^\d{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
 
});

export const emailValidation= Yup.object().shape({
  email: Yup.string().email('Invalid email addressss').required('Email is required'),
  
});

export const addProductValidation=Yup.object().shape({

    title:Yup.string().required('Titleis required').matches(/^[A-Z]/, ' Must start with a capital letter'),
    description:Yup.string().required('Description is Required').min(6, 'Description must Contain Atleast 15 Characters'),
    price: Yup.string().required('Price is Required').matches(/^[0-9]+$/, 'Price must contain only numbers'),
     
        discountedPrice:Yup.string().required('DiscountedPrice is Required').matches(/^[0-9]+$/, 'DiscountedPrice must contain only numbers'),
        discountPresent: Yup.string().required('Discount Perset is Required'),
        quantity: Yup.string().required('Quantity is Required').matches(/^[0-9]+$/, 'Quantity must contain only numbers'),
        courses: Yup.string().required('Course is Required'),
        subjects: Yup.string().required('Subjcet is Required'),
        universitys: Yup.string().required('University is Required'),
        authors:Yup.string().required('Author name is Required').matches(/^[A-Z]/, ' Must start with a capital letter'),
        parentCategory: Yup.string().required('Category is Required'),
        semester: Yup.string().required('Semester is Required'),
        images: Yup.array()
        .min(5, 'At least Five images are required')
        .required('Images are Required')
})