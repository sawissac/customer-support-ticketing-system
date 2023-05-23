import React, { useMemo, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Nav from "../../components/Nav";
import {
  IconArrowLeft,
  IconCalendarCheck,
  IconCalendarEvent,
  IconCalendarStats,
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
import { debounce } from "debounce";
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
import { updateEmployeeAssign } from "../../requests/employeeAssignRequest";
import dayjs from "dayjs";

const EmployeeAssign = () => {
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const themeRedux = useAppSelector((state) => state.theme);
  const taskRedux = useAppSelector((state) => state.tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [dataList, setDataList] = useState([]);

  function compareDate(first: any, second: any) {
    return dayjs(first).isSame(dayjs(second));
  }

  const columns = useMemo(
    () => [
      {
        name: "Task",
        selector: (row: any) => row.task_name,
        sortable: true,
        width: '300px'
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
        width: "250px"
      },
      {
        name: "Start Date",
        selector: (row: any) => {
          return compareDate(row.start_date, row.end_date) ? "--" : row.start_date;
        },
        sortable: true,
        width: "200px"
      },
      {
        name: "Due Date",
        selector: (row: any) => {
          return compareDate(row.start_date, row.end_date) ? "--" : row.end_date;
        },
        sortable: true,
        width: "200px"
      },
      {
        name: "Status",
        // selector: (row: any) => row.status,
        cell: (row: any) => {
          return (
            <div className="status-btn-group">
              <Button
                icon={<IconCalendarEvent />}
                label=""
                onClick={() => {
                  updateEmployeeAssign({
                    ...row,
                    status: "open",
                    token: AuthRedux.token,
                  });
                  dispatch(updateEmployeeAssignUrl({ name: `updated: ${Date()}` }));
                }}
                className={row.status === "open" ? "text-info" : "text-dark"}
              />
              <Button
                icon={<IconCalendarStats />}
                label=""
                onClick={() => {
                  updateEmployeeAssign({
                    ...row,
                    status: "processing",
                    token: AuthRedux.token,
                  });
                  dispatch(updateEmployeeAssignUrl({ name: `updated: ${Date()}` }));
                }}
                className={row.status === "processing" ? "text-info" : "text-dark"}
              />
              <Button
                icon={<IconCalendarCheck />}
                label=""
                onClick={() => {
                  updateEmployeeAssign({
                    ...row,
                    status: "done",
                    token: AuthRedux.token,
                  });
                  dispatch(updateEmployeeAssignUrl({ name: `updated: ${Date()}` }));
                }}
                className={row.status === "done" ? "text-info" : "text-dark"}
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
            title="row update"
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
            title="row delete"
            className="btn btn--light btn--icon btn--no-m-bottom text-danger"
          >
            <IconTrashFilled />
          </button>
        ),
        button: true,
      },
    ],
    []
  );

  const url = `http://127.0.0.1:8000/api/assign-list/${taskRedux.ticketId}`;

  const getUsersData = async () => {
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

  const { error, data, isFetching } = useQuery(
    ["employee-assign", taskRedux.employeeUrl],
    getUsersData
  );

  React.useEffect(() => {
    if (data) {
      setDataList(data.data);
    }
  }, [data]);

  if (isFetching)
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
  if (error) return <p>"An error has occurs"</p>;

  const debouncedSearch = debounce((value: any) => {
    
  }, 1000);

  return (
    <>
      <div className="admin-container">
        <Nav
          icon={<IconArrowLeft size={25} />}
          label={taskRedux.subject}
          onClick={() => {
            dispatch(setTaskView({ name: "" }));
            dispatch(updateTaskUrl({ name: `updated: ${Date()}` }));
          }}
          rightPlacer={
            <Button
              label="Add Employee"
              icon={<IconPlus size={20} />}
              className="btn btn--light btn--block btn--no-m-bottom btn--sm"
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
              columns={columns}
              data={dataList}
              // responsive
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
