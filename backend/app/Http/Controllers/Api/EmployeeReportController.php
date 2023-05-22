<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\BaseController;

use App\Service\EmployeeReport\EmployeeReportServiceInterface;
use App\Repository\EmployeeReport\EmployeeReportRepositoryInterface;

class EmployeeReportController extends BaseController
{
    private $employeereportRepo, $employeereportService;

    public function __construct(EmployeeReportRepositoryInterface $employeereportRepo, EmployeeReportServiceInterface $employeereportService)
    {
        $this->employeereportRepo = $employeereportRepo;
        $this->employeereportService = $employeereportService;
        $this->middleware('permission:canShowReport', ['only' => ['index', 'show']]);
        $this->middleware('permission:canCreateReport', ['only' => ['create,store']]);
        $this->middleware('permission:canUpdateReport', ['only' => ['edit,update']]);
        $this->middleware('permission:canDeleteReport', ['only' => ['destroy']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->employeereportRepo->get();

        return $this->sendResponse($data, 'EmployeeReports retrieved successfully.');
    }

    public function store(Request $request)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'user_id' => 'required|integer',
                'ticket_id' => 'required|string',
                'description' => 'required',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->employeereportService->store($validate);

        return $this->sendResponse($data, 'EmployeeReport created successfully.', 201);
    }


    public function show($id)
    {
        $result = $this->employeereportRepo->show($id);

        if (is_null($result)) {
            return $this->sendError('EmployeeReport not found.');
        }

        return $this->sendResponse($result, 'EmployeeReports retrieved successfully.');
    }


    public function update(Request $request, $id)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'user_id' => 'required|integer',
                'ticket_id' => 'required|string',
                'description' => 'required',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->employeereportService->update($id, $validate);

        return $this->sendResponse($data, 'EmployeeReport updated successfully.');
    }

    public function destroy($id)
    {
        $this->employeereportService->delete($id);

        return $this->sendResponse([], 'EmployeeReport deleted successfully.', 204);
    }
}