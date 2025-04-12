import React, { Component } from 'react'
import '../css/Projecthomepage.css'
import { BASEURL, callApi, setSession, getSession } from '../api'

export class Projecthomepage extends Component {
  constructor(props) {
    super(props);
    this.userRegistration = this.userRegistration.bind(this);
    this.getResponse = this.getResponse.bind(this);
    this.forgotPassword = this.forgotPassword.bind(this);
    this.forgotPasswordResponse = this.forgotPasswordResponse.bind(this);
    this.signin = this.signin.bind(this);
    this.state = {
      isPopupOpen: false,
      isLoading: false,
      forgotPasswordMessage: null,
      forgotPasswordSuccess: false
    };
  }

  showSignin = () => {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "Login";
    signin.style.display = "flex";
    signup.style.display = "none";
    popup.style.display = "flex";
    this.setState({ isPopupOpen: true });

    // Clear username and password fields
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    if (username) username.value = "";
    if (password) password.value = "";

    // Clear any previous forgot password messages
    this.setState({ forgotPasswordMessage: null });
  }

  showSignup = () => {
    let popup = document.getElementById("popup");
    let signin = document.getElementById("signin");
    let signup = document.getElementById("signup");
    let popupHeader = document.getElementById("popupHeader");
    popupHeader.innerHTML = "SignUp";
    signin.style.display = "none";
    signup.style.display = "flex";
    popup.style.display = "flex";
    this.setState({ isPopupOpen: true });

    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");
    fullname.value = "";
    email.value = "";
    role.value = "";
    signuppassword.value = "";
    confirmpassword.value = "";
  }

  closePopup = () => {
    let popup = document.getElementById("popup");
    popup.style.display = "none";
    this.setState({
      isPopupOpen: false,
      forgotPasswordMessage: null
    });
  }

  closeSignin = (event) => {
    if (event.target.id === "popup") {
      this.closePopup();
    }
  }

  userRegistration() {
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    fullname.style.border = "";
    email.style.border = "";
    role.style.border = "";
    signuppassword.style.border = "";
    confirmpassword.style.border = "";

    if (fullname.value === "") {
      fullname.style.border = "1px solid red";
      fullname.focus();
      return;
    }
    if (email.value === "") {
      email.style.border = "1px solid red";
      email.focus();
      return;
    }
    if (role.value === "") {
      role.style.border = "1px solid red";
      role.focus();
      return;
    }
    if (signuppassword.value === "") {
      signuppassword.style.border = "1px solid red";
      signuppassword.focus();
      return;
    }
    if (confirmpassword.value === "") {
      confirmpassword.style.border = "1px solid red";
      confirmpassword.focus();
      return;
    }
    if (signuppassword.value !== confirmpassword.value) {
      signuppassword.style.border = "1px solid red";
      confirmpassword.style.border = "1px solid red";
      signuppassword.focus();
      return;
    }

    var data = JSON.stringify({
      fullname: fullname.value,
      email: email.value,
      role: role.value,
      password: signuppassword.value
    });

    callApi("POST", "http://localhost:8080/users/signup", data, (res) => this.getResponse(res));
  }

  getResponse(res) {
    try {
      let resp = res.split('::');
      alert(resp[1]);
      if (resp[0] === "200") {
        let signin = document.getElementById("signin");
        let signup = document.getElementById("signup");
        signin.style.display = "flex";
        signup.style.display = "none";
        this.showSignin();
      }
    } catch (error) {
      alert("Error processing response: " + res);
    }
  }

