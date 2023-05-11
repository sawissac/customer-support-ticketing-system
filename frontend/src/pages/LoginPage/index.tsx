import React from "react";
import LoginInput from "../../components/LoginInput";
import Button from "../../components/Button";
import { IconMoon2, IconSunFilled, IconKey, IconLanguageHiragana, IconUser, IconMoonFilled, IconTicket } from "@tabler/icons-react";
import DropDown from "../../components/DropDown";
import axios from "axios";
import Nav from "../../components/Nav";
import Status from "../../components/Status";

const LoginPage = () => {
  const [input, setInput] = React.useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = React.useState("LOGIN");

  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }

  async function onClickHandle() {
    setStatus("PROCESSING...");
    async function getUserData() {
      const data = await axios
        .post("http://127.0.0.1:8000/api/auth/login", null, {
          params: {
            email: input.email,
            password: input.password,
          },
        })
        .then(function (response) {
          setStatus("Success");
          return response.data;
        })
        .catch((reason) => {
          setStatus("Error");
        });
      return data;
    }
    const data = await getUserData();
    console.log(data);
  }

  return (
    <div className="login_container">
      <Nav icon={<IconTicket/>} label="Tickets Request"/>
      <Status/>
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
