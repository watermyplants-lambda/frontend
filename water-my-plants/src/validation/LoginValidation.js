import * as yup from 'yup';

export default yup.object().shape({
    email: yup.string()
    .email('Must be a valid email')
    .required('A first Name is Required'),
    password: yup.string()
    .required('A password is Required')
    .min(9,'Password is 9 charactes minimum'),
})