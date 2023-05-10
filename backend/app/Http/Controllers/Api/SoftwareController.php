<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SoftwareRequest;
use Exception;
use Illuminate\Http\Request;

use App\Repository\Software\SoftwareRepositoryInterface;
use App\Service\Software\SoftwareServiceInterface;

class SoftwareController extends Controller
{
    private $softwareRepo, $softwareService;

    public function __construct(SoftwareRepositoryInterface $softwareRepo, SoftwareServiceInterface $softwareService)
    {
        $this->softwareRepo = $softwareRepo;
        $this->softwareService = $softwareService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $data = $this->softwareRepo->get();

            return response()->json([
                'status' => 'success',
                'message' => 'Software List All',
                'data' => $data
            ], 200);
        }catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(SoftwareRequest $request)
    {
        try {
            $data = $this->softwareService->store($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Software Created Successfully',
                'data' => $data,
            ], 200);
        }catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $data
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
            $result = $this->softwareRepo->show($id);

            return response()->json([
                'status' => 'success',
                'message' => 'Software Detail List',
                'data' => $result,
            ], 200);
        }catch(Exception $e){
            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage(),
                'data' => $result,
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
    public function update(SoftwareRequest $request, $id)
    {
        try {
            $data = $this->softwareService->update($id, $request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'User Edited Successfully',
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = $this->softwareService->delete($id);

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
                'data' => $data,
            ], 500);
        }
    }
}
