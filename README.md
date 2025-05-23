# 🚀 Fuse Stock Backend Challenge

This is a backend service developed for the Fuse take-home challenge. It simulates a stock trading platform integrated with a mock vendor API, supporting portfolio tracking, transaction execution, and (optionally) daily reporting.

---

## 🌐 Production Deployment

- Backend: https://fuse-backend-challenge-8630d45d7001.herokuapp.com
- Swagger Docs: https://fuse-backend-challenge-8630d45d7001.herokuapp.com/api
- Postman Collection: https://documenter.getpostman.com/view/2654210/2sB2qaj2Pv

---

## ✅ Features

- ✅ List available stocks (`GET /stocks`)
- ✅ Execute stock purchases (`POST /stocks/:symbol/buy`)
- ✅ Retrieve user portfolio (`GET /portfolio/:userId`)
- ✅ Log successful and failed transactions
- 🟡 (Optional) Daily email report of transactions

---

## 🧪 Unit Testing

Unit tests are included for:
- Price validation logic
- Vendor API service
- In-memory portfolio handling
- Transaction logging
- Transaction orchestration

```bash
npm run test
```

---

## 🧰 Tech Stack

- Node.js + TypeScript
- NestJS Framework
- Axios for API calls
- Jest for testing
- Swagger for documentation
- Docker for containerization
- Deployed on Heroku

---

## ⚙️ Environment Variables

```env
VENDOR_API_KEY=nSbPbFJfe95BFZufiDwF32UhqZLEVQ5K4wdtJI2e
VENDOR_BASE_URL=https://api.challenge.fusefinance.com
```

---

## ▶️ Running Locally

### Requirements

- Node.js v18+
- Docker (optional)

### Option 1: Local run

```bash
npm install
npm run start:dev
```

### Option 2: With Docker

```bash
docker-compose build --no-cache && docker-compose up -d
```

---

## 📂 Project Structure

```
src/
├── stocks/              → Handles stock listing
├── transactions/        → Handles purchases and logs
│   └── transaction-log/
├── portfolio/           → Tracks user portfolios
│   └── portfolio-store/
├── vendor/              → External API integration
├── common/utils/        → Utility functions
```

---

## 🚀 Deploying to Heroku

```bash
heroku login
heroku container:login
heroku create fuse-backend-challenge --stack=container
heroku config:set VENDOR_API_KEY=your_key
heroku config:set VENDOR_BASE_URL=your_url
heroku container:push web -a fuse-backend-challenge
heroku container:release web -a fuse-backend-challenge
```

---

## ✨ Extras

- Swagger documentation exposed at `/api`
- Postman documentation for all endpoints
- Docker multi-stage build with unit test validation
