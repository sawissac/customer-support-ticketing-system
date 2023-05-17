import React, { useMemo } from "react";
import DataTable from "react-data-table-component";
import Nav from "../../components/Nav";
import { IconEdit, IconPlus, IconTrashFilled, IconUsers } from "@tabler/icons-react";
import RouteSetter from "./RouteSetter";
import axios from "axios";
import { useQuery } from "react-query";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { openRightSidebar, setUserState } from "../../redux/feature_slice/UserSidebarSlice";
import { serverRoles } from "../../redux/variable/UserSidebarVariable";
import Avatar from "react-avatar";
import UserCreatePage from "./UserCreate";
import UserUpdatePage from "./UserUpdate";
import ShowIf from "../../components/Helper";
import Button from "../../components/Button";
import { Theme } from "../../redux/variable/ThemeVariable";

const Users = () => {
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const UserPageRedux = useAppSelector((state) => state.userSidebar);

  const columns = useMemo(
    () => [
      {
        name: "Name",
        cell: (row: any) => {
          const color =
            row.roles[0].name === "admin" || row.roles[0].name === "employee"
              ? "#F37021"
              : row.roles[0].name === "customer"
              ? "#0d6efd"
              : "#495057";

          return (
            <div className="avatar-profile">
              <Avatar
                className={`avatar-profile__circle`}
                name={row.name}
                color={color}
                size="35"
                textSizeRatio={1.75}
                round
              />
              {row.name}
            </div>
          );
        },
      },
      {
        name: "Email",
        selector: (row: any) => row.email,
        sortable: true,
      },
      {
        name: "Access Role",
        selector: (row: any) => serverRoles[row.roles[0].name],
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
                setUserState({
                  id: row.id,
                  email: row.email,
                  name: row.name,
                  role: row.roles[0].name,
                })
              );
              dispatch(openRightSidebar({ name: "update" }));
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

  const { data } = useQuery(["userData", UserPageRedux.state], getUsersData);
  const themeRedux = useAppSelector((state) => state.theme);
  return (
    <>
      <div className={`admin-container ${themeRedux === Theme.Dark ? 'admin-container--dark': ''}`}>
        <RouteSetter routeName="/admin-dashboard/users" />
        <Nav
          icon={<IconUsers />}
          label={"Users"}
          rightPlacer={
            <Button
              label="Add User"
              icon={<IconPlus size={20} />}
              className="btn btn--light btn--block btn--no-m-bottom btn--sm"
              onClick={() => {
                dispatch(openRightSidebar({ name: "create" }));
              }}
            />
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
      <ShowIf
        sif={UserPageRedux.rightSidebar === "create"}
        show={<UserCreatePage />}
      />
      <ShowIf
        sif={UserPageRedux.rightSidebar === "update"}
        show={<UserUpdatePage />}
      />
    </>
  );
};

export default Users;
