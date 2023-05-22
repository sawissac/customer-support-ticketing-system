import Nav from "../../components/Nav";
import Button from "../../components/Button";
import Input from "../../components/Input";
import FormWarper from "../../components/FormWarper";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setTicketView,
  updateTicketUrl,
} from "../../redux/feature_slice/TicketSlice";
import { motion } from "framer-motion";
import Dropdown from "../../components/DropDown";
import React, { useState } from "react";
import { Priority } from "../../redux/variable/TicketVariable";
import { getCustomerProject } from "../../requests/customerProjectsRequest";
import { setAlert } from "../../redux/feature_slice/AlertSlice";
import { Alert } from "../../redux/variable/AlertVariable";
import { createTicket } from "../../requests/ticketRequest";
import { getProject, getProjectList } from "../../requests/projectRequest";
import axios from "axios";
import { useQuery } from "react-query";

const TicketCreate = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((s) => s.auth);
  const [customerProject,setCustomerProject]=useState([]);
  const [inputField, setInputField] = useState({
    subject: "",
    description: "",
    drive_link: "",
  });
  const [projectList, setProjectList] = React.useState([]);

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
              message: "Created Successfully",
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
            message: "Fail to create...",
            state: Alert.Warning,
          });
        });
    }
  }

  React.useState(() => {
    getCustomerProject({ token: authRedux.token }).then((res: any) => {
      setProjectList(res.data);
    });
  });

  React.useEffect(()=>{
    getProjectList({id:authRedux.user.id,token:authRedux.token}).then((res:any)=>{
      setCustomerProject(res.data);
    })
  },[]);

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
                  label="Subject"
                  errorMessage="*require"
                  placeholder="Name..."
                  id="subject"
                  value={inputField.subject}
                  onChange={onChangeHandler}
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
                  buttonChildren={<>{projectDropDown.name}</>}
                  dropdownClassName="form-dropdown"
                  width="350px"
                  dropdownChildren={
                    <>
                      {customerProject.map(
                        (item: any, index: number) => {
                          return (
                            <Button
                              key={index}
                              type="button"
                              onClick={() => {
                                setProjectDropDown({
                                  name: item.project.name,
                                  value: item.id,
                                });
                              }}
                              label={item.project.name}
                            />
                          );
                        }
                      )}
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
                      {Object.keys(Priority).map(
                        (priority: string, index: number) => {
                          return (
                            <Button
                              key={index}
                              type="button"
                              onClick={() => {
                                setPriorityDropDown({
                                  name: priority,
                                  value: Priority[priority],
                                });
                              }}
                              label={priority}
                            />
                          );
                        }
                      )}
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
