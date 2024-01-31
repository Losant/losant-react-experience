import React from 'react';
import {
  Routes,
  Route,
  PrivateRoutes,
  PublicRoutes,
  Navigate
} from './router';
import './App.scss';

import About from './containers/About';
import LogIn from './containers/LogIn';
import LogOut from './containers/LogOut';
import Profile from './containers/Profile';
import Device from './containers/Device';
import Devices from './containers/Devices';
import FourZeroFour from './containers/FourZeroFour';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* Any route requiring user authentication needs to be nested inside this <Routes> component */}
          {/* https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c */ }
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/logout" element={<LogOut />} exact />
          
          <Route path="/devices/:deviceId" element={<Device />} exact />
          <Route path="/devices" element={<Devices />} exact />
          
          <Route path="/" element={<Navigate to="/devices" replace={true} />} exact />
        </Route>
        <Route element={<PublicRoutes />}>
          {/* Routes that do not require authentication go down here */}
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<LogIn />} />
        </Route>
        <Route path="*" element={<FourZeroFour />} />
      </Routes>
    </>
  );
}


export default App;