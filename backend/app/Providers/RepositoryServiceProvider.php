<?php

namespace App\Providers;

use App\Models\EmployeeProject;
use Illuminate\Support\ServiceProvider;

use App\Repository\User\UserRepository;
use App\Repository\User\UserRepositoryInterface;

use App\Service\User\UserService;
use App\Service\User\UserServiceInterface;

use App\Repository\Software\SoftwareRepository;
use App\Repository\Software\SoftwareRepositoryInterface;

use App\Service\Software\SoftwareService;
use App\Service\Software\SoftwareServiceInterface;

use App\Repository\AssignedEmployee\AssEmployeeRepository;
use App\Repository\AssignedEmployee\AssEmployeeRepositoryInterface;

use App\Service\AssignedEmployee\AssEmployeeService;
use App\Service\AssignedEmployee\AssEmployeeServiceInterface;

use App\Repository\CustomerSoftware\CustomerSoftwareRepoInterface;
use App\Repository\CustomerSoftware\CustomerSoftwareRepository;
use App\Repository\EmployeeProject\EmployeeProjectRepoInterface;
use App\Repository\EmployeeProject\EmployeeProjectRepository;
use App\Service\CustomerSoftware\CustomerSoftwareService;
use App\Service\CustomerSoftware\CustomerSoftwareServiceInterface;
use App\Service\EmployeeProject\EmployeeProjectService;
use App\Service\EmployeeProject\EmployeeProjectServiceInterface;

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
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(UserServiceInterface::class, UserService::class);

        $this->app->bind(SoftwareRepositoryInterface::class, SoftwareRepository::class);
        $this->app->bind(SoftwareServiceInterface::class, SoftwareService::class);

        $this->app->bind(CustomerSoftwareRepoInterface::class, CustomerSoftwareRepository::class);
        $this->app->bind(CustomerSoftwareServiceInterface::class, CustomerSoftwareService::class);

        $this->app->bind(AssEmployeeRepositoryInterface::class, AssEmployeeRepository::class);
        $this->app->bind(AssEmployeeServiceInterface::class, AssEmployeeService::class);

        $this->app->bind(EmployeeProjectRepoInterface::class, EmployeeProjectRepository::class);
        $this->app->bind(EmployeeProjectServiceInterface::class, EmployeeProjectService::class);
    }
}
