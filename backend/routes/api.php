<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EmployeeProjectController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\TicketController;

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
    Route::apiResource('/project', ProjectController::class)->middleware('auth:sanctum');
    Route::apiResource('/employee-project', EmployeeProjectController::class)->middleware('auth:sanctum');
    Route::apiResource('/ticket', TicketController::class)->middleware('auth:sanctum');
});
