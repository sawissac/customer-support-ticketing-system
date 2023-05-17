import { IconArrowLeft } from "@tabler/icons-react";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import Button from "../Button";
import { useAppSelector } from "../../redux/hook";
import { Theme } from "../../redux/variable/ThemeVariable";

interface NavProps {
  icon?: ReactNode;
  label: string;
  rightPlacer?: any;
  links?: any;
}

const Nav = ({ label, icon, rightPlacer, links }: NavProps) => {
  // const themeRedux  = useAppSelector(state=>state.theme);
  return (
    <div className="nav_container">
      <div className="icon">{icon}</div>
      <div className="text">{label}</div>
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
}
Nav.BackButton = ({ label, onClick }: NavBackButton) => {
  return (
    <div className="nav_container">
      <Button
        label={label}
        icon={<IconArrowLeft size={25} />}
        onClick={onClick}
        className="text text--link"
      />
    </div>
  );
};

export default Nav;
