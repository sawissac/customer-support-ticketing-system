import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import { IconMessage2, IconPlus } from "@tabler/icons-react";
import Button from "../../components/Button";
import ShowIf from "../../components/Helper";
import TicketCreate from "./TicketCreate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";
;


const TicketPage = () => {
  const TicketRedux = useAppSelector((state) => state.ticket);
  const dispatch = useAppDispatch();
  return (
    <>
      <ShowIf
        sif={TicketRedux.view === ""}
        show={
          <div className="admin-container">
            <Nav
              icon={<IconMessage2 />}
              label={"Tickets"}
              rightPlacer={
                <Button
                  label="Create Ticket"
                  icon={<IconPlus size={20} />}
                  className="btn btn--light btn--block btn--no-m-bottom btn--sm"
                  onClick={() => {
                    dispatch(setTicketView({ name: "ticket-create" }));
                  }}
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
        }
      />

      <ShowIf
        sif={TicketRedux.view === "ticket-create"}
        show={<TicketCreate />}
      />
    </>
  );
};

export default TicketPage;
