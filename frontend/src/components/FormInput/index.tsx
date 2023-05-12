import React from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/DropDown";
import { IconMenuOrder, IconUser } from "@tabler/icons-react";

const FormInput = () => {
  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }
  function onClickHandle() {}
  return (
    <form action="" onClick={onSubmitHandle} className="form-container">
      <Input label="Name" errorMessage="*require" placeholder="Name..." />
      <Input label="Email" errorMessage="*require" placeholder="Email.." />
      <Input label="Password" errorMessage="*require" placeholder="Password..." />
      <Input label="Comfirm Password..." errorMessage="*require" placeholder="Comfirm Password..." />
      <Dropdown
        placement="bottom"
        buttonClassName="form-dropdown-btn"
        buttonChildren={<>Role <IconMenuOrder size={25} /></>}
        dropdownClassName="form-dropdown"
        dropdownChildren={
          <>
            <Button
              type="button"
              onClick={onClickHandle}
              icon={<IconUser style={{ marginRight: "10px" }} />}
              label="Admin"
            />
          </>
        }
      />
      <Button type="button" label="Create" className="btn btn--user_create" onClick={onClickHandle} />
    </form>
  );
};

export default FormInput;
