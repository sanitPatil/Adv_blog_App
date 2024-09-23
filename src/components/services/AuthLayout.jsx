import React, { useEffect, useState } from 'react';
import { useLoginStore } from '../../zustStore/Store';
import { useNavigate } from 'react-router-dom';

function AuthLayout({ children, authenticate = true }) {
  const { loginStatus } = useLoginStore((state) => state);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (authenticate && loginStatus !== authenticate) {
      navigate('/login');
    }
    setLoading(false);
  }, [loginStatus, navigate, authenticate]);
  return loading ? 'Loading...' : <>{children}</>;
}

export default AuthLayout;
