import { useState } from "react";
// import { useHistory } from 'react-router';
import { withRouter, Redirect, Route } from "react-router-dom";
import User from "./../../auth/user";
import axios from 'axios';
import "./../../assets/css/bootstrap.min.css";
import "./../../assets/css/responsive.css";
import "./../../assets/css/style.css";

function Login({history, location, ...rest}) {
    const handleSubmit = async (event) => {
        const BASE_URL = "http://dev-jualankita.msi";
        //TODO handle form submit
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const loginCredentials = {
            email: formData.get('email'),
            password: formData.get('password'),
            remember: formData.get('remember'),
        }

        // const history = useHistory();

        function authenticatedCallback() {
            let {from} = location.state || {from: {pathname: '/dashboard'}};
            history.replace(from);
        }

        await axios.post(BASE_URL+'/api/auth/login', loginCredentials)
          .then((res) => {
            if(res.data.code == 200) {
                User.authenticated(res.data, authenticatedCallback);
                // history.push('/dashboard');
            }
          })
          .catch((error) => { 
            console.log(error.message);
          });
    }
    
    const isLoggedIn = User.isLoggedIn();

    return (
        <Route
            {...rest}
            render = { props => { 
                return isLoggedIn ? (
                    <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
                    ) : (
                        <div className="main_content">
                            <div className="login_register_wrap section">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-xl-6 col-md-10">
                                            <div className="login_wrap">
                                                <div className="padding_eight_all bg-white">
                                                    <div className="heading_s1">
                                                        <h3>Login</h3>
                                                    </div>
                                                    <form onSubmit={handleSubmit}>
                                                        <div className="form-group">
                                                            <input type="text" required="" className="form-control" name="email" placeholder="Your Email" />
                                                        </div>
                                                        <div className="form-group">
                                                            <input className="form-control" required="" type="password" name="password" placeholder="Password" />
                                                        </div>
                                                        <div className="login_footer form-group">
                                                            <div className="chek-form">
                                                                <div className="custome-checkbox">
                                                                    <input className="form-check-input" type="checkbox" name="remember" id="remember" value="1" />
                                                                    <label className="form-check-label" for="remember"><span>Remember me</span></label>
                                                                </div>
                                                            </div>
                                                            <a href="#">Forgot password?</a>
                                                        </div>
                                                        <div className="form-group">
                                                            <button type="submit" className="btn btn-fill-out btn-block" name="login">Log in</button>
                                                        </div>
                                                    </form>
                                                    <div className="different_login">
                                                        <span> or</span>
                                                    </div>
                                                    <ul className="btn-login list_none text-center">
                                                        <li><a href="#" className="btn btn-facebook"><i className="ion-social-facebook"></i>Facebook</a></li>
                                                        <li><a href="#" className="btn btn-google"><i className="ion-social-googleplus"></i>Google</a></li>
                                                    </ul>
                                                    <div className="form-note text-center">Don't Have an Account? <a href="signup.html">Sign up now</a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                }
            }
        />
    );
};

export default withRouter(Login)