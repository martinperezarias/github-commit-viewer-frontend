# GitHub Commit History Viewer - Frontend

This project is an Angular application that fetches and displays the commit history of a specified public GitHub repository using a backend API. The backend API retrieves commit data from the GitHub API.

## Features

- Fetches commit history from the backend API.
- Displays commit messages, authors, timestamps, and redirects to user profile or commits details.
- Supports pagination to handle repositories with a large number of commits.

## Technologies Used

- Angular
- TypeScript
- HTTPClient

## Getting Started

### Prerequisites

- Node.js (version 14.x or later)
- Angular CLI (version 12.x or later)
- Backend API (https://github.com/martinperezarias/github-commit-viewer-api)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/github-commit-viewer-frontend.git
    cd github-commit-viewer-frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Update the API endpoint in the environment configuration file. Open `src/environments/environment.ts` and set the `apiUrl` to your backend API URL:
    ```typescript
    export const environment = {
      apiUrl: 'http://localhost:4000'  // Update this with your backend API URL
    };
    ```

### Usage

1. Start the development server:
    ```bash
    ng serve
    ```

2. The application will start on port `4200` by default. Open your browser and navigate to:
    ```
    http://localhost:4200
    ```

### Components

- `HeaderComponent` - Displays a simple header with Fulltimeforce logo.
- `SpinnerComponent` - Displays spinner loader when a request is being processed.
- `SearchBarComponent` - Displays two input fields to search for a specific user/project and its respective search button.
- `CommitListComponent` - Displays the list of commits.
- `PaginationComponent` - Handles pagination controls.

### Services

- `CommitService` - Communicates with the backend API to fetch commit data.
- `LoaderService` - Handles the spinner state when a request has been made.

### Routes

- `/commit-page` - View commit history for a specified repository.