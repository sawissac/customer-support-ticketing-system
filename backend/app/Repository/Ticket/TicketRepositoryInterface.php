<?php

namespace App\Repository\Ticket;

interface TicketRepositoryInterface
{
    public function get();

    public function show($id);

    public function checkTicketList();

    public function checkDate($id);
}
