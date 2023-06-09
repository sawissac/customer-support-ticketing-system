import { useEffect, useMemo, useState } from "react";
import Nav from "../../components/Nav";
import {
  IconCalendarEvent,
  IconEdit,
  IconFolderPause,
  IconPlus,
  IconSettingsCheck,
  IconUser,
} from "@tabler/icons-react";
import Button from "../../components/Button";
import ShowIf from "../../components/Helper";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import axios from "axios";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Oval } from "react-loader-spinner";
import {
  setRightSidebar,
  setTaskUpdate,
  setTaskView,
  updateTaskUrl,
} from "../../redux/feature_slice/EmployeeAssignmentSlice";
import TaskCreate from "./TaskCreate";
import { motion } from "framer-motion";
import DataTable from "react-data-table-component";
import { Theme } from "../../redux/variable/ThemeVariable";
import Avatar from "react-avatar";
import TaskUpdate from "./TaskUpdate";
import EmployeeAssign from "./EmployeeAssign";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { updateTicket } from "../../requests/ticketRequest";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import Input from "../../components/Input";
import { debounce } from "debounce";
import {
  TicketListApiResponse,
  TicketListProps,
} from "../../responseInterface/TicketListApiResponse";
import ProgressBar from "@ramonak/react-progress-bar";

dayjs.extend(relativeTime);

