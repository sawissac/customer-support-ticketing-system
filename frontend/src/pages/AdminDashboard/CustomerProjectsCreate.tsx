import React, { useEffect, useState } from "react";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import { IconMenuOrder, IconUserUp } from "@tabler/icons-react";
import Nav from "../../components/Nav";
import { getAllCustomer } from "../../requests/userRequest";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { getAllProject } from "../../requests/projectRequest";
import { createCustomerProject } from "../../requests/customerProjectsRequest";
import { Alert } from "../../redux/variable/AlertVariable";
import { setAlert } from "../../redux/feature_slice/AlertSlice";

const CustomerProjectsCreate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);

  function onSubmitHandle(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
  }

  const [projectDropDownList, setProjectDropDownList] = useState([]);
  const [dropdownBoxProject, setDropDownBoxProject] = React.useState({
    name: "Project",
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
  }, []);

  const [customerDropDownList, setCustomerDropDownList] = useState([]);
  const [dropdownBoxCustomer, setDropDownBoxCustomer] = useState({
    name: "Customer",
    value: 0,
  });

  useEffect(() => {
    getAllCustomer({
      token: AuthRedux.token,
    }).then((res: any) => {
      const filteredData = res.data.map((i: any) => {
        return {
          id: i.id,
          name: i.name,
        };
      });
      setCustomerDropDownList(filteredData);
    });
  }, []);
  console.log(projectDropDownList);

  function onClickHandle() {
    const isEmpty =!dropdownBoxProject.value||!dropdownBoxCustomer.value;
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    }
    else {
      createCustomerProject({
        project_id: dropdownBoxProject.value,
        user_id:dropdownBoxCustomer.value,
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
      <Nav icon={<IconUserUp />} label="Customer Project Create" />
      <form action="" onClick={onSubmitHandle} className="form-container">
        <div className="form-dropdown-label">
          <label htmlFor="">Project</label>
          <span>*require</span>
        </div>

        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              {dropdownBoxProject.name} <IconMenuOrder size={20} />
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
                      setDropDownBoxProject({
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
          <label htmlFor="">Employee</label>
          <span>*require</span>
        </div>
        <Dropdown
          placement="bottom"
          buttonClassName="form-dropdown-btn"
          buttonChildren={
            <>
              {dropdownBoxCustomer.name} <IconMenuOrder size={20} />
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
                      setDropDownBoxCustomer({
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
      </form>
    </div>
  );
};

export default CustomerProjectsCreate;
