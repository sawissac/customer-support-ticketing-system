<?php

namespace App\Repository\Ticket;

use App\Models\Ticket;

class TicketRepository implements TicketRepositoryInterface
{
    public function get()
    {
        $data = Ticket::with('customer_project')->get();

        return $data;
    }

    public function show($id)
    {
        $result = Ticket::with('customerProject')->where('id', $id)->first();

        return $result;
    }
}
