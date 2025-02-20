const express = require('express');
const cors = require('cors');
const promClient = require('prom-client');
const app = express();

// cors use
app.use(cors());

// Prometheus metrics
const register = promClient.register;

// Metrics
const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Histogram of HTTP request duration in seconds',
  buckets: [0.1, 0.2, 0.5, 1, 2, 5]
});

const httpRequestCount = new promClient.Counter({
  name: 'http_request_count',
  help: 'Total HTTP requests made'
});

const httpRequestErrorCount = new promClient.Counter({
  name: 'http_request_error_count',
  help: 'Total number of errors in HTTP requests'
});

// frontend metrics
const pageLoadTime = new promClient.Gauge({
    name: 'frontend_page_load_time_seconds',
    help: 'Page load time for the frontend in seconds'
  });
  
  const apiRequestDuration = new promClient.Gauge({
    name: 'frontend_api_request_duration_seconds',
    help: 'API request duration for the frontend in seconds'
  });

// Endpoint to receive frontend metrics
app.use(express.json());
app.post('/api/metrics', (req, res) => {
    const metrics = req.body;

    if (metrics.pageLoadDuration) {
      pageLoadTime.set(metrics.pageLoadDuration); // Store page load time
    }
    if (metrics.apiRequestDuration) {
      apiRequestDuration.set(metrics.apiRequestDuration); // Store API request duration
    }

    res.send({ status: 'Metrics received' });
});

// metrics route for Prometheus scraping
app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

app.get('/api/message', (req, res) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  httpRequestCount.inc(); // ncrement request count

  //error for testing
  if (Math.random() < 0.1) {
    httpRequestErrorCount.inc(); // iincrement error count
    return res.status(500).json({ error: 'Something went wrong!' });
  }

  
  res.json({ message: 'Hola Esh tester from Backend!' });
  end(); // request duration
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend's home port is ${PORT}`);
});
