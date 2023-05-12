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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'tickets_id' => 'required|string',
                'customer_project_id' => 'required|integer',
                'subject' => 'required|string',
                'description' => 'required',
                'status' => 'required|string',
                'priority' => 'required|string',
                'ticket_start_date' => 'required|date_format:Y-m-d',
                'ticket_end_date' => 'required|date_format:Y-m-d',
            ]
        );

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->ticketService->store($validate);

        return $this->sendResponse($data, 'Ticket created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->ticketRepo->show($id);

        if (is_null($result)) {
            return $this->sendError('Ticket not found.');
        }

        return $this->sendResponse($result, 'Ticket retrieved successfully.');
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'tickets_id' => 'required|string',
                'customer_project_id' => 'required|integer',
                'subject' => 'required|string',
                'description' => 'required',
                'status' => 'required|string',
                'priority' => 'required|string',
                'ticket_start_date' => 'required|date_format:Y-m-d',
                'ticket_end_date' => 'required|date_format:Y-m-d',
            ]
        );

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->ticketService->update($id, $validate);

        return $this->sendResponse($data, 'Ticket updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->ticketService->delete($id);

        return $this->sendResponse([], 'Ticket deleted successfully.');
    }
}