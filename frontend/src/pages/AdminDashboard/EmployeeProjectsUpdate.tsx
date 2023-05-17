import React, { useEffect, useState } from "react";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import { IconMenuOrder, IconUserUp } from "@tabler/icons-react";
import Nav from "../../components/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { updateEmployeeProject } from "../../requests/employeeProjectsRequest";
import RouteSetter from "./RouteSetter";
import FormWarper from "../../components/FormWarper";
import { getAllProject } from "../../requests/projectRequest";
import { getAllEmployee } from "../../requests/userRequest";
import { openProjectRightSidebar } from "../../redux/feature_slice/ProjectPageSlice";
import { motion } from "framer-motion";
const EmployeeProjectsUpdate = () => {
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const ProjectPageRedux = useAppSelector((state) => state.projectSidebar);
  const [projectDropDownList, setProjectDropDownList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [dropdownProject, setDropdownProject] = React.useState({
    name: "Project",
    value: 0,
  });
  const [dropdownEmployee, setDropDownEmployee] = React.useState({
    name: "Project",
    value: 0,
  });

  useEffect(() => {
    setDropdownProject({
      name: ProjectPageRedux.project_name,
      value: ProjectPageRedux.project_id
    });
    setDropDownEmployee({
      name: ProjectPageRedux.employee_name,
      value: ProjectPageRedux.employee_id
    })
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

  function onClickHandle() {
    const isEmpty = dropdownProject.value === 0 || dropdownEmployee.value === 0;
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      updateEmployeeProject({
        id: ProjectPageRedux.employee_id,
        project_id: dropdownProject.value,
        user_id: dropdownEmployee.value,
        token: AuthRedux.token,
      })
        .then(() => {
          dispatch(
            setAlert({
              message: "Created Successfully",
              state: Alert.Success,
            })
          );
        })
        .catch((reason) => {
          console.log(reason);
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
    <div className="admin-container admin-container--no-flex-grow admin-container--form">
      <Nav.BackButton
        label="User Update"
        onClick={() => {
          dispatch(openProjectRightSidebar({ name: "" }));
        }}
      />
      <motion.div
        initial={{ x: "20px", opacity: 0 }}
        animate={{ x: "0px", opacity: 1 }}
      >
        <FormWarper route="/api/employee-project">
          <div className="form-dropdown-label">
            <label>Project</label>
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
                {dropdownEmployee.name} <IconMenuOrder size={20} />
              </>
            }
            dropdownClassName="form-dropdown"
            dropdownChildren={
              <>
                {employeeList.map((employee: any) => {
                  return (
                    <Button
                      type="button"
                      onClick={() => {
                        setDropDownEmployee({
                          name: employee.name,
                          value: employee.id,
                        });
                      }}
                      label={employee.name}
                    />
                  );
                })}
              </>
            }
          />
          <Button
            type="button"
            label="Update"
            className="btn btn--form"
            onClick={onClickHandle}
          />
        </FormWarper>
      </motion.div>
    </div>
  );
};

export default EmployeeProjectsUpdate;
