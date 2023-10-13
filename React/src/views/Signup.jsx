import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/CreateProvider";

export default function Signup() {
  //can use states in place of ref but they keep saving with each change 
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const { setUser, setToken} = useStateContext()
  
  const onSubmit = (ev) => {
    ev.preventDefault();
    
    //This is what is sent to through axios to the laravel server
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    }
    //request to the server and assigns the response user and token to our context provider
    //422 is a validation error
    axiosClient.post('/signup', payload)
    .then(({data}) => {
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      const response = err.response;
      if(response && response.status === 422){
        console.log(response.data.errors);  
      }
    })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">
            Sign up for free
          </h1>
          <input ref={nameRef} type="text" placeholder="Full Name"/>
          <input ref={emailRef} type="email" placeholder="Email Address"/>
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={passwordConfirmationRef} type="password" placeholder="Password confirmation" />
          <button className="btn btn-block">Signup</button>
          <p className="message">
            Already Registered? <Link to="/login">Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
