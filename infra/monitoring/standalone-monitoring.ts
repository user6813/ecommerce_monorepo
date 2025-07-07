import { register, collectDefaultMetrics, Counter, Histogram, Gauge } from 'prom-client';
import { Request, Response, NextFunction } from 'express';

// Initialize default Node.js metrics
collectDefaultMetrics();

// Create metrics
const httpRequestsTotal = new Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route'],
  buckets: [0.1, 0.5, 1, 2, 5, 10],
});

const activeConnections = new Gauge({
  name: 'active_connections',
  help: 'Number of active connections',
});

const databaseConnections = new Gauge({
  name: 'database_connections',
  help: 'Number of database connections',
});

// Monitoring middleware function
export function monitoringMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  const method = req.method;
  const route = req.route?.path || req.path || 'unknown';

  // Override res.end to capture response status and duration
  const originalEnd = res.end;
  res.end = function(chunk?: any, encoding?: any) {
    const duration = (Date.now() - startTime) / 1000; // Convert to seconds
    const statusCode = res.statusCode;

    // Record metrics
    httpRequestsTotal.inc({ method, route, status_code: statusCode.toString() });
    httpRequestDuration.observe({ method, route }, duration);

    // Call original end method
    return originalEnd.call(this, chunk, encoding);
  };

  next();
}

// Metrics endpoint handler
export async function getMetrics(): Promise<string> {
  return register.metrics();
}

// Utility functions for custom metrics
export function setActiveConnections(count: number) {
  activeConnections.set(count);
}

export function setDatabaseConnections(count: number) {
  databaseConnections.set(count);
}

export function incrementHttpRequests(method: string, route: string, statusCode: number) {
  httpRequestsTotal.inc({ method, route, status_code: statusCode.toString() });
}

export function recordHttpRequestDuration(method: string, route: string, duration: number) {
  httpRequestDuration.observe({ method, route }, duration);
} 