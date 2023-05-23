<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\EmployeeProject;
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
        $this->middleware('permission:canShowEmployeeProjectList', ['only' => ['index', 'show']]);
        $this->middleware('permission:canCreateEmployeeProjectList', ['only' => ['create, store']]);
        $this->middleware('permission:canUpdateEmployeeProjectList', ['only' => ['edit, update']]);
        $this->middleware('permission:canDeleteEmployeeProjectList', ['only' => ['destroy']]);
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
                'project_id' => 'required',
                'user_id' => 'required',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $validated = $validator->validated();

        $existingData = EmployeeProject::where('project_id', $validated['project_id'])
            ->where('user_id', $validated['user_id'])
            ->first();

        if ($existingData) {
            return $this->sendError('Validation Error.', 'The combination of project_id and user_id already exists.');
        }

        $data = $this->employeeprojectService->store($validate);

        return $this->sendResponse($data, 'EmployeeProject created successfully.', 201);
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
            return $this->sendError('Project not found.', [], 500);
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
                'project_id' => 'required',
                'user_id' => 'required',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $validated = $validator->validated();

        $existingData = EmployeeProject::where('project_id', $validated['project_id'])
            ->where('user_id', $validated['user_id'])
            ->first();

        if ($existingData) {
            return $this->sendError('Validation Error.', 'The combination of project_id and user_id already exists.');
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

        return $this->sendResponse([], 'EmployeeProject deleted successfully.', 204);
    }
}
