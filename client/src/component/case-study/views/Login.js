import React from "react";
import Input from "../utils_component/Input";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from "react-redux";
import { authenLogin, reset } from "../redux/actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies(); 

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector(state => state.isLoading);

    const handleSubmit = ({username, password}) => {
        dispatch(authenLogin({username, password, 'isSignUp': false}));
    };

    useEffect(() => {
        dispatch(reset({'key': 'isSignUp', 'data': false}));
        dispatch(reset({'key': 'message', 'data': ''}));
    }, []);

    useEffect(() => {
        if(cookies.get('username') != null) navigate('/');
    }, [isLoading])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required!'),
            password: Yup.string()
                .required('Required!')
                .min(8, 'Password is at least 8 characters!')
                .max(40, 'Password is at most 40 characters!')
        }),
        onSubmit: ({username, password}) => {
            handleSubmit({username, password});
        }
    });

    return (
        <div id="wrapper-login">
            {!isLoading ? (<div className="wrapper-login">
                <form onSubmit={formik.handleSubmit}>
                    <div className="header">Login</div>
                    <div className='input'>
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
                    </div>
                    <div className='submit-button'>
                        <Input 
                            type='submit'
                            value='Login'
                        />
                    </div>
                    <div className='footer'>
                        <div>Or Sign Up Using</div>
                        <div><Link to='/sign_up'>SIGN UP</Link></div>
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

export default Login;