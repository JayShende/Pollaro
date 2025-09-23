# 🚀 Pollaro

<div align="center">

![Pollaro Logo](apps/frontend/public/images/dashboard.png)

**Build Forms & Polls That People Love to Answer**

[![wakatime](https://wakatime.com/badge/user/3319800a-4f54-4ed9-94d6-1689848d8c5b/project/b67a9f6c-7f9f-4ab9-b9a7-9fb16c9fd5be.svg)](https://wakatime.com/badge/user/3319800a-4f54-4ed9-94d6-1689848d8c5b/project/b67a9f6c-7f9f-4ab9-b9a7-9fb16c9fd5be)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

</div>

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 About

Pollaro is a modern, full-stack form and poll creation platform that makes it easy to build beautiful, interactive forms and collect responses efficiently. Built with cutting-edge technologies, Pollaro offers a seamless experience for both form creators and respondents.

### Key Highlights

- 🎨 **Modern UI/UX** - Beautiful, responsive design with Tailwind CSS
- ⚡ **Real-time Updates** - Instant form updates and response tracking
- 🔐 **Secure Authentication** - NextAuth.js with Google OAuth integration
- 📱 **Mobile-First** - Fully responsive across all devices
- 🚀 **High Performance** - Built with Next.js 15 and optimized for speed
- 📊 **Analytics** - Built-in response analytics and insights
- 🔧 **Developer Friendly** - TypeScript throughout, comprehensive error handling

## ✨ Features

### Form Creation

- **Multiple Question Types**
  - Short Answer
  - Long Answer (Textarea)
  - Multiple Choice
  - Checkbox
  - Dropdown
  - File Upload
- **Form Management**
  - Drag & drop question ordering
  - Required/optional questions
  - Form preview
  - Publish/unpublish forms
- **Customization**
  - Form titles and descriptions
  - Question validation
  - File upload restrictions

### Response Collection

- **Anonymous Responses** - No signup required for respondents
- **File Upload Support** - Secure file uploads to AWS S3
- **Response Validation** - Client and server-side validation
- **Duplicate Prevention** - Prevents multiple responses from same user

### Analytics & Management

- **Response Dashboard** - View all responses in organized tables
- **Real-time Statistics** - Live response counts and analytics
- **Export Capabilities** - Download response data
- **Form Analytics** - Track form performance and engagement

### Technical Features

- **Monorepo Architecture** - Turborepo for efficient development
- **Type Safety** - Full TypeScript implementation
- **Database Management** - Prisma ORM with PostgreSQL
- **File Storage** - AWS S3 integration for file uploads
- **Authentication** - NextAuth.js with multiple providers
- **API Proxy** - Secure backend communication

## 🛠 Tech Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **UI Library**: Radix UI + Custom Components
- **Styling**: Tailwind CSS 4.x
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Authentication**: NextAuth.js v5
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend

- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **File Storage**: AWS S3
- **Authentication**: JWT + Google OAuth
- **Validation**: Zod schemas

### Development Tools

- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Type Checking**: TypeScript

## 📁 Project Structure

```
Pollaro/
├── apps/
│   ├── frontend/                 # Next.js frontend application
│   │   ├── app/                 # App Router pages and components
│   │   │   ├── (protected)/     # Protected routes
│   │   │   ├── auth/            # Authentication pages
│   │   │   ├── pages/           # Page components
│   │   │   └── api/             # API routes
│   │   ├── components/          # Reusable UI components
│   │   └── services/            # API services and queries
│   └── backend/                 # Express.js backend API
│       ├── src/
│       │   ├── controller/      # Route controllers
│       │   ├── services/        # Business logic
│       │   ├── routes/          # API routes
│       │   └── middlewares/     # Custom middlewares
│       └── prisma/              # Database schema
├── packages/
│   ├── prisma/                  # Shared Prisma client
│   ├── ui/                      # Shared UI components
│   ├── eslint-config/           # Shared ESLint config
│   └── typescript-config/       # Shared TypeScript config
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database
- AWS S3 bucket (for file uploads)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/pollaro.git
   cd pollaro
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up the database**

   ```bash
   # Generate Prisma client
   pnpm db:generate

   # Run database migrations
   pnpm db:migrate
   ```

5. **Start the development servers**

   ```bash
   # Start both frontend and backend
   pnpm dev

   # Or start individually
   pnpm dev --filter=frontend
   pnpm dev --filter=backend
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

### Available Scripts

```bash
# Development
pnpm dev                    # Start all apps in development mode
pnpm dev --filter=frontend # Start only frontend
pnpm dev --filter=backend  # Start only backend

# Building
pnpm build                  # Build all apps
pnpm build --filter=frontend # Build only frontend
pnpm build --filter=backend  # Build only backend

# Production
pnpm start                  # Start production servers

# Database
pnpm db:generate           # Generate Prisma client
pnpm db:migrate            # Run database migrations
pnpm db:studio             # Open Prisma Studio

# Code Quality
pnpm lint                  # Run ESLint
pnpm format               # Format code with Prettier
pnpm check-types          # Run TypeScript type checking
```

## 🔧 Environment Variables

### Frontend (.env.local)

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)

```env
DATABASE_URL="postgresql://username:password@localhost:5432/pollaro"
JWT_SECRET=your-jwt-secret
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=your-aws-region
AWS_S3_BUCKET=your-s3-bucket-name
CORS_ORIGIN=http://localhost:3000
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/signin` - User sign in
- `POST /api/auth/signout` - User sign out
- `GET /api/auth/session` - Get current session

### Form Management

- `GET /api/forms` - Get user's forms
- `POST /api/forms` - Create new form
- `GET /api/forms/:id` - Get form details
- `PUT /api/forms/:id` - Update form
- `DELETE /api/forms/:id` - Delete form

### Question Management

- `POST /api/questions` - Create question
- `PUT /api/questions/:id` - Update question
- `DELETE /api/questions/:id` - Delete question

### Response Management

- `POST /api/responses` - Submit response
- `GET /api/responses/:formId` - Get form responses
- `DELETE /api/responses/:id` - Delete response

### File Upload

- `POST /api/file/upload` - Get presigned URL for file upload

## 🤝 Contributing

We welcome contributions to Pollaro! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests and linting: `pnpm lint && pnpm check-types`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all checks pass before submitting PR

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance optimizations
- 🧪 Test coverage improvements

### Reporting Issues

- Use the GitHub issue tracker
- Provide detailed reproduction steps
- Include system information
- Add screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Prisma](https://www.prisma.io/) for the excellent database toolkit
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Turborepo](https://turbo.build/) for the monorepo build system

---

<div align="center">

**Made with ❤️ by the Pollaro Team**

[⭐ Star this repo](https://github.com/yourusername/pollaro) • [🐛 Report Bug](https://github.com/yourusername/pollaro/issues) • [✨ Request Feature](https://github.com/yourusername/pollaro/issues)

</div>
