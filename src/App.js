import React, { Component } from "react";

import { Routes, Route} from 'react-router-dom'

import SignIn from "./components/Signin/Signin";
import Register from "./components/register/register";
import TeamProfile from "./components/TeamPorfile/teamProfile";
class App extends Component {
  constructor () {
    super();
    this.state = {
      route: 'signin',
      isSignIn: false,
    }
  }

  render() {
    return(
      <Routes>
          <Route index element={<SignIn/>} />
          <Route path='login' element={ <SignIn />} />
          <Route path='register' element={ <Register />} />
          <Route path="team/:teamName" element={<TeamProfile/>} />
      </Routes>
    );
  } 
}

export default App;
