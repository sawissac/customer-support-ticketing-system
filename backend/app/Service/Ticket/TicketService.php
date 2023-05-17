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

        // if ($data['zip_file']) {
        //     $fileName = $data['zip_file']->getClientOriginalName();
        //     $data['zip_file']->storeAs('public/ticket_files', $fileName);
        //     $data['zip_file'] = $fileName;

        //     $data['url'] = Storage::url('ticket_files/' . $fileName);
        // };
        
        if($data['drive_link'])
        {
            $imageName = time(). '.' .$data['drive_link']->extension();
            $data['drive_link']->storeAs('public/ticket_file', $imageName);
            $data = array_merge($data, ['drive_link' => $imageName]);
        }

        return Ticket::create($data);
    }

    public function update($id, $data)
    {
        $result = Ticket::where('id', $id)->first();

        if ($result['zip_file']) {
            $fileName = $result['zip_file']->getClientOriginalName();
            $result['zip_file']->storeAs('public/ticket_files', $fileName);
            $result['zip_file'] = $fileName;

            $data['url'] = Storage::url('ticket_files/' . $fileName);
        };

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = Ticket::where('id', $id)->first();

        if (!empty($data->zip_file)) {
            $filePath = public_path('storage/ticket_files/' . $data->zip_file);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }

        return $data->delete();
    }
}
