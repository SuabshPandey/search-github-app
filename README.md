# GitHub Repository Search App

## Author

- [Subash Pandey](https://github.com/SuabshPandey/)

---

## Overview

The GitHub Repository Search App is a single-page application (SPA) that allows users to search for GitHub repositories, sort the results, and view detailed information about each repository.

---

## Features

- **Search Functionality**: Search for GitHub repositories by repository name.
- **Sorting Options**: Sort results by stars, forks, or last updated.
- **Pagination**: Navigate through search results with pagination controls.
- **Repository Details**:
  - Full owner name (linked to the GitHub page).
  - Repository name (linked to the GitHub page).
  - Number of open issues.
  - Default branch.
- **Error Handling**: User-friendly error messages for API errors or invalid inputs.
- **Loading State**: Visual loader during API calls.

---

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/github-repo-search-app.git
   cd github-repo-search-app
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Environment Variables:**

   - Create an `.env` file in the root directory.
   - Add the following:
     ```env
     API_URL=https://api.github.com
     ```

4. **Run the Application:**
   ```bash
   ng serve
   ```
   Open your browser and navigate to `http://localhost:4200`.

---

## Components

### **RepoListComponent**

- Displays a searchable list of GitHub repositories.
- Handles search, sorting, and pagination.
- Communicates with `RepoService` for fetching data from the GitHub API.

### **RepoDetailComponent**

- Displays detailed information about a selected repository.
- Fetches and displays the repository's README.md content.

---

## Services

### **RepoService**

- Responsible for communicating with the GitHub API.
- Methods:
  - `getRepoList`: Fetches a list of repositories based on the search query.
  - `getRepoDetails`: Fetches detailed information about a specific repository, including its README.md content.

---

## Routing

```typescript
  { path: "list", component: RepoListComponent },
  { path: "details/:owner/:repo", component: RepoDetailComponent }
```

---

## API Reference

1. **Search Repositories**

   ```
   GET https://api.github.com/search/repositories?q={query}&page={page}&per_page={perPage}&sort={sort}&order={order}
   ```

2. **Get Repository Details**
   ```
   GET https://api.github.com/repos/{owner}/{repo}
   ```

---

## Development Notes

- **Debouncing**: Prevents unnecessary API calls by adding a delay to the search input.
- **DistinctUntilChanged**: Avoids duplicate API calls for the same query.
- **Error Handling**: Displays error messages when the API fails or the search query is invalid.
