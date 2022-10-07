import React from 'react';
import {
  Routes,
  Route,
  PrivateRoutes,
  PublicRoutes,
  Navigate
} from './router';
import './App.scss';

import LogIn from './containers/LogIn';
import Profile from './containers/Profile';
import Device from './containers/Device';
import Devices from './containers/Devices';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          {/* Any route requiring user authentication needs to be nested inside this <Routes> component */}
          {/* https://medium.com/@dennisivy/creating-protected-routes-with-react-router-v6-2c4bbaf7bc1c */ }
          <Route path="/profile" element={<Profile />} exact />
          <Route path="/devices/:deviceId" element={<Device />} exact />
          <Route path="/devices" element={<Devices />} exact />
          <Route path="/" element={<Navigate to="/devices" replace={true} />} exact />
          <Route path="/" element={<Navigate to="/devices" replace={true} />} exact />
        </Route>
        <Route element={<PublicRoutes />}>
          {/* Routes that do not require authentication go down here */}
          <Route path="/login" element={<LogIn />} />
        </Route>
      </Routes>
    </>
  );
}


export default App;