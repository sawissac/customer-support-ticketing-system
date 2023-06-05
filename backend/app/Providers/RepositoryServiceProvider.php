<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

use App\Repository\User\UserRepository;
use App\Repository\User\UserRepositoryInterface;
use App\Service\User\UserService;
use App\Service\User\UserServiceInterface;

use App\Repository\Project\ProjectRepository;
use App\Repository\Project\ProjectRepositoryInterface;
use App\Service\Project\ProjectService;
use App\Service\Project\ProjectServiceInterface;

use App\Repository\EmployeeProject\EmployeeProjectRepository;
use App\Repository\EmployeeProject\EmployeeProjectRepositoryInterface;
use App\Service\EmployeeProject\EmployeeProjectService;
use App\Service\EmployeeProject\EmployeeProjectServiceInterface;

use App\Repository\CustomerProject\CustomerProjectRepoInterface;
use App\Repository\CustomerProject\CustomerProjectRepository;
use App\Service\CustomerProject\CustomerProjectService;
use App\Service\CustomerProject\CustomerProjectServiceInterface;

use App\Repository\Ticket\TicketRepository;
use App\Repository\Ticket\TicketRepositoryInterface;
use App\Service\Ticket\TicketService;
use App\Service\Ticket\TicketServiceInterface;

use App\Repository\EmployeeAssign\EmployeeAssignRepository;
use App\Repository\EmployeeAssign\EmployeeAssignRepoInterface;
use App\Service\EmployeeAssign\EmployeeAssignService;
use App\Service\EmployeeAssign\EmployeeAssignServiceInterface;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {

    }
}
