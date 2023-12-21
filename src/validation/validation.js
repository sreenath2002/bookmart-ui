import * as Yup from 'yup';

const passwordRule = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const registrationValidation = Yup.object().shape({
  email: Yup.string().required('Email is required!!').email('Invalid email address'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').matches(passwordRule, 'Please create a stronger password'),
  firstName: Yup.string().required('First name is required').matches(/^[A-Z]/, 'First name must start with a capital letter'),
  lastName: Yup.string().required('Last name is required'),
  mobile: Yup.string().matches(/^[0-9]/, 'Mobile number must contain only numbers').matches(/^\d{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
 
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
       
        course: Yup.string().required('Course is Required'),
        subject: Yup.string().required('Subjcet is Required'),
        university: Yup.string().required('University is Required'),
        author:Yup.string().required('Author name is Required').matches(/^[A-Z]/, ' Must start with a capital letter'),
        category: Yup.string().required('Category is Required'),
        semester: Yup.string().required('Semester is Required'),
        images: Yup.array()
        .min(5, 'At least Five images are required')
        .required('Images are Required')
})
export const updateUserValidation = Yup.object().shape({
  email: Yup.string().required('Email is required!!').email('Invalid email address'),
  
  firstName: Yup.string().required('First name is required').matches(/^[A-Z]/, 'First name must start with a capital letter'),
  lastName: Yup.string().required('Last name is required'),
  mobile: Yup.string().required('Mobile number is required').matches(/^\d{10}$/, 'Mobile number must be 10 digits').matches(/^[0-9]/, 'Mobile number must contain only numbers'),
 
});

export const changePasswordValidation = Yup.object().shape({
  oldPassword: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  newPassword: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').matches(passwordRule, 'Please create a stronger password'),
  retyped: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').matches(passwordRule, 'Please create a stronger password'),
});
export const addressValidation = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Z][a-zA-Z]*$/, 'Name must start with a capital letter'),
  secondName: Yup.string().required('Second Name is required'),
  buildingNumber: Yup.number()
    .typeError('Building number must be a number')
    .required('Building number is required'),
  streetAddress: Yup.string().required('Street address is required'),
  landMark: Yup.string().required('LandMark is required'),
  country: Yup.string().required('Country is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipcode: Yup.string()
     
    .required('Zipcode is required'),
  phonenumber: Yup.string()
    .matches(/^[0-9]{10}$/, 'Invalid Phone Number') 
    .required('Phone number is required'),
});