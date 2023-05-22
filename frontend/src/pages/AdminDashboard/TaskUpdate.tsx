import React,{ forwardRef, useState } from "react";
import Nav from "../../components/Nav";
import Button from "../../components/Button";
import FormWarper from "../../components/FormWarper";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { motion } from "framer-motion";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { setRightSidebar, updateTaskUrl } from "../../redux/feature_slice/EmployeeAssignmentSlice";
import { getTicket, updateTicket } from "../../requests/ticketRequest";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";

const TaskUpdate = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((s) => s.auth);
  const taskRedux = useAppSelector((s) => s.tasks);
  const [startDate, setStartDate] = useState(new Date(taskRedux.startDate));
  const [dueDate, setDueDate] = useState(new Date(taskRedux.dueDate));

  React.useEffect(()=>{
    setStartDate(new Date(taskRedux.startDate));
    setDueDate(new Date(taskRedux.dueDate));
  },[taskRedux.startDate, taskRedux.dueDate])

  const CustomDatePickerInput = forwardRef(({ value, onClick }: any, ref: any) => (
    <button
      className="btn btn--light btn--block btn--no-m-bottom"
      onClick={onClick}
      ref={ref}
    >
      {value}
    </button>
  ));

  const formatDateTime = (date: any) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
  };

  function onSubmitHandler() {
    getTicket({
      id: taskRedux.ticketId,
      token: authRedux.token,
    }).then((res: any) => {
      updateTicket({
        ...res.data,
        ticketId: taskRedux.ticketId,
        admin_id: authRedux.user.id,
        status: "processing",
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
            updateTaskUrl({
              name: `updated:${Date()}`,
            })
          );
        })
        .catch(() => {
          setAlert({
            message: "Fail to create...",
            state: Alert.Warning,
          });
        });
    });
  }

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
              label="Update Tasks"
              className="btn btn--form"
              onClick={onSubmitHandler}
            />
          </motion.div>
        </FormWarper>
      </div>
    </>
  );
};

export default TaskUpdate;
