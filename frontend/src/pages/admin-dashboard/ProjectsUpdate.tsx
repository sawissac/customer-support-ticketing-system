import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormWarper from "../../components/FormWarper";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { updateProject } from "../../requests/projectRequest";
import { motion } from "framer-motion";
import {
  openProjectRightSidebar,
  updateProjectTableUrl,
} from "../../redux/feature_slice/ProjectPageSlice";

const ProjectUpdate = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);

  const projectSideRedux = useAppSelector((state) => state.projectSidebar);

  const [inputField, setInputField] = React.useState({
    name: "",
  });

  useEffect(() => {
    setInputField({
      ...inputField,
      name: projectSideRedux.project_name,
    });
  }, [projectSideRedux.project_id]);

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
        id: projectSideRedux.project_id,
        token: authRedux.token,
      })
        .then(() => {
          dispatch(
            setAlert({
              message: "Updated Successfully",
              state: Alert.Success,
            })
          );
          dispatch(updateProjectTableUrl({ message: inputField.name }));
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
    <div className="admin-container admin-container--no-flex-grow admin-container--form">
      <Nav.BackButton
        label="Project Update"
        onClick={() => {
          dispatch(openProjectRightSidebar({ name: "" }));
        }}
      />
      <motion.div
        initial={{ x: "20px", opacity: 0 }}
        animate={{ x: "0px", opacity: 1 }}
      >
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
            label="Update"
            className="btn btn--form"
            onClick={onButtonSubmitHandle}
          />
        </FormWarper>
      </motion.div>
    </div>
  );
};

export default ProjectUpdate;
