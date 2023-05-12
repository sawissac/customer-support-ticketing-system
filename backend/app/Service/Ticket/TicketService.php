<?php

namespace App\Service\Ticket;

use App\Models\Ticket;

class TicketService implements TicketServiceInterface
{
    public function store($data)
    {
        return Ticket::create($data);
    }

    public function update($id, $data)
    {
        $result = Ticket::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = Ticket::where('id', $id)->first();

        return $data->delete();
    }
}
