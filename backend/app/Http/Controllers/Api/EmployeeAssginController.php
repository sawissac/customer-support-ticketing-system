<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;
use App\Repository\EmployeeAssgin\EmployeeAssginRepoInterface;
use App\Service\EmployeeAssgin\EmployeeAssginServiceInterface;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeeAssginController extends BaseController
{
    private $employeeAssginRepo, $employeeAssginService;

    public function __construct(EmployeeAssginRepoInterface $employeeAssginRepo, EmployeeAssginServiceInterface $employeeAssginService)
    {
        $this->employeeAssginRepo = $employeeAssginRepo;
        $this->employeeAssginService = $employeeAssginService;
    }

    public function index()
    {
        $data = $this->employeeAssginRepo->get();

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

        $result = $this->employeeAssginService->store($data);

        return $this->sendResponse($result, 'Employee Assgin created successfully.');
    }

    public function show($id)
    {

        $data = $this->employeeAssginRepo->show($id);

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

        $result = $this->employeeAssginService->update($id, $data);

        return $this->sendResponse($result, 'Employee Assgin Update successfully.');
    }

    public function destroy($id)
    {
        $data = $this->employeeAssginService->delete($id);

        if (is_null($data)) {
            return $this->sendError('Employee Assgin Not found.');
        }

        return $this->sendResponse($data, 'Employee Assgin Delete successfully.');
    }
}