<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeProjectRequest;
use App\Repository\EmployeeProject\EmployeeProjectRepoInterface;
use App\Service\EmployeeProject\EmployeeProjectServiceInterface;
use Exception;
use Illuminate\Http\Request;

class EmployeeProjectController extends Controller
{
    private $EmployeeProjectRepo, $EmployeeProjectService;
    public function __construct(EmployeeProjectRepoInterface $EmployeeProjectRepo, EmployeeProjectServiceInterface $EmployeeProjectService)
    {
        $this->EmployeeProjectRepo = $EmployeeProjectRepo;
        $this->EmployeeProjectService = $EmployeeProjectService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $data = $this->EmployeeProjectRepo->index();
            return response()->json([
                'status' => true,
                'message' => 'Employee Project List All',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Employee Project List All',
                'error' => $e->getMessage(),
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
    public function store(EmployeeProjectRequest $request)
    {
        try {
            $data = $this->EmployeeProjectService->store($request->validated());
            return response()->json([
                'status' => true,
                'message' => 'Employee Project Create',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Employee Project Create',
                'error' => $e->getMessage(),
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
            $data = $this->EmployeeProjectRepo->show($id);
            return response()->json([
                'status' => true,
                'message' => 'Employee Project show',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Employee Project show',
                'error' => $e->getMessage(),
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
    public function update(EmployeeProjectRequest $request, $id)
    {
        try {
            $data = $this->EmployeeProjectService->update($id, $request->validated());
            return response()->json([
                'status' => true,
                'message' => 'Employee Project Update',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Employee Project Update',
                'error' => $e->getMessage(),
                'data' => []
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
        $data = $this->EmployeeProjectService->delete($id);
        try {
            return response()->json([
                'status' => true,
                'message' => 'Employee Project Deleted Successfully',
                'data' => $data
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => $data,
            ], 500);
        }
    }
}
