import React from "react";
import LoginInput from "../../components/LoginInput";
import Button from "../../components/Button";
import {
  IconBrush,
  IconHash,
  IconKey,
  IconLanguageHiragana,
  IconUser,
} from "@tabler/icons-react";

const LoginPage = () => {
  return (
    <div>
      <div className="login_container">
        <form action="" className="login_form">
          <h1 className="welcome">Welcome Back User!</h1>
          
          <div className="login_input">
            <LoginInput icon={<IconUser size={25} />} placeholder="email..." />
          </div>
          <div className="login_input">
            <LoginInput
              icon={<IconKey size={25} />}
              placeholder="password..."
            />
          </div>

          <Button className="btn btn--block" type="submit" label="login" />
          <hr className="line" />
          <Button
            className="btn btn--block2"
            type="submit"
            icon={<IconLanguageHiragana />}
            label="Select Language"
          />
          <Button
            className="btn btn--block2"
            type="submit"
            icon={<IconBrush />}
            label="Select Theme"
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
