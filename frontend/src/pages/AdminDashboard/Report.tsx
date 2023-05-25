import { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import axios from "axios";
import { useAppSelector } from "../../redux/hook";
import { useQuery } from "react-query";
import { Oval } from "react-loader-spinner";
import ReportCard from "../../components/ReportCard";
import {
  IconFolder,
  IconTicket,
  IconTicketOff,
  IconUser,
  IconUserCog,
  IconUserExclamation,
  IconUsers,
} from "@tabler/icons-react";

const Report = () => {
  const authRedux = useAppSelector((state) => state.auth);

  const [openTicket, setOpenTicket] = useState(0);
  const [closeTicket, setCloseTicket] = useState(0);
  const [processingTicket, setProcessingTicket] = useState(0);
  const [doneTicket, setDoneTicket] = useState(0);
  const [fixedTicket, setFixedTicket] = useState(0);
  const [confirmTicket, setConfirmTicket] = useState(0);

  const [unassignTicket, setUnassignTicket] = useState(0);
  const [assignTicket, setAssignTicket] = useState(0);

  const [lowPriority, setLowPriority] = useState(0);
  const [mediumPriority, setMediumPriority] = useState(0);
  const [highPriority, setHighPriority] = useState(0);
  const [criticalPriority, setCriticalPriority] = useState(0);

  const [admin, setAdmin] = useState(0);
  const [employee, setEmployee] = useState(0);
  const [customer, setCustomer] = useState(0);
  const [resign, setResign] = useState(0);

  const url = "http://127.0.0.1:8000/api/ticket";

  const getTicketsData = async () => {
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
  const { data: ticketData, isFetching: isFetchingTicket } = useQuery(
    ["tickets-report", "get"],
    getTicketsData
  );

  useEffect(() => {
    if (ticketData) {
      setOpenTicket(
        ticketData.data.filter((item: any) => item.status === "open").length
      );
      setProcessingTicket(
        ticketData.data.filter((item: any) => item.status === "processing")
          .length
      );
      setDoneTicket(
        ticketData.data.filter(
          (item: any) =>
          item.status ==="processing" &&
            item.employee_assign.length > 0 &&
            item.employee_assign.every((assign: any) => {
              return assign.status === "done";
            })
        ).length
      );
      setFixedTicket(
        ticketData.data.filter((item: any) => item.status === "fixed").length
      );
      setConfirmTicket(
        ticketData.data.filter((item: any) => item.status === "confirm").length
      );
      setCloseTicket(
        ticketData.data.filter((item: any) => item.status === "close").length
      );
      setLowPriority(
        ticketData.data.filter((item: any) => item.priority === "low").length
      );
      setMediumPriority(
        ticketData.data.filter((item: any) => item.priority === "medium").length
      );
      setHighPriority(
        ticketData.data.filter((item: any) => item.priority === "high").length
      );
      setCriticalPriority(
        ticketData.data.filter((item: any) => item.priority === "critical")
          .length
      );
      setUnassignTicket(
        ticketData.data.filter((item: any) => item.employee_assign.length === 0)
          .length
      );
      setAssignTicket(
        ticketData.data.filter(
          (item: any) =>
            item.status !== "close" && item.employee_assign.length > 0
        ).length
      );
    }
  }, [ticketData]);

  const getProjectData = async () => {
    const res = await axios
      .get("http://127.0.0.1:8000/api/project", {
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
    return res;
  };

  const { data: projectData, isFetching: isFetchingProject } = useQuery(
    ["project-report", "get"],
    getProjectData
  );

  const getUserData = async () => {
    const res = await axios
      .get("http://127.0.0.1:8000/api/user", {
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
    return res;
  };

  const { data: userData, isFetching: isFetchingUser } = useQuery(
    ["user-report", "get"],
    getUserData
  );

  useEffect(() => {
    if (userData) {
      setAdmin(
        userData.data.filter((item: any) => item.roles[0].name === "admin")
          .length
      );
      setEmployee(
        userData.data.filter((item: any) => item.roles[0].name === "employee")
          .length
      );
      setCustomer(
        userData.data.filter((item: any) => item.roles[0].name === "customer")
          .length
      );
      setResign(
        userData.data.filter(
          (item: any) => item.roles[0].name === "resign_employee"
        ).length
      );
    }
  }, [userData]);

  if (isFetchingTicket || isFetchingProject || isFetchingUser) {
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

  console.log(doneTicket);

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  const statusData = {
    labels: ["Open", "Processing", "Done", "Fixed", "Confirm", "Close"],
    datasets: [
      {
        label: "Tickets",
        data: [
          openTicket,
          processingTicket,
          doneTicket,
          fixedTicket,
          confirmTicket,
          closeTicket,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(0, 0,0, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235,1)",
          "rgba(153, 102, 255, 1)",
          "rgba(0, 0,0, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const priorityData = {
    labels: ["Low", "Medium", "High", "Critical"],
    datasets: [
      {
        label: "Priority",
        data: [lowPriority, mediumPriority, highPriority, criticalPriority],
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Tickets count',
      },
    },
  };
  
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec'];
  
   const areaChartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Monthly Tickets',
        data: [0,2,1,4,5,9,2,5,12,3,6,10],
        borderColor: 'rgb(243, 112, 33)',
        backgroundColor: 'rgba(243, 112, 33, 0.5)',
        pointBorderWidth:5,
        pointHoverRadius:10,
        
      },
    ],
  };

  return (
    <div className="admin-container">
      <div className="admin-container__inner row row--gap-1 admin-container--pb-5">
        <div className="col-3">
          <ReportCard
            icon={<IconTicket size={35} />}
            label="Total Ticket"
            total={ticketData.data.length}
          />
        </div>
        <div className="col-3">
          <ReportCard
            icon={<IconTicketOff size={35} />}
            label="Unassign Ticket"
            total={unassignTicket}
          />
        </div>
        <div className="col-3">
          <ReportCard
            icon={<IconTicket size={35} />}
            label="Assign Ticket"
            total={assignTicket}
          />
        </div>
        <div className="col-3">
          <ReportCard
            icon={<IconFolder size={35} />}
            label="Total Project"
            total={projectData.data.length}
          />
        </div>
        <div className="col-3">
          <ReportCard
            icon={<IconUser size={35} />}
            label="Total Admin"
            total={admin}
          />
        </div>
        <div className="col-3">
          <ReportCard
            icon={<IconUserCog size={35} />}
            label="Total Employee"
            total={employee}
          />
        </div>
        <div className="col-3">
          <ReportCard
            icon={<IconUsers size={35} />}
            label="Total Customer"
            total={customer}
          />
        </div>
        <div className="col-3">
          <ReportCard
            icon={<IconUserExclamation size={35} />}
            label="Resign Employee"
            total={resign}
          />
        </div>

        <div className="piechart-container">
          <div className="piechart-container__inner">
            <div className="piechart-container__inner__piechart--chart">
              <Pie data={statusData} />
            </div>
            <div className="piechart-container__inner__piechart piechart-container__inner__piechart--border">
              <h3>Status</h3>
              <label htmlFor="">Open: {openTicket}</label>
              <label htmlFor="">Processing: {processingTicket}</label>
              <label htmlFor="">Done: {doneTicket}</label>
              <label htmlFor="">Fixed: {fixedTicket}</label>
              <label htmlFor="">Confirm: {confirmTicket}</label>
              <label htmlFor="">Close: {closeTicket}</label>
            </div>
          </div>
        </div>

        <div className="piechart-container">
          <div className="piechart-container__inner">
            <div className="piechart-container__inner__piechart--chart">
              <Pie data={priorityData} />
            </div>
            <div className="piechart-container__inner__piechart piechart-container__inner__piechart--border">
              <h3>Priority</h3>
              <label htmlFor="">Low: {lowPriority}</label>
              <label htmlFor="">Medium: {mediumPriority}</label>
              <label htmlFor="">High: {highPriority}</label>
              <label htmlFor="">Critical: {criticalPriority}</label>
            </div>
          </div>
        </div>
        <Line data={areaChartData} options={options}/>
      </div>
      
    </div>
  );
};
export default Report;
