#!/bin/bash

echo "Installing monitoring dependencies..."

# Install backend dependencies
echo "1. Installing backend dependencies..."
cd ../backend
npm install

# Install monitoring dependencies
echo "2. Installing monitoring dependencies..."
cd ../infra/monitoring
npm install

echo "All dependencies installed successfully!"
echo ""
echo "Next steps:"
echo "1. Start monitoring services: ./start-monitoring.sh"
echo "2. Start the backend: cd ../backend && npm run dev"
echo "3. Test the setup: ./test-monitoring.sh" 