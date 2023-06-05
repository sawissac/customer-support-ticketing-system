<?php

namespace App\Service\Ticket;

use App\Models\Ticket;
use Illuminate\Support\Str;
class TicketService implements TicketServiceInterface
{
    public function store($data)
    {
        $tickets_id = Str::lower(Str::random(3)) . mt_rand(1000, 9999);
        $data['tickets_id'] = $tickets_id;
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
