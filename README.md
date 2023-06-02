# Customer-Support-Ticketing-System

# How To Use
- Clone the repository with git clone

# Demo Credentials
- Admin: admin@gmail.com
<br/> Password: password

- Employee: employee@gmail.com
<br/> Password: password

- Customer: customer@gmail.com
<br/> Password: password

# Introduction
  A Ticketing System is a management tool that processes and catalogs customer service requests. 
  Tickets, also known as cases or issues need to be properly stored alongside relevant user information.
  The Ticketing System should be user-friendly for customer service representatives, managers, 
  and adminstrators, customer service representatives should all have easy access to the Ticketing System.

# Backend
- Copy .env.example file to .env and edit database credentials there ( cp .env.example .env )
- Run composer install
- Run php artisan key:generate
- Run php artisan config:clear
- Run php artisan cache:clear
- Run php aritsan migrate:fresh --seed
- Run php artisan serve

# Frontend
- Run npm install
- Run npm run dev
 
 # License
 Please use and re-use however you want.
