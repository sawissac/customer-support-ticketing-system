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
    public function index()
    {
        $data = $this->ticketRepo->get();

        return $this->sendResponse($data, 'Tickets retrieved successfully.');
    }

    public function store(Request $request)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'customer_project_id' => 'required',
                'subject' => 'required',
                'description' => 'required',
                'status' => 'nullable',
                'priority' => 'nullable',
                'drive_link' => 'nullable',
                'admin_id' => 'nullabe',
                'start_date' => 'nullable',
                'end_date' => 'nullable',
            ],
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $data = $this->ticketService->store($validate);

        return $this->sendResponse($data, 'Ticket created successfully.', 201);
    }


    public function show($id)
    {
        $result = $this->ticketRepo->show($id);

        if (is_null($result)) {
            return $this->sendError('Ticket not found.', [], 500);
        }

        return $this->sendResponse($result, 'Ticket retrieved successfully.');
    }

    public function update(Request $request, $id)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'customer_project_id' => 'required',
                'subject' => 'required',
                'description' => 'required',
                'status' => 'nullable',
                'priority' => 'nullable',
                'drive_link' => 'nullable',
                'admin_id' => 'nullable',
                'start_date' => 'nullable',
                'end_date' => 'nullable',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $data = $this->ticketService->update($id, $validate);

        return $this->sendResponse($data, 'Ticket updated successfully.',200);
    }

    public function destroy($id)
    {
        $this->ticketService->delete($id);

        return $this->sendResponse([], 'Ticket deleted successfully.', 204);
    }

    public function checkTicketList()
    {
        $result = $this->ticketRepo->checkTicketList();

        return $this->sendResponse($result,'Monthly Tickets successfully.',200);
    }

    public function checkDate($id)
    {
        $result = $this->ticketRepo->checkDate($id);

        return $this->sendResponse($result, 'Tickets of Date successfully.',200);
    }
}
