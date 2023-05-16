import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import { IconUserPlus } from "@tabler/icons-react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import RouteSetter from "./RouteSetter";
import FormWarper from "../../components/FormWarper";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import {
  getProject,
  updateProject,
} from "../../requests/projectRequest";

const ProjectUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);

  const projectSideRedux = useAppSelector(
    (state) => state.projectSidebar
  );

  const [inputField, setInputField] = React.useState({
    name: "",
  });

  useEffect(() => {
    setInputField({
      ...inputField,
      name: projectSideRedux.name,
    });
  }, [projectSideRedux.id]);

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
      updateProject({
        ...inputField,
        id: projectSideRedux.id,
        token: authRedux.token,
      })
        .then(() => {
          dispatch(
            setAlert({
              message: "Updated Successfully",
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
        label="Project - Update"
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
          value={inputField.name}
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

export default ProjectUpdate;
