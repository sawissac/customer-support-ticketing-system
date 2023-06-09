import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/DropDown";
import { IconMenuOrder } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { updateUser } from "../../requests/userRequest";
import { serverRoles, userRoles } from "../../redux/variable/UserPageVariable";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import FormWarper from "../../components/FormWarper";
import {
  openUserRightSidebar,
  updateUserTableUrl,
} from "../../redux/feature_slice/UserPageSlice";
import { motion } from "framer-motion";
import { Theme } from "../../redux/variable/ThemeVariable";
const UserUpdatePage = () => {
  const userSidebarRedux = useAppSelector((state) => state.userSidebar);
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
          dispatch(openUserRightSidebar({name: ""}))

          dispatch(
            setAlert({
              message: "Updated Successfully",
              state: Alert.Success,
            })
          );
          dispatch(
            updateUserTableUrl({
              message: inputField.name + inputField.email + dropdownBox.name,
            })
          );
        })
        .catch(() => {
          dispatch(
            setAlert({
              message: "Fail to Update",
              state: Alert.Warning,
            })
          );
        });
    }
  }
  const themeRedux = useAppSelector((state) => state.theme);
  return (
    <div
      className={`admin-container admin-container--no-flex-grow admin-container--form ${
        themeRedux === Theme.Dark
          ? "admin-container--dark admin-container--no-flex-grow admin-container--form"
          : ""
      }`}
    >
      <Nav.BackButton
        label="User Update"
        onClick={() => {
          dispatch(openUserRightSidebar({ name: "" }));
        }}
      />
      <motion.div
        initial={{ x: "20px", opacity: 0 }}
        animate={{ x: "0px", opacity: 1 }}
      >
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
                <div className="form-dropdown__scroll">
                  {Object.keys(userRoles).map((role: string, index: number) => {
                    return (
                      <Button
                      key={index}
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
                </div>
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
      </motion.div>
    </div>
  );
};

export default UserUpdatePage;
