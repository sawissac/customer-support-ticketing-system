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
});

Route::middleware(['cors', 'auth:sanctum'])->group(function () {
    Route::apiResource('/user', UserController::class);
    Route::get('/employee', [UserController::class, 'employee']);
    Route::get('/customer', [UserController::class, 'customer']);

    Route::apiResource('/project', ProjectController::class);

    Route::apiResource('/employee-project', EmployeeProjectController::class);

    Route::apiResource('/ticket', TicketController::class);

    Route::apiResource('/employee-report', EmployeeReportController::class);

    Route::apiResource('/employee-assign', EmployeeAssignController::class);

    Route::get('/assign-ticket-list/{id}', [EmployeeAssignController::class, 'ticket']);
    Route::get('/assign-employee-list/{id}', [EmployeeAssignController::class, 'employee']);

    Route::apiResource('/customer-project', CustomerProjectController::class);
    Route::get('/customer-paginate', [CustomerProjectController::class, 'paginate']);
    Route::get('/project-list/{id}', [CustomerProjectController::class, 'project']);

    Route::get('/monthly-ticket', [TicketController::class, 'checkTicketList']);
    Route::get('/ticket-date/{id}', [TicketController::class, 'checkDate']);

});
