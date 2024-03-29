import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';

function App() {

  // const AuthLandingPage = Auth(LandingPage, null);
  // const AuthLoginPage = Auth(LoginPage, false);
  // const AuthRegisterPage = Auth(RegisterPage, false);


  return (
    <Router>
      <div>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route exact path="/" element={<LandingPage />}/>
          <Route path="/login"element ={<LoginPage />}/>
          <Route path="/Register" element={<RegisterPage /> }>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;


