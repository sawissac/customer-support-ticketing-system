<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;

use App\Repository\Project\ProjectRepositoryInterface;
use App\Service\Project\ProjectServiceInterface;

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

    
    public function index()
    {
        $data = $this->projectRepo->get();

        return $this->sendResponse($data, 'Projects retrieved successfully.');

    }


    public function store(Request $request)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'project_id' => 'string',
                'name' => 'required|string',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $data = $this->projectServcie->store($validate);

        return $this->sendResponse($data, 'Project created successfully.', 201);
    }


    public function show($id)
    {
        $result = $this->projectRepo->show($id);

        if (is_null($result)) {
            return $this->sendError('Project not found.', [], 500);
        }

        return $this->sendResponse($result, 'Project retrieved successfully.');
    }

    public function update(Request $request, $id)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'project_id' => 'string',
                'name' => 'required|string',
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $data = $this->projectServcie->update($id, $validate);

        return $this->sendResponse($data, 'Project updated successfully.');
    }


    public function destroy($id)
    {
        $this->projectServcie->delete($id);

        return $this->sendResponse([], 'Project deleted successfully.', 204);
    }
}
