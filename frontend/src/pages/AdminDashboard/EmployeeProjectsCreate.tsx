import React, { useEffect, useState } from "react";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import { IconMenuOrder, IconUserUp } from "@tabler/icons-react";
import Nav from "../../components/Nav";
import { userRoles } from "../../redux/variable/UserSidebarVariable";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import {
  createEmployeeProject,
} from "../../requests/employeeProjectsRequest";
import RouteSetter from "./RouteSetter";
import FormWarper from "../../components/FormWarper";
import { getAllProject } from "../../requests/projectRequest";
import { getAllEmployee } from "../../requests/employeeRequest";

const EmployeeProjectsCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const [projectDropDownList, setProjectDropDownList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [dropdownProject, setDropdownProject] = React.useState({
    name: "Project",
    value: 0,
  });
  const [dropdownEmpoyee, setDropdownProject] = React.useState({
    name: "Project",
    value: 0,
  });
  useEffect(() => {
    getAllProject({
      token: AuthRedux.token,
    }).then((res: any) => {
      const filteredData = res.data.map((i: any) => {
        return {
          id: i.id,
          name: i.name,
        };
      });
      setProjectDropDownList(filteredData);
    });
    getAllEmployee({
      token: AuthRedux.token,
    }).then((res: any) => {
      const filteredData = res.data.map((i: any) => {
        return {
          id: i.id,
          name: i.name,
        };
      });
      setEmployeeList(filteredData);
    });
  }, []);

  const [dropdownBoxEmployee, setDropDownBoxEmployee] =
    React.useState({
      name: "Employee",
      value: "",
    });

  function onClickHandle() {
    const isEmpty =
      Object.values(dropdownProject).filter((i) => i === "")
        .length > 0 || dropdownBoxEmployee.value === "";
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      createEmployeeProject({
        // ...inputField,
        project_id: dropdownProject.value,
        employee_id: dropdownBoxEmployee.value,
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
      <RouteSetter routeName="/admin-dashboard/employee-project" />
      <Nav
        icon={<IconUserUp />}
        label="Employee Project Create"
      />
      <Nav.Back
        link="/admin-dashboard/employee-project"
        label="Back"
      />
      <FormWarper route="/api/employee-project">
        <div className="form-dropdown-label">
          <label htmlFor="">Project</label>
          <span>*require</span>
        </div>

        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              {dropdownProject.name} <IconMenuOrder size={20} />
            </>
          }
          dropdownClassName="form-dropdown"
          dropdownChildren={
            <>
              {projectDropDownList.map((project: any) => {
                return (
                  <Button
                    type="button"
                    onClick={() => {
                      setDropdownProject({
                        name: project.name,
                        value: project.id,
                      });
                    }}
                    label={project.name}
                  />
                );
              })}
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
              {employeeList.map((employeeId: string) => {
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
              })}
            </>
          }
        />
        <Button
          type="button"
          label="Create"
          className="btn btn--form"
          onClick={onClickHandle}
        />
      </FormWarper>
    </div>
  );
};

export default EmployeeProjectsCreate;
