<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseController;

use App\Http\Controllers\Controller;
use App\Repository\CustomerProject\CustomerProjectRepoInterface;
use App\Service\CustomerProject\CustomerProjectServiceInterface;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerProjectController extends BaseController
{

    private $customerProjectRepo, $customerProjectService;

    public function __construct(CustomerProjectRepoInterface $customerProjectRepo, CustomerProjectServiceInterface $customerProjectService)
    {
        $this->customerProjectRepo = $customerProjectRepo;
        $this->customerProjectService = $customerProjectService;
    }

    public function index()
    {
        $data = $this->customerProjectRepo->get();

        return $this->sendResponse($data, 'Customer Project created successfully.');
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $validator = Validator::make($data, [
            'user_id' => 'required',
            'project_id' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $result = $this->customerProjectService->store($data);

        return $this->sendResponse($result, 'Customer Project created successfully.');
    }

    public function show($id)
    {

        $data = $this->customerProjectRepo->show($id);

        if (is_null($data)) {

            return $this->sendError('Customer Project not found.');
        }

        return $this->sendResponse($data, 'Customer Project Show successfully.');
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

        return $this->sendResponse($result, 'Customer Project Update successfully.');
    }

    public function destroy($id)
    {
        if ($id == null) {
            return $this->sendError('Customer Project Not found.');
        }

        $data = $this->customerProjectService->delete($id);

        return $this->sendResponse($data, 'Customer Project Delete successfully.');
    }
}
