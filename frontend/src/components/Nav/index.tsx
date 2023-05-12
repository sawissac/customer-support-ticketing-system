import { ReactNode } from "react";

interface NavProps {
  icon?: ReactNode;
  label: string;
}

const Nav = ({ label, icon }: NavProps) => {
  return (
    <div className="nav_container">
      <div className="icon">{icon}</div>
      <div className="text">{label}</div>
    </div>
  );
};
export default Nav;
