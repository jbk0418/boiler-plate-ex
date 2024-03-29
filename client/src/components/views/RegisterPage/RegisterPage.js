import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
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



function RegisterPage(props) {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setName(event.currentTarget.value)
  }

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value)
  }

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value)
  }
  
  const onSubmitHandler = (event) => {
     event.preventDefault();  //리프레시 방지
      

    if(Password !== ConfirmPassword){
      return alert("비밀번호와 비밀번호 확인이 같아야 합니다.")

    }

      let body = {
        email: Email, 
        password: Password,
        name: Name
      }


      dispatch(registerUser(body))
        .then(response => {
          if(response.payload.success){
            navigate('/login')          }
          else{
            alert('Fail to sigin up')
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
              <label>Name</label>
              <input type="text" value={Name} onChange={onNameHandler} />
              <label>Password</label>
              <input type="password" value={Password} onChange={onPasswordHandler} />
              <label>Confirm Password</label>
              <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />

              <br/>
              <button type="submit">
                회원가입
              </button>

          </form>


    </div>
  )
}

export default Auth(withRouter(RegisterPage), false)