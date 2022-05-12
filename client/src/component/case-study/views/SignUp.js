import React from "react";
import Input from "../utils_component/Input";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { authenSignUp } from "../redux/actions";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router";
import { useEffect } from "react";
const cookies = new Cookies(); 

function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.isLoading);
    const isSignUp = useSelector(state => state.isSignUp);
    const handleSubmit = ({name, username, password, age, phone}) => {
        dispatch(authenSignUp({name, username, password, age, phone, 'isSignUp': true}));
    };

    useEffect(() => {
        if(isSignUp === true) navigate('/login');
    }, [isSignUp])

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            password: '',
            age: '',
            phone: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required!').max(50, 'Your Name is at most 50 characters'),
            username: Yup.string().required('Required!'),
            password: Yup.string()
                .required('Required!')
                .min(8, 'Password is at least 8 characters!')
                .max(40, 'Password is at most 40 characters!'),
            age: Yup.string(),
            phone: Yup.string()
                .required('Required!')
                .min(9, 'Length of phone number is between 9-11')
                .max(11, 'Length of phone number is between 9-11')
        }),
        onSubmit: ({name, username, password, age, phone}) => {
            handleSubmit({name, username, password, age, phone});
        }
    });

    return (
        <div id="wrapper-signup">
            {!isLoading ? (
            <div className="wrapper-signup">
                <form onSubmit={formik.handleSubmit}>
                    <div className="header">Sign Up</div>
                    <div className='input'>
                        <label>Name</label><br />
                        <Input 
                            type='text'
                            name='name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Type your username'
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <p>{formik.errors.name}</p>
                        ) : (
                            <p className="err"></p>
                        )}
                        <label>Username</label><br />
                        <Input 
                            type='text'
                            name='username'
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Type your username'
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <p>{formik.errors.username}</p>
                        ) : (
                            <p className="err"></p>
                        )}
                        <label>Password</label><br />
                        <Input 
                            type='password'
                            name='password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Type your password'
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <p>{formik.errors.password}</p>
                        ) : (
                            <p></p>
                        )}
                        <label>Age</label><br />
                        <Input 
                            type='number'
                            name='age'
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Type your age'
                        />
                        {formik.touched.age && formik.errors.age ? (
                            <p>{formik.errors.age}</p>
                        ) : (
                            <p className="err"></p>
                        )}
                        <label>Phone</label><br />
                        <Input 
                            type='text'
                            name='phone'
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder='Type your phone'
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <p>{formik.errors.phone}</p>
                        ) : (
                            <p className="err"></p>
                        )}
                    </div>
                    <div className='submit-button'>
                        <Input 
                            type='submit'
                            value='Sign Up'
                        />
                    </div>
                    <div className='footer'>
                        <div>Already Have an Account</div>
                        <div><Link to='/login'>LOGIN</Link></div>
                    </div>
                </form>
            </div>) : (
                <div className="wrapper-loading">
                    <ReactLoading className="loading" type="spinningBubbles" color="#0000FF" height={100} width={50} />
                </div>
            )}
        </div>
    )
}

export default SignUp;