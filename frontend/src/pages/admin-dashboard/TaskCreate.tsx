import React, { forwardRef, useState } from "react";
import Nav from "../../components/Nav";
import Button from "../../components/Button";
import FormWarper from "../../components/FormWarper";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { motion } from "framer-motion";
import Dropdown from "../../components/DropDown";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import {
  setRightSidebar,
  updateTaskUrl,
} from "../../redux/feature_slice/EmployeeAssignmentSlice";
import { getAllTicket, getTicket, updateTicket } from "../../requests/ticketRequest";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "../../components/Input";
import { debounce } from "debounce";
import { formatDateTime, textLimiter } from "../../commonFunction/common";
import {
  TicketListApiResponse,
  TicketListProps,
} from "../../responseInterface/TicketListApiResponse";

const TaskCreate = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((s) => s.auth);
  const [startDate, setStartDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [ticketList, setTicketList] = React.useState<TicketListProps[]>([]);
  const [tempTicketList, setTempTicketList] = React.useState<TicketListProps[]>(
    []
  );
  const [filterTicketInput, setFilterTicketInput] = React.useState("");
  const [ticketDropDown, setTicketDropDown] = React.useState({
    name: "Select",
    value: 0,
  });

  const CustomDatePickerInput = forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <button
        className="btn btn--light btn--block btn--no-m-bottom"
        onClick={onClick}
        ref={ref}
      >
        {value}
      </button>
    )
  );

  function onSubmitHandler() {
    const isEmpty = ticketDropDown.value === 0;

    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      getTicket({
        id: ticketDropDown.value,
        token: authRedux.token,
      }).then((res: any) => {
        updateTicket({
          ...res.data,
          ticketId: res.data.id,
          admin_id: authRedux.user.id,
          status: "processing",
          start_date: formatDateTime(startDate),
          end_date: formatDateTime(dueDate),
          token: authRedux.token,
        })
        .then(() => {
            dispatch(setRightSidebar({ name: "" }));
            dispatch(
              setAlert({
                message: "Task Created Successfully",
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
              message: "Fail to create task...",
              state: Alert.Warning,
            });
          });
      });
    }
  }

  React.useState(() => {
    getAllTicket({ token: authRedux.token }).then((res: any) => {
      const dataResponse: TicketListApiResponse = res;
      const filteredData = dataResponse.data.filter((ticket: any) => {
        if (!ticket.admin_id) {
          return true;
        }
      });
      setTicketList(filteredData);
      setTempTicketList(filteredData);
    });
  });

  function handleCustomerSearch(ev: React.ChangeEvent<HTMLInputElement>) {
    setFilterTicketInput(ev.target.value);
    debouncedTicketSearch(ev.target.value);
  }

  const debouncedTicketSearch = debounce((value: string) => {
    const filteredTicket = tempTicketList.filter((ticket) => {
      if (ticket.subject.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (ticket.tickets_id.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    });

    if (filteredTicket.length > 0) {
      setTicketList(filteredTicket);
    }
    if (filteredTicket.length === 0) {
      setTicketList(tempTicketList);
    }
  }, 1000);
  return (
    <>
      <div className="admin-container admin-container--no-flex-grow admin-container--form">
        <Nav.BackButton
          label="Task Create"
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
              <label>Tickets</label>
              <span>*require</span>
            </div>
            <Dropdown
              placement="bottom"
              buttonClassName="form-dropdown-btn"
              offset={[0, 0]}
              buttonChildren={<>{ticketDropDown.name}</>}
              dropdownClassName="form-dropdown"
              width="350px"
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
                      placeholder="[ticket subject] #ticket-id"
                      value={filterTicketInput}
                      onChange={handleCustomerSearch}
                    />
                  </div>
                  <div className="form-dropdown__scroll form-dropdown__scroll--height">
                    {ticketList.map((ticket, index: number) => {
                      return (
                        <Button
                          key={index}
                          type="button"
                          title={ticket.subject + " #" + ticket.tickets_id}
                          onClick={() => {
                            setTicketDropDown({
                              name:
                                textLimiter(10, ticket.subject) +
                                " #" +
                                ticket.tickets_id,
                              value: ticket.id,
                            });
                          }}
                          label={
                            textLimiter(10, ticket.subject) +
                            " #" +
                            ticket.tickets_id
                          }
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

export default TaskCreate;
