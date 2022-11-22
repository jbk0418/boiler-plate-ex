import { Axios } from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth  } from "../_actions/user_action";
import { useNavigate } from "react-router-dom";

//https://velog.io/@nemo/router-error-v6-hoc 참고해서 라우팅 해결

export default function (SpecificComponent, option, adminRoute = null){
  
    
    /**
     * option별 기능
     * 
     * null  => 아무나 출입 가능
     * true  => 로그인한 유저만 출입
     * false => 로그인한 유저는 출입 불가페이지
     * 
     * adminRoute
     * true => 어드민만 출입가능
     */
    

    function AuthenticationCheck(props){
        const navigate = useNavigate();
        const dispatch = useDispatch();
        useEffect(() => {
            
            dispatch(auth()).then(response => {
                // console.log(response)

                //로그인 하지 않은 상태
                if(!response.payload.isAuth){
                    if(option){
                        // props.history.push('/login')
                        navigate('/login');
                        
                    }

                }
                // 로그인한 상태
                else{
                    if(adminRoute && !response.payload.isAdmin){
                        navigate('/');
                        // props.history.push('/')
                        
                    }
                    else{
                        if(!option){
                        navigate('/');
                        
                        // props.history.push('/')
                    }
                    }
            }
        })

            


        }, [])

        return(
            <SpecificComponent/>
        )
    }





    return AuthenticationCheck
}