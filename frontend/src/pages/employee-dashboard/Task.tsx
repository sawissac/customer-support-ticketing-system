import { useEffect, useMemo, useState } from "react";
import Nav from "../../components/Nav";
import { motion } from "framer-motion";
import { IconCalendarEvent} from "@tabler/icons-react";
import ShowIf from "../../components/Helper";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Oval } from "react-loader-spinner";
import {
  setRightSidebar,
  setTaskUpdate,
  setTaskView,
} from "../../redux/feature_slice/EmployeeAssignmentSlice";
import DataTable from "react-data-table-component";
import { Theme } from "../../redux/variable/ThemeVariable";
import "react-responsive-modal/styles.css";
import { requestAxiosWithToken } from "../../routes/request";
import {
  AssignEmployeeListApiResponse,
  AssignEmployeeListTicketProps,
} from "../../responseInterface/AssignEmployeeListApiResponse";
import { TaskTableConfig } from "./TaskTableConfig";
import EmployeeAssign from "./EmployeeAssign";

dayjs.extend(relativeTime);

const Task = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const taskRedux = useAppSelector((state) => state.tasks);
  const themeRedux = useAppSelector((state) => state.theme);
  const [currentData, setCurrentData] = useState<AssignEmployeeListTicketProps[]>([]);
  
  const url = `http://127.0.0.1:8000/api/assign-employee-list/${authRedux.user.id}`;

  function employeeClickHandler(row: AssignEmployeeListTicketProps) {
    dispatch(
      setTaskUpdate({
        projectId: row.customer_project.project_id,
        ticketId: row.id,
        startDate: row.start_date,
        dueDate: row.end_date,
        subject: row.subject,
      })
    );
    dispatch(setTaskView({ name: "task-employee" }));
    dispatch(setRightSidebar({ name: "" }));
  }
  
  const columns = useMemo(() => TaskTableConfig(employeeClickHandler), []);

  const { data, isFetching } = useQuery<AssignEmployeeListApiResponse>(
    ["employee-dashboard-tasks", taskRedux.url],
    requestAxiosWithToken(url, authRedux.token)
  );

  useEffect(() => {
    if (data) {
      const dataResponse = data;
      const temp: number[] = [];
      const filteredTicket = dataResponse.data.reduce<AssignEmployeeListTicketProps[]>(
        (pre, cur) => {
          if (!temp.includes(cur.ticket.id)) {
            temp.push(cur.ticket.id);
            pre.push(cur.ticket);
          }
          return pre;
        },
        []
      );
      setCurrentData(filteredTicket);
    }
  }, [data]);

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
            />
            <motion.div
              initial={{ y: "30px", opacity: 0 }}
              animate={{ y: "0px", opacity: 1 }}
              className="admin-container__inner"
            >
              <DataTable
                columns={columns}
                data={currentData}
                responsive
                pagination
                theme={`${themeRedux === Theme.Dark ? "table-dark" : ""}`}
              />
            </motion.div>
          </div>
        }
      />
      <ShowIf sif={taskRedux.view === "task-employee"} show={<EmployeeAssign />} />
    </>
  );
};

export default Task;
