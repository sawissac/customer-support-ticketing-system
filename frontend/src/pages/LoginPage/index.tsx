import React from "react";
import LoginInput from "../../components/LoginInput";
import Button from "../../components/Button";
import { IconMoon2, IconSunFilled, IconKey, IconLanguageHiragana, IconUser, IconMoonFilled } from "@tabler/icons-react";
import DropDown from "../../components/DropDown";

const LoginPage = () => {
  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }

  function onClickHandle() {}
  return (
    <div className="login_container">
      <form action="/auth/login" className="login-form" onSubmit={onSubmitHandle}>
        <h1 className="login-form__header">Welcome Back User!</h1>
        <LoginInput icon={<IconUser size={25} />} placeholder="Enter your email..." />
        <LoginInput icon={<IconKey size={25} />} placeholder="Enter your password..." />
        <Button className="btn btn--primary btn--block" type="submit" label="LOGIN" />
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
