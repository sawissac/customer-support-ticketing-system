<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\BaseController;
use App\Service\Ticket\TicketServiceInterface;
use App\Repository\Ticket\TicketRepositoryInterface;

class TicketController extends BaseController
{

    private $ticketRepo, $ticketService;
    public function __construct(TicketRepositoryInterface $ticketRepo, TicketServiceInterface $ticketService)
    {
        $this->ticketRepo = $ticketRepo;
        $this->ticketService = $ticketService;
        $this->middleware('permission:canShowTickets', ['only' => ['index', 'show', 'getTickets']]);
        $this->middleware('permission:canCreateTickets', ['only' => ['create,store']]);
        $this->middleware('permission:canUpdateTickets', ['only' => ['edit,update']]);
        $this->middleware('permission:canDeleteTickets', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = $this->ticketRepo->get($request);

        return $this->sendResponse($data, 'Tickets retrieved successfully.');
    }

    public function store(Request $request)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'tickets_id' => 'string|unique',
                'customer_project_id' => 'required|integer',
                'subject' => 'required|string',
                'description' => 'required',
                'zip_file' => 'nullable|file|mimes:zip|max:2048',
                'status' => 'required|string',
                'priority' => 'required|string',
                'drive_link' => 'file',
                'ticket_start_date' => 'nullable|date_format:Y-m-d',
                'ticket_end_date' => 'nullable|date_format:Y-m-d',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->ticketService->store($validate);

        return $this->sendResponse($data, 'Ticket created successfully.', 201);
    }


    public function show($id)
    {
        $result = $this->ticketRepo->show($id);

        if (is_null($result)) {
            return $this->sendError('Ticket not found.');
        }

        return $this->sendResponse($result, 'Ticket retrieved successfully.');
    }


    public function update(Request $request, $id)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'tickets_id' => 'string',
                'customer_project_id' => 'required|integer',
                'subject' => 'required|string',
                'description' => 'required',
                'zip_file' => 'nullable|file|mimes:zip|max:2048',
                'status' => 'required|string',
                'priority' => 'required|string',
                'ticket_start_date' => 'nullable|date_format:Y-m-d',
                'ticket_end_date' => 'nullable|date_format:Y-m-d',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->ticketService->update($id, $validate);

        return $this->sendResponse($data, 'Ticket updated successfully.');
    }

    public function destroy($id)
    {
        $this->ticketService->delete($id);

        return $this->sendResponse([], 'Ticket deleted successfully.');
    }

    public function getTickets(Request $request)
    {
        $data = $this->ticketRepo->getTickets($request);

        return $this->sendResponse($data, 'Tickets pagination....');
    }
}
