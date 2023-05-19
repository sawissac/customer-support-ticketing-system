import React from "react";
import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import { IconFolder, IconMessage2, IconPlus } from "@tabler/icons-react";
import Button from "../../components/Button";
import ShowIf from "../../components/Helper";
import TicketCreate from "./TicketCreate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView } from "../../redux/feature_slice/TicketSlice";
import axios from "axios";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Oval } from "react-loader-spinner";

dayjs.extend(relativeTime);

const TicketPage = () => {
  const TicketRedux = useAppSelector((state) => state.ticket);
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const ticketRedux = useAppSelector((state) => state.ticket);
  const [page, setPage] = React.useState(0);
  // const [page] = React.useState();

  const url = "http://127.0.0.1:8000/api/ticket";
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
  const { error, data, isFetching } = useQuery(["employee", ticketRedux.url], getUsersData);
  if (isFetching) {
    return (
      <div className="fetching">
        <Oval
          height={50}
          width={50}
          color="#F37021"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#c97b4b"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
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

            <div className="admin-container__inner row row--gap-1 admin-container--pb-5">
              {data.data.reverse().map((i: any) => {
                return (
                  <div className="col-4">
                    <TicketList
                      projectName={`${i.customer_project.project.name} #${i.tickets_id}`}
                      userView
                      day={dayjs(i.created_at).fromNow()}
                      description={i.subject}
                      name={i.customer_project.user.name}
                      priority={i.priority}
                      status={i.status}
                      links="/admin-dashboard/ticket-view"
                    />
                  </div>
                );
              })}
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
