<?php

namespace App\Repository\Ticket;

use App\Models\Ticket;

class TicketRepository implements TicketRepositoryInterface
{
    public function get($perPage = 10)
    {
        $data = Ticket::with('admin', 'customer_project.user', 'customer_project.project', 'customer_project.project.employee_project.user','employee_assign')
            ->orderBy('id', 'desc')
            ->get();

        return $data;
    }

    public function show($id)
    {
        $result = Ticket::with('customer_project')->where('id', $id)->first();

        return $result;
    }
}
