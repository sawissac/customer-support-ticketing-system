<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\BaseController;

use App\Service\EmployeeProject\EmployeeProjectServiceInterface;
use App\Repository\EmployeeProject\EmployeeProjectRepositoryInterface;

class EmployeeProjectController extends BaseController
{
    private $employeeprojectRepo, $employeeprojectService;
    public function __construct(EmployeeProjectRepositoryInterface $employeeprojectRepo, EmployeeProjectServiceInterface $employeeprojectService)
    {
        $this->employeeprojectRepo = $employeeprojectRepo;
        $this->employeeprojectService = $employeeprojectService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->employeeprojectRepo->get();

        return $this->sendResponse($data, 'EmployeeProjects retrieved successfully.');
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
                'project_id' => 'required|string',
                'user_id' => 'required|integer',
            ]
        );

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->employeeprojectService->store($validate);

        return $this->sendResponse($data, 'EmployeeProject created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->employeeprojectRepo->show($id);

        if (is_null($result)) {
            return $this->sendError('Project not found.');
        }

        return $this->sendResponse($result, 'EmployeeProject retrieved successfully.');
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
                'project_id' => 'required|string',
                'user_id' => 'required|integer',
            ]
        );

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->employeeprojectService->update($id, $validate);

        return $this->sendResponse($data, 'EmployeeProject updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->employeeprojectService->delete($id);

        return $this->sendResponse([], 'EmployeeProject deleted successfully.');
    }
}
