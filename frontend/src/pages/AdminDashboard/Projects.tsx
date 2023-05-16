import React, { useCallback, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import Nav from "../../components/Nav";
import { IconEdit } from "@tabler/icons-react";
import RouteSetter from "./RouteSetter";
import { NavLink, useNavigate } from "react-router-dom";
import { IconTrashFilled } from "@tabler/icons-react";
import axios from "axios";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { IconFolder } from "@tabler/icons-react";
import { setProjectSidebar } from "../../redux/feature_slice/ProjectSidebarSlice";

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    email: "sawissac@gmail.com",
    role: "admin",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
    email: "zayartunjob@gmail.com",
    role: "admin",
  },
];

const Projects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const AuthRedux = useAppSelector((state) => state.auth);
  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row: any) => row.id,
        sortable: true,
      },
      {
        name: "Project ID",
        selector: (row: any) => row.project_id,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row: any) => row.name,
        sortable: true,
      },
      {
        name: "Update",
        cell: (row: any) => (
          <button
            title="row update"
            className="btn btn--light btn--icon btn--no-m-bottom text-info"
            onClick={() => {
              dispatch(
                setProjectSidebar({
                  id: row.id,
                  name: row.name,
                })
              );
              navigate("/admin-dashboard/project-update");
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

  const url = "http://127.0.0.1:8000/api/project";

  const getUsersData = async () => {
    const res = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${AuthRedux.token}`,
        },
      })
      .then((response) => {
        return response.data.data;
      });
    return res;
  };

  const { isLoading, error, data, isFetching } = useQuery(
    ["userData", url],
    getUsersData
  );

  if (isLoading) return <p>"loading..."</p>;
  if (isFetching) return <p>"fetching"</p>;
  if (error) return <p>"An error has occurs"</p>;

  return (
    <div className="admin-container">
      <RouteSetter routeName="/admin-dashboard/project" />
      <Nav
        icon={<IconFolder />}
        label={"Projects"}
        rightPlacer={
          <NavLink
            to={"/admin-dashboard/project-create"}
            className="btn btn--primary btn--block btn--no-m-bottom"
          >
            Create
          </NavLink>
        }
      />
      <div className="admin-container__inner">
        <DataTable
          columns={columns}
          data={data}
          responsive
          pagination
        />
      </div>
    </div>
  );
};

export default Projects;
