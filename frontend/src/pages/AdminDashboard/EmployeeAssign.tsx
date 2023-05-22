import React, { useMemo, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Nav from "../../components/Nav";
import { IconArrowLeft, IconEdit, IconMenuOrder } from "@tabler/icons-react";
import { IconTrashFilled } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useQuery } from "react-query";
import axios from "axios";
import Button from "../../components/Button";
import { IconPlus } from "@tabler/icons-react";
import {
  openProjectRightSidebar,
  setProjectEmployee,
} from "../../redux/feature_slice/ProjectPageSlice";
import { motion } from "framer-motion";
import Avatar from "react-avatar";
import { Theme } from "../../redux/variable/ThemeVariable";
import { Oval } from "react-loader-spinner";
import { debounce } from "debounce";
import Input from "../../components/Input";
import { setRightSidebar, setTaskView } from "../../redux/feature_slice/EmployeeAssignmentSlice";
import ShowIf from "../../components/Helper";
import EmployeeAssignCreate from "./EmployeeAssignCreate";
import { getAllEmployee } from "../../requests/userRequest";

createTheme(
  "table-dark",
  {
    text: {
      primary: "white",
      secondary: "white",
    },
    background: {
      default: "#313338",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "white",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const EmployeeAssign = () => {
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const projectPageRedux = useAppSelector((state) => state.projectSidebar);
  const themeRedux = useAppSelector((state) => state.theme);
  const taskRedux = useAppSelector((state) => state.tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  
  const columns = useMemo(
    () => [
      {
        name: "Employee",
        cell: (row: any) => {
          return (
            <div className="avatar-profile">
              <Avatar
                className={`avatar-profile__circle`}
                name={row.user.name}
                color={"#F37021"}
                size="35"
                textSizeRatio={1.75}
                round
              />
              {row.user.name}#{row.user.id}
            </div>
          );
        },
      },
      {
        name: "Update",
        cell: (row: any) => (
          <button
            title="row update"
            className="btn btn--light btn--icon btn--no-m-bottom text-success"
            onClick={() => {
              dispatch(
                setProjectEmployee({
                  id: row.id,
                  employee_id: row.user.id,
                  employee_name: row.user.name,
                })
              );
              dispatch(openProjectRightSidebar({ name: "employee-update" }));
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
    ["employee-assign", projectPageRedux.employeeUrlState],
    getUsersData
  );

  React.useEffect(() => {
    if (data) {
      console.log(data);
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
    const filtered = data.filter((item: any) => {
      return item.user.name.toLowerCase().includes(value.toLowerCase());
    });
    setFilteredData(filtered);
  }, 1000);

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  return (
    <>
      <div className="admin-container">
        <Nav
          icon={<IconArrowLeft size={25} />}
          label={projectPageRedux.project_name}
          onClick={() => {
            dispatch(setTaskView({ name: "" }));
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
            <Input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="search"
            />
            
            <DataTable
              columns={columns}
              data={[]}
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
      {/* <ShowIf
        sif={projectPageRedux.rightSidebar === "employee-update"}
        show={<EmployeeProjectsUpdate />}
      /> */}
    </>
  );
};

export default EmployeeAssign;
