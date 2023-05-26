<?php

namespace App\Repository\Ticket;

use App\Models\Ticket;
use Illuminate\Support\Carbon;

class TicketRepository implements TicketRepositoryInterface
{
    public function get($perPage = 10)
    {
        $data = Ticket::with('admin', 'customer_project.user', 'customer_project.project', 'customer_project.project.employee_project.user', 'employee_assign')
            ->orderBy('id', 'desc')
            ->get();

        return $data;
    }

    public function show($id)
    {
        $result = Ticket::with('admin', 'customer_project.user', 'customer_project.project', 'customer_project.project.employee_project.user')->where('id', $id)->first();

        return $result;
    }
    public function checkTicketList()
    {
        $monthlyTickets = Ticket::get('MONTH(created_at) as month, YEAR(created_at) as year, COUNT(*) as ticket_count')
            ->groupBy('month', 'year')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc');

        $checkData = $monthlyTickets->map(function ($tickets) {
            $monthYear = Carbon::create($tickets->year, $tickets->month)->format('M Y');
            return [
                'month_year' => $monthYear,
                'ticket_count' => $tickets->ticket_count,
            ];
        });

        return $checkData;
    }
}
