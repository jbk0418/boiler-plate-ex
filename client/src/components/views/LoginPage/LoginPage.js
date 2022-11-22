import { Axios } from 'axios';
import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Auth from "../../../hoc/auth"

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

function LoginPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }
  
  const onSubmitHandler = (event) => {
     event.preventDefault();  //리프레시 방지

      let body = {
        email: Email, 
        password: Password
      }


      dispatch(loginUser(body))
        .then(response => {
          if(response.payload.loginSuccess){
            navigate('/');
          }
          else{
            alert('Error"')
          }
        })

      



  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems:'center',
      width: '100%', height: '100vh'
    }}>


          <form style={{display:'flex', flexDirection: 'column'}}
              onSubmit={onSubmitHandler}
            >
              <label>Email</label>
              <input type="email" value={Email} onChange={onEmailHandler} />
              <label>Password</label>
              <input type="password" value={Password} onChange={onPasswordHandler} />

              <br/>
              <button type="submit">
                Login
              </button>

          </form>


    </div>
  )
}

// export default Auth(LoginPage ,false) 

export default Auth(withRouter(LoginPage),false) 