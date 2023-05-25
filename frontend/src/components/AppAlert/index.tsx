import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { closeAlert } from "../../redux/feature_slice/AlertSlice";

const AppAlert = () => {
  const alertRedux = useAppSelector((state) => state.alert);
  const alertRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (alertRef) {
      const width = alertRef.current.clientWidth;
      alertRef.current.style.left = `calc(50% - ${width / 2}px)`;
    }
    setTimeout(() => {
      dispatch(closeAlert());
    }, 1000);
  }, [alertRef]);

  return (
    <motion.div
      initial={{ y: "10px" }}
      animate={{ y: "0px" }}
      ref={alertRef}
      className={`alert ${alertRedux.state} ${alertRedux.show ? "alert--show" : ""}`}
      onClick={() => {
        dispatch(closeAlert());
      }}
    >
      {alertRedux.message}
    </motion.div>
  );
};

export default AppAlert;
