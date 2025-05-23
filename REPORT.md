# 📝 Fuse Backend - Technical Report

---

## 🎯 Objective

Implement a backend service simulating a stock trading platform that integrates with a mock vendor API. The service must allow:

- Viewing available stocks
- Executing stock purchases
- Tracking user portfolios
- (Optional) Sending a daily summary report via email

---

## 🧱 Architecture

Built using NestJS, with clean module separation and service responsibility principles.

```
src/
├── stocks/
├── transactions/
│   └── transaction-log/
├── portfolio/
│   └── portfolio-store/
├── vendor/
```

Each domain has its own controller, service, and DTOs.

---

## 🔁 Purchase Flow

1. The user attempts to buy a stock at a given price and quantity.
2. The service fetches the current price from the vendor API.
3. The transaction proceeds only if the offered price is within ±2% of the current price.
4. The transaction is logged and, if successful, the user’s portfolio is updated.

---

## ⚙️ Core Services

| Service                | Responsibility                                      |
|------------------------|------------------------------------------------------|
| `VendorService`        | Interfaces with the mock vendor API                 |
| `TransactionsService`  | Orchestrates the purchase process                   |
| `PortfolioStoreService`| Tracks holdings in memory by user                   |
| `TransactionLogService`| Logs transaction attempts (success/failure)         |
| `StocksService`        | Wraps stock listing via `VendorService`             |

---

## 🧪 Testing Strategy

Test coverage includes:
- Validation logic (±2% price rule)
- Portfolio storage behavior
- Logging system correctness
- Vendor service integration (mocked)
- Transaction service orchestration

Tests are executed in a separate Docker stage and must pass before image build completes.

---

## 🐳 Docker Strategy

A multi-stage `Dockerfile.dev` is used for local testing, with:
- Base image for dependencies
- Test stage (runs Jest)
- Build stage
- Runtime stage

A simplified `Dockerfile` is used for Heroku deployment.

---

## 🌐 Documentation

- Swagger docs exposed at `/api` route
- Postman docs: https://documenter.getpostman.com/view/2654210/2sB2qaj2Pv

---

## ✅ Outcome

This backend satisfies the core requirements of the challenge with:
- Modular and testable code
- Working endpoints for all use cases
- Docker support and CI-friendly architecture
- Successful deployment to Heroku
