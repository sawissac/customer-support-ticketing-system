<?php

namespace App\Http\Controllers\Api;

use Exception;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

use App\Service\User\UserServiceInterface;
use App\Http\Controllers\Api\BaseController;
use Illuminate\Validation\ValidationException;
use App\Repository\User\UserRepositoryInterface;

class UserController extends BaseController
{

    private $userRepo, $userService;

    public function __construct(UserRepositoryInterface $userRepo, UserServiceInterface $userService)
    {
        $this->userRepo = $userRepo;
        $this->userService = $userService;
    }

    public function index()
    {
        $data = $this->userRepo->get();

        try {
            if ($data) {
                return $this->sendResponse($data, 'User retrieved successfully.');
            } else {
                return $this->sendError('User not found.', 404);
            }
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }

    public function store(Request $request)
    {
        try {
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
                throw new ValidationException($validator);
            }

            $data = $this->userService->store($validate);
            return $this->sendResponse($data, 'User created successfully.');
        } catch (ValidationException $e) {
            return $this->sendError('Validation Error.', $e->errors(), 422);
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }

    public function show($id)
    {
        $result = $this->userRepo->show($id);

        try {
            if ($result) {
                return $this->sendResponse($result, 'User retrieved successfully.');
            } else {
                return $this->sendError('User not found.', 404);
            }
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $validate = $request->all();

            $validator = Validator::make($validate, [
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255|email',
                'role' => 'required'
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $data = $this->userService->update($id, $validate);
            return $this->sendResponse($data, 'User updated successfully.');
            
        } catch (ValidationException $e) {
            return $this->sendError('Validation Error.', $e->errors(), 422);
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }

    public function destroy($id)
    {
        $result = $this->userService->delete($id);

        try {
            if ($result) {
                return $this->sendResponse($result, 'User delete successfully.');
            } else {
                return $this->sendError('User not found.', 404);
            }
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }


    public function employee()
    {
        try {
            $employeeData = $this->userRepo->employee();

            if (!empty($employeeData)) {
                return $this->sendResponse($employeeData, 'Employees retrieved successfully.');
            } else {
                return $this->sendError('No employees found.', 404);
            }
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }

    public function customer()
    {

        try {
            $customerData = $this->userRepo->customer();

            if (!empty($customerData)) {
                return $this->sendResponse($customerData, 'Customers retrieved successfully.');
            } else {
                return $this->sendError('No customers found.', 404);
            }
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }
}