  forgotPassword() {
    let username = document.getElementById("username");

    if (!username || username.value === "") {
        if (username) {
            username.style.border = "1px solid red";
            username.focus();
        }
        return;
    }

    username.style.border = "";

    let url = `http://localhost:8080/users/forgotpassword/${username.value}`;

    this.setState({ isLoading: true, forgotPasswordMessage: "Processing your request..." });

    callApi("GET", url, "", (res) => {
        this.setState({ isLoading: false });
        try {
            if (res.startsWith("500::")) {
                this.setState({
                    forgotPasswordMessage: "User not found or error sending email. Please try again.",
                    forgotPasswordSuccess: false
                });
                return;
            }
            this.forgotPasswordResponse(res);
        } catch (error) {
            console.error("Error handling forgot password response:", error);
            this.setState({
                forgotPasswordMessage: "An error occurred. Please try again later.",
                forgotPasswordSuccess: false
            });
        }
    });
  }

  forgotPasswordResponse(res) {
    try {
      let data = res.split("::");
      this.setState({
        forgotPasswordMessage: data[1],
        forgotPasswordSuccess: data[0] === "200"
      });
    } catch (error) {
      console.error("Error parsing response:", error);
      this.setState({
        forgotPasswordMessage: "An error occurred while processing the response.",
        forgotPasswordSuccess: false
      });
    }
  }

  handleSignIn = () => {
    let username = document.getElementById("username");
    let password = document.getElementById("password");

    if (!username || username.value === "") {
      if (username) {
        username.style.border = "1px solid red";
        username.focus();
      }
      return;
    }

    if (!password || password.value === "") {
      if (password) {
        password.style.border = "1px solid red";
        password.focus();
      }
      return;
    }

    username.style.border = "";
    password.style.border = "";

    // Add your sign in logic here
    // e.g., callApi("POST", "http://localhost:8080/users/signin", data, callback);
  }
  signin() {
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let responseDiv = document.getElementById("responseDiv");

    username.style.border = "";
    password.style.border = "";
    responseDiv.innerHTML = "";

    if(username.value === "") {
        username.style.border = "1px solid red";
        username.focus();
        return;
    }
    if(password.value === "") {
        password.style.border = "1px solid red";
        password.focus();
        return;
    }

    let data = JSON.stringify({
        email: username.value,
        password: password.value
    });

    callApi("POST", "http://localhost:8080/users/signin", data, (res) => {
        let rdata = res.split('::');
        if(rdata[0] === "200") {
            setSession("csrid", rdata[1], 1);  // Store the JWT token
            window.location.href = "/dashboard";
        } else {
            responseDiv.innerHTML = `<br/><br/><label style="color:red">${rdata[1]}</label>`;
        }
    });
  }

  signinResponse(res){
    let rdata = res.split('::');
    if(rdata[0] === "200"){
      setSession("csrid",rdata[1],1);
      window.location.href = "/dashboard";
    }
    else{
      responseDiv.innerHTML = `<br/><br/><label style="color:red">${rdata[1]}</label>`;
    }
  }

