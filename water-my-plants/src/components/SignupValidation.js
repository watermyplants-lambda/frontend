import * as yup from 'yup';

export default yup.object().shape({
    firstName: yup
    .string()
    .required("A first name is required"),
    lastName: yup
    .string()
    .required("A last name is required"),
    email: yup
    .string()
    .email('Please enter a valid email adress')
    .required("A email is required"),
    password: yup
    .string()
    .required("A password is required")
    .min(9, 'Password must be a minimim of 9 chars '),
});