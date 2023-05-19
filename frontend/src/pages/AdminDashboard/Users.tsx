import React, { useMemo, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import Nav from "../../components/Nav";
import {
  IconEdit,
  IconMenuOrder,
  IconPlus,
  IconTrashFilled,
  IconUsers,
} from "@tabler/icons-react";
import axios from "axios";
import { useQuery } from "react-query";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  openUserRightSidebar,
  setUserState,
} from "../../redux/feature_slice/UserPageSlice";
import { serverRoles, userRoles } from "../../redux/variable/UserPageVariable";
import Avatar from "react-avatar";
import UserCreatePage from "./UserCreate";
import UserUpdatePage from "./UserUpdate";
import ShowIf from "../../components/Helper";
import Button from "../../components/Button";
import { motion } from "framer-motion";
import { Theme } from "../../redux/variable/ThemeVariable";
import { Oval } from "react-loader-spinner";
import { debounce } from "debounce";
import Input from "../../components/Input";
import Dropdown from "../../components/DropDown";

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

const Users = () => {
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const UserPageRedux = useAppSelector((state) => state.userSidebar);
  const themeRedux = useAppSelector((state) => state.theme);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState([]);

  const [dropDownTitle, setDropDownTitle] = React.useState({
    name: "Select",
    role: "",
  });

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
            className="btn btn--light btn--icon btn--no-m-bottom text-success"
            onClick={() => {
              dispatch(
                setUserState({
                  id: row.id,
                  email: row.email,
                  name: row.name,
                  role: row.roles[0].name,
                })
              );
              dispatch(openUserRightSidebar({ name: "update" }));
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
        return response.data.data.reverse();
      });
    return res;
  };

  const { isFetching, data } = useQuery(
    ["userData", UserPageRedux.state],
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
      return item.name.toLowerCase() === value.toLowerCase();
    });
    setSearchFilter(filtered);
  }, 1000);

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
  };

  let filteredData = searchFilter;

  if (dropDownTitle.role.length > 0) {
    filteredData = searchFilter.filter(
      (item: any) =>
        item.roles[0].name.toLowerCase() === dropDownTitle.role.toLowerCase()
    );
  }

  return (
    <>
      <div className="admin-container">
        <Nav
          icon={<IconUsers />}
          label={"Users"}
          rightPlacer={
            <Button
              label="Add User"
              icon={<IconPlus size={20} />}
              className="btn btn--light btn--block btn--no-m-bottom btn--sm"
              onClick={() => {
                dispatch(openUserRightSidebar({ name: "create" }));
              }}
            />
          }
        />
        <motion.div
          initial={{ opacity: 0, y: "30px" }}
          animate={{ opacity: 1, y: "0px" }}
          className="admin-container__inner"
        >
          <div className="search-area">
          <Input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className="search"
          />
          
          <Dropdown
            buttonClassName="form-dropdown-btn form-dropdown-btn--search"
            buttonChildren={<>{dropDownTitle.name}<IconMenuOrder size={20} /></>}
            // offset={[200, 100]}
            dropdownClassName="form-dropdown"
            dropdownChildren={
              <>
                <button
                  title="button"
                  onClick={() => {
                    setDropDownTitle({ name: "See All", role: "" });
                  }}
                >
                  See all
                </button>
                {Object.keys(userRoles).map((i: any) => {
                  return (
                    <button
                      title="button"
                      onClick={() => {
                        setDropDownTitle({ name: i, role: userRoles[i] });
                      }}
                    >
                      {i}
                    </button>
                  );
                })}
              </>
            }
          />
          </div>
          <DataTable
            columns={columns}
            data={filteredData.length > 0 ? filteredData : data}
            responsive
            pagination
            theme={`${themeRedux === Theme.Dark ? "table-dark" : ""}`}
          />
        </motion.div>
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
