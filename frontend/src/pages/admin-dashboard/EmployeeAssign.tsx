import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import Nav from "../../components/Nav";
import {
  IconArrowLeft,
  IconCircleHalf2,
  IconCircleMinus,
  IconEdit,
} from "@tabler/icons-react";
import { IconTrashFilled } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useQuery } from "react-query";
import axios from "axios";
import Button from "../../components/Button";
import { IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Avatar from "react-avatar";
import { Theme } from "../../redux/variable/ThemeVariable";
import { Oval } from "react-loader-spinner";
import {
  setEmployeeAssignUpdate,
  setRightSidebar,
  setTaskView,
  updateEmployeeAssignUrl,
  updateTaskUrl,
} from "../../redux/feature_slice/EmployeeAssignmentSlice";
import ShowIf from "../../components/Helper";
import EmployeeAssignCreate from "./EmployeeAssignCreate";
import EmployeeAssignUpdate from "./EmployeeAssignUpdate";
import {
  deleteEmployeeAssignUser,
  updateEmployeeAssign,
} from "../../requests/employeeAssignRequest";
import { IconCircleFilled } from "@tabler/icons-react";
import { compareDate, textLimiter } from "../../commonFunction/common";
import { Alert } from "../../redux/variable/AlertVariable";
import { setAlert } from "../../redux/feature_slice/AlertSlice";

const EmployeeAssign = () => {
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const themeRedux = useAppSelector((state) => state.theme);
  const taskRedux = useAppSelector((state) => state.tasks);
  const [dataList, setDataList] = useState([]);
  const [statusClose, setStatusClose] = useState({});
  const columns = useMemo(
    () => [
      {
        name: "Task",
        selector: (row: any) => row.task_name,
        sortable: true,
        width: "300px",
      },
      {
        name: "Employee",
        cell: (row: any) => {
          return (
            <div className="avatar-profile">
              <Avatar
                className={`avatar-profile__circle`}
                name={row.employee.name}
                color={"#F37021"}
                size="35"
                textSizeRatio={1.75}
                round
              />
              {row.employee.name}#{row.employee.id}
            </div>
          );
        },
        width: "250px",
      },
      {
        name: "Start Date",
        selector: (row: any) => {
          return compareDate(row.start_date, row.end_date)
            ? "--"
            : row.start_date;
        },
        sortable: true,
        width: "200px",
      },
      {
        name: "Due Date",
        selector: (row: any) => {
          return compareDate(row.start_date, row.end_date)
            ? "--"
            : row.end_date;
        },
        sortable: true,
        width: "200px",
      },
      {
        name: "Status",
        cell: (row: any) => {
          const color =
            row.status === "open"
              ? "badge--open"
              : row.status === "processing"
              ? "badge--processing"
              : row.status === "done"
              ? "badge--done"
              : "";
          return <div className={`badge ${color}`}>{row.status}</div>;
        },
        sortable: true,
        width: "200px",
      },
      {
        name: "Status Action",
        cell: (row: any) => {
          return (
            <div className="status-btn-group">
              <Button
                icon={<IconCircleMinus />}
                label=""
                title="still open"
                onClick={() => {
                  updateEmployeeAssign({
                    ...row,
                    status: "open",
                    token: AuthRedux.token,
                  });
                  dispatch(
                    updateEmployeeAssignUrl({ name: `updated: ${Date()}` })
                  );
                }}
                className={
                  row.status === "open" ? "status-btn-group--active" : ""
                }
              />
              <Button
                icon={<IconCircleHalf2 />}
                label=""
                title="processing"
                onClick={() => {
                  updateEmployeeAssign({
                    ...row,
                    status: "processing",
                    token: AuthRedux.token,
                  });
                  dispatch(
                    updateEmployeeAssignUrl({ name: `updated: ${Date()}` })
                  );
                }}
                className={
                  row.status === "processing" ? "status-btn-group--active" : ""
                }
              />
              <Button
                icon={<IconCircleFilled />}
                label=""
                title="done"
                onClick={() => {
                  updateEmployeeAssign({
                    ...row,
                    status: "done",
                    token: AuthRedux.token,
                  });
                  dispatch(
                    updateEmployeeAssignUrl({ name: `updated: ${Date()}` })
                  );
                }}
                className={
                  row.status === "done" ? "status-btn-group--active" : ""
                }
              />
            </div>
          );
        },
        width: "200px",
      },
      {
        name: "Update",
        cell: (row: any) => (
          <button
            title="Update"
            className="btn btn--light btn--icon btn--no-m-bottom text-success"
            onClick={() => {
              dispatch(
                setEmployeeAssignUpdate({
                  task: row.task_name,
                  assignId: row.id,
                  startDate: row.start_date,
                  dueDate: row.end_date,
                  employee: row.employee.name,
                  employeeId: row.employee.id,
                  status: row.status,
                })
              );
              dispatch(setRightSidebar({ name: "employee-assign-update" }));
            }}
          >
            <IconEdit size={25} />
          </button>
        ),
        button: true,
      },
      {
        name: "Delete",
        cell: (row: any) => (
          <button
            title="Delete"
            className="btn btn--light btn--icon btn--no-m-bottom text-danger"
            onClick={() => {
              deleteEmployeeAssignUser({ id: row.id, token: AuthRedux.token })
                .then(() => {
                  dispatch(
                    updateEmployeeAssignUrl({ name: `update: ${Date()}` })
                  );
                  dispatch(
                    setAlert({
                      message: "Customer Deleted successful",
                      state: Alert.Success,
                    })
                  );
                })
                .catch(() => {
                  dispatch(
                    setAlert({
                      message: "Fail to delete customer!",
                      state: Alert.Warning,
                    })
                  );
                });
            }}
          >
            <IconTrashFilled />
          </button>
        ),
        button: true,
      },
    ],
    []
  );

  const url = `http://127.0.0.1:8000/api/assign-ticket-list/${taskRedux.ticketId}`;

  const getAssignTicketData = async () => {
    const res = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${AuthRedux.token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
    return res;
  };
  const { data: assignTicket, isFetching: assignTicketFetch } = useQuery(
    ["employee-assign", taskRedux.employeeUrl],
    getAssignTicketData
  );

  const getTicketData = async () => {
    const res = await axios
      .get("http://127.0.0.1:8000/api/ticket", {
        headers: {
          Authorization: `Bearer ${AuthRedux.token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
    return res;
  };
  const { data: Ticket, isFetching: TicketFetch } = useQuery(
    ["ticket", "get"],
    getTicketData
  );

  React.useEffect(() => {
    if (assignTicket) {
      setDataList(assignTicket.data);
    }
  }, [taskRedux.ticketId, assignTicket]);

  React.useEffect(() => {
    if (Ticket) {
      const closeStatus = Ticket.data
        .filter((i: any) => taskRedux.ticketId === i.id)
        .map((i: any) => i.status);
      setStatusClose(closeStatus.join(", "));
    }
  }, [taskRedux.ticketId, Ticket]);

  if (assignTicketFetch || TicketFetch)
    return (
      <div className="fetching">
        <Oval
          height={50}
          width={50}
          color="#F37021"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#c97b4b"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
    
  return (
    <>
      <div className="admin-container">
        <Nav
          icon={<IconArrowLeft size={25} />}
          label={textLimiter(20, taskRedux.subject)}
          onClick={() => {
            dispatch(setTaskView({ name: "" }));
            dispatch(updateTaskUrl({ name: `updated: ${Date()}` }));
          }}
          rightPlacer={
            <Button
              disabled={statusClose === "close" || statusClose === "confirm"}
              label={
                statusClose === "close" || statusClose === "confirm"
                  ? "Can't Assign Employee"
                  : "Assign Employee"
              }
              icon={<IconPlus size={20} />}
              className={
                statusClose === "close" || statusClose === "confirm"
                  ? "btn btn--light btn--block btn--no-m-bottom btn--sm btn--disable"
                  : "btn btn--light btn--block btn--no-m-bottom btn--sm"
              }
              onClick={() => {
                dispatch(setRightSidebar({ name: "employee-assign-create" }));
              }}
            />
          }
        />
        <motion.div
          initial={{ y: "30px", opacity: 0 }}
          animate={{ y: "0px", opacity: 1 }}
          className="admin-container__inner"
        >
          <div className="admin-container__inner">
            <DataTable
              disabled={statusClose === "close" || statusClose === "confirm"}
              columns={columns}
              data={dataList}
              responsive
              pagination
              theme={`${themeRedux === Theme.Dark ? "table-dark" : ""}`}
            />
          </div>
        </motion.div>
      </div>
      <ShowIf
        sif={taskRedux.rightSideBar === "employee-assign-create"}
        show={<EmployeeAssignCreate />}
      />
      <ShowIf
        sif={taskRedux.rightSideBar === "employee-assign-update"}
        show={<EmployeeAssignUpdate />}
      />
    </>
  );
};

export default EmployeeAssign;
