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


});
