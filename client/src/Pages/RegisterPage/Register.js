import React from 'react'
// import {Link} from 'react-router-dom';
import './RegisterStyle.css'
import rightImg from '../../images/reg.jpg'

class Register extends React.Component {
    render() {
      return (
        <div>
          <div className="main-layout">
            <div className="left-layout"></div>
            <div className="right-layout">
                <img src={rightImg} alt="Loading"/>
            </div>
            <div className="register-form">
                    <div className="reg-form">
                        <div className="form-element-1">
                            <span className="register-font">Register</span>
                        </div>
                        <div className="form-element-2">
                            <span className="font">Welcome back. Please login to your account</span>
                        </div>
                        <div className="form-element-3">
                            <input className="username" type="text" placeholder="Username" />
                        </div>
                        <div className="form-element-4">
                            <input className="name" type="text"  placeholder="Name" />
                        </div>
                        <div className="form-element-5">
                            <input className="phone-number" type="text"  placeholder="Phone" />
                        </div>
                        <div className="form-element-6">
                            <input className="email-id" type="email"  placeholder="Email" />
                        </div>
                        <div className="form-element-7">
                            <input className="password-reg" type="password"  placeholder="Password" />
                        </div>
                        <div className="form-element-8">
                            <a className="btn btn-color" href="#">Register</a>
                        </div>
                        <div className="form-element-9">
                            <span>Already have an account?
                                <a href="/" className="reg-link">  Sign In</a></span>
                        </div>
                    </div>
                </div>
          </div>
        </div>
      )
    }
}
export default Register