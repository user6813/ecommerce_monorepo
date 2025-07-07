#!/bin/bash

echo "Starting monitoring services..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running. Please start Docker first."
    exit 1
fi

# Create necessary directories if they don't exist
mkdir -p prometheus
mkdir -p grafana/provisioning/datasources
mkdir -p grafana/provisioning/dashboards
mkdir -p grafana/dashboards

# Start the monitoring services
docker-compose -f docker-compose.monitoring.yml up -d

echo "Monitoring services started!"
echo "Prometheus: http://localhost:9090"
echo "Grafana: http://localhost:3000 (admin/admin)"
echo ""
echo "To stop the services, run: docker-compose -f docker-compose.monitoring.yml down" 