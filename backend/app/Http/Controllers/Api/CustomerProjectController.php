<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\CustomerProject;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;

use App\Repository\CustomerProject\CustomerProjectRepoInterface;
use App\Service\CustomerProject\CustomerProjectServiceInterface;
use Exception;

class CustomerProjectController extends BaseController
{

    private $customerProjectRepo, $customerProjectService;

    public function __construct(CustomerProjectRepoInterface $customerProjectRepo, CustomerProjectServiceInterface $customerProjectService)
    {
        $this->customerProjectRepo = $customerProjectRepo;
        $this->customerProjectService = $customerProjectService;
        $this->middleware('permission:canShowCustomerProjectList', ['only' => ['index', 'show']]);
        $this->middleware('permission:canCreateCustomerProjectList', ['only' => ['create,store']]);
        $this->middleware('permission:canUpdateCustomerProjectList', ['only' => ['edit,update']]);
        $this->middleware('permission:canDeleteCustomerProjectList', ['only' => ['destroy']]);
    }

    public function index()
    {
        $data = $this->customerProjectRepo->get();

        return $this->sendResponse($data, 'CustomerProject retrieved successfully.');
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'user_id' => 'required',
            'project_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $validated = $validator->validated();

        $existingData = CustomerProject::where('project_id', $validated['project_id'])
            ->where('user_id', $validated['user_id'])
            ->first();

        if ($existingData) {
            return $this->sendError('Validation Error.', 'The combination of project_id and user_id already exists.');
        }

        $result = $this->customerProjectService->store($data);

        return $this->sendResponse($result, 'CustomerProject created successfully.', 201);
    }

    public function show($id)
    {

        $data = $this->customerProjectRepo->show($id);

        if (is_null($data)) {

            return $this->sendError('CustomerProject not found.', [], 500);
        }

        return $this->sendResponse($data, 'CustomerProject Show successfully.');
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'user_id' => 'required',
            'project_id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $validated = $validator->validated();

        $existingData = CustomerProject::where('project_id', $validated['project_id'])
            ->where('user_id', $validated['user_id'])
            ->first();

        if ($existingData) {
            return $this->sendError('Validation Error.', 'The combination of project_id and user_id already exists.');
        }

        $result = $this->customerProjectService->update($id, $data);

        return $this->sendResponse($result, 'CustomerProject Update successfully.');
    }

    public function destroy($id)
    {
        $data=$this->customerProjectService->delete($id);

        if($data) {
            return $this->sendResponse([], 'CustomerProject deleted successfully.');
        }else {
            return $this->sendError('Unable to delete CustomerProject', [], 400);
        }
    }

    public function paginate()
    {
        $data = $this->customerProjectRepo->paginate();

        return $this->sendResponse($data, 'CustomerProject retrieved successfully.');
    }


    public function project($id)
    {
        $data = $this->customerProjectRepo->projectByUserID($id);

        return $this->sendResponse($data, 'Project retrieved successfully.');
    }
}
