import { IconHash, IconSettings, IconSunFilled } from "@tabler/icons-react";
import Avatar from "react-avatar";
import Button from "../Button";

const EmployeeSideBar = () => {
  return (
    <div className="employeesidebar">
      <div className="employeesidebar__header">
        <IconHash size={24} />
        <h5>Developer</h5>
      </div>
      <div className="employeesidebar__list">
        <EmployeeSideBar.Profile name="Dev Issac" email="iz@gmail.com" />
        <EmployeeSideBar.Profile name="Dev Issac" email="iz@gmail.com" />
        
        <div className="employeesidebar__list__assign-employee">
          <Button
            label="Assign Employee"
            className="btn btn--assign-employee"
          />
        </div>
      </div>
    </div>
  );
};

interface EmployeeSideBarProfile {
  name: string;
  email: string;
}

EmployeeSideBar.Profile = function (props: EmployeeSideBarProfile) {
  return (
    <div className="employeesidebar__profile">
      <Avatar
        color="#F37021"
        name={props.name}
        size="40"
        textSizeRatio={1.75}
        round={"7px"}
      />
      <div>
        <h5>
          {props.name.length > 10
            ? props.name.substring(0, 10) + "..."
            : props.name}
        </h5>
        <h6>
          {props.email.length > 15
            ? props.email.substring(0, 15) + "..."
            : props.email}
        </h6>
      </div>
    </div>
  );
};

export default EmployeeSideBar;
