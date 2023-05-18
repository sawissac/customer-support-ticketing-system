<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Support\Facades\Validator;

use App\Repository\User\UserRepositoryInterface;
use App\Service\User\UserServiceInterface;

class UserController extends BaseController
{

    private $userRepo, $userService;

    public function __construct(UserRepositoryInterface $userRepo, UserServiceInterface $userService)
    {
        $this->userRepo = $userRepo;
        $this->userService = $userService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {

        $data = $this->userRepo->get();

        return $this->sendResponse($data, 'Users retrieved successfully.');
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
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255|email|unique:users,email',
                'password' => 'required|confirmed',
                'role' => 'required'
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->userService->store($validate);

        return $this->sendResponse($data, 'User created successfully.', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $result = $this->userRepo->show($id);

        if (is_null($result)) {
            return $this->sendError('User not found.');
        }

        return $this->sendResponse($result, 'User retrieved successfully.');
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
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255|email',
                'role' => 'required'
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->userService->update($id, $validate);

        return $this->sendResponse($data, 'User updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->userService->delete($id);

        return $this->sendResponse( [],'User deleted successfully.', 204);
    }


    public function employee()
    {
        // dd('here');
        $employeeData = $this->userRepo->employee();

        return $this->sendResponse($employeeData, 'Employees retrieved successfully.');
    }

    public function customer()
    {
        $customerData = $this->userRepo->customer();

        return $this->sendResponse($customerData, 'Customers retrieved successfully.');
    }
}
