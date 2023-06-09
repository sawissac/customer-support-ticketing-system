import React from "react";
import Nav from "../../components/Nav";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormWarper from "../../components/FormWarper";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createProject } from "../../requests/projectRequest";
import { openProjectRightSidebar, updateProjectTableUrl } from "../../redux/feature_slice/ProjectPageSlice";
import { motion } from "framer-motion";

const ProjectCreate = () => {
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
          dispatch(openProjectRightSidebar({name: ""}));
          dispatch(
            setAlert({
              message: "Project Created Successfully",
              state: Alert.Success,
            })
          );
          dispatch(updateProjectTableUrl({message: inputField.name}));
        })
        .catch(() => {
          dispatch(
            setAlert({
            message: "Fail to create project",
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
    <div className="admin-container admin-container admin-container--no-flex-grow admin-container--form">
      
      <Nav.BackButton
        label="Project Create"
        onClick={() => {
          dispatch(openProjectRightSidebar({ name: "" }));
        }}
      />
      <motion.div
        initial={{ x: "20px", opacity: 0 }}
        animate={{ x: "0px", opacity: 1 }}
      >
        <FormWarper route="projects">
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
      </motion.div>
    </div>
  );
};

export default ProjectCreate;
