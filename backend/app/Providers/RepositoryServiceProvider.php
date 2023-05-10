<?php

namespace App\Providers;

use App\Repository\CustomerSoftware\CustomerSoftwareRepoInterface;
use App\Repository\CustomerSoftware\CustomerSoftwareRepository;
use Illuminate\Support\ServiceProvider;

use App\Repository\User\UserRepository;
use App\Repository\User\UserRepositoryInterface;

use App\Service\User\UserService;
use App\Service\User\UserServiceInterface;

use App\Repository\Software\SoftwareRepository;
use App\Repository\Software\SoftwareRepositoryInterface;

use App\Service\CustomerSoftware\CustomerSoftwareService;
use App\Service\CustomerSoftware\CustomerSoftwareServiceInterface;

use App\Service\Software\SoftwareService;
use App\Service\Software\SoftwareServiceInterface;

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

        // $this->app->bind(CustomerSoftwareRepoInterface::class, CustomerSoftwareRepository::class);
        // $this->app->bind(CustomerSoftwareServiceInterface::class, CustomerSoftwareService::class);

        $this->app->bind(CustomerSoftwareRepoInterface::class, CustomerSoftwareRepository::class);
        $this->app->bind(CustomerSoftwareServiceInterface::class, CustomerSoftwareService::class);
    }
}