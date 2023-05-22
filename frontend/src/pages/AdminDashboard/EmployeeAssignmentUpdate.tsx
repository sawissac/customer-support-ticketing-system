import React, { forwardRef, useState } from "react";
import Nav from "../../components/Nav";
import Button from "../../components/Button";
import FormWarper from "../../components/FormWarper";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { motion } from "framer-motion";
import Dropdown from "../../components/DropDown";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { setRightSidebar } from "../../redux/feature_slice/EmployeeAssignmentSlice";
import { getAllTicket } from "../../requests/ticketRequest";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const EmployeeAssignmentUpdate = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((s) => s.auth);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());

  const [inputField, setInputField] = useState({
    subject: "",
    description: "",
    drive_link: "",
  });
  const [ticketList, setTicketList] = React.useState([]);
  const [ticketDropDown, setTicketDropDown] = React.useState({
    name: "Select",
    value: 0,
  });
  const CustomDatePickerInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button
      className="btn btn--light btn--block btn--no-m-bottom"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));
  function onChangeHandler(ev: React.ChangeEvent<HTMLInputElement>) {
    setInputField({
      ...inputField,
      [ev.currentTarget.id]: ev.target.value,
    });
  }
  const formatDateTime = (date: any) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  };

  function onSubmitHandler() {
    const isEmpty =
      inputField.subject.length === 0 ||
      inputField.description.length === 0 ||
      ticketDropDown.value === 0;
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      // createTicket({
      //   ...inputField,
      //   customer_project_id: projectDropDown.value,
      //   priority: priorityDropDown.value,
      //   token: authRedux.token,
      // })
      //   .then(() => {
      //     dispatch(
      //       setAlert({
      //         message: "Created Successfully",
      //         state: Alert.Success,
      //       })
      //     );
      //     dispatch(
      //       updateTicketUrl({
      //         name: `updated:${Date()}`,
      //       })
      //     );
      //     dispatch(setTicketView({ name: "" }));
      //   })
      //   .catch(() => {
      //     setAlert({
      //       message: "Fail to create...",
      //       state: Alert.Warning,
      //     });
      //   });
    }
  }

  React.useState(() => {
    getAllTicket({ token: authRedux.token }).then((res: any) => {
      setTicketList(res.data);
    });
  });

  return (
    <>
      <div className="admin-container admin-container--no-flex-grow admin-container--form">
        <Nav.BackButton
          label="Task Update"
          onClick={() => {
            dispatch(setRightSidebar({ name: "" }));
          }}
        />
        <FormWarper route="/api/task">
          <motion.div
            initial={{ x: "20px", opacity: 0 }}
            animate={{ x: "0px", opacity: 1 }}
          >
            <div className="form-dropdown-label">
              <label htmlFor="">Start Date</label>
              <span>*require</span>
            </div>
            <DatePicker
              selected={startDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date: any) => setStartDate(date)}
              customInput={<CustomDatePickerInput />}
            />
            <div className="form-dropdown-label">
              <label htmlFor="">Due Date</label>
              <span>*require</span>
            </div>
            <DatePicker
              selected={dueDate}
              dateFormat="yyyy-MM-dd"
              onChange={(date: any) => setDueDate(date)}
              customInput={<CustomDatePickerInput />}
            />
            <Button
              type="button"
              label="Create Tasks"
              className="btn btn--form"
              onClick={onSubmitHandler}
            />
          </motion.div>
        </FormWarper>
      </div>
    </>
  );
};

export default EmployeeAssignmentUpdate;
