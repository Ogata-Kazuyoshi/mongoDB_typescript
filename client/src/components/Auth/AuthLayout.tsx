import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../../styles/Auth/authLayout.css';

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/auth/login');
  }, []);
  return (
    <div>
      <h1>Authentificate</h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
