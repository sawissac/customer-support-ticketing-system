import React from "react";

interface FormWarperInterface {
  route: string;
  children: any;
}

const FormWarper = ({ route, children }: FormWarperInterface) => {
  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }
  return (
    <form
      action={route}
      onClick={onSubmitHandle}
      className="form-container"
    >
      {children}
    </form>
  );
};

export default FormWarper;
