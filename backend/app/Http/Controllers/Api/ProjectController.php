<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;

use App\Service\Project\ProjectServiceInterface;
use App\Repository\Project\ProjectRepositoryInterface;

class ProjectController extends BaseController
{
    private $projectRepo, $projectServcie;

    public function __construct(ProjectRepositoryInterface $projectRepo, ProjectServiceInterface $projectServcie)
    {
        $this->projectRepo = $projectRepo;
        $this->projectServcie = $projectServcie;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = $this->projectRepo->get();

        return $this->sendResponse($data, 'Projects retrieved successfully.');
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
                'name' => 'required|string',
                'manage_start_date' => 'required|date_format:Y-m-d',
                'manage_end_date' => 'required|date_format:Y-m-d',
            ]
        );

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->projectServcie->store($validate);

        return $this->sendResponse($data, 'Project created successfully.');

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->projectRepo->show($id);

        if (is_null($result)) {
            return $this->sendError('Project not found.');
        }

        return $this->sendResponse($result, 'Project retrieved successfully.');
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
                'project_id' => 'required|integer',
                'name' => 'required|string',
                'manage_start_date' => 'required|date_format:Y-m-d',
                'manage_end_date' => 'required|date_format:Y-m-d',
            ]
        );

        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->projectServcie->update($id, $validate);

        return $this->sendResponse($data, 'Project updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->projectServcie->delete($id);

        return $this->sendResponse([], 'Project deleted successfully.');

    }
}
