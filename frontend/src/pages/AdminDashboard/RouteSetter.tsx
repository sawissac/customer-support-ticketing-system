import React from "react";
import { useAppDispatch } from "../../redux/hook";
import { setActiveRoute } from "../../redux/feature_slice/SidebarSlice";

interface RouteSetterInterface {
  routeName: string;
}

const RouteSetter = (
  props: RouteSetterInterface
) => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setActiveRoute(props.routeName));
  }, []);
  return <React.Fragment />;
};

export default RouteSetter;
