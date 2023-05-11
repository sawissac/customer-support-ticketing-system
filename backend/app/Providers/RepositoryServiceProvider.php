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

        $this->app->bind(ProjectRepositoryInterface::class, ProjectRepository::class);
        $this->app->bind(ProjectServiceInterface::class, ProjectService::class);

        $this->app->bind(EmployeeProjectRepositoryInterface::class, EmployeeProjectRepository::class);
        $this->app->bind(EmployeeProjectServiceInterface::class, EmployeeProjectService::class);
    }
}
