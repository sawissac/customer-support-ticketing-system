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
        $this->middleware('permission:canShowAssignEmployee', ['only' => ['index', 'show', 'employee', 'ticket']]);
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
            'project_id' => 'required',
            'employee_id' => 'required',
            'ticket_id' => 'required',
            'status' => 'nullable',
            'task_name' => 'nullable',
            'start_date' => 'nullable',
            'end_date' => 'nullable',
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
            'status' => 'nullable',
            'task_name' => 'nullable',
            'start_date' => 'nullable',
            'end_date' => 'nullable',
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

        if($data){
            return $this->sendResponse($data,'Employee Assgin Delete successfully.');
        }else{
            return $this->sendError('Unable to delete employee assign', [], 400);
        }
    }

    public function ticket($id)
    {
        $data = $this->employeeAssignRepo->employeeByTicketID($id);

        if (is_null($data)) {
            return $this->sendError('Ticket not found.', [], 500);
        }

        return $this->sendResponse($data, 'Ticket retrieved successfully.');
    }

    public function employee($id)
    {
        $data = $this->employeeAssignRepo->employeeByEmployee($id);

        if (is_null($data)) {
            return $this->sendError('Employee not found.', [], 500);
        }

        return $this->sendResponse($data, 'Employee retrieved successfully.');
    }
}
