import { NavLink } from "react-router-dom";
import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import { IconMessage2, IconPlus } from "@tabler/icons-react";
import RouteSetter from "./RouteSetter";
import Button from "../../components/Button";
import { useAppSelector } from "../../redux/hook";
import { Theme } from "../../redux/variable/ThemeVariable";


const TicketPage = () => {
  const themeRedux = useAppSelector((state) => state.theme);
  return (
    <div  className={`admin-container ${
      themeRedux === Theme.Dark ? "admin-container--dark" : ""
    }`}>
      <Nav
        icon={<IconMessage2 />}
        label={"Tickets"}
        rightPlacer={
          <Button
            label="Create Ticket"
            icon={<IconPlus size={20} />}
            className="btn btn--light btn--block btn--no-m-bottom btn--sm"
            onClick={() => {}}
          />
        }
      />
      <div className="admin-container__inner row row--gap-1">
        <div className="col-4 col-sm-12 col-md-6">
          <TicketList
            projectName="sub sub"
            userView
            day="9days"
            description="the page is loading slower..!"
            name="Momo sama"
            priority="critical"
            status="open"
            links="/admin-dashboard/ticket-view"
          />
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
