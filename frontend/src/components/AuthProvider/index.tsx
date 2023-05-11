import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { authBoot } from "../../redux/feature_slice/AuthSlice";
import { useNavigate } from "react-router-dom";

interface AuthProviderInterface {
  children: any;
}

const AuthProvider = ({ children }: AuthProviderInterface) => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(authBoot());
  }, []);

  return <>{children}</>;
};

AuthProvider.LoginChecker = () => {
  const authRedux = useAppSelector((s) => s.auth);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authRedux.auth) navigate("/login");
  }, [authRedux]);

  return <React.Fragment />;
};

export default AuthProvider;
