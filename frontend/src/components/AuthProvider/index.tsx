import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { authBoot } from "../../redux/feature_slice/AuthSlice";
import { useMatch, useNavigate } from "react-router-dom";
import { AuthRole } from "../../redux/variable/AuthVariable";

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

export default AuthProvider;
