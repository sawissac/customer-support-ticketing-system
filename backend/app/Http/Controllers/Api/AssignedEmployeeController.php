<?php

namespace App\Http\Controllers\Api;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\AssignedEmployeeRequest;
use App\Repository\AssignedEmployee\AssEmployeeRepositoryInterface;
use App\Service\AssignedEmployee\AssEmployeeServiceInterface;

class AssignedEmployeeController extends Controller
{
    private $assEmployeeRepo, $assEmployeeService;
    public function __construct(AssEmployeeRepositoryInterface $assEmployeeRepo,AssEmployeeServiceInterface $assEmployeeService)
    {
        $this->assEmployeeRepo = $assEmployeeRepo;
        $this->assEmployeeService = $assEmployeeService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $data = $this->assEmployeeRepo->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Employee List All',
                'data' => $data
            ], 200);
        }catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(AssignedEmployeeRequest $request)
    {
        try {
            if ($request->has('status')) {
                $data['status'] = true;
            } else {
                $data['status'] = false;
            }
            $data = $this->assEmployeeService->store($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'AssEmployee Created Successfully',
                'data' => $data,
            ], 200);
        }catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $result = $this->assEmployeeRepo->show($id);

            return response()->json([
                'status' => 'success',
                'message' => 'AssEmployee Detail List',
                'data' => $result,
            ], 200);
        }catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => []
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(AssignedEmployeeRequest $request, $id)
    {
        try {
            $data = $this->assEmployeeService->update($id, $request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'User Edited Successfully',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = $this->assEmployeeService->delete($id);

        try {
            return response()->json([
                'status' => 'success',
                'message' => 'Software Deleted Successfully',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => [],
            ], 500);
        }
    }
}
