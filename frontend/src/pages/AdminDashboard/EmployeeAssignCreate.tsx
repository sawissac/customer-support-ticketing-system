import React, { forwardRef, useState } from "react";
import Nav from "../../components/Nav";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormWarper from "../../components/FormWarper";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { createProject } from "../../requests/projectRequest";
import { motion } from "framer-motion";
import { setRightSidebar } from "../../redux/feature_slice/EmployeeAssignmentSlice";
import { IconMenuOrder } from "@tabler/icons-react";
import Dropdown from "../../components/DropDown";
import { getAllEmployee } from "../../requests/userRequest";
import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";

const EmployeeAssignCreate = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const themeRedux = useAppSelector((state) => state.theme);
  const [inputField, setInputField] = React.useState({
    task: "",
  });
  const [employeeList, setEmployeeList] = React.useState([]);
  const [dropdownEmployee, setDropDownEmployee] = React.useState({
    name: "Select",
    value: 0,
  });
  const formatDateTime = (date: any) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  };
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const CustomDatePickerInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button
      className="btn btn--light btn--block btn--no-m-bottom"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));
  React.useEffect(() => {
    getAllEmployee({
      token: authRedux.token,
    }).then((res: any) => {
      console.log(res);
      const filteredData = res.data.map((i: any) => {
        return {
          id: i.id,
          name: i.name,
        };
      });
      setEmployeeList(filteredData);
    });
  }, []);

  function onButtonSubmitHandle() {
    const isEmpty = inputField.task === "";
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
          // dispatch(updateProjectTableUrl({message: inputField.name}));
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
    <div className="admin-container admin-container admin-container--no-flex-grow admin-container--form">
      <Nav.BackButton
        label="Project Create"
        onClick={() => {
          dispatch(setRightSidebar({ name: "" }));
        }}
      />
      <motion.div
        initial={{ x: "20px", opacity: 0 }}
        animate={{ x: "0px", opacity: 1 }}
      >
        <FormWarper route="/api/project">
          <Input
            label="Task"
            errorMessage="*require"
            placeholder="Task..."
            id="task"
            type="text"
            onChange={onChangeHandler}
          />
          <div className="form-dropdown-label">
            <label htmlFor="">
              Employee
            </label>
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
          <div className="form-dropdown-label">
            <label htmlFor="">Start Date</label>
            <span>*require</span>
          </div>
          <ReactDatePicker
            selected={startDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date: any) => setStartDate(date)}
            customInput={<CustomDatePickerInput />}
          />
          <div className="form-dropdown-label">
            <label htmlFor="">Due Date</label>
            <span>*require</span>
          </div>
          <ReactDatePicker
            selected={dueDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date: any) => setDueDate(date)}
            customInput={<CustomDatePickerInput />}
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

export default EmployeeAssignCreate;
