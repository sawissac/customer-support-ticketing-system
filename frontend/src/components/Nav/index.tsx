import { ReactNode } from "react";

interface NavProps {
    icon?: ReactNode;
    label: string;
  }
  
  const Nav = ({ label,icon,}: NavProps) => {
    return (
      <div className="nav_container">
        <nav>
            <div className="icon">
                {icon}
            </div>
            <div className="text">
                {label}
            </div>
        </nav>
      </div>
    );
  };
  export default Nav;