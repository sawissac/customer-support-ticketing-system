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
        $data = CustomerProject::where('id',$id)->first();

        $customer = Ticket::where('customer_project_id', $data->id)->exists();

        if ($customer) {
            return false;
        }

        return $data->delete();
    }
}
