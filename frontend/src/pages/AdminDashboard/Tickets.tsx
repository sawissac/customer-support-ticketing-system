import { useState } from "react";
import Nav from "../../components/Nav";
import TicketList from "../../components/TicketList";
import { IconChevronsLeft, IconMessage2, IconPlus } from "@tabler/icons-react";
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
import ReactPaginate from "react-paginate";
import Input from "../../components/Input";

dayjs.extend(relativeTime);

const TicketPage = () => {
  const TicketRedux = useAppSelector((state) => state.ticket);
  const dispatch = useAppDispatch();
  const authRedux = useAppSelector((state) => state.auth);
  // const [page, setPage] = React.useState(0);
  // const [page] = React.useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

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
      })
      .catch(() => []);
    return res;
  };
  const { data, isFetching } = useQuery(["employee", "hello"], getUsersData);
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
    setCurrentPage(0);
  };

  const filteredData = data.data.filter((item: any) => {
    if(item.tickets_id.toLowerCase().includes(searchQuery.toLowerCase())){
      return item.tickets_id.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if(item.priority.toLowerCase().includes(searchQuery.toLowerCase())){
      return item.priority.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if(item.customer_project.project.name.toLowerCase().includes(searchQuery.toLowerCase())){
      return item.customer_project.project.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    if(item.customer_project.user.name.toLowerCase().includes(searchQuery.toLowerCase())){
      return item.customer_project.user.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
  });
  
  const currentData = filteredData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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

            <div>
              <Input
                 type="text"
                 placeholder="Search..."
                 value={searchQuery}
                 onChange={handleSearchChange}
                 className="search"
              />
            </div>

            <div className="admin-container__inner row row--gap-1 admin-container--pb-5">
              {currentData.map((i: any) => (
                <div className="col-4" key={i.id}>
                  <TicketList
                    projectName={i.customer_project.project.name}
                    userView
                    day={dayjs(i.created_at).fromNow()}
                    description={i.description}
                    name={i.customer_project.user.name}
                    priority={i.priority}
                    status={i.status}
                    links="/admin-dashboard/ticket-view"
                  />
                </div>
              ))}
            </div>

            <ReactPaginate
              previousLabel="Previous"
              nextLabel="Next"
              breakLabel="..."
              pageCount={searchQuery ? Math.ceil(filteredData.length / itemsPerPage) : Math.ceil(data.data.length / itemsPerPage)}
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
