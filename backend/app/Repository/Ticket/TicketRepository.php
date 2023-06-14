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
        $result = Ticket::with('admin', 'customer_project.user', 'customer_project.project', 'customer_project.project.employee_project.user')
            ->where('id', $id)
            ->first();

        return $result;
    }

    public function checkTicketList()
    {
        $monthlyTickets = Ticket::selectRaw('MONTH(created_at) as month, YEAR(created_at) as year, COUNT(*) as ticket_count')
            ->groupBy('month', 'year')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        $checkData = $monthlyTickets->map(function ($tickets) {
            $monthYear = Carbon::create($tickets->year, $tickets->month)->format('M Y');
            return [
                'month_year' => $monthYear,
                'ticket_count' => $tickets->ticket_count,
            ];
        });

        return $checkData;
    }

    public function checkDate($id)
    {
        $result = Ticket::selectRaw('MIN(start_date) as start_date, MAX(end_date) as end_date')
            ->where('id', $id)
            ->first();

        return $result;
    }

    public function customerMonthlyTicket($id)
    {
        $monthlyTickets = Ticket::join('customer_projects', 'tickets.customer_project_id', '=', 'customer_projects.id')
            ->join('users', 'customer_projects.user_id', '=', 'users.id')
            ->selectRaw('MONTH(tickets.created_at) as month, YEAR(tickets.created_at) as year, COUNT(*) as ticket_count')
            ->where('users.id', $id)
            ->groupBy('month', 'year')
            ->orderBy('year', 'asc')
            ->orderBy('month', 'asc')
            ->get();

        $data = $monthlyTickets->map(function ($tickets) {
            $monthYear = Carbon::create($tickets->year, $tickets->month)->format('M Y');
            return [
                'month_year' => $monthYear,
                'ticket_count' => $tickets->ticket_count,
            ];
        });

        return $data;
    }
}
