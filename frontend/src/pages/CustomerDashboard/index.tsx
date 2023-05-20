import React from 'react'
import SideBar from './Sidebar'
import { Route, Routes } from 'react-router-dom'
import { PageNotFound } from '../404Page'
import TicketsPage from './TicketsPage'

const CustomerDashboard = () => {
  return (
    <>
      <SideBar route={`/customer-dashboard`} />
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

export default CustomerDashboard