import React, {
  useCallback,
  useMemo,
  useState,
} from "react";
import DataTable from "react-data-table-component";
import Nav from "../../components/Nav";
import {
  IconEdit,
  IconUsers,
} from "@tabler/icons-react";
import RouteSetter from "./RouteSetter";
import { NavLink, useNavigate } from "react-router-dom";
import { IconTrashFilled } from "@tabler/icons-react";

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

const Users = () => {
  const navigate = useNavigate();
  
  const columns = useMemo(
    () => [
      {
        name: "ID",
        selector: (row: any) => row.id,
        sortable: true,
      },
      {
        name: "Name",
        selector: (row: any) => row.title,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row: any) => row.email,
        sortable: true,
      },
      {
        name: "Role",
        selector: (row: any) => row.role,
        sortable: true,
      },
      {
        name: "Update",
        cell: (row: any) => (
          <button
            title="row update"
            className="btn btn--light btn--icon btn--no-m-bottom text-info"
            onClick={()=>{
              navigate('/admin-dashboard/user-update')
            }}
          >
            <IconEdit size={25} />
          </button>
        ),
        button: true
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
        button: true
      },
    ],
    []
  );
  return (
    <div className="admin-container">
      <RouteSetter routeName="/admin-dashboard/users" />
      <Nav
        icon={<IconUsers />}
        label={"Tickets"}
        rightPlacer={
          <NavLink
            to={"/admin-dashboard/user-create"}
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

export default Users;
