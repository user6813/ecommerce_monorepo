# Monitoring Infrastructure

This directory contains the monitoring infrastructure for the ecommerce backend using Prometheus and Grafana.

## Architecture

- **Prometheus**: Metrics collection and storage (Port 9090)
- **Grafana**: Metrics visualization and dashboards (Port 3000)
- **NestJS Backend**: Exposes metrics at `/monitoring/metrics` endpoint via middleware
- **Monitoring**: Standalone monitoring utilities in `infra/monitoring/`

## Quick Start

### 1. Start Monitoring Services

```bash
# From the infra directory
./start-monitoring.sh
```

Or manually:

```bash
docker-compose -f docker-compose.monitoring.yml up -d
```

### 2. Start the Backend

```bash
# From the backend directory
npm install
npm run dev
```

The backend will automatically use the monitoring middleware from `infra/monitoring/`.

### 3. Access Monitoring

- **Prometheus**: http://localhost:9090
- **Grafana**: http://localhost:3000 (admin/admin)

## Metrics Collected

The monitoring system collects the following metrics:

### HTTP Metrics
- `http_requests_total`: Total number of HTTP requests by method, route, and status code
- `http_request_duration_seconds`: Request duration histogram by method and route

### System Metrics
- `nodejs_heap_size_used_bytes`: Memory usage
- `nodejs_heap_size_total_bytes`: Total heap size
- `process_cpu_seconds_total`: CPU usage
- `nodejs_active_handles`: Active handles

### Custom Metrics
- `active_connections`: Number of active connections
- `database_connections`: Number of database connections

## Configuration

### Prometheus Configuration
Located at `prometheus/prometheus.yml`

Key settings:
- Scrape interval: 15s
- Backend target: `host.docker.internal:3000` (Docker Desktop) or `localhost:3000` (Linux)
- Metrics path: `/monitoring/metrics`

### Grafana Configuration
- **Datasource**: Automatically configured to connect to Prometheus
- **Dashboards**: Pre-configured NestJS Backend Dashboard
- **Credentials**: admin/admin

## Dashboard Features

The Grafana dashboard includes:

1. **HTTP Request Rate**: Requests per second by method and route
2. **HTTP Response Time**: 50th and 95th percentile response times
3. **HTTP Status Codes**: Distribution of status codes
4. **Active Connections**: Current number of active connections
5. **Memory Usage**: Heap usage over time
6. **CPU Usage**: CPU utilization percentage

## Troubleshooting

### Prometheus Can't Scrape Backend
1. Ensure the backend is running on port 3000
2. Check if the metrics endpoint is accessible: `curl http://localhost:3000/monitoring/metrics`
3. For Linux, update `prometheus.yml` to use `localhost:3000` instead of `host.docker.internal:3000`

### Grafana Can't Connect to Prometheus
1. Ensure both services are running: `docker-compose -f docker-compose.monitoring.yml ps`
2. Check Prometheus logs: `docker-compose -f docker-compose.monitoring.yml logs prometheus`
3. Verify Prometheus is accessible at http://localhost:9090

### No Metrics Appearing
1. Generate some traffic to your backend endpoints
2. Check the backend logs for any monitoring-related errors
3. Verify the monitoring middleware is properly imported in `main.ts`

## Stopping Services

```bash
docker-compose -f docker-compose.monitoring.yml down
```

## Data Persistence

- Prometheus data is persisted in a Docker volume
- Grafana dashboards and configuration are persisted in a Docker volume
- Data survives container restarts

## Adding Custom Metrics

To add custom metrics to your NestJS services:

1. Import the monitoring functions from `infra/monitoring/standalone-monitoring`
2. Use the available functions:
   - `incrementHttpRequests()`: Count HTTP requests
   - `recordHttpRequestDuration()`: Record request duration
   - `setActiveConnections()`: Set connection count
   - `setDatabaseConnections()`: Set database connection count

Example:
```typescript
import { setActiveConnections, setDatabaseConnections } from '../infra/monitoring/standalone-monitoring';

async someMethod() {
  setActiveConnections(10);
  setDatabaseConnections(5);
}
``` 