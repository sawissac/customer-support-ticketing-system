import { IconArrowLeft } from "@tabler/icons-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";

interface NavProps {
  icon?: ReactNode;
  label: string;
  rightPlacer?: any;
  links?: any;
  onClick?: any;
  back?: any;
}

const Nav = ({ label, icon, rightPlacer, links, onClick, back }: NavProps) => {
  return (
    <div className="nav_container">
      <div
        className="icon"
        onClick={onClick}
      >
        {back && <IconArrowLeft size={25} />}
        {icon}
      </div>
      <div
        className="text"
        onClick={onClick}
      >
        {label}
      </div>
      <div className="placer">{rightPlacer}</div>
      <div className="links">{links}</div>
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

interface NavBackButton {
  label: string;
  onClick: any;
  disable?:boolean
}
Nav.BackButton = ({ label, onClick,disable }: NavBackButton) => {
  return (
    <div className="nav_container">
      <Button
      disabled={disable}
        label={label}
        icon={<IconArrowLeft size={25} />}
        onClick={onClick}
        className="text text--link"
      />
    </div>
  );
};

export default Nav;
