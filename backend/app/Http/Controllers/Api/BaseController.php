<?php

namespace App\Http\Controllers\Api;

use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;
use App\Http\Controllers\Controller as Controller;

class BaseController extends Controller
{
    public function sendResponse($result, $message)
    {
    	$response = [
            'success' => true,
            'message' => $message,
            'data'    => $result,
        ];

        return response()->json($response, 200);
    }

    public function sendError($error, $errorMessages = [], $code = 404)
    {
    	$response = [
            'success' => false,
            'message' => $error,
        ];


        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }


        return response()->json($response, $code);
    }

    protected function handleException(\Exception $exception)
    {
        if ($exception instanceof ValidationException) {

            $errors = $exception->validator->errors()->toArray();
            
            return response()->json(['message' => 'Unprocessable Entity', 'errors' => $errors], 422);
        }

        if ($exception instanceof QueryException) {
            return response()->json(['message' => 'General server error'], 500);
        }

        // Handle other specific exceptions as needed

        return response()->json(['message' => 'Internal server error'], 500);
    }
}