import React, { useEffect, useState } from "react";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import { IconMenuOrder } from "@tabler/icons-react";
import Nav from "../../components/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { createEmployeeProject } from "../../requests/employeeProjectsRequest";
import FormWarper from "../../components/FormWarper";
import { getAllEmployee } from "../../requests/userRequest";
import { motion } from "framer-motion";
import {
  openProjectRightSidebar,
  updateProjectTableUrl,
} from "../../redux/feature_slice/ProjectPageSlice";
import Input from "../../components/Input";
import { UserApiResponse } from "../../responseInterface/UserApiResponse";
import { EmployeeListApiResponse } from "../../responseInterface/EmployeeListApiResponse";
import { debounce } from "debounce";

const EmployeeProjectsCreate = () => {
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const ProjectPageRedux = useAppSelector((state) => state.projectSidebar);
  const [employeeList, setEmployeeList] = useState<UserApiResponse[]>([]);
  const [tempEmployeeList, setTempEmployeeList] = useState<UserApiResponse[]>(
    []
  );
  const [filterEmployeeInput, setFilterEmployeeInput] = useState("");
  const [dropdownEmployee, setDropDownEmployee] = React.useState({
    name: "Select",
    value: 0,
  });

  useEffect(() => {
    getAllEmployee({
      token: AuthRedux.token,
    }).then((res: any) => {
      const dataResponse: EmployeeListApiResponse = res;
      setEmployeeList(dataResponse.data);
      setTempEmployeeList(dataResponse.data);
    });
  }, []);

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
      createEmployeeProject({
        project_id: ProjectPageRedux.project_id,
        user_id: dropdownEmployee.value,
        token: AuthRedux.token,
      })
        .then(() => {
          dispatch(openProjectRightSidebar({name: ""}))

          dispatch(
            setAlert({
              message: "Created Successfully",
              state: Alert.Success,
            })
          );
          dispatch(
            updateProjectTableUrl({
              message: `updated:${Date()}`,
            })
          );
        })
        .catch(() => {
          dispatch(
            setAlert({
              message: "Fail to create",
              state: Alert.Warning,
            })
          );
        });
    }
  }

  function handleCustomerSearch(ev: React.ChangeEvent<HTMLInputElement>) {
    setFilterEmployeeInput(ev.target.value);
    debouncedCustomerProjectSearch(ev.target.value);
  }

  const debouncedCustomerProjectSearch = debounce((value: string) => {
    const filteredCustomer = tempEmployeeList.filter((project) => {
      if (project.name.toLowerCase().includes(value.toLocaleLowerCase())) {
        return true;
      }
      if (String(project.id) === value) {
        return true;
      }
    });

    if (filteredCustomer.length > 0) {
      setEmployeeList(filteredCustomer);
    }
    if (filteredCustomer.length === 0) {
      setEmployeeList(tempEmployeeList);
    }
  }, 1000);

  return (
    <div className="admin-container admin-container--no-flex-grow admin-container--form">
      <Nav.BackButton
        label="Employee Create"
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
                <div className="form-dropdown__search">
                  <Input
                    label="Search Customer Project"
                    onClick={(ev) => {
                      ev.stopPropagation();
                    }}
                    onFocus={(ev) => {
                      ev.target.setAttribute("autocomplete", "off");
                    }}
                    placeholder="[employee name] #id"
                    value={filterEmployeeInput}
                    onChange={handleCustomerSearch}
                  />
                </div>
                <div className="form-dropdown__scroll form-dropdown__scroll--height">
                  {employeeList.map((employee, index) => {
                    return (
                      <Button
                        key={index}
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
                </div>
              </>
            }
          />
          <Button
            type="button"
            label="Add"
            className="btn btn--form"
            onClick={onClickHandle}
          />
        </FormWarper>
      </motion.div>
    </div>
  );
};

export default EmployeeProjectsCreate;
