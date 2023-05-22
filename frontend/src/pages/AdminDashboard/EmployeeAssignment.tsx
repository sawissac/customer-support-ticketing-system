import { useEffect, useMemo, useState } from "react";
import Nav from "../../components/Nav";
import { IconCalendarEvent, IconEdit, IconPlus, IconUser } from "@tabler/icons-react";
import Button from "../../components/Button";
import ShowIf from "../../components/Helper";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import axios from "axios";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Oval } from "react-loader-spinner";
import { setRightSidebar, setTaskView } from "../../redux/feature_slice/EmployeeAssignmentSlice";
import EmployeeAssignmentCreate from "./EmployeeAssignmentCreate";
import { motion } from "framer-motion";
import DataTable from "react-data-table-component";
import { Theme } from "../../redux/variable/ThemeVariable";
import Avatar from "react-avatar";
import EmployeeAssignmentUpdate from "./EmployeeAssignmentUpdate";
dayjs.extend(relativeTime);

const EmployeeAssignment = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const taskRedux = useAppSelector((state) => state.tasks);
  const themeRedux = useAppSelector((state) => state.theme);

  const url = "http://127.0.0.1:8000/api/ticket";

  const getUsersData = async () => {
    const res = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
    return res;
  };

  const columns = useMemo(
    () => [
      {
        name: "Ticket Subject",
        selector: (row: any) => row.subject,
        sortable: true,
      },
      {
        name: "Admin Name",
        cell: (row: any) => {
          return (
            <div className="avatar-profile">
              <Avatar
                className={`avatar-profile__circle`}
                name={"hello"}
                color={"#F37021"}
                size="30"
                textSizeRatio={2}
                round
              />
              {"hello"}
            </div>
          );
        },
      },
      {
        name: "Start Date",
        selector: (row: any) => row.tickets_id,
        sortable: true,
      },
      {
        name: "Due Date",
        selector: (row: any) => row.tickets_id,
        sortable: true,
      },
      {
        name: "Tasks",
        selector: (row: any) => "4/5",
        sortable: true,
      },
      {
        name: "Status",
        selector: (row: any) => "processing",
        sortable: true,
      },
      {
        name: "Employees",
        cell: (row: any) => (
          <button
            title="row update"
            className="btn btn--light btn--icon btn--no-m-bottom text-primary"
            onClick={() => {}}
          >
            <IconUser size={25} />
          </button>
        ),
        button: true,
      },
      {
        name: "Update",
        cell: (row: any) => (
          <button
            title="row update"
            className="btn btn--light btn--icon btn--no-m-bottom text-success"
            onClick={() => {
              dispatch(setRightSidebar({ name: "task-update" }));
            }}
          >
            <IconEdit size={25} />
          </button>
        ),
        button: true,
      },
    ],
    []
  );

  const { data, isFetching } = useQuery(["tasks", taskRedux.url], getUsersData);

  if (isFetching) {
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
  }

  return (
    <>
      <ShowIf
        sif={taskRedux.view === ""}
        show={
          <div className="admin-container">
            <Nav
              icon={<IconCalendarEvent />}
              label={"Tasks"}
              rightPlacer={
                <Button
                  label="Create Tasks"
                  icon={<IconPlus size={20} />}
                  className="btn btn--light btn--block btn--no-m-bottom btn--sm"
                  onClick={() => {
                    dispatch(setRightSidebar({ name: "task-create" }));
                  }}
                />
              }
            />
            <motion.div
              initial={{ y: "30px", opacity: 0 }}
              animate={{ y: "0px", opacity: 1 }}
              className="admin-container__inner"
            >
              {/* <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="search"
              /> */}
              <DataTable
                columns={columns}
                data={data.data}
                responsive
                pagination
                theme={`${themeRedux === Theme.Dark ? "table-dark" : ""}`}
              />
            </motion.div>
          </div>
        }
      />
      <ShowIf
        sif={taskRedux.view === "task-create"}
        show={<EmployeeAssignmentCreate />}
      />
      <ShowIf
        sif={taskRedux.rightSideBar === "task-create"}
        show={<EmployeeAssignmentCreate />}
      />
      <ShowIf
        sif={taskRedux.rightSideBar === "task-update"}
        show={<EmployeeAssignmentUpdate />}
      />
    </>
  );
};

export default EmployeeAssignment;
