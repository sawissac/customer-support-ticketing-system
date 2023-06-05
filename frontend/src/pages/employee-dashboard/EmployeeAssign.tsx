import React, { useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import Nav from "../../components/Nav";
import { IconArrowLeft } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useQuery } from "react-query";
import { motion } from "framer-motion";
import { Theme } from "../../redux/variable/ThemeVariable";
import { Oval } from "react-loader-spinner";
import {
  setTaskView,
  updateEmployeeAssignUrl,
  updateTaskUrl,
} from "../../redux/feature_slice/EmployeeAssignmentSlice";
import { updateEmployeeAssign } from "../../requests/employeeAssignRequest";
import { requestAxiosWithToken } from "../../routes/request";
import { EmployeeAssignTableConfig } from "./EmployeeAssignTableConfig";
import {
  AssignTicketListApiResponse,
  AssignTicketListEmployeeAssignProps,
} from "../../responseInterface/AssignTicketListApiResponse";

const EmployeeAssign = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const themeRedux = useAppSelector((state) => state.theme);
  const taskRedux = useAppSelector((state) => state.tasks);
  const [currentData, setCurrentData] = useState<
    AssignTicketListEmployeeAssignProps[]
  >([]);
  const [statusClose, setStatusClose] = useState<any>();

  const openClickHandler = (row: any) => {
    updateEmployeeAssign({
      ...row,
      status: "open",
      token: authRedux.token,
    });
    dispatch(updateEmployeeAssignUrl({ name: `updated: ${Date()}` }));
  };

  const processingClickHandler = (row: any) => {
    updateEmployeeAssign({
      ...row,
      status: "processing",
      token: authRedux.token,
    });
    dispatch(updateEmployeeAssignUrl({ name: `updated: ${Date()}` }));
  };

  const doneClickHandler = (row: AssignTicketListEmployeeAssignProps) => {
    updateEmployeeAssign({
      ...row,
      status: "done",
      token: authRedux.token,
    });
    dispatch(updateEmployeeAssignUrl({ name: `updated: ${Date()}` }));
  };

  const columns = useMemo(
    () =>
      EmployeeAssignTableConfig(
        openClickHandler,
        processingClickHandler,
        doneClickHandler,
        authRedux.user.id
      ),
    []
  );

  const url = `http://127.0.0.1:8000/api/assign-ticket-list/${taskRedux.ticketId}`;

  const { data: assignData, isFetching: assignDataFetch } =
    useQuery<AssignTicketListApiResponse>(
      ["employee-dashboard-assign", taskRedux.employeeUrl],
      requestAxiosWithToken(url, authRedux.token)
    );

  const ticketurl = `http://127.0.0.1:8000/api/ticket/${taskRedux.ticketId}`;
  const { data: ticketData, isFetching: ticketDataFetch } = useQuery(
    ["ticket-data", "get"],
    requestAxiosWithToken(ticketurl, authRedux.token)
  );

  React.useEffect(() => {
    if (assignData && ticketData) {
      const assignDataResponse = assignData;
      const filteredEmployee = assignDataResponse.data.filter((employee) => {
        return employee.employee_id === authRedux.user.id;
      });
      setCurrentData(filteredEmployee);

      const ticketDataResponse = ticketData;
      setStatusClose(ticketDataResponse.data.status);
    }
  }, [assignData, ticketData]);

  if (assignDataFetch || ticketDataFetch)
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
  console.log(statusClose);

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
        />
        <motion.div
          initial={{ y: "30px", opacity: 0 }}
          animate={{ y: "0px", opacity: 1 }}
          className="admin-container__inner"
        >
          <div className="admin-container__inner">
            <DataTable
              columns={columns}
              data={currentData}
              disabled={statusClose === "close" || statusClose === "confirm"}
              responsive
              pagination
              theme={`${themeRedux === Theme.Dark ? "table-dark" : ""}`}
            />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default EmployeeAssign;