  render() {
    return (
      <div id="base">
        <div id='popup' onClick={this.closeSignin} style={{display: 'none'}}>
          <div className='popupWindow'>
            {this.state.isPopupOpen && (
              <button
                className='popupCloseButton'
                onClick={this.closePopup}
                aria-label="Close popup"
              >
                ✕
              </button>
            )}
            <div id='popupHeader'>Login</div>
            <div id='signin'>
              <div className='formContainer'>
                <div className='inputWrapper'>
                  <label className='inputLabel'>Username:</label>
                  <div className='inputIconWrapper'>
                    <input
                      type='text'
                      id='username'
                      placeholder='Enter your username'
                      className='inputWithIcon'
                    />
                    <span className='inputIcon'>👤</span>
                  </div>
                </div>
                <div className='inputWrapper'>
                  <label className='inputLabel'>Password:</label>
                  <div className='inputIconWrapper'>
                    <input
                      type='password'
                      id='password'
                      placeholder='Enter your password'
                      className='inputWithIcon'
                    />
                    <span className='inputIcon'>🔒</span>
                  </div>
                </div>
                <div className='forgotPassword'>
                  Forgot <label onClick={this.forgotPassword}>Password?</label>
                </div>
                <button className='signinButton' onClick={this.signin}>Sign In</button>
                <div className='div1' id='responseDiv'>
                  {this.state.isLoading && (
                    <p>Processing your request...</p>
                  )}
                  {!this.state.isLoading && this.state.forgotPasswordMessage && (
                    <p style={{ color: this.state.forgotPasswordSuccess ? "green" : "red" }}>
                      {this.state.forgotPasswordMessage}
                    </p>
                  )}
                </div>

                <div className='formFooter'>
                  Don't have an account?
                  <label
                    onClick={this.showSignup}
                    className='switchFormLink'
                  >
                    SIGNUP NOW
                  </label>
                </div>
              </div>
            </div>
            <div id='signup'>
              <div className='formContainer'>
                <div className='inputWrapper'>
                  <label className='inputLabel'>Full Name:</label>
                  <div className='inputIconWrapper'>
                    <input
                      type='text'
                      id="fullname"
                      placeholder='Enter your full name'
                      className='inputWithIcon'
                    />
                    <span className='inputIcon'>👥</span>
                  </div>
                </div>
                <div className='inputWrapper'>
                  <label className='inputLabel'>Email:</label>
                  <div className='inputIconWrapper'>
                    <input
                      type='email'
                      id="email"
                      placeholder='Enter your email address'
                      className='inputWithIcon'
                    />
                    <span className='inputIcon'>✉️</span>
                  </div>
                </div>

                <div className='inputWrapper'>
                  <label className='inputLabel'>Select Role:</label>
                  <div className='inputIconWrapper'>
                    <select id='role' className='inputWithIcon'>
                      <option value=''>Select Your Role</option>
                      <option value='1'>Admin</option>
                      <option value='2'>Employee</option>
                      <option value='3'>Job Seeker</option>
                    </select>
                    <span className='inputIcon'>🏢</span>
                  </div>
                </div>

                <div className='inputWrapper'>
                  <label className='inputLabel'>Password:</label>
                  <div className='inputIconWrapper'>
                    <input
                      type='password'
                      id="signuppassword"
                      placeholder='Create a strong password'
                      className='inputWithIcon'
                    />
                    <span className='inputIcon'>🔐</span>
                  </div>
                </div>
                <div className='inputWrapper'>
                  <label className='inputLabel'>Confirm Password:</label>
                  <div className='inputIconWrapper'>
                    <input
                      type='password'
                      id="confirmpassword"
                      placeholder='Confirm your password'
                      className='inputWithIcon'
                    />
                    <span className='inputIcon'>🔐</span>
                  </div>
                </div>
                <button onClick={this.userRegistration} className='signinButton'>Register Now</button>

                <div className='formFooter'>
                  Already Have an account?
                  <span onClick={this.showSignin} className='switchFormLink'>
                    <label>SIGN IN</label>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="header">
          <img className='logo' src='./images/logo1.png' alt='no' />
          <div className='signinContainer'>
            <img className='signinIcon' src='./images/user.png' alt='sign' onClick={this.showSignin} />
            <label className='signinText' onClick={this.showSignin}>SignIn</label>
          </div>
        </div>

        <div id="content">
          <div className='text1'>Indias #1 job portal - kl job portal</div>
          <div className='text2'>Your job search ends here</div>
          <div className='text3'>Discover career oppurtunities</div>

          <div className='searchBar'>
            <input type='text' className='searchText' placeholder='Search by Skill' />
            <input type='text' className='searchLocation' placeholder='Job Location' />
            <button className='searchButton'> SearchJob</button>
          </div>
        </div>

        <div id='footer'>
          <label className='copyrightText'>Copyright&copy;Leo Stephen - K L University.All rights reserved </label>
          <div className='socialIcons'>
            <img className='socialmediaIcon' src='./images/facebook.png' alt='Facebook'/>
            <img className='socialmediaIcon' src='./images/linkedin.png' alt='LinkedIn'/>
            <img className='socialmediaIcon' src='./images/twitter.png' alt='Twitter'/>
          </div>
        </div>
      </div>
    )
  }
}

export default Projecthomepage
