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
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import axios from "axios";
import { useQuery } from "react-query";
  
  
  const CustomerProjects = () => {
    const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const AuthRedux = useAppSelector(
    (state) => state.auth
  );

    const columns = useMemo(
      () => [
        {
          name: "ID",
          selector: (row: any) => row.id,
          sortable: true,
        },
        {
          name: "Project Name",
          selector: (row: any) => row.project.name,
          sortable: true,
        },
        {
          name: "Employee Name",
          selector: (row: any) => row.user.name,
          sortable: true,
        },
        {
          name: "Update",
          cell: (row: any) => (
            <button
              title="row update"
              className="btn btn--light btn--icon btn--no-m-bottom text-info"
              onClick={()=>{
                navigate('/admin-dashboard/employee-project-update')
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

    const url = "http://127.0.0.1:8000/api/customer-project";
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

  const { isLoading, error, data, isFetching } =
    useQuery  (["userData", url], getUsersData);

  if (isLoading) return <p>"loading..."</p>;
  if (isFetching) return <p>"fetching"</p>;
  if (error) return <p>"An error has occurs"</p>;

    return (
      <div className="admin-container">
        <RouteSetter routeName="/admin-dashboard/users" />
        <Nav
          icon={<IconUsers />}
          label={"Tickets"}
          rightPlacer={
            <NavLink
              to={"/admin-dashboard/employee-project-create"}
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
    )
  }
  
  export default CustomerProjects