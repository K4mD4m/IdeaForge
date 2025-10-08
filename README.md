# 💡 IdeaForge — Share, Explore & Build Ideas

**IdeaForge** is a modern web platform designed for sharing, exploring, and validating creative ideas.  
Users can publish innovative projects — from startups to personal concepts.  
Built with **Next.js 14**, **TypeScript**, and **Prisma**, it offers secure authentication, responsive UI, and smooth user experience.

---

## 🚀 Features

- 🔐 **Authentication**
  - Email/password credentials (with email verification)
  - OAuth via **Google** and **GitHub**
  - Secure sessions managed by **NextAuth.js**

- 💬 **Ideas & Collaboration**
  - Create and manage your own ideas
  - Filter, explore, and search ideas easily

- 🧑‍💻 **User Dashboard**
  - Manage your drafts and published ideas
  - Only verified users can publish publicly

- 📧 **Email Verification**
  - Automatic verification for Google/GitHub users
  - Secure token-based verification for email signups

- ⚡ **Tech Stack**
  - **Next.js 14 (App Router)**
  - **TypeScript**
  - **Prisma ORM** + **PostgreSQL**
  - **NextAuth.js**
  - **Tailwind CSS** + **Framer Motion**
  - **Vercel** for hosting and CI/CD

---

## 🛠️ Environment Variables

Create a `.env` file (or set these in Vercel):

```bash
DATABASE_URL="YOUR_DATABASE_URL"

GITHUB_ID="YOUR_GITHUB_CLIENT_ID"
GITHUB_SECRET="YOUR_GITHUB_CLIENT_SECRET"

NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
NEXT_PUBLIC_APP_URL="YOUR_APP_URL"

GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

GMAIL_USER="YOUR_GMAIL_USER_EMAIL"
GMAIL_PASS="YOUR_GMAIL_APP_PASSWORD"

```

---

## 🧩 Prisma Schema

The database uses Prisma with relational models for users, sessions, accounts, and ideas.
Each OAuth account (Google/GitHub) links to a User record, allowing unified identity management.

### Local setup

To set up the database locally:

1. Install dependencies:

```bash
npm install
```

2. Generate and apply migrations based on the current Prisma schema:

```bash
npx prisma migrate dev --name init
```

3. (Optional) Open Prisma Studo to explore the database:

```bash
npx prisma studio
```

---

## 🧰 Development

To run locally:

```bash
git clone https://github.com/K4mD4m/IdeaForge.git

cd ideaforge

npm install

npm run dev
```

Then visit:

```bash
http://localhost:3000/
```

---

## 📦 Deployment

This project is optimized for Vercel.

---

## 🧑‍🎨 UI & Design

- Modern dark aesthetic with smooth gradients
- Built with Tailwind CSS
- Animated with Framer Motion
- Clean, minimal UX optimized for focus and clarity

---

## 🛡️ Security Notes

- Passwords are hashed using bcrypt
- All sensitive environment variables are stored securely on Vercel
- Email verification ensures user authenticity before publishing ideas
- OAuth users are automatically marked as verified to prevent login loops

---

## 🌱 Future Improvements

These are potential features and enhancements planned for future releases:

- 💬 **Enhanced Collaboration**
  - Ability to comment on ideas
  - Like/dislike ideas
  - Follow other users to track their ideas

- 🖼️ **Profile Customization**
  - Set profile pictures
  - Update personal info in the dashboard

- 🔔 **Notifications**
  - Notify users when their ideas receive comments or likes
  - Real-time alerts for activity on followed users ideas

- 🔍 **Advanced Idea Discovery**
  - Tag-based search and filtering
  - Trending ideas and recommended suggestions

---

## 📄 License

MIT License © 2025 — Created by K4mD4m
Feel free to use, modify, and contribute.

> “Every great innovation starts with an idea — forge yours here.🔥”
