import React from "react";
import { useAppDispatch } from "../../redux/hook";
import { authBoot } from "../../redux/feature_slice/AuthSlice";
import { sidebarBoot } from "../../redux/feature_slice/SidebarSlice";

interface AuthProviderInterface {
  children: any;
}

const UiBoot = ({ children }: AuthProviderInterface) => {
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    dispatch(authBoot());
    dispatch(sidebarBoot());
  }, []);

  return <>{children}</>;
};

export default UiBoot;
