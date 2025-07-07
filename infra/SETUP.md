# Monitoring Setup Guide

This guide will help you set up monitoring for your NestJS backend using Prometheus and Grafana.

## Prerequisites

- Docker and Docker Compose installed
- Node.js and npm installed
- Backend running on port 3000

## Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install monitoring dependencies
cd ../infra/monitoring
npm install
```

This will install the `prom-client` package needed for metrics collection.

## Step 2: Start Monitoring Services

```bash
cd infra
./start-monitoring.sh
```

This will start:
- Prometheus on port 9090
- Grafana on port 3000

## Step 3: Start the Backend

```bash
cd backend
npm run dev
```

The backend will now expose metrics at `http://localhost:3000/monitoring/metrics` via the monitoring middleware.

## Step 4: Verify Setup

```bash
cd infra
./test-monitoring.sh
```

This script will test all components and generate some test traffic.

## Step 5: Access Monitoring

### Prometheus
- URL: http://localhost:9090
- Features:
  - View raw metrics
  - Execute PromQL queries
  - Check target status

### Grafana
- URL: http://localhost:3000
- Username: admin
- Password: admin
- Features:
  - Pre-configured NestJS dashboard
  - Real-time metrics visualization
  - Custom queries and alerts

## Dashboard Overview

The Grafana dashboard includes:

1. **HTTP Request Rate**: Requests per second by method and route
2. **HTTP Response Time**: 50th and 95th percentile response times
3. **HTTP Status Codes**: Distribution of status codes
4. **Memory Usage**: Heap usage over time
5. **CPU Usage**: CPU utilization percentage
6. **Active Handles**: Current number of active handles
7. **Database Connections**: Number of database connections
8. **Error Rate**: 4xx and 5xx error rates

## Customization

### Adding Custom Metrics

To add custom metrics to your services:

1. Import the monitoring functions:
```typescript
import { setActiveConnections, setDatabaseConnections, incrementHttpRequests, recordHttpRequestDuration } from '../infra/monitoring/standalone-monitoring';
```

2. Use the available functions:
```typescript
// Count requests
incrementHttpRequests('GET', '/api/users', 200);

// Record duration
recordHttpRequestDuration('GET', '/api/users', 0.5);

// Set connection counts
setActiveConnections(10);
setDatabaseConnections(5);
```

### Modifying Prometheus Configuration

Edit `prometheus/prometheus.yml` to:
- Change scrape intervals
- Add new targets
- Modify retention settings

### Customizing Grafana Dashboards

1. Access Grafana at http://localhost:3000
2. Navigate to Dashboards
3. Edit the "NestJS Backend Dashboard"
4. Add new panels or modify existing ones

## Troubleshooting

### Common Issues

1. **Prometheus can't scrape backend**
   - Ensure backend is running on port 3000
   - Check if metrics endpoint is accessible
   - For Linux, update `prometheus.yml` to use `localhost:3000`

2. **No metrics appearing**
   - Generate traffic to your endpoints
   - Check backend logs for errors
   - Verify monitoring module is imported

3. **Grafana can't connect to Prometheus**
   - Ensure both services are running
   - Check Docker network connectivity
   - Verify Prometheus is accessible

### Useful Commands

```bash
# Check service status
docker-compose -f docker-compose.monitoring.yml ps

# View logs
docker-compose -f docker-compose.monitoring.yml logs prometheus
docker-compose -f docker-compose.monitoring.yml logs grafana

# Restart services
docker-compose -f docker-compose.monitoring.yml restart

# Stop services
docker-compose -f docker-compose.monitoring.yml down
```

## Production Considerations

1. **Security**: Change default passwords
2. **Persistence**: Ensure data volumes are properly configured
3. **Scaling**: Consider using external Prometheus/Grafana instances
4. **Alerts**: Set up alerting rules in Prometheus
5. **Backup**: Regular backup of Prometheus and Grafana data

## Next Steps

1. Set up alerting rules
2. Configure custom dashboards
3. Add business-specific metrics
4. Set up log aggregation
5. Configure monitoring for other services 