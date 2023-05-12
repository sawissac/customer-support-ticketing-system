<?php

namespace App\Providers;

use App\Repository\CustomerProject\CustomerProjectRepoInterface;
use App\Repository\CustomerProject\CustomerProjectRepository;

use App\Repository\EmployeeAssgin\EmployeeAssginRepository;
use App\Repository\EmployeeAssgin\EmployeeAssginRepoInterface;

use Illuminate\Support\ServiceProvider;

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

        $this->app->bind(EmployeeAssginRepoInterface::class, EmployeeAssginRepository::class);
        $this->app->bind(EmployeeAssginServiceInterface::class, EmployeeAssginService::class);
    }
}