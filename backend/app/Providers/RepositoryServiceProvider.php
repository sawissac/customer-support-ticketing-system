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

use App\Repository\Ticket\TicketRepository;
use App\Repository\Ticket\TicketRepositoryInterface;
use App\Service\Ticket\TicketService;
use App\Service\Ticket\TicketServiceInterface;

use App\Repository\EmployeeReport\EmployeeReportRepository;
use App\Repository\EmployeeReport\EmployeeReportRepositoryInterface;
use App\Service\EmployeeReport\EmployeeReportService;
use App\Service\EmployeeReport\EmployeeReportServiceInterface;
use App\Repository\CustomerProject\CustomerProjectRepoInterface;
use App\Repository\CustomerProject\CustomerProjectRepository;

use App\Repository\EmployeeAssgin\EmployeeAssginRepository;
use App\Repository\EmployeeAssgin\EmployeeAssginRepoInterface;

use App\Service\CustomerProject\CustomerProjectService;
use App\Service\CustomerProject\CustomerProjectServiceInterface;

use App\Service\EmployeeAssgin\EmployeeAssginService;
use App\Service\EmployeeAssgin\EmployeeAssginServiceInterface;

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
        $this->app->bind(CustomerProjectRepoInterface::class, CustomerProjectRepository::class);
        $this->app->bind(CustomerProjectServiceInterface::class, CustomerProjectService::class);

        $this->app->bind(ProjectRepositoryInterface::class, ProjectRepository::class);
        $this->app->bind(ProjectServiceInterface::class, ProjectService::class);

        $this->app->bind(EmployeeProjectRepositoryInterface::class, EmployeeProjectRepository::class);
        $this->app->bind(EmployeeProjectServiceInterface::class, EmployeeProjectService::class);

        $this->app->bind(TicketRepositoryInterface::class, TicketRepository::class);
        $this->app->bind(TicketServiceInterface::class, TicketService::class);

        $this->app->bind(EmployeeReportRepositoryInterface::class, EmployeeReportRepository::class);
        $this->app->bind(EmployeeReportServiceInterface::class, EmployeeReportService::class);

        $this->app->bind(EmployeeAssginRepoInterface::class, EmployeeAssginRepository::class);
        $this->app->bind(EmployeeAssginServiceInterface::class, EmployeeAssginService::class);
    }
}
