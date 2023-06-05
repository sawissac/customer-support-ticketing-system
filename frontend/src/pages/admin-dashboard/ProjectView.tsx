import Nav from "../../components/Nav";
import { IconArrowLeft, IconUserCog, IconUsersGroup } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { setProjectView } from "../../redux/feature_slice/ProjectPageSlice";
import { useAppSelector } from "../../redux/hook";
import { motion } from "framer-motion";
import ProjectDetailCard from "../../components/ProjectDetailCard";
import axios from "axios";
import { useQuery } from "react-query";
import { Oval } from "react-loader-spinner";
import { useEffect, useState } from "react";

export const ProjectView = () => {
  const dispatch = useDispatch();
  const projectPageRedux = useAppSelector((state) => state.projectSidebar);
  const authRedux = useAppSelector((state) => state.auth);
  const [detail, setDetail] = useState<any>();

  const getTicketsData = async () => {
    const res = await axios
      .get(`http://127.0.0.1:8000/api/project/${projectPageRedux.project_id}`, {
        headers: {
          Authorization: `Bearer ${authRedux.token}`,
        },
      })
      .then((response) => {
        return response.data;
      });
    return res;
  };

  const { data, isFetching } = useQuery(["detail", "get"], getTicketsData);

  useEffect(() => {
    if (data) {
      setDetail(data);
    }
  }, [data, projectPageRedux.id]);
  
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
    <div className="admin-container">
      <Nav
        icon={<IconArrowLeft size={25} />}
        label="Project Detail"
        onClick={() => {
          dispatch(setProjectView({ name: "" }));
        }}
      />
      <motion.div
        initial={{ y: "30px", opacity: 0 }}
        animate={{ y: "0px", opacity: 1 }}
        className="admin-container__inner"
      >
        <div className="admin-container__inner">
          <fieldset className="fieldset-timer">
            <legend className="legend-timer legend-timer--project">
              {projectPageRedux.project_name}
            </legend>
          </fieldset>
          <div className="admin-container__inner__project-detail">
            <div className="admin-container__inner__project-detail__detail-customers">
              <div className="title1">
                <h5>{detail?.data?.customer_project?.length ? "Customers" : "No Customers List"}</h5>
                <IconUsersGroup size={35} />
              </div>
              <div className="list">
                {detail?.data?.customer_project?.map(
                  (item: any, index: number) => {
                    return (
                      <ProjectDetailCard name={item.user.name} id={index + 1} key={index}/>
                    );
                  }
                )}
              </div>
            </div>

            <div className="admin-container__inner__project-detail__detail-employees">
              <div className="title2">
                <h5>{detail?.data?.employee_project?.length ? "Employees" : "No Employees List"}</h5>
                <IconUserCog size={35} />
              </div>
              <div className="list">
                
                {detail?.data?.employee_project?.map(
                  (item: any, index: number) => {
                    return (
                      <ProjectDetailCard name={item.user.name} id={index + 1} key={index}/>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
