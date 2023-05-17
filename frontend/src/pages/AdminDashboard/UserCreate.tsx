import React from "react";
import Nav from "../../components/Nav";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Dropdown from "../../components/DropDown";
import { IconMenuOrder } from "@tabler/icons-react";
import { userRoles } from "../../redux/variable/UserPageVariable";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { createUser } from "../../requests/userRequest";
import FormWarper from "../../components/FormWarper";
import { openUserRightSidebar, updateUserTableUrl } from "../../redux/feature_slice/UserPageSlice";
import { motion } from "framer-motion";
const UserCreatePage = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const [dropdownBox, setDropDownBox] = React.useState({
    name: "Role",
    value: "",
  });

  const [inputField, setInputField] = React.useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  function onChangeHandler(ev: React.ChangeEvent<HTMLInputElement>) {
    setInputField({
      ...inputField,
      [ev.currentTarget.id]: ev.target.value,
    });
  }

  function onButtonSubmitHandle() {
    const isEmpty =
      Object.values(inputField).filter((i) => i === "").length > 0 || dropdownBox.value === "";
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else if (inputField.password !== inputField.password_confirmation) {
      dispatch(
        setAlert({
          message: "Please write correct password confirmation",
          state: Alert.Warning,
        })
      );
    } else {
      createUser({
        ...inputField,
        role: dropdownBox.value,
        token: authRedux.token,
      })
        .then(() => {
          dispatch(
            updateUserTableUrl({ message: inputField.name + inputField.email + dropdownBox.name })
          );
          dispatch(
            setAlert({
              message: "Created Successfully",
              state: Alert.Success,
            })
          );
        })
        .catch((reason) => {
          dispatch(
            setAlert({
              message: "Fail to create",
              state: Alert.Warning,
            })
          );
        });
    }
  }

  return (
    <div className="admin-container admin-container--no-flex-grow admin-container--form">
      <Nav.BackButton
        label="User Create"
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
            type="text"
            id="name"
            errorMessage="*require"
            placeholder="Name..."
            required
            autoComplete="off"
            onChange={onChangeHandler}
          />
          <Input
            label="Email"
            type="email"
            id="email"
            errorMessage="*require"
            placeholder="Email.."
            required
            autoComplete="off"
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
                {dropdownBox.name} <IconMenuOrder size={20} />
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
                        setDropDownBox({
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
          <Input
            label="Password"
            type="password"
            id="password"
            errorMessage="*require"
            placeholder="Password..."
            required
            autoComplete="off"
            onChange={onChangeHandler}
          />
          <Input
            label="Comfirm Password"
            type="password"
            id="password_confirmation"
            errorMessage="*require"
            placeholder="Comfirm Password..."
            required
            autoComplete="off"
            onChange={onChangeHandler}
          />

          <Button
            type="button"
            label="Create"
            className="btn btn--form"
            onClick={onButtonSubmitHandle}
          />
        </FormWarper>
      </motion.div>
    </div>
  );
};

export default UserCreatePage;
