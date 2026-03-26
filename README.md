# Colors-LAB

## Overview

This project is a basic web app where users can log in, store their favorite colors, and look up colors they've previously saved. It provides a straightforward interface for managing a personal color list with search capability.

## Tech Stack

* The backend runs on a **LAMP stack** - Linux, Apache, MySQL, and PHP.
* The frontend is built with plain **HTML, CSS, and JavaScript**.
* **PHP** handles API requests, and **MySQL** stores all user and color data.

## Getting Started

1. Provision a web server with a LAMP setup (used DigitalOcean).
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

* There is no registration page - users need to be added directly to the database.
* The frontend has a hardcoded API URL it communicates with.
* Error handling and validation are kept to a minimum.

## UML Diagrams

The `docs/uml/` directory contains UML diagrams modeling the architecture and behavior of this application:

* **Use Case Diagram** (`usecase.puml` / `usecase.png`) - actors and system interactions
* **Activity Diagram** (`activity.puml` / `activity.png`) - full user workflow from login to color management
* **Class Diagram** (`class.puml` / `class.png`) - frontend, backend, and database structure

## AI Usage

AI assistance (Claude by Anthropic) was used in the creation of the UML diagrams for this project. Specifically:

* **Tool used:** Claude (Anthropic) in combination with PlantUML for diagram generation and rendering.
* **How it was used:** Claude analyzed the actual source code of this repository - including `index.html`, `color.html`, the JavaScript functions (`doLogin`, `addColor`, `searchColor`, `readCookie`, `doLogout`), the PHP API structure, and the MySQL schema - to generate accurate PlantUML source files (`.puml`) for all three required diagrams.
* **Verification:** All AI-generated diagrams were reviewed against the actual codebase to ensure correctness. Relationships, class attributes, method names, and flow logic were verified to match the implemented system rather than accepted as-is from the AI output.
* **Scope:** AI was not used in the development of the application itself (HTML, CSS, JavaScript, PHP, or database setup) - only for the UML diagramming task.
