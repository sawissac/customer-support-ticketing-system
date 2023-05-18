import React from 'react'
import SideBar from './Sidebar'
import { Route, Routes } from 'react-router-dom'
import { PageNotFound } from '../404Page'
import TicketsPage from './TicketsPage'

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
          path="/*"
          element={<PageNotFound/>}
        />
      </Routes>
    </>
  )
}

export default EmployeeDashboard