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
import { IconFolder, IconTicket } from "@tabler/icons-react";

const Report = () => {
  const authRedux = useAppSelector((state) => state.auth);
  const [openTicket, setOpenTicket] = useState(0);
  const [closeTicket, setCloseTicket] = useState(0);
  const [processingTicket, setProcessingTicket] = useState(0);

  const [lowPriority, setLowPriority] = useState(0);
  const [mediumPriority, setMediumPriority] = useState(0);
  const [highPriority, setHighPriority] = useState(0);
  const [criticalPriority, setCriticalPriority] = useState(0);

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
  const { data, isFetching } = useQuery(
    ["tickets-report", "get"],
    getTicketsData
  );

  useEffect(() => {
    if (data) {
      setOpenTicket(
        data.data.filter((item: any) => item.status === "open").length
      );
      setProcessingTicket(
        data.data.filter((item: any) => item.status === "processing").length
      );
      setCloseTicket(
        data.data.filter((item: any) => item.status === "close").length
      );
      setLowPriority(
        data.data.filter((item: any) => item.priority === "low").length
      );
      setMediumPriority(
        data.data.filter((item: any) => item.priority === "medium").length
      );
      setHighPriority(
        data.data.filter((item: any) => item.priority === "high").length
      );
      setCriticalPriority(
        data.data.filter((item: any) => item.priority === "critical").length
      );
    }
  }, [data]);

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

  console.log(openTicket);

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const statusData = {
    labels: ["Open", "Processing", "Close"],
    datasets: [
      {
        label: "Tickets",
        data: [openTicket, processingTicket, closeTicket],
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
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

  return (
    <div className="admin-container">
      <div className="admin-container__inner row row--gap-1 admin-container--pb-5">
        <div className="col-3">
          <ReportCard
            icon={<IconFolder size={35} />}
            label="Total Project"
            total={1}
          />
        </div>
        <div className="col-3">
          <ReportCard
            icon={<IconFolder size={35} />}
            label="Total Project"
            total={1}
          />
        </div>
        <div className="col-3">
          <ReportCard
            icon={<IconFolder size={35} />}
            label="Total Project"
            total={1}
          />
        </div>
        <div className="col-3">
          <ReportCard
            icon={<IconFolder size={35} />}
            label="Total Project"
            total={1}
          />
        </div>
        <div className="col-3">
          <div className="piechart">
            <Pie data={statusData} />
          </div>
        </div>
        <div className="col-3">
        <div className="piechart piechart--border">
            <label htmlFor="">Open:{openTicket}</label>
            <label htmlFor="">Processing:{processingTicket}</label>
            <label htmlFor="">Close:{closeTicket}</label>
          </div>
        </div>
        <div className="col-3">
          <div className="piechart">
            <Pie data={priorityData} />
          </div>
        </div>
        <div className="col-3">
        <div className="piechart piechart--border">
            <label htmlFor="">Low:{lowPriority}</label>
            <label htmlFor="">Medium:{mediumPriority}</label>
            <label htmlFor="">High:{highPriority}</label>
            <label htmlFor="">Critical:{criticalPriority}</label>
          </div>
        </div>
      </div>
      {/* <div className="admin-container__report">
        <div className="admin-container__report__cards ">
          <div className="card">
            <ReportCard
              icon={<IconFolder size={35} />}
              label="Total Project"
              total={1}
            />
            <ReportCard
              icon={<IconTicket size={35} />}
              label="Total Ticket"
              total={1}
            />
          </div>
          <div className="card">
            <ReportCard
              icon={<IconFolder size={35} />}
              label="Total Employee"
              total={1}
            />
            <ReportCard
              icon={<IconTicket size={35} />}
              label="Total Customer"
              total={1}
            />
          </div>
        </div>
        <div className="admin-container__report__chart">
          <div className="piechart">
            <Pie data={statusData} />
          </div>
          <div className="piechart">
            <Pie data={priorityData} />
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default Report;
