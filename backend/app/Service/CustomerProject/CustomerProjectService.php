<?php

namespace App\Service\CustomerProject;

use App\Models\Ticket;
use App\Models\CustomerProject;

class CustomerProjectService implements CustomerProjectServiceInterface
{
    public function store($data)
    {
        return CustomerProject::create($data);
    }

    public function update($id, $data)
    {
        $result = CustomerProject::where('id', $id)->first();

        return $result->update($data);
    }

    public function delete($id)
    {
        $data = CustomerProject::where('id', $id)->first();

        $isTicket = Ticket::where('customer_project_id', $id)->exists();

        if(!$isTicket) {
            return $data->delete();
        }
        return false;
    }
}
