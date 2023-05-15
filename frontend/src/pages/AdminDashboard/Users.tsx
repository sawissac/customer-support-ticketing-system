import React, { useCallback, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import Nav from "../../components/Nav";
import { IconEdit, IconTrashFilled, IconUsers } from "@tabler/icons-react";
import RouteSetter from "./RouteSetter";
import axios from "axios";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";

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
        selector: (row: any) => row.name,
        sortable: true,
      },
      {
        name: "Email",
        selector: (row: any) => row.email,
        sortable: true,
      },
      {
        name: "Role",
        selector: (row: any) => row.id,
        sortable: true,
      },
      {
        name: "Update",
        cell: (row: any) => (
          <button
            title="row update"
            className="btn btn--light btn--icon btn--no-m-bottom text-info"
            onClick={() => {
              navigate("/admin-dashboard/user-update");
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

  const token = "6|rG0SwLeROYrLLbrOWeGoAIZooWBkrAiIVCw02D45";
  const getFacts = async () => {
    const res = await axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data.data;
      });
    console.log(res);
    return res;
  };

  const { data } = useQuery("name", getFacts);

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
        <DataTable columns={columns} data={data} responsive pagination />
      </div>
    </div>
  );
};

export default Users;
