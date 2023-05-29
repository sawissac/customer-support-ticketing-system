import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AdminDashboard from "./pages/admin-dashboard";
import LoginPage from "./pages/LoginPage";
import UiBoot from "./components/UiBoot";
import { useAppSelector } from "./redux/hook";
import { AuthRole } from "./redux/variable/AuthVariable";
import AppAlert from "./components/AppAlert";
import ShowIf from "./components/Helper";
import { Theme } from "./redux/variable/ThemeVariable";
import { PageNotFound } from "./pages/404Page";
import EmployeeDashboard from "./pages/employee-dashboard";
import CustomerDashboard from "./pages/customer-dashboard";
import { useQuery } from "react-query";
import { Oval } from "react-loader-spinner";

function LoadingPage() {
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
function fetchData() {
  // Simulating an asynchronous data fetch
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(""); // Resolve the promise after a certain delay
    }, 2000); // Simulated delay of 2 seconds
  });
}

function App() {
  const authRedux = useAppSelector((state) => state.auth);
  const alertRedux = useAppSelector((state) => state.alert);
  const themeRedux = useAppSelector((state) => state.theme);

  const [isLoadingData, setIsLoadingData] = useState(true);

  useQuery("myData", fetchData, {
    onSuccess: () => {
      setIsLoadingData(false);
    },
  });

  return (
    <div className={`app ${themeRedux === Theme.Dark ? "app--dark" : ""}`}>
      <UiBoot>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace={true} />} />
          <Route path="/login" element={<LoginPage />} />
          {authRedux.role === AuthRole.ADMIN && (
            <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
          )}
          {authRedux.role === AuthRole.EMPLOYEE && (
            <Route
              path="/employee-dashboard/*"
              element={<EmployeeDashboard />}
            />
          )}
          {authRedux.role === AuthRole.CUSTOMER && (
            <Route
              path="/customer-dashboard/*"
              element={<CustomerDashboard />}
            />
          )}
          <Route
            path="*"
            element={isLoadingData ? <LoadingPage /> : <PageNotFound />}
          />
        </Routes>
        <ShowIf sif={alertRedux.show} show={<AppAlert />} />
      </UiBoot>
    </div>
  );
}

export default App;
