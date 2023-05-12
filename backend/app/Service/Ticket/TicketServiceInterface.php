<?php

namespace App\Service\Ticket;

interface TicketServiceInterface
{
    public function store($data);

    public function update($id, $data);

    public function delete($id);
}