const Task = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const taskRedux = useAppSelector((state) => state.tasks);
  const themeRedux = useAppSelector((state) => state.theme);
  const [modelOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState<TicketListProps[]>([]);
  const [filteredData, setFilteredData] = useState<TicketListProps[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [processType, setProcessType] = useState<any>({
    name: "",
    data: {},
    status: false,
    description: "",
  });

  const url = "http://127.0.0.1:8000/api/ticket";
  const getTicketData = async () => {
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

  function compareDate(first: any, second: any) {
    return dayjs(first).isSame(dayjs(second));
  }

  const columns = useMemo(
    () => [
      {
        name: "Ticket Subject",
        selector: (row: any) => row.subject,
        sortable: true,
        width: "300px",
      },
      {
        name: "Ticket ID",
        selector: (row: any) => row.tickets_id,
        sortable: true,
        width: "150px",
      },
      {
        name: "Admin Name",
        cell: (row: any) => {
          return (
            <div className="avatar-profile">
              <Avatar
                className={`avatar-profile__circle`}
                name={row.admin.name}
                color={"#F37021"}
                size="30"
                textSizeRatio={2}
                round
              />
              {row.admin.name}
            </div>
          );
        },
        width: "150px",
      },
      {
        name: "Start Date",
        selector: (row: any) => {
          return compareDate(row.start_date, row.end_date)
            ? "--"
            : row.start_date;
        },
        sortable: true,
        width: "150px",
      },
      {
        name: "Due Date",
        selector: (row: any) => {
          return compareDate(row.start_date, row.end_date)
            ? "--"
            : row.end_date;
        },
        sortable: true,
        width: "150px",
      },
      {
        name: "Tasks Done",
        selector: (row: any) => {
          const total = row.employee_assign.length;
          let calculated = row.employee_assign.filter((employee: any) => {
            if (employee.status === "done") {
              return true;
            }
          });
          calculated = (calculated.length / total) * 100;

          return (
            <ProgressBar
              completed={total === 0 ? 0 : Math.round(calculated)}
              bgColor="#F37021"
              height="18px"
              animateOnRender={true}
              labelAlignment="outside"
              className="progress-wrapper"
              barContainerClassName={`${
                themeRedux === Theme.Dark
                  ? "progress-container progress-container--dark"
                  : "progress-container"
              }`}
              labelClassName={`${
                themeRedux === Theme.Dark
                  ? "progress-label progress-container--dark"
                  : "progress-label"
              }`}
            />
          );
        },
        sortable: true,
        width: "200px",
      },
      {
        name: "Status",
        cell: (row: any) => {
          const badgeColor =
            row.status === "open"
              ? "badge--open"
              : row.status === "close"
              ? "badge--close"
              : row.status === "processing"
              ? "badge--processing"
              : row.status === "fixed"
              ? "badge--fixed"
              : "badge--confirm";
          return <div className={`badge ${badgeColor}`}>{row.status}</div>;
        },
        sortable: true,
        width: "150px",
      },
      {
        name: "Employees",
        cell: (row: any) => (
          <button
            title="Assign Employee"
            className="btn btn--light btn--icon btn--no-m-bottom text-primary"
            onClick={() => {
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
            }}
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
            title="Update"
            className={
              row.status === "close" || row.status === "confirm"
                ? "btn btn--light btn--icon btn--no-m-bottom text-success btn--disable"
                : "btn btn--light btn--icon btn--no-m-bottom text-success"
            }
            disabled={row.status === "close" || row.status === "confirm"}
            onClick={() => {
              dispatch(
                setTaskUpdate({
                  projectId: row.customer_project.project_id,
                  ticketId: row.id,
                  startDate: row.start_date,
                  dueDate: row.end_date,
                  subject: row.subject,
                })
              );
              dispatch(setRightSidebar({ name: "task-update" }));
            }}
          >
            <IconEdit size={25} />
          </button>
        ),
        button: true,
      },
      {
        name: "Fix",
        cell: (row: any) => (
          <button
            title="Fix"
            className={
              row.status === "close" || row.status === "confirm"
                ? "btn btn--light btn--icon btn--no-m-bottom btn--disable"
                : "btn btn--light btn--icon btn--no-m-bottom"
            }
            disabled={row.status === "close" || row.status === "confirm"}
            onClick={() => {
              const total = row.employee_assign.length;
              let calculated = row.employee_assign.filter((employee: any) => {
                if (employee.status === "done") {
                  return true;
                }
              });
              calculated = (calculated.length / total) * 100;

              setModalOpen(true);

              if (calculated !== 100) {
                setProcessType({
                  name: "fix",
                  data: {},
                  description:
                    "Can't change status due to task progress state don't match requirement",
                  status: false,
                });
              } else {
                setProcessType({
                  name: "fix",
                  data: row,
                  description:
                    "Your Task Progress has been reached 100%. Do you want to change to Fix status.",
                  status: true,
                });
              }
            }}
          >
            <IconSettingsCheck size={25} />
          </button>
        ),
        button: true,
      },
      {
        name: "Close",
        cell: (row: any) => (
          <button
            title="Close"
            className={
              row.status === "close"
                ? "btn btn--light btn--icon btn--no-m-bottom btn--disable"
                : "btn btn--light btn--icon btn--no-m-bottom"
            }
            disabled={row.status === "close"}
            onClick={() => {
              setModalOpen(true);

              if (row.status !== "confirm") {
                setProcessType({
                  name: "close",
                  data: {},
                  description:
                    "The Customer hasn't confirm his or her app bug fixed, please wait until the customer change the status to complete",
                  status: false,
                });
              }
              if (row.status === "confirm") {
                setProcessType({
                  name: "close",
                  data: row,
                  description:
                    "The customer has satisfy with the bug fix, are you sure want to close the ticket ",
                  status: true,
                });
              }
              if (row.status === "processing" && row.employee_assign.length===0) {
                setProcessType({
                  name: "close",
                  data: row,
                  description: "Do you want to close sure?",
                  status: true,
                });
              }
            }}
          >
            <IconFolderPause size={25} />
          </button>
        ),
        button: true,
      },
    ],
    []
  );

  const { data, isFetching } = useQuery<TicketListApiResponse>(
    ["tasks", taskRedux.url],
    getTicketData
  );

  useEffect(() => {
    if (data) {
      const dataResponse = data;
      const filterData = dataResponse.data.filter((i) => {
        if (i.admin_id && i.status !== "close") {
          return true;
        }
      });

      const closeFilterData = dataResponse.data.filter((i) => {
        if (i.admin_id && i.status === "close") {
          return true;
        }
      });

      setTableData([...filterData, ...closeFilterData]);
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

  const debouncedSearch = debounce((value: any) => {
    const filtered = tableData.filter((item: any) => {
      if (item.tickets_id.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (item.status.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
    });
    setFilteredData(filtered);
  }, 1000);

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };
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
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                className="search"
              />
              <DataTable
                columns={columns}
                data={searchQuery.length === 0 ? tableData : filteredData}
                responsive
                pagination
                theme={`${themeRedux === Theme.Dark ? "table-dark" : ""}`}
              />
            </motion.div>
          </div>
        }
      />
      <ShowIf sif={taskRedux.view === "task-create"} show={<TaskCreate />} />
      <ShowIf
        sif={taskRedux.view === "task-employee"}
        show={<EmployeeAssign />}
      />
      <ShowIf
        sif={taskRedux.rightSideBar === "task-create"}
        show={<TaskCreate />}
      />
      <ShowIf
        sif={taskRedux.rightSideBar === "task-update"}
        show={<TaskUpdate />}
      />
      <Modal
        onClose={() => {
          setModalOpen(false);
        }}
        center
        open={modelOpen}
        animationDuration={0}
      >
        <div className="modal">
          <div className="modal__title">
            {processType.name === "fix"
              ? "Fix Confirmation"
              : "Close Confirmation"}
          </div>
          <div className="modal__desc">{processType.description}</div>
          {processType.status &&
            (processType.name === "fix" || processType.name === "close") && (
              <Button
                className="btn btn--primary btn--no-m-bottom"
                label={
                  processType.name === "fix"
                    ? "Change to Fixed Status"
                    : processType.name === "close"
                    ? "Change to close status"
                    : ""
                }
                onClick={() => {
                  updateTicket({
                    ...processType.data,
                    ticketId: processType.data.id,
                    status: processType.name === "fix" ? "fixed" : "close",
                    token: authRedux.token,
                  }).then(() => {
                    dispatch(
                      setAlert({
                        message: "Status Change Successfully",
                        state: Alert.Success,
                      })
                    );
                    dispatch(updateTaskUrl({ name: `updated: ${Date()}` }));
                    setModalOpen(false);
                  });
                }}
              />
            )}
        </div>
      </Modal>
    </>
  );
};

export default Task;
