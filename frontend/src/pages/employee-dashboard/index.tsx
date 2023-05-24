import SideBar from './Sidebar'
import { Route, Routes } from 'react-router-dom'
import { PageNotFound } from '../404Page'
import TicketsPage from './Ticket'
import Task from './Task'

const EmployeeDashboard = () => {
  return (
    <>
      <SideBar route={`/employee-dashboard`} />
      <Routes> 
        <Route
          path="/tickets"
          element={<TicketsPage />}
        />
        <Route
          path="/employee-assignment"
          element={<Task />}
        />
        <Route
          path="/*"
          element={<PageNotFound/>}
        />
      </Routes>
    </>
  )
}

export default EmployeeDashboard