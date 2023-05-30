import Nav from "../../components/Nav";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FormWarper from "../../components/FormWarper";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView, updateTicketUrl } from "../../redux/feature_slice/TicketSlice";
import { motion } from "framer-motion";
import Dropdown from "../../components/DropDown";
import React, { useState } from "react";
import { Priority } from "../../redux/variable/TicketVariable";
import { getCustomerProject } from "../../requests/customerProjectsRequest";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { createTicket } from "../../requests/ticketRequest";
import { debounce } from "debounce";
import {
  CustomerProjectListApiResponse,
  CustomerProjectListProps,
} from "../../responseInterface/CustomerProjectListApiResponse";
import { textLimiter } from "../../commonFunction/common";

const TicketCreate = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((s) => s.auth);
  const [filterCustomerProjectInput, setFilterCustomerProjectInput] = React.useState("");
  const [inputField, setInputField] = useState({
    subject: "",
    description: "",
    drive_link: "",
  });
  const [projectList, setProjectList] = React.useState<CustomerProjectListProps[]>([]);
  const [tempProjectList, setTempProjectList] = React.useState<CustomerProjectListProps[]>([]);
  const [projectDropDown, setProjectDropDown] = React.useState({
    name: "Select",
    value: 0,
  });
  const [priorityDropDown, setPriorityDropDown] = React.useState({
    name: "Select",
    value: "",
  });

  function onChangeHandler(ev: React.ChangeEvent<HTMLInputElement>) {
    setInputField({
      ...inputField,
      [ev.currentTarget.id]: ev.target.value,
    });
  }

  function onSubmitHandler() {
    const isEmpty =
      inputField.subject.length === 0 ||
      inputField.description.length === 0 ||
      projectDropDown.value === 0 ||
      priorityDropDown.value.length === 0;
    if (isEmpty) {
      dispatch(
        setAlert({
          message: "Please fill the remaining...",
          state: Alert.Warning,
        })
      );
    } else {
      createTicket({
        ...inputField,
        customer_project_id: projectDropDown.value,
        priority: priorityDropDown.value,
        status: "open",
        token: authRedux.token,
      })
        .then(() => {
          dispatch(
            setAlert({
              message: "Ticket Created Successfully",
              state: Alert.Success,
            })
          );
          dispatch(
            updateTicketUrl({
              name: `updated:${Date()}`,
            })
          );
          dispatch(setTicketView({ name: "" }));
        })
        .catch(() => {
          setAlert({
            message: "Fail to create ticket...",
            state: Alert.Warning,
          });
        });
    }
  }

  React.useEffect(() => {
    getCustomerProject({ token: authRedux.token }).then((res: any) => {
      const dataResponse: CustomerProjectListApiResponse = res;
      const filteredProjectList = dataResponse.data.filter((project) => {
        if (project.user_id === authRedux.user.id) {
          return true;
        }else{
          return false;
        };
      });
      setProjectList(filteredProjectList);
      setTempProjectList(filteredProjectList);
    });
  }, []);

  function handleCustomerProjectSearch(ev: React.ChangeEvent<HTMLInputElement>) {
    setFilterCustomerProjectInput(ev.target.value);
    debouncedCustomerProjectSearch(ev.target.value);
  }

  const debouncedCustomerProjectSearch = debounce((value: string) => {
    const filteredCustomerProject = tempProjectList.filter((project) => {
      if (project.project.name.toLowerCase().includes(value.toLocaleLowerCase())) {
        return true;
      }
      if (project.user.name.toLowerCase().includes(value.toLocaleLowerCase())) {
        return true;
      }
    });

    if (filteredCustomerProject.length > 0) {
      setProjectList(filteredCustomerProject);
    }
    if (filteredCustomerProject.length === 0) {
      setProjectList(tempProjectList);
    }
  }, 1000);

  return (
    <>
      <div className="admin-container admin-container--textarea">
        <Nav.BackButton
          label="Ticket Create"
          onClick={() => {
            dispatch(setTicketView({ name: "" }));
          }}
        />
        <FormWarper route="/api/ticket">
          <motion.div
            initial={{ y: "30px", opacity: 0 }}
            animate={{ y: "0px", opacity: 1 }}
          >
            <div className="row row--gap-1">
              <div className="col-12">
                <Input
                  type="text"
                  label="Subject"
                  errorMessage="*require"
                  placeholder="Name..."
                  id="subject"
                  value={inputField.subject}
                  onChange={onChangeHandler}
                  autoComplete="off"
                />
              </div>
              <div className="col-6">
                <div className="form-dropdown-label">
                  <label htmlFor="">Project</label>
                  <span>*require</span>
                </div>
                <Dropdown
                  placement="bottom"
                  buttonClassName="form-dropdown-btn"
                  offset={[70, 0]}
                  buttonChildren={<>{textLimiter(20, projectDropDown.name)}</>}
                  dropdownClassName="form-dropdown"
                  width="350px"
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
                          placeholder="[customer project] #customer name"
                          value={filterCustomerProjectInput}
                          onChange={handleCustomerProjectSearch}
                        />
                      </div>
                      <div className="form-dropdown__scroll form-dropdown__scroll--height">
                        {projectList.map((i: any, index: number) => {
                          let email = i.user.email.split("@");
                          return (
                            <Button
                              key={index}
                              type="button"
                              title={`${i.project.name}#${i.user.name}:@${email[0]}`}
                              onClick={() => {
                                setProjectDropDown({
                                  name: i.project.name,
                                  value: i.id,
                                });
                              }}
                              label={`${i.project.name}:#${i.user.name}`}
                            />
                          );
                        })}
                      </div>
                    </>
                  }
                />
              </div>
              <div className="col-6">
                <div className="form-dropdown-label">
                  <label htmlFor="">Priority</label>
                  <span>*require</span>
                </div>
                <Dropdown
                  placement="bottom"
                  buttonClassName="form-dropdown-btn"
                  offset={[0, 0]}
                  buttonChildren={<>{priorityDropDown.name}</>}
                  dropdownClassName="form-dropdown"
                  width={"200px"}
                  dropdownChildren={
                    <>
                      <div className="form-dropdown__scroll">
                        {Object.values(Priority).map((priority: string, index: number) => {
                          return (
                            <Button
                              key={index}
                              type="button"
                              onClick={() => {
                                setPriorityDropDown({
                                  name: priority,
                                  value: priority,
                                });
                              }}
                              label={priority}
                            />
                          );
                        })}
                      </div>
                    </>
                  }
                />
              </div>
              <div className="col-12">
                <Input
                  label="Google Drive Link"
                  errorMessage="*optional"
                  placeholder="https://drive.google.com/file/.."
                  id="drive_link"
                  value={inputField.drive_link}
                  onChange={onChangeHandler}
                />
              </div>
            </div>

            <Input.Textarea
              label="Description"
              errorMessage="*require"
              placeholder="Name..."
              id="description"
              value={inputField.description}
              onChangeText={(ev: any) => {
                setInputField({ ...inputField, description: ev.target.value });
              }}
            />
            <Button
              type="button"
              label="Create Ticket"
              className="btn btn--form"
              onClick={onSubmitHandler}
            />
          </motion.div>
        </FormWarper>
      </div>
    </>
  );
};

export default TicketCreate;
