import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import { IconMessage2, IconPlus } from "@tabler/icons-react";
import Button from "../../components/Button";
import ShowIf from "../../components/Helper";
import TicketCreate from "./TicketCreate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { setTicketView, setViewData } from "../../redux/feature_slice/TicketSlice";
import axios from "axios";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Oval } from "react-loader-spinner";
import TicketView from "./TicketView";
import ReactPaginate from "react-paginate";
import Input from "../../components/Input";
import { debounce } from "debounce";
import TicketUpdate from "./TicketUpdate";

dayjs.extend(relativeTime);

const TicketPage = () => {
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const ticketRedux = useAppSelector((state) => state.ticket);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [dataCount, setDataCount] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const itemsPerPage = 6;

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

  const { data, isFetching } = useQuery(["tickets", ticketRedux.url], getUsersData);

  useEffect(() => {
    if (filteredData.length > 0) {
      setCurrentData(
        filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
      );
    }

    if (data && filteredData.length === 0) {
      setCurrentData(data.data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage));
      setDataCount(data.data.length);
    }
  }, [data, filteredData, currentPage]);

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
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    debouncedSearch(event.target.value);
    setCurrentPage(0);
  };

  const debouncedSearch = debounce((value: any) => {
    const filtered = data.data.filter((item: any) => {
      if (item.tickets_id.toLowerCase() === value.toLowerCase()) {
        return true;
      }
      if (item.priority.toLowerCase() === value.toLowerCase()) {
        return true;
      }
      if (item.customer_project.project.name.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (item.customer_project.user.name.toLowerCase().includes(value.toLowerCase())) {
        return true;
      }
      if (item.customer_project.project.project_id.toLowerCase() === value.toLowerCase()) {
        return true;
      }
    });
    setFilteredData(filtered);
    setDataCount(filtered.length);
  }, 1000);

  return (
    <>
      <ShowIf
        sif={ticketRedux.view === ""}
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

              {currentData.map((i: any, index: number) => {
                return (
                  <div
                    className="col-4"
                    key={index}
                  >
                    <TicketList
                      projectName={`${i.customer_project.project.name} #${i.tickets_id}`}
                      userView
                      day={dayjs(i.created_at).fromNow()}
                      description={i.subject}
                      name={i.customer_project.user.name}
                      priority={i.priority}
                      status={i.status}
                      onClick={() => {
                        dispatch(
                          setViewData({
                            ticketId: i.id,
                            customerProjectId: i.customer_project.id,
                            customerProjectName: i.customer_project.project.name,
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
                );
              })}
            </div>
          </div>
        }
      />
      <ShowIf
        sif={ticketRedux.view === "ticket-create"}
        show={<TicketCreate />}
      />
      <ShowIf
        sif={ticketRedux.view === "ticket-view"}
        show={<TicketView />}
      />
      <ShowIf
        sif={ticketRedux.view === "ticket-update"}
        show={<TicketUpdate />}
      />
    </>
  );
};

export default TicketPage;
