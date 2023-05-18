<?php

namespace App\Http\Controllers\Api;

use Exception;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

use App\Service\User\UserServiceInterface;
use App\Http\Controllers\Api\BaseController;
use App\Models\User;
use Illuminate\Validation\ValidationException;
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

        if ($data) {
            return $this->sendResponse($data, 'User retrieved successfully.');
        } else {
            return $this->sendError('User not found.', 404);
        }
    }

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
    public function show($id)
    {
        $result = $this->userRepo->show($id);

        if (is_null($result)) {
            return $this->sendError('User not found.');
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
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $data = $this->userService->update($id, $validate);

        return $this->sendResponse($data, 'User updated successfully.');
    }

    public function destroy($id)
    {
        $this->userService->delete($id);

        return $this->sendResponse([], 'User deleted successfully.', 204);
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

    function search($name)
    {
        $result = User::where('name', 'LIKE', "%{$name}%")->get();

        if (count($result)) {
            return Response()->json($result);
        } else {
            return response()->json(['Result' => 'No Data not found'], 404);
        }
    }
}
