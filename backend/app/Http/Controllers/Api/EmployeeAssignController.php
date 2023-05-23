<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\BaseController;

use App\Repository\EmployeeAssign\EmployeeAssignRepoInterface;
use App\Service\EmployeeAssign\EmployeeAssignServiceInterface;

class EmployeeAssignController extends BaseController
{
    private $employeeAssignRepo, $employeeAssignService;

    public function __construct(EmployeeAssignRepoInterface $employeeAssignRepo, EmployeeAssignServiceInterface $employeeAssignService)
    {
        $this->employeeAssignRepo = $employeeAssignRepo;
        $this->employeeAssignService = $employeeAssignService;
        $this->middleware('permission:canShowAssignEmployee', ['only' => ['index', 'show']]);
        $this->middleware('permission:canCreateAssignEmployee', ['only' => ['create,store']]);
        $this->middleware('permission:canUpdateAssignEmployee', ['only' => ['edit,update']]);
        $this->middleware('permission:canDeleteAssignEmployee', ['only' => ['destroy']]);
    }

    public function index()
    {
        $data = $this->employeeAssignRepo->get();

        return $this->sendResponse($data, 'Employee Assgin List successfully.');
    }

    public function store(Request $request)
    {

        $data = $request->all();

        $validator = Validator::make($data, [
            'employee_id' => 'required',
            'ticket_id' => 'required',
            'status' => 'required',
            'task_name' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $result = $this->employeeAssignService->store($data);

        return $this->sendResponse($result, 'Employee Assgin created successfully.', 201);

    }

    public function show($id)
    {

        $data = $this->employeeAssignRepo->show($id);

        if (is_null($id)) {

            return $this->sendError('Employee Assgin not found.', [], 500);
        }

        return $this->sendResponse($data, 'Employee Assgin Show successfully.');
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'employee_id' => 'required',
            'ticket_id' => 'required',
            'status' => 'required|string',
            'task_name' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $result = $this->employeeAssignService->update($id, $data);

        return $this->sendResponse($result, 'Employee Assgin Update successfully.');
    }

    public function destroy($id)
    {
        $data = $this->employeeAssignService->delete($id);

        return $this->sendResponse([],'Employee Assgin Delete successfully.', 204);
    }

    public function ticket($id)
    {
        $data = $this->employeeAssignRepo->employeeByTicketID($id);

        return $this->sendResponse($data, 'Ticket retrieved successfully.');
    }
}
