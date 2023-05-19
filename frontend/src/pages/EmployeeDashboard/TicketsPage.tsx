import React from "react";
import Dropdown from "../../components/DropDown";
import { userRoles } from "../../redux/variable/UserPageVariable";

const TicketsPage = () => {
  const [dropDownTitle, setDropDownTitle] = React.useState({
    name: "Select",
    role: "",
  });

  return (
    <div>
      <Dropdown
        buttonChildren={<>{dropDownTitle.name}</>}
        offset={[200,100]}
        dropdownChildren={
          <>
            {Object.keys(userRoles).map((i: any) => {
              return (
                <button
                  title="button"
                  onClick={() => {
                    setDropDownTitle({ name: i, role: userRoles[i] });
                  }}
                >
                  {i}
                </button>
              );
            })}
          </>
        }
      />
      {dropDownTitle.role}
    </div>
  );
};

export default TicketsPage;
