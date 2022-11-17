import React, { useEffect } from 'react'
import axios from 'axios'
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

function LandingPage() {
  const navigate = useNavigate();
  useEffect(()=> {
    axios.get('/api/hello')
    .then(Response=> {console.log(Response)})
  },[]);

  const onClickHandler = () => {
    axios.get('/api/users/logout')
    .then(response => {
      if(response.data.success){
        navigate("/login")
      }
      else{
        alert("로그아웃 실패")
      }
    })
  }

  return ( 
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems:'center',
      width: '100%', height: '100vh'
    }}>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>
        로그아웃
      </button>
    
    </div>
  )
}

export default Auth(withRouter(LandingPage),null)