import React, { useEffect, useState } from "react";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import {
  IconMenuOrder,
  IconUserUp,
} from "@tabler/icons-react";
import Nav from "../../components/Nav";
import { userRoles } from "../../redux/variable/UserSidebarVariable";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { createEmployeeProject, getEmployeeproject } from "../../requests/employeeProjectsRequest";
import axios from "axios";
import { useQuery } from "react-query";

const EmployeeProjectsCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);

  const [dropdownBoxProject, setDropDownBoxProject] = React.useState({
    name: "Project",
    value: "",
  });
  const [dropdownBoxEmployee, setDropDownBoxEmployee] = React.useState({
    name: "Employee",
    value: "",
  });


  function onSubmitHandle(
    ev: React.FormEvent<HTMLFormElement>
  ) {
    ev.preventDefault();
  }
  function onClickHandle() {
    const isEmpty =
      Object.values(dropdownBoxProject).filter((i) => i === "").length > 0 ||
      dropdownBoxEmployee.value === "";
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    }
     else {
      createEmployeeProject({
        // ...inputField,
        project_id: dropdownBoxProject.value,
        employee_id:dropdownBoxEmployee.value,
        token: AuthRedux.token,
      })
        .then(() => {
          dispatch(
            setAlert({
              message: "Created Successfully",
              state: Alert.Success,
            })
          );
          navigate("/admin-dashboard/users");
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
  return (
    <div className="admin-container">
      <Nav
        icon={<IconUserUp />}
        label="Employee Project Create"
      />
      <form
        action=""
        onClick={onSubmitHandle}
        className="form-container"
      >
        <div className="form-dropdown-label">
          <label htmlFor="">Project</label>
          <span>*require</span>
        </div>
        
        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              {dropdownBoxProject.name} <IconMenuOrder size={20} />
            </>
          }
          dropdownClassName="form-dropdown"
          dropdownChildren={
            <>
              {/* {Object.keys(getEmployeeproject).map((projectId: string) => {
                return (
                  <Button
                    type="button"
                    onClick={() => {
                      setDropDownBoxProject({
                        name: projectId,
                        value: userRoles[projectId],
                      });
                    }}
                    label={projectId}
                  />
                );
              })} */}
            </>
          }
        />

        <div className="form-dropdown-label">
          <label htmlFor="">Employee</label>
          <span>*require</span>
        </div>
        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              {dropdownBoxEmployee.name} <IconMenuOrder size={20} />
            </>
          }
          dropdownClassName="form-dropdown"
          dropdownChildren={
            <>
              {/* {Object.keys(userRoles).map((employeeId: string) => {
                return (
                  <Button
                    type="button"
                    onClick={() => {
                      setDropDownBoxEmployee({
                        name: employeeId,
                        value: userRoles[employeeId],
                      });
                    }}
                    label={employeeId}
                  />
                );
              })} */}
            </>
          }
        />
        <Button
          type="button"
          label="Create"
          className="btn btn--form"
          onClick={onClickHandle}
        />
      </form>
    </div>
  );
};

export default EmployeeProjectsCreate;
