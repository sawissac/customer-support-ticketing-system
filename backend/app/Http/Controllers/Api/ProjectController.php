<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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
        $this->middleware('permission:canShowProjectList', ['only' => ['index', 'show']]);
        $this->middleware('permission:canCreateProjectList', ['only' => ['create,store']]);
        $this->middleware('permission:canUpdateProjectList', ['only' => ['edit,update']]);
        $this->middleware('permission:canDeleteProjectList', ['only' => ['destroy']]);
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
                'project_id' => 'string',
                'name' => 'required',
            ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $data = $this->projectServcie->store($validate);

        return $this->sendResponse($data, 'Project created successfully.', 201);
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
            return $this->sendError('Project not found.', [], 500);
        }

        return $this->sendResponse($result, 'Project retrieved successfully.',200);
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
                'project_id' => 'string',
                'name' => 'required',
            ]);

            $validator = Validator::make(
                $validate,
                [
                    'project_id' => 'string',
                    'name' => 'required|string',
                ]
            );

        $data = $this->projectServcie->update($id, $validate);

        return $this->sendResponse($data, 'Project updated successfully.',201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = $this->projectServcie->delete($id);

        if($data){
            return $this->sendResponse([], 'Project deleted successfully.', 204);
        }else{
            return $this->sendError('Unable to delete project', [], 400);
        }
    }
}
