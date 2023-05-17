import React, { useEffect, useState } from "react";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import { IconMenuOrder, IconUserUp } from "@tabler/icons-react";
import Nav from "../../components/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { getAllProject } from "../../requests/projectRequest";
import { createCustomerProject } from "../../requests/customerProjectsRequest";
import { Alert } from "../../redux/variable/AlertVariable";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import RouteSetter from "./RouteSetter";
import FormWarper from "../../components/FormWarper";
import { getAllCustomer } from "../../requests/userRequest";

const CustomerProjectsCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);

  const [projectDropDownList, setProjectDropDownList] = useState([]);
  const [customerDropDownList, setCustomerList] = useState([]);

  const [dropdownProject, setDropdownProject] = React.useState({
    name: "Project",
    value: 0,
  });

  const [dropdownCustomer, setDropDownCustomer] = React.useState({
    name: "Customer",
    value: 0,
  });

  useEffect(() => {
    getAllProject({
      token: AuthRedux.token,
    }).then((res: any) => {
      const filteredData = res.data.map((i: any) => {
        return {
          id: i.id,
          name: i.name,
        };
      });
      setProjectDropDownList(filteredData);
    });
    getAllCustomer({
      token: AuthRedux.token,
    }).then((res: any) => {
      const filteredData = res.data.map((i: any) => {
        return {
          id: i.id,
          name: i.name,
        };
      });
      setCustomerList(filteredData);
    });
  }, []);

  function onClickHandle() {
    const isEmpty =
      dropdownProject.value === 0 || dropdownCustomer.value === 0;
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      createCustomerProject({
        project_id: dropdownProject.value,
        user_id: dropdownCustomer.value,
        token: AuthRedux.token,
      })
        .then(() => {
          dispatch(
            setAlert({
              message: "Created Successfully",
              state: Alert.Success,
            })
          );
          navigate("/admin-dashboard/customer-project");
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
    <div className="admin-container">
      <RouteSetter routeName="/admin-dashboard/customer-project" />
      <Nav
        icon={<IconUserUp />}
        label="Customer Project Create"
      />
      <Nav.Back
        label="Back"
        link="/admin-dashboard/customer-project"
      />
      <FormWarper route="/api/customer-project">
        <div className="form-dropdown-label">
          <label htmlFor="">Project</label>
          <span>*require</span>
        </div>

        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              {dropdownProject.name} <IconMenuOrder size={20} />
            </>
          }
          dropdownClassName="form-dropdown"
          dropdownChildren={
            <>
              {projectDropDownList.map((project: any) => {
                return (
                  <Button
                    type="button"
                    onClick={() => {
                      setDropdownProject({
                        name: project.name,
                        value: project.id,
                      });
                    }}
                    label={project.name}
                  />
                );
              })}
            </>
          }
        />

        <div className="form-dropdown-label">
          <label htmlFor="">Customer</label>
          <span>*require</span>
        </div>
        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              {dropdownCustomer.name} <IconMenuOrder size={20} />
            </>
          }
          dropdownClassName="form-dropdown"
          dropdownChildren={
            <>
              {customerDropDownList.map((customer: any) => {
                return (
                  <Button
                    type="button"
                    onClick={() => {
                      setDropDownCustomer({
                        name: customer.name,
                        value: customer.id,
                      });
                    }}
                    label={customer.name}
                  />
                );
              })}
            </>
          }
        />
        <Button
          type="button"
          label="Create"
          className="btn btn--form"
          onClick={onClickHandle}
        />
      </FormWarper>
    </div>
  );
};

export default CustomerProjectsCreate;
