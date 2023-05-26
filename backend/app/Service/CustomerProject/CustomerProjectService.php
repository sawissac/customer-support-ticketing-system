<?php

namespace App\Service\CustomerProject;

use App\Models\CustomerProject;
use App\Models\Ticket;

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
        // $data = CustomerProject::where('id', $id)->first();

        // return $data->delete();

        $data = CustomerProject::find($id);

        $userIsInTicket = Ticket::where('customer_project_id', $id)->exists();

        if( $userIsInTicket ) {
            return false;
        }

        return $data->delete();
    }
}
