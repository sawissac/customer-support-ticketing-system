<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\SoftwareController;
use App\Http\Controllers\Api\CustomerSoftwareController;
use App\Models\AssignedEmployee;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['cors'])->group(function () {
    Route::post('/auth/login', [AuthController::class, 'loginUser']);
    Route::apiResource('/user', UserController::class)->middleware('auth:sanctum');
    Route::apiResource('/software', SoftwareController::class)->middleware('auth:sanctum');
    Route::apiResource('/customer-software', CustomerSoftwareController::class)->middleware('auth:sanctum');
    Route::apiResource('/assgin-employee', AssignedEmployee::class);
});
