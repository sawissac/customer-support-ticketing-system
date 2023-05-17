import React, { useEffect, useState } from "react";
import Dropdown from "../../components/DropDown";
import Button from "../../components/Button";
import { IconMenuOrder, IconUserUp } from "@tabler/icons-react";
import Nav from "../../components/Nav";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useNavigate } from "react-router-dom";
import { getAllProject } from "../../requests/projectRequest";
import {
  createCustomerProject,
  updateCustomerProject,
} from "../../requests/customerProjectsRequest";
import { Alert } from "../../redux/variable/AlertVariable";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import FormWarper from "../../components/FormWarper";
import { getAllCustomer } from "../../requests/userRequest";
import { motion } from "framer-motion";
import {
  openProjectRightSidebar,
  updateCustomerTableUrl,
} from "../../redux/feature_slice/ProjectPageSlice";

const CustomerProjectsUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const projectPageRedux = useAppSelector((state) => state.projectSidebar);
  const [customerDropDownList, setCustomerList] = useState([]);
  const [dropdownCustomer, setDropDownCustomer] = React.useState({
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
      setCustomerList(filteredData);
    });
  }, []);

  useEffect(() => {
    setDropDownCustomer({
      name: projectPageRedux.customer_name,
      value: projectPageRedux.customer_id,
    });
  }, [projectPageRedux.customer_id]);

  function onClickHandle() {
    const isEmpty = dropdownCustomer.value === 0;
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      updateCustomerProject({
        id: projectPageRedux.id,
        project_id: projectPageRedux.project_id,
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
          dispatch(
            updateCustomerTableUrl({
              message: `updated:${Date()}`,
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
        label="User Update"
        onClick={() => {
          dispatch(openProjectRightSidebar({ name: "" }));
        }}
      />
      <motion.div
        initial={{ x: "20px", opacity: 0 }}
        animate={{ x: "0px", opacity: 1 }}
      >
        <FormWarper route="/api/customer-project">
          <div className="form-dropdown-label">
            <label htmlFor="">Employee</label>
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
      </motion.div>
    </div>
  );
};

export default CustomerProjectsUpdate;
