<<<<<<< HEAD
# 🎄 SantaCloud - Santa's Magic Dashboard

> The official dashboard for Santa Claus to manage his annual Christmas tour. Track children, gifts, reindeers, and magical letters!

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![AWS](https://img.shields.io/badge/AWS-FF9900?logo=amazon-aws&logoColor=white)](https://aws.amazon.com/)

## ✨ Features

- 🧒 **Children Management**: Track all children worldwide with their wishlists and nice/naughty status
- 🎁 **Gift Tracking**: Monitor gift manufacturing progress and delivery status
- 🦌 **Reindeer Oversight**: Manage reindeer health, energy levels, and locations
- ✉️ **Letter Processing**: Handle children's letters with magical AI-powered replies
- 📊 **Dashboard Analytics**: Real-time statistics and progress monitoring
- 🎨 **Magical UI**: Beautiful, festive interface with smooth animations and transitions

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling with custom magical themes
- **React Router** for navigation
- **TanStack Query** for efficient data fetching
- **Radix UI** components for accessible interfaces
- **Lucide Icons** for beautiful iconography

### Backend
- **AWS CDK** for infrastructure as code
- **AWS Lambda** for serverless functions
- **API Gateway** for REST API management
- **DynamoDB** for NoSQL data storage
- **TypeScript** throughout the stack

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** ([Download](https://nodejs.org/))
- **AWS CLI** configured with credentials ([Setup Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html))
- **AWS CDK CLI** (`npm install -g aws-cdk`)
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/MaxPrime7097/santa-s-command-center.git
cd santa-s-command-center
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Deploy the Backend

```bash
cd backend
npm install
cdk bootstrap  # First time only
cdk deploy
```

Note the **API Gateway URL** from the deployment output (e.g., `https://abc123.execute-api.us-east-1.amazonaws.com/prod`).

### 4. Configure Frontend API

Update the API base URL in `src/services/api.ts`:

```typescript
const API_BASE = 'https://your-api-id.execute-api.region.amazonaws.com/prod';
```

### 5. Populate Initial Data

After deployment, add sample data to DynamoDB tables using AWS Console or CLI. See the [Backend README](./backend/README.md#populate-initial-data) for detailed instructions.

## 🎯 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

### Linting

```bash
npm run lint
```

## 🏗️ Architecture

```
SantaCloud/
├── frontend/          # React TypeScript application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── services/      # API service layer
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
│   └── public/            # Static assets
└── backend/           # AWS CDK infrastructure
    ├── lambda/            # Lambda function handlers
    ├── lib/               # CDK stack definitions
    └── bin/               # CDK app entry point
```

### Database Schema

- **SantaChildren**: Child information, wishlists, nice scores
- **SantaGifts**: Gift manufacturing status and priorities
- **SantaReindeers**: Reindeer health, location, and energy levels
- **SantaLetters**: Children's letters and magical replies

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/dashboard/stats` | Get dashboard statistics |
| GET | `/children` | Get all children (supports `?query=search`) |
| GET | `/children/{id}` | Get single child |
| POST | `/children` | Add new child |
| GET | `/gifts` | Get all gifts |
| PUT | `/gifts/{id}` | Update gift status |
| GET | `/gifts/progress` | Get gift progress statistics |
| GET | `/reindeers` | Get all reindeers |
| PUT | `/reindeers/{id}` | Update reindeer status |
| GET | `/letters` | Get all letters |
| POST | `/letters/reply` | Generate magic reply |

## 🎨 Development

### Project Structure

```
src/
├── components/          # UI components
│   ├── ui/             # Base UI components (Radix)
│   ├── AuroraBackground.tsx
│   ├── ChristmasCountdown.tsx
│   ├── DataTable.tsx
│   ├── GlassCard.tsx
│   └── ...
├── pages/              # Route components
│   ├── Dashboard.tsx
│   ├── Children.tsx
│   ├── Gifts.tsx
│   └── ...
├── services/           # API integration
├── hooks/              # Custom hooks
└── lib/                # Utilities
```

### Adding New Features

1. Create components in `src/components/`
2. Add routes in `src/App.tsx`
3. Implement API calls in `src/services/api.ts`
4. Update backend Lambda functions as needed

## 🤝 Contributing

We welcome contributions from all elves and magical beings! 🎅

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style

- Use TypeScript for all new code
- Follow ESLint configuration
- Use meaningful commit messages
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**🎄 Merry Christmas and Happy Coding! 🎄**
=======


🎅 SantaCloud – Full Stack Application

SantaCloud is a full-stack serverless application that simulates Santa’s Christmas operations using modern cloud architecture.
It provides a dashboard to manage children, gifts, reindeers, and letters — all powered by AWS serverless services.


---

🌍 Project Overview

SantaCloud helps Santa’s team:

Track children worldwide and their “nice” status

Manage gift production and delivery progress

Monitor reindeers’ status and energy

Read and reply to children’s letters magically 🎄

Visualize everything through a clean web dashboard


This project is built with scalability, simplicity, and cost-efficiency in mind.


---

🧱 Tech Stack

Frontend

Framework: Vite + React + TypeScript

Styling: Tailwind CSS

API Communication: REST (API Gateway)

Deployment: Static hosting (AWS Amplify)


Backend (Serverless)

AWS API Gateway – REST API with CORS

AWS Lambda – Business logic per endpoint

AWS DynamoDB – NoSQL database

AWS CDK – Infrastructure as Code (TypeScript)



---

🏗️ Architecture Overview

Frontend (React)
     |
     | HTTPS
     v
API Gateway (REST)
     |
     v
Lambda Functions
     |
     v
DynamoDB Tables


---

🗄️ Data Model (DynamoDB)

SantaChildren

Child profile, wishlist, nice score


SantaGifts

Gift production & delivery status


SantaReindeers

Reindeer health, energy & location


SantaLetters

Letters received & replies sent




---

📁 Project Structure

santacloud/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── lib/          # CDK stack definitions
│   ├── lambda/       # Lambda handlers
│   └── package.json
│
└── README.md


---

🚀 Getting Started

Prerequisites

Node.js 18+

AWS CLI configured

AWS CDK CLI

npm install -g aws-cdk



---

🔧 Backend Setup (AWS)

cd backend
npm install
cdk bootstrap   # first time only
cdk deploy

After deployment, note the API Gateway URL:

https://abc123.execute-api.region.amazonaws.com/prod


---

🖥️ Frontend Setup

1. Update the API base URL:



// frontend/src/services/api.ts
const API_BASE = 'https://your-api-id.execute-api.region.amazonaws.com/prod';

2. Run the frontend:



cd frontend
npm install
npm run dev


---

📡 API Endpoints

Dashboard

GET /dashboard/stats


Children

GET /children

GET /children/{id}

POST /children


Gifts

GET /gifts

PUT /gifts/{id}

GET /gifts/progress


Reindeers

GET /reindeers

PUT /reindeers/{id}


Letters

GET /letters

POST /letters/reply



---

🧪 Initial Data (Optional)

You can populate DynamoDB manually via AWS Console or CLI for testing.

Example (Children):

{
  "id": "1",
  "name": "Emma Thompson",
  "age": 7,
  "country": "USA",
  "status": "nice",
  "wishlist": ["Teddy Bear"],
  "niceScore": 95
}


---

💰 Cost Optimization

DynamoDB on-demand pricing

Lambda pay-per-use

API Gateway caching (optional)

No idle servers 🚫


Perfect for demos, hackathons, and production-ready MVPs.


---

🧹 Cleanup

cd backend
cdk destroy


---

🎯 Future Improvements

Authentication (Cognito)

Role-based access (Elves / Santa / Admin)

Real-time updates (WebSockets)

AI-generated letter replies ✨

Delivery tracking map



---

🧠 Why This Project Matters

SantaCloud demonstrates:

Real-world cloud architecture

Clean full-stack separation

Scalable serverless design

Production-ready AWS patterns.
>>>>>>> dc4887898bf6331a11d76b517c0fb4b62fb0d92f
