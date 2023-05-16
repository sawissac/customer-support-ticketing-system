import React from "react";
import Nav from "../../components/Nav";
import { IconUserPlus } from "@tabler/icons-react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import RouteSetter from "./RouteSetter";
import FormWarper from "../../components/FormWarper";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createProject } from "../../requests/projectRequest";

const ProjectCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);

  const [inputField, setInputField] = React.useState({
    name: "",
  });

  function onButtonSubmitHandle() {
    const isEmpty = inputField.name === "";
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      createProject({
        ...inputField,
        token: authRedux.token,
      })
        .then(() => {
          dispatch(
            setAlert({
              message: "Created Successfully",
              state: Alert.Success,
            })
          );
          navigate("/admin-dashboard/project");
        })
        .catch((reason) => {
          dispatch(
            setAlert({
              message: "Fail to create",
              state: Alert.Warning,
            })
          );
        });
    }
  }
  function onChangeHandler(ev: React.ChangeEvent<HTMLInputElement>) {
    setInputField({
      ...inputField,
      [ev.currentTarget.id]: ev.target.value,
    });
  }
  return (
    <div className="admin-container">
      <RouteSetter routeName="/admin-dashboard/project" />
      <Nav
        icon={<IconUserPlus />}
        label="Project - Create"
      />
      <Nav.Back
        link="/admin-dashboard/project"
        label="Back"
      />
      <FormWarper route="/api/project">
        <Input
          label="Name"
          errorMessage="*require"
          placeholder="Name..."
          id="name"
          type="text"
          onChange={onChangeHandler}
        />
        <Button
          type="button"
          label="Create"
          className="btn btn--form"
          onClick={onButtonSubmitHandle}
        />
      </FormWarper>
    </div>
  );
};

export default ProjectCreate;
