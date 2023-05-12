import React from "react";
import LoginInput from "../../components/LoginInput";
import Button from "../../components/Button";
import { IconMoon2, IconSunFilled, IconKey, IconUser, IconMoonFilled, IconTicket } from "@tabler/icons-react";
import DropDown from "../../components/DropDown";
import { getUserData } from "../../requests/loginRequest";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAuth } from "../../redux/feature_slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import { AuthRole } from "../../redux/variable/AuthVariable";

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
    getUserData(input)
      .then((res: any) => {
        setStatus("Success");
        dispatch(
          setAuth({
            auth: true,
            role: res.role,
            token: res.token,
            user: {
              id: res.user.id,
              email: res.user.email,
              name: res.user.name,
            },
          })
        );
        navigate(`/${res.role}-dashboard`);
      })
      .catch((reason) => {
        setStatus("Error");
        console.log(reason);
      });
  }

  React.useEffect(() => {
    if (authRedux.auth === true) {
      if (authRedux.role === AuthRole.ADMIN) navigate("/admin-dashboard");
      if (authRedux.role === AuthRole.EMPLOYEE) navigate("/employee-dashboard");
      if (authRedux.role === AuthRole.CUSTOMER) navigate("/customer-dashboard");
    }
  }, [authRedux.auth]);

  return (
    <div className="login_container">
      <form action="/auth/login" className="login-form" onSubmit={onSubmitHandle}>
        <h1 className="login-form__header">Welcome Back User!</h1>
        <LoginInput
          icon={<IconUser size={25} />}
          placeholder="Enter your email..."
          onChange={(ev) => {
            setInput({ ...input, email: ev.target.value });
          }}
          value={input.email}
        />
        <LoginInput
          icon={<IconKey size={25} />}
          placeholder="Enter your password..."
          onChange={(ev) => {
            setInput({ ...input, password: ev.target.value });
          }}
          value={input.password}
          type="password"
        />
        <Button className="btn btn--primary btn--block" type="submit" label={status} onClick={onClickHandle} />
        <hr className="login-form__line" color="#e9ecef" />
        <DropDown
          placement="bottom"
          buttonClassName="btn btn--light btn--block"
          buttonChildren={
            <>
              <IconMoon2 style={{ marginRight: "10px" }} />
              Select Mode
            </>
          }
          dropdownClassName="login-dropdown"
          dropdownChildren={
            <>
              <Button
                className="btn btn--light btn--block"
                type="button"
                onClick={onClickHandle}
                icon={<IconMoonFilled style={{ marginRight: "10px" }} />}
                label="Dark Mode"
              />
              <Button
                className="btn btn--light btn--block"
                type="button"
                onClick={onClickHandle}
                icon={<IconSunFilled style={{ marginRight: "10px" }} />}
                label="Light Mode"
              />
            </>
          }
        />
      </form>
    </div>
  );
};

export default LoginPage;
