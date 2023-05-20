import { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import { IconChevronsLeft, IconMessage2, IconPlus } from "@tabler/icons-react";
import Button from "../../components/Button";
import ShowIf from "../../components/Helper";
// import TicketCreate from "./TicketCreate";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  setTicketView,
  setViewData,
} from "../../redux/feature_slice/TicketSlice";
import axios from "axios";
import { useQuery } from "react-query";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Oval } from "react-loader-spinner";
// import TicketView from "./TicketView";
import ReactPaginate from "react-paginate";
import Input from "../../components/Input";
import { debounce } from "debounce";
import TicketCreate from "../AdminDashboard/TicketCreate";
import TicketView from "./TicketView";

dayjs.extend(relativeTime);

const TicketPage = () => {
  const TicketRedux = useAppSelector((state) => state.ticket);
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  const ticketRedux = useAppSelector((state) => state.ticket);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [dataCount, setDataCount] = useState(0);
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

  const { data, isFetching } = useQuery(
    ["employee", ticketRedux.url],
    getUsersData
  );

  useEffect(() => {
    if (filteredData.length > 0) {
      setCurrentData(
        filteredData.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage
        )
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
      if (item.tickets_id.toLowerCase().includes(value.toLowerCase())) {
        return item.tickets_id.toLowerCase().includes(value.toLowerCase());
      }
      if (item.priority.toLowerCase().includes(value.toLowerCase())) {
        return item.priority.toLowerCase().includes(value.toLowerCase());
      }
      if (
        item.customer_project.project.name
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        return item.customer_project.project.name
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      if (
        item.customer_project.user.name
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        return item.customer_project.user.name
          .toLowerCase()
          .includes(value.toLowerCase());
      }
      if (
        item.customer_project.project.project_id
          .toLowerCase()
          .includes(value.toLowerCase())
      ) {
        return item.customer_project.project.project_id
          .toLowerCase()
          .includes(value.toLowerCase());
      }
    });
    setFilteredData(filtered);
    setDataCount(filtered.length);
  }, 1000);

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
                  <div className="col-4" key={index}>
                    <TicketList
                      projectName={`${i.customer_project.project.name} #${i.tickets_id}`}
                      userView
                      day={dayjs(i.created_at).fromNow()}
                      description={i.subject}
                      name={i.customer_project.user.name}
                      priority={i.priority}
                      status={i.status}
                      onClick={() => {
                        const employees = i.customer_project.project.employee_project.map(
                          (employee: any) => {
                            return { user_id: employee.user_id, name: employee.user.name };
                          }
                        );

                        dispatch(
                          setViewData({
                            ticketID: i.id,
                            employees,
                            time: dayjs(i.created_at).fromNow(),
                            userName: i.customer_project.user.name,
                            subject: i.subject,
                            description: i.description,
                            driveLink: i.drive_link,
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
        sif={TicketRedux.view === "ticket-create"}
        show={<TicketCreate/>}
      />
      <ShowIf sif={TicketRedux.view === "ticket-view"} show={<TicketView/>} />
    </>
  );
};

export default TicketPage;