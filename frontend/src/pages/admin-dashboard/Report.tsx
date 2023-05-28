import { useState, useEffect } from "react";
import { Pie, Line} from "react-chartjs-2";
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
  BarElement,
} from "chart.js";
import axios from "axios";
import { useAppSelector } from "../../redux/hook";
import { useQuery } from "react-query";
import { Oval } from "react-loader-spinner";
import ReportCard from "../../components/ReportCard";
import {
  IconChartBar,
  IconFolder,
  IconTicket,
  IconTicketOff,
  IconUser,
  IconUserCog,
  IconUserExclamation,
  IconUsers,
} from "@tabler/icons-react";
import dayjs from "dayjs";
import Nav from "../../components/Nav";

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

  const [jan, setJan] = useState(0);
  const [feb, setFeb] = useState(0);
  const [mar, setMar] = useState(0);
  const [apr, setApr] = useState(0);
  const [may, setMay] = useState(0);
  const [jun, setJun] = useState(0);
  const [jul, setJul] = useState(0);
  const [aug, setAug] = useState(0);
  const [sep, setSep] = useState(0);
  const [oct, setOct] = useState(0);
  const [nov, setNov] = useState(0);
  const [dec, setDec] = useState(0);

  const year = dayjs().year();

  const urlTicket = "http://127.0.0.1:8000/api/ticket";
  const urlProject = "http://127.0.0.1:8000/api/project";
  const urlMonthlyTicke = "http://127.0.0.1:8000/api/monthly-ticket";
  const urlUser = "http://127.0.0.1:8000/api/user";

  const getTicketsData = async () => {
    const res = await axios
      .get(urlTicket, {
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
            item.status === "processing" &&
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
      .get(urlProject, {
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

  const getMonthlyTicketData = async () => {
    const res = await axios
      .get(urlMonthlyTicke, {
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
    return res;
  };

  const { data: monthlyTicketData, isFetching: isFetchingMonthlyTicket } =
    useQuery(["monthly-ticket", "get"], getMonthlyTicketData);

  useEffect(() => {
    if (monthlyTicketData && monthlyTicketData.data) {
      const janData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Jan " + year
      );
      setJan(janData ? janData.ticket_count : 0);

      const febData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Feb " + year
      );
      setFeb(febData ? febData.ticket_count : 0);

      const marData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Mar " + year
      );
      setMar(marData ? marData.ticket_count : 0);

      const aprData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Apr " + year
      );
      setApr(aprData ? aprData.ticket_count : 0);

      const mayData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "May " + year
      );
      setMay(mayData ? mayData.ticket_count : 0);

      const junData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Jun " + year
      );
      setJun(junData ? junData.ticket_count : 0);

      const julData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Jul " + year
      );
      setJul(julData ? julData.ticket_count : 0);

      const augData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Aug " + year
      );
      setAug(augData ? augData.ticket_count : 0);

      const sepData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Sep " + year
      );
      setSep(sepData ? sepData.ticket_count : 0);

      const octData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Oct " + year
      );
      setOct(octData ? octData.ticket_count : 0);

      const novData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Nov " + year
      );
      setNov(novData ? novData.ticket_count : 0);

      const decData = monthlyTicketData.data.find(
        (item: any) => item.month_year === "Dec " + year
      );
      setDec(decData ? decData.ticket_count : 0);
    }
  }, [monthlyTicketData]);

  const getUserData = async () => {
    const res = await axios
      .get(urlUser, {
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

  if (
    isFetchingTicket ||
    isFetchingProject ||
    isFetchingUser ||
    isFetchingMonthlyTicket
  ) {
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

  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    BarElement
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
          "rgba(243, 112, 33, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(54, 162, 235,1)",
          "rgba(153, 102, 255, 1)",
          "rgba(243, 112, 33, 1)",
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
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Monthly Tickets count",
      },
    },
  };

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const areaChartData = {
    labels,
    datasets: [
      {
        fill: true,
        label: year + " Monthly Tickets",
        data: [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec],
        borderColor: "rgb(243, 112, 33)",
        backgroundColor: "rgba(243, 112, 33, 0.5)",
        pointBorderWidth: 1,
        pointHoverRadius: 10,
      },
    ],
  };

  return (
    <div className="admin-container">
      <Nav icon={<IconChartBar />} label={"Reports"} />
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

        <div className="col-6">
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
        </div>
        <div className="col-6">
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
        </div>
        <div className="col-6">
          <Line data={areaChartData} options={options} />
        </div>

        <div className="monthly-detail col-6">
          <div className="monthly-detail__months">
            <label htmlFor="">January: {jan}</label>
            <label htmlFor="">February: {feb}</label>
            <label htmlFor="">March: {mar}</label>
            <label htmlFor="">April: {apr}</label>
            <label htmlFor="">May: {may}</label>
            <label htmlFor="">June: {jun}</label>
          </div>
          <div className="monthly-detail__months"> 
            <label htmlFor="">July: {jul}</label>
            <label htmlFor="">August: {aug}</label>
            <label htmlFor="">September: {sep}</label>
            <label htmlFor="">October: {oct}</label>
            <label htmlFor="">November: {nov}</label>
            <label htmlFor="">December: {dec}</label>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Report;
