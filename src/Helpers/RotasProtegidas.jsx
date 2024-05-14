import React from 'react';
import { UserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import SideBar from '../Components/SideBar';
import SideNew from '../Components/SideNew'

const RotasProtegidas = ({ children }) => {
  const { login } = React.useContext(UserContext);



  return (login) ? (
    <>
      <SideBar>
        {children}
      </SideBar>
    </>
  ) : (

    <Navigate to="/login" />
  );
};

export default RotasProtegidas;

