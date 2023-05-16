import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import Nav from "../../components/Nav";
import {
  IconEdit,
  IconTrashFilled,
  IconUsers,
} from "@tabler/icons-react";
import RouteSetter from "./RouteSetter";
import axios from "axios";
import { useQuery } from "react-query";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../redux/hook";
import { setUserSidebarId } from "../../redux/feature_slice/UserSidebarSlice";

const Users = () => {
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
        name: "Name",
        selector: (row: any) => {
          return row.name;
        },
        sortable: true,
      },
      {
        name: "Email",
        selector: (row: any) => row.email,
        sortable: true,
      },
      {
        name: "Role",
        cell: (row: any) => {
          const type =
            row.roles[0].name === "admin" ||
            row.roles[0].name === "employee"
              ? "chip--primary"
              : row.roles[0].name === "customer"
              ? "chip--info"
              : "chip--light";
          return (
            <div className={`chip ${type}`}>
              {row.roles[0].name}
            </div>
          );
        },
      },
      {
        name: "Update",
        cell: (row: any) => (
          <button
            title="row update"
            className="btn btn--light btn--icon btn--no-m-bottom text-info"
            onClick={() => {
              dispatch(setUserSidebarId(row.id));
              navigate(
                "/admin-dashboard/user-update"
              );
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
  const url = "http://127.0.0.1:8000/api/user";
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
    useQuery(["userData", url], getUsersData);

  if (isLoading) return <p>"loading..."</p>;
  if (isFetching) return <p>"fetching"</p>;
  if (error) return <p>"An error has occurs"</p>;

  return (
    <div className="admin-container">
      <RouteSetter routeName="/admin-dashboard/users" />
      <Nav
        icon={<IconUsers />}
        label={"Users"}
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
