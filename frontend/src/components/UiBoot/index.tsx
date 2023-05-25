import React from "react";
import { useAppDispatch } from "../../redux/hook";
import { authBoot } from "../../redux/feature_slice/AuthSlice";
import { themeBoot } from "../../redux/feature_slice/ThemeSlice";

interface AuthProviderInterface {
  children: any;
}

const UiBoot = ({ children }: AuthProviderInterface) => {
  const dispatch = useAppDispatch();
  
  React.useEffect(() => {
    dispatch(authBoot());
    dispatch(themeBoot());
  }, []);

  return <>{children}</>;
};

export default UiBoot;
