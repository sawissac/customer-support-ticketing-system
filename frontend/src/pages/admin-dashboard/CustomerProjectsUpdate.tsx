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
import { UserApiResponse } from "../../responseInterface/UserApiResponse";
import { CustomerListApiResponse } from "../../responseInterface/CustomerListApiResponse";
import Input from "../../components/Input";
import { debounce } from "debounce";

const CustomerProjectsUpdate = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const AuthRedux = useAppSelector((state) => state.auth);
  const projectPageRedux = useAppSelector((state) => state.projectSidebar);
  const [customerList, setCustomerList] = useState<UserApiResponse[]>([]);
  const [tempCustomerList, setTempCustomerList] = useState<UserApiResponse[]>([]);
  const [filterCustomerInput, setFilterCustomerInput] = useState("");
  const [dropdownCustomer, setDropDownCustomer] = React.useState({
    name: "Customer",
    value: 0,
  });

  useEffect(() => {
    getAllCustomer({
      token: AuthRedux.token,
    }).then((res: any) => {
      const dataResponse: CustomerListApiResponse = res;
      setCustomerList(dataResponse.data);
      setTempCustomerList(dataResponse.data);
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
          dispatch(openProjectRightSidebar({name: ""}))

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

  function handleCustomerSearch(ev: React.ChangeEvent<HTMLInputElement>) {
    setFilterCustomerInput(ev.target.value);
    debouncedCustomerProjectSearch(ev.target.value);
  }

  const debouncedCustomerProjectSearch = debounce((value: string) => {
    const filteredCustomer = tempCustomerList.filter((project) => {
      if (project.name.toLowerCase().includes(value.toLocaleLowerCase())) {
        return true;
      }
      if (String(project.id) === value) {
        return true;
      }
    });

    if (filteredCustomer.length > 0) {
      setCustomerList(filteredCustomer);
    }
    if (filteredCustomer.length === 0) {
      setCustomerList(tempCustomerList);
    }
  }, 1000);

  return (
    <div className="admin-container admin-container--no-flex-grow admin-container--form">
      <Nav.BackButton
        label="Customer Update"
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
                <div className="form-dropdown__search">
                  <Input
                    label="Search Customer Project"
                    onClick={(ev) => {
                      ev.stopPropagation();
                    }}
                    onFocus={(ev) => {
                      ev.target.setAttribute("autocomplete", "off");
                    }}
                    placeholder="[customer name] #id"
                    value={filterCustomerInput}
                    onChange={handleCustomerSearch}
                  />
                </div>
                <div className="form-dropdown__scroll form-dropdown__scroll--height">
                  {customerList.map((customer,index) => {
                    return (
                      <Button
                      key={index}
                        type="button"
                        onClick={() => {
                          setDropDownCustomer({
                            name: customer.name,
                            value: customer.id,
                          });
                        }}
                        label={customer.name + `#${customer.id}`}
                      />
                    );
                  })}
                </div>
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
