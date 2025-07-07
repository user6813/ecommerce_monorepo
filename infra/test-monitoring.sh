#!/bin/bash

echo "Testing monitoring setup..."

# Test if backend is running
echo "1. Testing backend health..."
if curl -s http://localhost:3000/health > /dev/null; then
    echo "   ✓ Backend is running"
else
    echo "   ✗ Backend is not running on port 3000"
    exit 1
fi

# Test metrics endpoint
echo "2. Testing metrics endpoint..."
if curl -s http://localhost:3000/monitoring/metrics > /dev/null; then
    echo "   ✓ Metrics endpoint is accessible"
else
    echo "   ✗ Metrics endpoint is not accessible"
    exit 1
fi

# Test Prometheus
echo "3. Testing Prometheus..."
if curl -s http://localhost:9090/api/v1/status/targets > /dev/null; then
    echo "   ✓ Prometheus is running"
else
    echo "   ✗ Prometheus is not running on port 9090"
    exit 1
fi

# Test Grafana
echo "4. Testing Grafana..."
if curl -s http://localhost:3000/api/health > /dev/null; then
    echo "   ✓ Grafana is running"
else
    echo "   ✗ Grafana is not running on port 3000"
    exit 1
fi

# Generate some test traffic
echo "5. Generating test traffic..."
for i in {1..5}; do
    curl -s http://localhost:3000/health > /dev/null
    curl -s http://localhost:3000/health/metrics-test > /dev/null
    sleep 1
done
echo "   ✓ Test traffic generated"

echo ""
echo "Monitoring setup is working correctly!"
echo ""
echo "Access points:"
echo "- Backend: http://localhost:3000"
echo "- Prometheus: http://localhost:9090"
echo "- Grafana: http://localhost:3000 (admin/admin)"
echo ""
echo "You can now view metrics in Grafana or Prometheus." 