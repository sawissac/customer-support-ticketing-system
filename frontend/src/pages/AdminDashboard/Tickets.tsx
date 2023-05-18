import React from "react";
import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import { IconMessage2, IconPlus } from "@tabler/icons-react";
import Button from "../../components/Button";
import ShowIf from "../../components/Helper";
import TicketCreate from "./TicketCreate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";
import axios from "axios";
import { useQuery } from "react-query";

const TicketPage = () => {
  const TicketRedux = useAppSelector((state) => state.ticket);
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const [page, setPage] = React.useState(0);
  // const [page] = React.useState();

  const url = "http://127.0.0.1:8000/api/employee-project";
  const getUsersData = async () => {
    const res = await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
    return res;
  };

  const { error, data, isFetching } = useQuery(["employee", "hello"], getUsersData);


  React.useEffect(()=>{
      
  },[data])

  if (isFetching) {
    return <div>isFetching</div>;
  }

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
              <div className="col-4 col-lg-12">
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
