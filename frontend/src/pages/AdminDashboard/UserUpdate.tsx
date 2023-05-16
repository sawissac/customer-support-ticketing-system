import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import { IconUserUp } from "@tabler/icons-react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/DropDown";
import { IconMenuOrder } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { getUser, updateUser } from "../../requests/userRequest";
import {
  serverRoles,
  userRoles,
} from "../../redux/variable/UserSidebarVariable";
import { useNavigate } from "react-router-dom";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import RouteSetter from "./RouteSetter";
import FormWarper from "../../components/FormWarper";

const UserUpdatePage = () => {
  const userSidebarRedux = useAppSelector(
    (state) => state.userSidebar
  );
  const authRedux = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [dropdownBox, setDropdownBox] = React.useState({
    name: "Role",
    value: "",
  });
  const [inputField, setInputField] = React.useState({
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    setInputField({
      name: userSidebarRedux.name,
      email: userSidebarRedux.email,
    });
    setDropdownBox({
      name: serverRoles[userSidebarRedux.role],
      value: userSidebarRedux.role,
    });
  }, [userSidebarRedux.id]);

  function onChangeHandler(ev: React.ChangeEvent<HTMLInputElement>) {
    setInputField({
      ...inputField,
      [ev.currentTarget.id]: ev.target.value,
    });
  }

  function onButtonSubmitHandle() {
    const isEmpty =
      Object.values(inputField).filter((i) => i === "").length > 0 ||
      dropdownBox.value === "";
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      updateUser({
        ...inputField,
        id: userSidebarRedux.id,
        role: dropdownBox.value,
        token: authRedux.token,
      })
        .then(() => {
          dispatch(
            setAlert({
              message: "Updated Successfully",
              state: Alert.Success,
            })
          );
          navigate("/admin-dashboard/users");
        })
        .catch((reason) => {
          dispatch(
            setAlert({
              message: "Fail to Update",
              state: Alert.Warning,
            })
          );
        });
    }
  }
  return (
    <div className="admin-container">
      <RouteSetter routeName="/admin-dashboard/users" />
      <Nav
        icon={<IconUserUp />}
        label="User Update Page"
      />
      <Nav.Back
        link="/admin-dashboard/users"
        label="Create Update"
      />
      <FormWarper route="/api/user">
        <Input
          label="Name"
          id="name"
          errorMessage="*require"
          placeholder="Name..."
          value={inputField.name}
          onChange={onChangeHandler}
        />
        <Input
          label="Email"
          id="email"
          errorMessage="*require"
          placeholder="Email.."
          value={inputField.email}
          onChange={onChangeHandler}
        />
        <div className="form-dropdown-label">
          <label htmlFor="">Role</label>
          <span>*require</span>
        </div>
        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              {dropdownBox.name}
              <IconMenuOrder size={20} />
            </>
          }
          dropdownClassName="form-dropdown"
          dropdownChildren={
            <>
              {Object.keys(userRoles).map((role: string) => {
                return (
                  <Button
                    type="button"
                    onClick={() => {
                      setDropdownBox({
                        name: role,
                        value: userRoles[role],
                      });
                    }}
                    label={role}
                  />
                );
              })}
            </>
          }
        />
        <Button
          type="button"
          label="Update"
          className="btn btn--form"
          onClick={onButtonSubmitHandle}
        />
      </FormWarper>
    </div>
  );
};

export default UserUpdatePage;
