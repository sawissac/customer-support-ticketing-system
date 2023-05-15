import { IconArrowLeft } from "@tabler/icons-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface NavProps {
  icon?: ReactNode;
  label: string;
  rightPlacer?: any;
}

const Nav = ({
  label,
  icon,
  rightPlacer,
}: NavProps) => {
  return (
    <div className="nav_container">
      <div className="icon">{icon}</div>
      <div className="text">{label}</div>
      <div className="placer">{rightPlacer}</div>
    </div>
  );
};

interface NavBack {
  link: string;
  label: string;
}

Nav.Back = ({ label, link }: NavBack) => {
  return (
    <div className="nav_container">
      <NavLink
        to={link}
        className="text text--link"
      >
        <IconArrowLeft size={25} />
        {label}
      </NavLink>
    </div>
  );
};

export default Nav;
