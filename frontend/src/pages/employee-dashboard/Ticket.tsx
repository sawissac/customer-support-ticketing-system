import { useEffect, useState } from "react";
import {
  AssignEmployeeListApiResponse,
  AssignEmployeeListTicketProps,
} from "../../responseInterface/AssignEmployeeListApiResponse";
import { useQuery } from "react-query";
import { debounce } from "debounce";
import { Oval } from "react-loader-spinner";
import { IconMessage2 } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setPage,
  setTicketView,
  setViewData,
} from "../../redux/feature_slice/TicketSlice";
import { requestAxiosWithToken } from "../../routes/request";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ReactPaginate from "react-paginate";
import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import ShowIf from "../../components/Helper";
import Input from "../../components/Input";
import TicketView from "./TicketView";

dayjs.extend(relativeTime);

const Ticket = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const ticketRedux = useAppSelector((state) => state.ticket);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [dataCount, setDataCount] = useState(0);
  const [ticketData, setTicketData] = useState<AssignEmployeeListTicketProps[]>(
    []
  );
  const [ticketTempDat, setTicketTempData] = useState<
    AssignEmployeeListTicketProps[]
  >([]);
  const itemsPerPage = 6;

  const url = `http://127.0.0.1:8000/api/assign-employee-list/${authRedux.user.id}`;

  const { data, isFetching } = useQuery<AssignEmployeeListApiResponse>(
    ["employee-dashboard-tickets", ticketRedux.url],
    requestAxiosWithToken(url, authRedux.token)
  );

  const dataInit = (data: AssignEmployeeListApiResponse) => {
    const dataResponse = data;
    const temp: number[] = [];
    const closedTicket: AssignEmployeeListTicketProps[] = [];
    const processingTicket: AssignEmployeeListTicketProps[] = [];
    const filteredTicket = dataResponse.data.reduce<
      AssignEmployeeListTicketProps[]
    >((pre, cur) => {
      if (!temp.includes(cur.ticket.id)) {
        temp.push(cur.ticket.id);
        if (cur.ticket.status === "close") {
          closedTicket.push(cur.ticket);
        } else if (cur.ticket.status === "processing") {
          processingTicket.push(cur.ticket);
        } else {
          pre.push(cur.ticket);
        }
      }
      return pre;
    }, []);
    filteredTicket.push(...processingTicket, ...closedTicket);
    setTicketData(
      filteredTicket.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      )
    );
    setTicketTempData(filteredTicket);
    setDataCount(filteredTicket.length);
  };

  useEffect(() => {
    if (data) {
      dataInit(data);
    }
  }, [data, currentPage]);

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

  const handlePageChange = ({ selected }: any) => {
    setCurrentPage(selected);
    dispatch(setPage({ page: selected }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
    setCurrentPage(0);
  };

  const debouncedSearch = debounce((value: string) => {
    const filtered = ticketData.filter((item) => {
      if (item.tickets_id.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (item.status.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (item.priority.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (
        item.customer_project.project.name
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        return true;
      }
      if (item.subject.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (
        item.customer_project.user.name
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        return true;
      }
      if (
        item.customer_project.project.project_id.toLowerCase().includes
        (value.toLowerCase())
      ) {
        return true;
      }
    });

    if (filtered.length > 0) {
      setTicketData(filtered);
      setDataCount(0);
      setCurrentPage(0);
    }
    if (filtered.length === 0) {
      setTicketData([]);
      setDataCount(0);
      setCurrentPage(0);
    }
    if (data && value.length === 0) {
      dataInit(data);
    }
  }, 1000);

  return (
    <>
      <ShowIf
        sif={ticketRedux.view === ""}
        show={
          <div className="admin-container">
            <Nav icon={<IconMessage2 />} label={"Ticket"} />
            <div className="admin-container__inner row row--gap-1 admin-container--pb-5">
              <div className="ticket-paginate col-12">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search"
                />
                <ReactPaginate
                  previousLabel="Previous"
                  nextLabel="Next"
                  breakLabel="..."
                  pageCount={Math.ceil(dataCount / itemsPerPage)}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageChange}
                  containerClassName="pagination"
                  activeClassName="active"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                />
              </div>

              {ticketData.length === 0 && searchQuery.length === 0 ? (
                <div className="nodata">
                  <h5>There is no ticket</h5>
                </div>
              ) : (
                ticketData.map((i: any, index: number) => (
                  <div className="col-4" key={index}>
                    <TicketList
                      projectName={`${i.customer_project.project.name}`}
                      userView
                      day={dayjs(i.created_at).fromNow()}
                      description={i.subject}
                      name={i.customer_project.user.name}
                      priority={i.priority}
                      status={i.status}
                      ticketId={`#${i.tickets_id}`}
                      projectId={i.customer_project.project.project_id}
                      createDate={i.created_at}
                      onClick={() => {
                        dispatch(
                          setViewData({
                            ticketId: i.id,
                            customerProjectId: i.customer_project.id,
                            customerProjectName:
                              i.customer_project.project.name,
                            subject: i.subject,
                            description: i.description,
                            priority: i.priority,
                            driveLink: i.drive_link,
                            status: i.status,
                            time: dayjs(i.created_at).fromNow(),
                            userName: i.customer_project.user.name,
                            endDate: i.end_date,
                            startDate: i.start_date,
                          })
                        );
                        dispatch(setTicketView({ name: "ticket-view" }));
                      }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        }
      />
      <ShowIf sif={ticketRedux.view === "ticket-view"} show={<TicketView />} />
    </>
  );
};

export default Ticket;
