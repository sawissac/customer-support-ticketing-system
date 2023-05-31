<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Service\User\UserServiceInterface;
use App\Http\Controllers\Api\BaseController;
use App\Repository\User\UserRepositoryInterface;

class UserController extends BaseController
{
    private $userRepo, $userService;

    public function __construct(UserRepositoryInterface $userRepo, UserServiceInterface $userService)
    {
        $this->userRepo = $userRepo;
        $this->userService = $userService;
        $this->middleware('permission:canShowUser', ['only' => ['index', 'show', 'employee', 'customer']]);
        $this->middleware('permission:canCreateUser', ['only' => ['create,store']]);
        $this->middleware('permission:canUpdateUser', ['only' => ['edit,update']]);
        $this->middleware('permission:canDeleteUser', ['only' => ['destroy']]);
    }

    public function index()
    {
        $data = $this->userRepo->get();

        return $this->sendResponse($data, 'User retrieved successfully.');
    }

    public function store(Request $request)
    {
        $validate = $request->all();

        $validator = Validator::make(
            $validate,
            [
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255|email|unique:users,email',
                'password' => 'required|confirmed|min:8',
                'role' => 'required'
            ]
        );

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $data = $this->userService->store($validate);

        return $this->sendResponse($data, 'User created successfully.', 201);
    }

    public function show($id)
    {
        $result = $this->userRepo->show($id);

        if (is_null($result)) {
            return $this->sendError('User not found.', [], 500);
        }

        return $this->sendResponse($result, 'User retrieved successfully.');
    }

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
            return $this->sendError('Validation Error.', $validator->errors(), 422);
        }

        $data = $this->userService->update($id, $validate);

        return $this->sendResponse($data, 'User updated successfully.');
    }

    public function destroy($id)
    {
        $data = $this->userService->delete($id);

        if($data) {
            return $this->sendResponse([], 'User deleted successfully.');
        }else {
            return $this->sendError('Unable to delete User', [], 400);
        }
    }

    public function employee()
    {
        $employeeData = $this->userRepo->employee();

        return $this->sendResponse($employeeData, 'Employees retrieved successfully.');
    }

    public function customer()
    {
        $customerData = $this->userRepo->customer();

        return $this->sendResponse($customerData, 'Customers retrieved successfully.');
    }

}
