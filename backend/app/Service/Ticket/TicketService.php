<?php

namespace App\Service\Ticket;

use App\Models\Ticket;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class TicketService implements TicketServiceInterface
{
    public function store($data)
    {
        $tickets_id = Str::random(3) . mt_rand(10000, 99999);
        $data['tickets_id'] = $tickets_id;
<<<<<<< HEAD
        if($data['drive_link'])
        {
            $fileName = time(). '.' .$data['drive_link']->extension();
            $data['drive_link']->storeAs('public/ticket_file', $fileName);
            $data = array_merge($data, ['drive_link' => $fileName]);
        }
=======
>>>>>>> main

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
<<<<<<< HEAD
=======

>>>>>>> main
        return $data->delete();
    }
}
