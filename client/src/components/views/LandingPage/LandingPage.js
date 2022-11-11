import React, { useEffect } from 'react'
import axios from 'axios'



function LandingPage() {

  useEffect(()=> {
    axios.get('/api/hello')
    .then(Response=> {console.log(Response)})
  },[]);

  return (
    <div>landingPage</div>
  )
}

export default LandingPage