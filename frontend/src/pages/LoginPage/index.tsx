import React from "react";
import LoginInput from "../../components/LoginInput";
import Button from "../../components/Button";
import {
  IconKey,
  IconUser,
} from "@tabler/icons-react";
import { getLoginData } from "../../requests/loginRequest";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAuth } from "../../redux/feature_slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { AuthRole } from "../../redux/variable/AuthVariable";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";

import logo from "../../assets/img/logo.png";
import loginbg from "../../assets/img/loginbg.jpg";
import { AuthApiResponse } from "../../responseInterface/AuthApiResponse";
const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = React.useState("LOGIN");
  const authRedux = useAppSelector((state) => state.auth);

  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }

  async function onClickHandle() {
    setStatus("PROCESSING...");
    getLoginData(input)
      .then((res: any) => {
        const dataResponse: AuthApiResponse = res;
        if (dataResponse.role === AuthRole.RESIGN_EMPLOYEE) {
          setStatus("Fail");
          dispatch(
            setAlert({
              message: `Your account has been suspended`,
              state: Alert.Warning,
            })
          );
        } else {
          setStatus("Success");
          dispatch(
            setAlert({
              message: `Authenticated: as ${dataResponse.user.email}`,
              state: Alert.Success,
            })
          );
          dispatch(
            setAuth({
              auth: true,
              role: dataResponse.role,
              token: dataResponse.token,
              user: {
                id: dataResponse.user.id,
                email: dataResponse.user.email,
                name: dataResponse.user.name,
              },
            })
          );
        }
      })
      .catch(() => {
        setStatus("Fail");
      });
  }

  React.useEffect(() => {
    if (authRedux.auth === true) {
      if (authRedux.role === AuthRole.ADMIN) navigate("/admin-dashboard/tickets");
      if (authRedux.role === AuthRole.EMPLOYEE) navigate("/employee-dashboard/tickets");
      if (authRedux.role === AuthRole.CUSTOMER) navigate("/customer-dashboard/tickets");
    }
  }, [authRedux.auth]);

  return (
    <div className="login_container">
      <div className="login_container__inner">
        <div className="system-name">
          <img src={loginbg} alt="" />
          <div className="color-tran"></div>
          <h1>Customer Ticketing System Resolve Support Tickets Faster</h1>
        </div>
        <form
          action="/auth/login"
          className="login-form"
          onSubmit={onSubmitHandle}
        >
          <img
            src={logo}
            alt=""
          />
          <LoginInput
            icon={<IconUser size={25} />}
            placeholder="Enter your email..."
            onChange={(ev) => {
              setInput({
                ...input,
                email: ev.target.value,
              });
            }}
            value={input.email}
          />
          <LoginInput
            icon={<IconKey size={25} />}
            placeholder="Enter your password..."
            onChange={(ev) => {
              setInput({
                ...input,
                password: ev.target.value,
              });
            }}
            value={input.password}
            type="password"
          />
          <Button
            className="btn btn--primary btn--block"
            type="submit"
            label={status}
            onClick={onClickHandle}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
