# Colors-LAB

## Overview
This project is a basic web app where users can log in, store their favorite colors, and look up colors they've previously saved. It provides a straightforward interface for managing a personal color list with search capability.

## Tech Stack
- The backend runs on a **LAMP stack** — Linux, Apache, MySQL, and PHP.
- The frontend is built with plain **HTML, CSS, and JavaScript**.
- **PHP** handles API requests, and **MySQL** stores all user and color data.

## Getting Started
1. Provision a web server with a LAMP setup ( used DigitalOcean).
2. Set up a MySQL database containing a Users table and a Colors table.
3. Store your database connection details as environment variables.
4. Upload all project files (PHP APIs, HTML pages, CSS stylesheets, JS scripts, and images) to your server's web root.
5. In `code.js`, modify the `urlBase` value so it reflects where your API endpoints live on the server.

## Using the App
1. First, manually insert a user record into the database.
2. Navigate to your server's URL or IP in any browser.
3. Sign in using the account you just created.
4. From there, you can save new colors or search through the ones you've already added.

## Known Constraints
- There is no registration page — users need to be added directly to the database.
- The frontend has a hardcoded API URL it communicates with.
- Error handling and validation are kept to a minimum.
