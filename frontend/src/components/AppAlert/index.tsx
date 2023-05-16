import React from "react";
import { motion } from "framer-motion";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hook";
import { closeAlert } from "../../redux/feature_slice/AlertSlice";

const AppAlert = () => {
  const alertRedux = useAppSelector(
    (state) => state.alert
  );
  const dispatch = useAppDispatch();
  return (
    <motion.div
      initial={{ y: "10px" }}
      animate={{ y: "0px"}}
      className={`alert ${alertRedux.state} ${
        alertRedux.show ? "alert--show" : ""
      }`}
      onClick={() => {
        dispatch(closeAlert());
      }}
    >
      {alertRedux.message}
    </motion.div>
  );
};

export default AppAlert;
