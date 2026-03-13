# Modern Web Store

A Webstore Admin Dashboard built with NextJS, and TypeScript. The store allows users to browse a product catalogue, filter and sort by various criteria and paginate through results.

---

## Personal Reflection

As an aspiring frontend developer, I built this project to deepen my understanding of Next.js and its core features. My two main areas of focus were:

1. **URL-driven state management** — Rather than relying on `useState` or a client-side state library, I deliberately chose to represent all UI state (sorting, filtering, pagination, etc.) in the URL via `searchParams`. This keeps the application shareable and bookmarkable, and forces a clear separation between what drives the UI and how it is rendered.

2. **React Server Components** — I leaned into Next.js's server-first model and kept as much rendering on the server as possible, only dropping into client components where user interactivity demanded it.

I also used the project as a hands-on opportunity to work with two different sources of "live" data: a JSON database + middleware (as a mock backend) and Firestore (for persisting product likes).

The application has known rough edges. Error handling is minimal, the category-filtering logic has some bugs, and the design is fairly bare-bones. These are acknowledged limitations; the goal of this project was deliberate practice on state management and data-fetching patterns rather than building a polished product.

---

## Features

- 🛍️ **Product catalogue** — browse products fetched from a REST API
- 🔍 **Filtering** — filter products by category
- ↕️ **Sorting** — sort by price or title, ascending or descending
- 📄 **Pagination** — navigate through pages of results
- 🔢 **Configurable page size** — choose how many products to display at once
- ❤️ **Like button** — like individual products, persisted to Firestore
- 🔗 **URL-driven state** — all filter, sort, and pagination state lives in the URL

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | Full-stack React framework (App Router) |
| [TypeScript](https://www.typescriptlang.org/) | Type safety across the codebase |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first styling |
| [Firebase / Firestore](https://firebase.google.com/) | Persistent storage for Customer and Order data |

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Webstore-Admin-Page

# Install dependencies
npm install
```

### Running locally

```bash
npm run dev:full
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

