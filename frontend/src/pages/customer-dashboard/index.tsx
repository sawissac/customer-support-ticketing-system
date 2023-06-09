import { Route, Routes } from 'react-router-dom'
import { PageNotFound } from '../404Page'
import TicketsPage from './Ticket'
import SideBar from '../../components/SideBar'
import { sidebarConfig } from './SidebarConfig'

const CustomerDashboard = () => {
  return (
    <>
      <SideBar route={`/customer-dashboard`} subRoutes={sidebarConfig}/>
      <Routes> 
        <Route
          path="/tickets"
          element={<TicketsPage/>}
        />
        <Route
          path="/*"
          element={<PageNotFound/>}
        />
      </Routes>
    </>
  )
}

export default CustomerDashboard