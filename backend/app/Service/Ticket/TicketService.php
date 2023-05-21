<?php

namespace App\Service\Ticket;

use App\Models\Ticket;
use Illuminate\Support\Str;

class TicketService implements TicketServiceInterface
{
    public function store($data)
    {
        $tickets_id = Str::random(3) . mt_rand(10000, 99999);
        $data['tickets_id'] = $tickets_id;
        $data['status'] = "open";
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

        if (!empty($data->zip_file)) {
            $filePath = public_path('storage/ticket_file/' . $data->drive_link);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }

        return $data->delete();
    }
}
