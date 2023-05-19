<?php

namespace App\Repository\Ticket;

use App\Models\Ticket;

class TicketRepository implements TicketRepositoryInterface
{
    public function get()
    {
        $data = Ticket::with('customer_project.user',"customer_project.project")->get();

        return $data;
    }

    public function show($id)
    {
        $result = Ticket::with('customer_project')->where('id', $id)->first();

        return $result;
    }


}
