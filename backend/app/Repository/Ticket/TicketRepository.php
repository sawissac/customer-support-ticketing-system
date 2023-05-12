<?php

namespace App\Repository\Ticket;

use App\Models\Ticket;

class TicketRepository implements TicketRepositoryInterface
{
    public function get()
    {
        $data = Ticket::all();

        return $data;
    }

    public function show($id)
    {
        $result = Ticket::where('id', $id)->first();

        return $result;
    }
}
