<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;

use App\Repository\CustomerProject\CustomerProjectRepoInterface;
use App\Service\CustomerProject\CustomerProjectServiceInterface;

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
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $result = $this->customerProjectService->store($data);

        return $this->sendResponse($result, 'CustomerProject created successfully.');
    }

    public function show($id)
    {

        $data = $this->customerProjectRepo->show($id);

        if (is_null($data)) {

            return $this->sendError('CustomerProject not found.');
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
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $result = $this->customerProjectService->update($id, $data);

        return $this->sendResponse($result, 'CustomerProject Update successfully.');
    }

    public function destroy($id)
    {
        if ($id == null) {
            return $this->sendError('CustomeProject Not found.');
        }

        $data = $this->customerProjectService->delete($id);

        return $this->sendResponse($data, 'CustomerProject Delete successfully.');
    }
}
