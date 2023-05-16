<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\EmployeeProjectController;
use App\Http\Controllers\Api\TicketController;
use App\Http\Controllers\Api\EmployeeReportController;
use App\Http\Controllers\Api\EmployeeAssignController;
use App\Http\Controllers\Api\CustomerProjectController;


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

Route::middleware(['cors'])->group(function () {
    Route::post('/auth/login', [AuthController::class, 'loginUser']);

    Route::middleware(['auth:sanctum'])->group(function () {
        Route::middleware(['roles:admin'])->group(function () {
            Route::apiResource('/user', UserController::class);
            Route::apiResource('/project', ProjectController::class);
            Route::apiResource('/ticket', TicketController::class);
            Route::apiResource('/employee-project', EmployeeProjectController::class);
            Route::apiResource('/employee-report', EmployeeReportController::class);
            Route::apiResource('/employee-assgin', EmployeeAssignController::class);
            Route::apiResource('/customer-project', CustomerProjectController::class);
        });

        Route::middleware(['roles:employee'])->group(function () {
            Route::apiResource('/employee-project', EmployeeProjectController::class);
            Route::apiResource('/employee-report', EmployeeReportController::class);
        });

        Route::middleware(['roles:customer'])->group(function () {
            Route::apiResource('/ticket', TicketController::class);
        });
    });
});
