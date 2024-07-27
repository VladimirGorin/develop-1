# Control Panel Aion World

- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Contributing](#contributing)

### Installation
- Laravel dependencies:
  ```sh
  composer install
  cp .env.example .env
  php artisan key:generate
  ```
- React dependencies:
  ```sh
  npm install
  cp .env.example .env
  ```

### Docker start
- Copy and edit nginx config (example: server_name 91.1.1.1 www.api.site.com)
  ```cp app.conf.example app.conf ```
- Start docker-compose
  ``` docker-compose up -d ```
- Connect to the api container and install laravel dependencies
  

### Contributing
We welcome contributions! Please follow the steps below:
1. Fork the repository:
2. Switch to the develop branch: Ensure you are working on the develop branch. ```git checkout develop```
3. Create a new branch for your changes:
   ```git checkout -b feature/your-feature```
4. Commit your changes: ```git commit -m "Add feature description"```
5. Push your changes to your fork: ```git push origin feature/your-feature```
6. Create a Pull Request to the develop branch of this repository.

> **⚠️ Important: Make sure to base your work on the `develop` branch and create Pull Requests to the `develop` branch. This helps us manage the development process more effectively.**
