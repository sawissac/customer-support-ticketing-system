<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CustomerSoftwareRequest;
use App\Repository\CustomerSoftware\CustomerSoftwareRepoInterface;
use App\Service\CustomerSoftware\CustomerSoftwareServiceInterface;
use Exception;

class CustomerSoftwareController extends Controller
{

    private $customerSoftwareRepo, $customerSoftwareService;

    public function __construct(CustomerSoftwareRepoInterface $customerSoftwareRepo, CustomerSoftwareServiceInterface $customerSoftwareService)
    {
        $this->customerSoftwareRepo = $customerSoftwareRepo;
        $this->customerSoftwareService = $customerSoftwareService;
    }

    public function index()
    {
        try {
            $data = $this->customerSoftwareRepo->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Customer Software List All',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data
            ], 500);
        }
    }

    public function store(CustomerSoftwareRequest $request)
    {
        try {

            $data = $this->customerSoftwareService->store($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Customer Software Create Data',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $result = $this->customerSoftwareRepo->show($id);

            return response()->json([
                'status' => 'success',
                'message' => 'Customer Software Detail List',
                'data' => $result,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $result,
            ], 500);
        }
    }

    public function update(CustomerSoftwareRequest $request, $id)
    {
        try {
            $data = $this->customerSoftwareService->update($id, $request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Customer Software Edited Successfully',
                'data' => $data
            ], 200);
            
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data,
            ], 500);
        }
    }

    public function destroy($id)
    {
        $data = $this->customerSoftwareService->delete($id);

        try {
            return response()->json([
                'status' => 'success',
                'message' => 'Customer Software Deleted Successfully',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data,
            ], 500);
        }
    }
}