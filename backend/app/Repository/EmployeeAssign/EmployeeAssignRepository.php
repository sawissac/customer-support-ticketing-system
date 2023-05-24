<?php

namespace App\Repository\EmployeeAssign;

use App\Models\EmployeeAssign;


class EmployeeAssignRepository implements EmployeeAssignRepoInterface
{
    public function get()
    {
        $data = EmployeeAssign::with('employee', 'ticket')->get();

        return $data;
    }

    public function show($id)
    {
        $result = EmployeeAssign::with('user', 'ticket')->where('id', $id)->first();

        return $result;
    }

    public function employeeByTicketID($id)
    {
        $data = EmployeeAssign::where('ticket_id', $id)->with('employee')->get();

        return $data;
    }

    public function employeeByEmployee($id)
    {
        $data = EmployeeAssign::where('employee_id', $id)->with('ticket.customer_project.user','ticket.customer_project.project', 'ticket.admin', 'ticket.employee_assign', 'ticket.employee_assign.employee')->get();

        return $data;
    }
}
