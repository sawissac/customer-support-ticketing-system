import React, { useEffect, useState } from "react";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import { IconMenuOrder, IconUserUp } from "@tabler/icons-react";
import Nav from "../../components/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { updateEmployeeProject } from "../../requests/employeeProjectsRequest";
import FormWarper from "../../components/FormWarper";
import { getAllEmployee } from "../../requests/userRequest";
import {
  openProjectRightSidebar,
  updateEmployeeTableUrl,
} from "../../redux/feature_slice/ProjectPageSlice";
import { motion } from "framer-motion";
const EmployeeProjectsUpdate = () => {
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const ProjectPageRedux = useAppSelector((state) => state.projectSidebar);
  const [employeeList, setEmployeeList] = useState([]);
  const [dropdownEmployee, setDropDownEmployee] = React.useState({
    name: "Select",
    value: 0,
  });

  useEffect(() => {
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

  useEffect(() => {
    setDropDownEmployee({
      name: ProjectPageRedux.employee_name,
      value: ProjectPageRedux.employee_id,
    });
  }, [ProjectPageRedux.employee_id]);

  function onClickHandle() {
    const isEmpty = dropdownEmployee.value === 0;
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      updateEmployeeProject({
        id: ProjectPageRedux.id,
        project_id: ProjectPageRedux.project_id,
        user_id: dropdownEmployee.value,
        token: AuthRedux.token,
      })
        .then(() => {
          dispatch(
            setAlert({
              message: "Updated Successfully",
              state: Alert.Success,
            })
          );
          dispatch(
            updateEmployeeTableUrl({
              message: `updated:${Date()}`,
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
                      label={employee.name + `#${employee.id}`}
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
