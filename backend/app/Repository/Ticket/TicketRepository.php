<?php

namespace App\Repository\Ticket;

use App\Models\Ticket;

class TicketRepository implements TicketRepositoryInterface
{
    public function get()
    {
        $data = Ticket::with('customer_project.user',"customer_project.project","customer_project.project.employee_project.user")->orderBy('id','desc')->get();

        return $data;
    }

    public function show($id)
    {
        $result = Ticket::with('customer_project')->where('id', $id)->first();

        return $result;
    }

    public function getTickets($request)
    {
        // $perPage = $request->input('per_page', 9);

        $tickets = Ticket::with('customer_project')->paginate(6);

        return $tickets;
    }

}
