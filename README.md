# Esh-at-home
Esh home test for devops position
simple application built from frontend and backend service, and uses Docker Compose for orchestration. 
The frontend fetches a hello world message from the backend and displays it.

## Setup Instructions

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <project-directory>
    ```

2. Build and start the application using Docker Compose:
    ```bash
    ./build.sh
    ```

    This script will:
    - Stop and remove any existing containers (`docker-compose down`)
    - Build the services (`docker-compose build`)
    - Start the containers in detached mode (`docker-compose up -d`)
3. Open the frontend in your browser:
    - Visit `http://localhost:8080` to see the frontend. It will display the message from the backend.

## Requirements

### Software Requirements:
- **Docker** - required base images: nginx:alpine, node:18-alpine
- **Docker Compose** 

### Node.js Packages:
- **express**: Web framework for the backend.
- **cors**: Middleware to enable cross-origin requests between frontend and backend.

## Architecture Decisions

1. **Frontend**:
   - Built with simple HTML and JavaScript. fetches data from the backend (`/api/message`).

2. **Backend**:
   - Built using Node.js with the Express framework to provide a simple API endpoint (`/api/message`).
   - CORS is used to allow requests.

3. **Containerization**:
   - Both frontend and backend are Dockerized.
   - Docker Compose is used to manage and ensure communication for both containers on a shared network (`esh-app`).

4. **Networking**:
   - The containers are connected via a Docker network to allow the frontend to access the backend using the service name `backend` as the hostname.

## Local Development Guide

1. **Starting the Services**:
   - Run the `build.sh` script to build and start the services.
     ```bash
     ./build.sh
     ```

2. **Backend**:
   - The backend service listens on port `3000`. If you need to make any changes, edit the `backend/index.js` file.

3. **Frontend**:
   - The frontend service listens on port `8080`. If you need to change the frontend behavior, edit the `frontend/index.html` file.

4. **Viewing Logs**:
   - To view the backend logs, run:
     ```bash
     docker-compose logs backend
     ```
   - To view the frontend logs, run:
     ```bash
     docker-compose logs frontend
     ```

5. **Stopping the Services**:
   - To stop the containers, use:
     ```bash
     docker-compose down
     ```

## Monitoring

This project uses **Prometheus** and **Grafana** to monitor the health and performance of the services.

### Architecture Overview
- **Prometheus** collects and stores metrics from the backend and frontend.
- **Grafana** visualizes these metrics.

### Metrics collected and example queries
- **Backend**:
  - `http_request_count`: Total requests handled. 
        Query: http_request_count
  - `http_request_duration_seconds`: Request latency.
        Query: rate(http_request_duration_seconds[TIME])
  - `http_request_error_count`: Error counts.
        Query: rate(http_request_error_count[TIME])
  
- **Frontend**:
  - `frontend_page_loads`: Page load count.
    Query: frontend_page_load_duration_seconds
  - `frontend_api_request_duration_seconds`: API call latency.
    Query: frontend_api_request_duration_seconds

- **Custom**:
  - `http_response_time_seconds`: Backend response time.

## HOW-TO: Grafana Dashboard Setup

To visualize metrics collected by Prometheus, follow these steps:

### 1. Install Grafana
Ensure Grafana is running within your `docker-compose.yml` configuration.

### 2. Set up Prometheus as a Data Source
- Open Grafana at `http://localhost:3000`.
- Log in with the default credentials (`admin` / `admin`).
- Go to **Configuration > Data Sources** and add Prometheus.
- Set the URL to `http://prometheus:9090` and click **Save & Test**.

### 3. Create a Dashboard
- Go to **Create > Dashboard** and add a new panel.

### 4. Add Key Metrics
Use the queries detailed earlier for the panels.

### 5. Save the Dashboard
Once the panels are added, click **Save** to store your dashboard.

## Troubleshooting

### Common Issues:

1. **Frontend Stuck on "Loading..."**:
   - Ensure that the `frontend/index.html` file is configured to fetch from the correct backend URL.
   - If you are running the frontend in the browser, use `http://localhost:3000` instead of `backend:3000`.

3. **Backend Not Accessible**:
   - Make sure that the backend container is up and running. Use `docker-compose ps` to check the status.
   - Try accessing the backend directly via `curl http://localhost:3000/api/message` to ensure the backend is working.

4. **Port Conflicts**:
   - Ensure that the ports `3000` (backend) and `8080` (frontend) are not already in use by other services on your machine.

5. **Rebuilding Containers**:
   - If you make changes to the code, make sure to rebuild the containers:
     ```bash
     docker-compose down
     docker-compose build
     docker-compose up -d
     ```
