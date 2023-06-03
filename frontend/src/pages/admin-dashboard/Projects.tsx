import { useMemo, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Nav from "../../components/Nav";
import {
  IconEdit,
  IconListDetails,
  IconPlus,
  IconUser,
} from "@tabler/icons-react";
import axios from "axios";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IconFolder } from "@tabler/icons-react";
import { Theme } from "../../redux/variable/ThemeVariable";
import {
  openProjectRightSidebar,
  setProjectState,
  setProjectView,
} from "../../redux/feature_slice/ProjectPageSlice";
import Button from "../../components/Button";
import { motion } from "framer-motion";
import ProjectCreate from "./ProjectsCreate";
import ShowIf from "../../components/Helper";
import EmployeeProjects from "./EmployeeProjects";
import CustomerProjects from "./CustomerProjects";
import ProjectUpdate from "./ProjectsUpdate";
import { Oval } from "react-loader-spinner";
import { debounce } from "debounce";
import Input from "../../components/Input";
import { ProjectView } from "./ProjectView";



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

const Projects = () => {
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const themeRedux = useAppSelector((state) => state.theme);
  const projectPageRedux = useAppSelector((state) => state.projectSidebar);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const columns = useMemo(
    () => [
      {
        name: "Name",
        cell: (row: any) => (
          <div className="avatar-profile">
            <div className={`avatar-profile__circle`}>
              <IconFolder size={20} />
            </div>
            {row.name}
          </div>
        ),
        sortable: true,
      },
      {
        name: "Project ID",
        selector: (row: any) => row.project_id,
        sortable: true,
      },
      {
        name: "Customers",
        cell: (row: any) => (
          <button
            title="Customers"
            className="btn btn--light btn--icon btn--no-m-bottom text-info"
            onClick={() => {
              dispatch(
                setProjectState({
                  project_id: row.id,
                  project_name: row.name,
                })
              );
              dispatch(openProjectRightSidebar({ name: "" }));
              dispatch(setProjectView({ name: "customer-view" }));
            }}
          >
            <IconUser size={25} />
          </button>
        ),
        button: true,
      },
      {
        name: "Employees",
        cell: (row: any) => (
          <button
            title="Employees"
            className="btn btn--light btn--icon btn--no-m-bottom text-primary"
            onClick={() => {
              dispatch(
                setProjectState({
                  project_id: row.id,
                  project_name: row.name,
                })
              );
              dispatch(openProjectRightSidebar({ name: "" }));
              dispatch(setProjectView({ name: "employee-view" }));
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
            title="Project Update"
            className="btn btn--light btn--icon btn--no-m-bottom text-success"
            onClick={() => {
              dispatch(
                setProjectState({
                  project_id: row.id,
                  project_name: row.name,
                })
              );
              dispatch(openProjectRightSidebar({ name: "project-update" }));
            }}
          >
            <IconEdit size={25} />
          </button>
        ),
        button: true,
      },
      {
        name: "Detail",
        cell: (row: any) => (
          <button
            title="Project Detail"
            className="btn btn--light btn--icon btn--no-m-bottom text-danger"
            onClick={() => {
              dispatch(
                setProjectState({
                  project_id: row.id,
                  project_name: row.name,
                })
              );
              dispatch(setProjectView({ name: "project-view" }));
            }}
          >
            <IconListDetails size={25} />
          </button>
        ),
        button: true,
      },
    ],
    []
  );

  const url = "http://127.0.0.1:8000/api/project";

  const getUsersData = async () => {
    const res = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${AuthRedux.token}`,
        },
      })
      .then((response) => {
        return response.data.data.reverse();
      });
    return res;
  };

  const { isFetching, data } = useQuery(
    ["project", projectPageRedux.projectURLState],
    getUsersData
  );

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

  const debouncedSearch = debounce((value: any) => {
    const filtered = data.filter((item: any) => {
      if (item.name.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (item.project_id.toLowerCase().includes(value.toLowerCase())) {
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
        sif={projectPageRedux.view === ""}
        show={
          <div className="admin-container">
            <Nav
              icon={<IconFolder />}
              label={"Project"}
              rightPlacer={
                <Button
                  label="Add Project"
                  icon={<IconPlus size={20} />}
                  className="btn btn--light btn--block btn--no-m-bottom btn--sm"
                  onClick={() => {
                    dispatch(
                      openProjectRightSidebar({ name: "project-create" })
                    );
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
                data={
                  filteredData.length === 0 && searchQuery !== ""
                    ? []
                    : filteredData.length === 0
                    ? data
                    : filteredData
                }
                responsive
                pagination
                theme={`${themeRedux === Theme.Dark ? "table-dark" : ""}`}
              />
            </motion.div>
          </div>
        }
      />
      <ShowIf
        sif={projectPageRedux.view === "employee-view"}
        show={<EmployeeProjects />}
      />
      <ShowIf
        sif={projectPageRedux.view === "customer-view"}
        show={<CustomerProjects />}
      />
      <ShowIf
        sif={projectPageRedux.view === "project-view"}
        show={<ProjectView />}
      />
      <ShowIf
        sif={projectPageRedux.rightSidebar === "project-create"}
        show={<ProjectCreate />}
      />
      <ShowIf
        sif={projectPageRedux.rightSidebar === "project-update"}
        show={<ProjectUpdate />}
      />
    </>
  );
};

export default Projects;
