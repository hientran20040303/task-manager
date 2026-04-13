## Project Overview
This is a professional Event Planner built with **Next.js 16**, **React 19**, and **Tailwind CSS v4**. It allows users to track events they are interested in, set research priorities, and manage their schedule with full persistence.

## Tech Stack
- **Framework:** Next.js
- **Library:** React 19
- **Styling:** Tailwind CSS v4
- **Persistence:** Browser LocalStorage

## AI Usage Log

### 1. Scaffolding & Component Logic
- **What I asked:** I provided the assignment requirements and asked for a step-by-step guide on the logical development order (which components to build first).
- **What I got:** A structured roadmap providing the order of which component should be written first.
- **What I changed:** I followed the order but customized the data structures to fit the Event Planner idea.

### 2. Date Formatting Logic
- **What I asked:** "How can I make an input automatically add dashes like mm-dd-yyyy as the user types only numbers?"
- **What I got:** A Javascript regex function.
- **What I learned:** I learned how to use `.replace(/\D/g, '')` to strip away non numbers so the formatting logic doesn't break if a user accidentally hits a letter.

### 3. Debugging TypeErrors
- **What I asked:** "My app crashes with 'Cannot read properties of undefined (reading name)'."
- **What I learned:** AI explained that my `localStorage` had old data from a previous version. I learned to use "Lazy Initializers" and "Guard Clauses" (`if (!event) return null`) to make my code more stable and prevent crashes.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
