<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;
use App\Repository\EmployeeAssign\EmployeeAssignRepoInterface;
use App\Service\EmployeeAssign\EmployeeAssignServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
            'user_id' => 'required',
            'tickets_id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $result = $this->employeeAssignService->store($data);

        return $this->sendResponse($result, 'Employee Assgin created successfully.', 201);
    }

    public function show($id)
    {

        $data = $this->employeeAssignRepo->show($id);

        if (is_null($id)) {

            return $this->sendError('Employee Assgin not found.');
        }

        return $this->sendResponse($data, 'Employee Assgin Show successfully.');
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'user_id' => 'required',
            'tickets_id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $result = $this->employeeAssignService->update($id, $data);

        return $this->sendResponse($result, 'Employee Assgin Update successfully.');
    }

    public function destroy($id)
    {
        $data = $this->employeeAssignService->delete($id);

        if (is_null($data)) {
            return $this->sendError('Employee Assgin Not found.');
        }

        return $this->sendResponse($data, 'Employee Assgin Delete successfully.', 204);
    }
}