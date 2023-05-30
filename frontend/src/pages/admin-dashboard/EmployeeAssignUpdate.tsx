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
import {
  setRightSidebar,
  updateEmployeeAssignUrl,
} from "../../redux/feature_slice/EmployeeAssignmentSlice";
import { IconMenuOrder } from "@tabler/icons-react";
import Dropdown from "../../components/DropDown";
import { getAllEmployee } from "../../requests/userRequest";
import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";
import { createEmployeeAssign, updateEmployeeAssign } from "../../requests/employeeAssignRequest";
import { UserApiResponse } from "../../responseInterface/UserApiResponse";
import { EmployeeListApiResponse } from "../../responseInterface/EmployeeListApiResponse";
import { formatDateTime } from "../../commonFunction/common";
import { debounce } from "debounce";
import { getTicketDate } from "../../requests/ticketRequest";

const EmployeeAssignUpdate = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const taskRedux = useAppSelector((state) => state.tasks);
  const [employeeList, setEmployeeList] = useState<UserApiResponse[]>([]);
  const [tempEmployeeList, setTempEmployeeList] = useState<UserApiResponse[]>([]);
  const [filterEmployeeInput, setFilterEmployeeInput] = useState("");
  const [inputField, setInputField] = React.useState({
    task: "",
  });
  const [dropdownEmployee, setDropDownEmployee] = React.useState({
    name: "Select",
    value: 0,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [minDate, setMinDate] = useState("");
  const [maxDate, setMaxDate] = useState("");
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
      const dataResponse: EmployeeListApiResponse = res;
      setEmployeeList(dataResponse.data);
      setTempEmployeeList(dataResponse.data);
    });
  }, []);

  React.useEffect(() => {
    setStartDate(new Date(taskRedux.startDate));
    setDueDate(new Date(taskRedux.dueDate));
    setDropDownEmployee({
      name: taskRedux.employee,
      value: taskRedux.employeeId,
    });
    setInputField({
      task: taskRedux.task,
    });
  }, [taskRedux]);


  const getTicketDateFetch = async () => {
    try {
      const res: any = await getTicketDate({
        id: taskRedux.ticketId,
        token: authRedux.token,
      });
      setMaxDate(res.data.end_date);
      setMinDate(res.data.start_date);
      return res;
    } catch (error) {
      
    }
  };
  getTicketDateFetch();

  function onButtonSubmitHandle() {
    const isEmpty = inputField.task === "" || dropdownEmployee.value === 0;
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      updateEmployeeAssign({
        id: taskRedux.assignId,
        ticket_id: taskRedux.ticketId,
        employee_id: dropdownEmployee.value,
        status: taskRedux.status,
        task_name: inputField.task,
        start_date: formatDateTime(startDate),
        end_date: formatDateTime(dueDate),
        token: authRedux.token,
      })
        .then(() => {
          dispatch(
            setAlert({
              message: "Created Successfully",
              state: Alert.Success,
            })
          );
          dispatch(
            updateEmployeeAssignUrl({
              name: `updated: ${Date()}`,
            })
          );
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
  function handleCustomerSearch(ev: React.ChangeEvent<HTMLInputElement>) {
    setFilterEmployeeInput(ev.target.value);
    debouncedEmployeeSearch(ev.target.value);
  }

  const debouncedEmployeeSearch = debounce((value: string) => {
    const filteredEmployee = tempEmployeeList.filter((employee) => {
      if (employee.name.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (String(employee.id) === value) {
        return true;
      }
    });

    if (filteredEmployee.length > 0) {
      setEmployeeList(filteredEmployee);
    }
    if (filteredEmployee.length === 0) {
      setEmployeeList(tempEmployeeList);
    }
  }, 1000);

  const handleDateChange = (date: any) => {
    if (!minDate && !maxDate) {
      setStartDate(date);
    }
    else{
      'loading'
    }
  };
  return (
    <div className="admin-container admin-container admin-container--no-flex-grow admin-container--form">
      <Nav.BackButton
        label="Assign Update"
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
            value={inputField.task}
            onChange={onChangeHandler}
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
                <div className="form-dropdown__scroll orm-dropdown__scroll--height">
                  {employeeList.map((employee: any, index: number) => {
                    return (
                      <Button
                        type="button"
                        key={index}
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
          <div className="form-dropdown-label">
            <label htmlFor="">Start Date</label>
            <span>*require</span>
          </div>
          <ReactDatePicker
            selected={startDate}
            dateFormat="yyyy-MM-dd"
            onChange={(date: any) => setStartDate(date)}
            customInput={<CustomDatePickerInput />}
            minDate={new Date(minDate)}
            maxDate={new Date(maxDate)}
            disabled={!minDate&&!maxDate}
          />
          <div className="form-dropdown-label">
            <label htmlFor="">Due Date</label>
            <span>*require</span>
          </div>
          <ReactDatePicker
            selected={dueDate}
            dateFormat="yyyy-MM-dd"
            onChange={handleDateChange}
            customInput={<CustomDatePickerInput />}
            minDate={new Date(minDate)}
            maxDate={new Date(maxDate)}
            disabled={!minDate&&!maxDate}
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

export default EmployeeAssignUpdate;
