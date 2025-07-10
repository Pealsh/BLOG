import type { BlogPost } from '../types/blog';

export const mockPosts: BlogPost[] = [
  {
    id: 'react-hooks-guide',
    title: 'The Complete Guide to React Hooks',
    subtitle: 'Master modern React development with hooks',
    content: `# The Complete Guide to React Hooks

React Hooks revolutionized how we write React components. In this comprehensive guide, we'll explore all the essential hooks and how to use them effectively.

## What are React Hooks?

Hooks are functions that let you "hook into" React state and lifecycle features from function components. They were introduced in React 16.8 and have become the standard way to write React components.

## useState Hook

The useState hook allows you to add state to function components:

\`\`\`javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The useEffect hook lets you perform side effects in function components:

\`\`\`javascript
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setUser);
  }, [userId]);
  
  return user ? <div>{user.name}</div> : <div>Loading...</div>;
}
\`\`\`

## Custom Hooks

You can create your own hooks to share logic between components:

\`\`\`javascript
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);
  
  return { count, increment, decrement, reset };
}
\`\`\`

## Best Practices

1. **Only call hooks at the top level** - Don't call hooks inside loops, conditions, or nested functions
2. **Use the ESLint plugin** - Install eslint-plugin-react-hooks to catch common mistakes
3. **Separate concerns** - Use multiple useEffect hooks for different concerns
4. **Optimize with useMemo and useCallback** - When you have expensive computations or to prevent unnecessary re-renders

## Conclusion

React Hooks provide a powerful and flexible way to build React applications. By mastering these patterns, you'll be able to write cleaner, more maintainable code.`,
    excerpt: 'A comprehensive guide to React Hooks covering useState, useEffect, custom hooks, and best practices for modern React development.',
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    categories: ['Tutorial', 'React'],
    tags: ['react', 'hooks', 'javascript', 'frontend'],
    readingTime: 8,
    isPublished: true,
    isDraft: false,
    featured: true,
    bookmarked: false,
    metaTitle: 'The Complete Guide to React Hooks - Master Modern React',
    metaDescription: 'Learn React Hooks with this comprehensive guide. Master useState, useEffect, custom hooks, and best practices for modern React development.',
    author: {
      name: 'Maoto Mikami',
      avatar: '/avatar.jpg'
    }
  },
  {
    id: 'typescript-advanced-types',
    title: 'Advanced TypeScript Types You Should Know',
    subtitle: 'Level up your TypeScript skills with advanced type patterns',
    content: `# Advanced TypeScript Types You Should Know

TypeScript's type system is incredibly powerful. Let's explore some advanced type patterns that will make your code more robust and maintainable.

## Utility Types

TypeScript provides several utility types to facilitate common type transformations:

### Partial<T>

Makes all properties of T optional:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// All properties are optional
type PartialUser = Partial<User>;

function updateUser(user: User, updates: PartialUser) {
  return { ...user, ...updates };
}
\`\`\`

### Pick<T, K>

Creates a type by picking specific properties from T:

\`\`\`typescript
type UserSummary = Pick<User, 'id' | 'name'>;
// { id: number; name: string; }
\`\`\`

### Omit<T, K>

Creates a type by omitting specific properties from T:

\`\`\`typescript
type CreateUserRequest = Omit<User, 'id'>;
// { name: string; email: string; }
\`\`\`

## Conditional Types

Conditional types allow you to create types based on conditions:

\`\`\`typescript
type ApiResponse<T> = T extends string
  ? { message: T }
  : { data: T };

type StringResponse = ApiResponse<string>;
// { message: string }

type NumberResponse = ApiResponse<number>;
// { data: number }
\`\`\`

## Mapped Types

Mapped types allow you to create new types based on existing ones:

\`\`\`typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type ReadonlyUser = Readonly<User>;
// {
//   readonly id: number;
//   readonly name: string;
//   readonly email: string;
// }
\`\`\`

## Template Literal Types

Template literal types allow you to create types from string literals:

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type MouseEvent = EventName<'click' | 'hover'>;
// 'onClick' | 'onHover'
\`\`\`

## Conclusion

These advanced TypeScript types will help you write more type-safe and maintainable code. Practice using them in your projects to become more proficient with TypeScript.`,
    excerpt: 'Explore advanced TypeScript type patterns including utility types, conditional types, mapped types, and template literal types.',
    publishedAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
    categories: ['Tutorial', 'TypeScript'],
    tags: ['typescript', 'types', 'advanced', 'programming'],
    readingTime: 6,
    isPublished: true,
    isDraft: false,
    featured: true,
    bookmarked: false,
    metaTitle: 'Advanced TypeScript Types You Should Know',
    metaDescription: 'Master advanced TypeScript type patterns with utility types, conditional types, mapped types, and template literal types.',
    author: {
      name: 'Maoto Mikami',
      avatar: '/avatar.jpg'
    }
  },
  {
    id: 'css-grid-flexbox',
    title: 'CSS Grid vs Flexbox: When to Use Each',
    subtitle: 'Master modern CSS layout techniques',
    content: `# CSS Grid vs Flexbox: When to Use Each

Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Let's explore when to use each one.

## CSS Grid

CSS Grid is designed for two-dimensional layouts:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 1rem;
}

.grid-item {
  background: #f0f0f0;
  padding: 1rem;
}
\`\`\`

### When to Use CSS Grid

- **Complex layouts** with both rows and columns
- **Overlapping elements**
- **Responsive design** with changing layouts
- **Component-based layouts**

## Flexbox

Flexbox is designed for one-dimensional layouts:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.flex-item {
  flex: 1;
  padding: 1rem;
}
\`\`\`

### When to Use Flexbox

- **Navigation bars**
- **Centering content**
- **Distributing space** between items
- **Aligning items** in a single direction

## Practical Examples

### Card Layout (Grid)

\`\`\`css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

### Navigation Bar (Flexbox)

\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 1rem;
}
\`\`\`

## Combining Both

Often, you'll use both Grid and Flexbox together:

\`\`\`css
.layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## Conclusion

Both CSS Grid and Flexbox are essential tools for modern web development. Grid excels at complex, two-dimensional layouts, while Flexbox is perfect for one-dimensional alignment and distribution.`,
    excerpt: 'Learn when to use CSS Grid vs Flexbox for different layout scenarios with practical examples and best practices.',
    publishedAt: '2024-01-10T09:15:00Z',
    updatedAt: '2024-01-10T09:15:00Z',
    categories: ['Tutorial', 'CSS'],
    tags: ['css', 'grid', 'flexbox', 'layout', 'responsive'],
    readingTime: 5,
    isPublished: true,
    isDraft: false,
    featured: false,
    bookmarked: false,
    metaTitle: 'CSS Grid vs Flexbox: When to Use Each',
    metaDescription: 'Master CSS Grid and Flexbox with practical examples and learn when to use each layout method.',
    author: {
      name: 'Maoto Mikami',
      avatar: '/avatar.jpg'
    }
  },
  {
    id: 'javascript-async-patterns',
    title: 'Modern JavaScript Async Patterns',
    subtitle: 'From callbacks to async/await and beyond',
    content: `# Modern JavaScript Async Patterns

Asynchronous programming is crucial in JavaScript. Let's explore the evolution of async patterns and modern best practices.

## The Evolution

### 1. Callbacks

The original way to handle async operations:

\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    callback(null, 'Data loaded');
  }, 1000);
}

fetchData((error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});
\`\`\`

**Problems**: Callback hell, error handling complexity

### 2. Promises

A cleaner approach:

\`\`\`javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data loaded');
    }, 1000);
  });
}

fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

### 3. Async/Await

The most readable approach:

\`\`\`javascript
async function loadData() {
  try {
    const data = await fetchData();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
\`\`\`

## Advanced Patterns

### Parallel Execution

\`\`\`javascript
async function loadMultipleData() {
  try {
    const [user, posts, comments] = await Promise.all([
      fetchUser(),
      fetchPosts(),
      fetchComments()
    ]);
    
    return { user, posts, comments };
  } catch (error) {
    console.error('One of the requests failed:', error);
  }
}
\`\`\`

### Error Handling with Retry

\`\`\`javascript
async function fetchWithRetry(url, options = {}) {
  const { retries = 3, delay = 1000 } = options;
  
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}
\`\`\`

### Async Iterators

\`\`\`javascript
async function* fetchPages(url) {
  let page = 1;
  while (true) {
    const response = await fetch(\`\${url}?page=\${page}\`);
    const data = await response.json();
    
    if (data.items.length === 0) break;
    
    yield data.items;
    page++;
  }
}

// Usage
for await (const items of fetchPages('/api/items')) {
  console.log('Page items:', items);
}
\`\`\`

## Best Practices

1. **Use async/await** for cleaner, more readable code
2. **Handle errors properly** with try/catch blocks
3. **Use Promise.all** for parallel operations
4. **Implement proper timeout handling**
5. **Consider using AbortController** for cancellation

## Conclusion

Modern JavaScript provides excellent tools for handling asynchronous operations. Master these patterns to write more efficient and maintainable code.`,
    excerpt: 'Explore modern JavaScript async patterns from callbacks to async/await, with advanced techniques and best practices.',
    publishedAt: '2024-01-08T16:45:00Z',
    updatedAt: '2024-01-08T16:45:00Z',
    categories: ['Tutorial', 'JavaScript'],
    tags: ['javascript', 'async', 'promises', 'await', 'patterns'],
    readingTime: 7,
    isPublished: true,
    isDraft: false,
    featured: false,
    bookmarked: false,
    metaTitle: 'Modern JavaScript Async Patterns',
    metaDescription: 'Learn modern JavaScript async patterns from callbacks to async/await with practical examples and best practices.',
    author: {
      name: 'Maoto Mikami',
      avatar: '/avatar.jpg'
    }
  },
  {
    id: 'web-performance-optimization',
    title: 'Web Performance Optimization Techniques',
    subtitle: 'Speed up your web applications',
    content: `# Web Performance Optimization Techniques

Web performance is crucial for user experience and SEO. Let's explore key techniques to optimize your web applications.

## Core Web Vitals

Google's Core Web Vitals are essential metrics:

### Largest Contentful Paint (LCP)

Measures loading performance:

\`\`\`javascript
// Optimize images
const img = new Image();
img.loading = 'lazy';
img.src = 'optimized-image.webp';
img.sizes = '(max-width: 768px) 100vw, 50vw';
\`\`\`

### First Input Delay (FID)

Measures interactivity:

\`\`\`javascript
// Use requestIdleCallback for non-critical tasks
function runNonCriticalTask() {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(processBigData);
  } else {
    setTimeout(processBigData, 0);
  }
}
\`\`\`

### Cumulative Layout Shift (CLS)

Measures visual stability:

\`\`\`css
/* Reserve space for images */
.image-container {
  width: 100%;
  height: 200px;
  background: #f0f0f0;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
\`\`\`

## Optimization Strategies

### 1. Code Splitting

\`\`\`javascript
// Dynamic imports for code splitting
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
\`\`\`

### 2. Image Optimization

\`\`\`html
<!-- Use modern formats and responsive images -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.avif" type="image/avif">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
\`\`\`

### 3. Resource Hints

\`\`\`html
<!-- Preload critical resources -->
<link rel="preload" href="critical.css" as="style">
<link rel="preload" href="hero-image.jpg" as="image">

<!-- Prefetch likely resources -->
<link rel="prefetch" href="next-page.html">
\`\`\`

### 4. Caching Strategies

\`\`\`javascript
// Service Worker for caching
self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  }
});
\`\`\`

## Performance Monitoring

### Web Vitals API

\`\`\`javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  fetch('/analytics', { body, method: 'POST' });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
\`\`\`

### Performance Observer

\`\`\`javascript
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(entry.name, entry.duration);
  }
});

observer.observe({ entryTypes: ['measure', 'navigation'] });
\`\`\`

## Tools for Optimization

1. **Lighthouse** - Comprehensive auditing
2. **WebPageTest** - Detailed performance analysis
3. **Chrome DevTools** - Real-time debugging
4. **Bundle analyzers** - Code splitting optimization

## Conclusion

Web performance optimization is an ongoing process. Focus on Core Web Vitals, implement caching strategies, and continuously monitor your application's performance.`,
    excerpt: 'Learn essential web performance optimization techniques including Core Web Vitals, code splitting, and monitoring strategies.',
    publishedAt: '2024-01-05T11:20:00Z',
    updatedAt: '2024-01-05T11:20:00Z',
    categories: ['Tutorial', 'Performance'],
    tags: ['performance', 'optimization', 'web-vitals', 'speed', 'ux'],
    readingTime: 6,
    isPublished: true,
    isDraft: false,
    featured: false,
    bookmarked: false,
    metaTitle: 'Web Performance Optimization Techniques',
    metaDescription: 'Master web performance optimization with Core Web Vitals, code splitting, caching strategies, and monitoring tools.',
    author: {
      name: 'Maoto Mikami',
      avatar: '/avatar.jpg'
    }
  },
  {
    id: 'nextjs-13-app-router',
    title: 'Next.js 13 App Router: Complete Guide',
    subtitle: 'Master the new routing system in Next.js 13',
    content: `# Next.js 13 App Router: Complete Guide

Next.js 13 introduced the App Router, a new way to build applications with improved performance and developer experience.

## What is the App Router?

The App Router is built on React Server Components and provides:

- **Improved performance** with server-side rendering
- **Better developer experience** with intuitive file structure
- **Enhanced flexibility** in routing and layouts

## File Structure

The App Router uses a file-based routing system:

\`\`\`
app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page
├── about/
│   └── page.tsx       # About page
├── blog/
│   ├── page.tsx       # Blog listing
│   └── [slug]/
│       └── page.tsx   # Individual blog post
└── api/
    └── posts/
        └── route.ts   # API route
\`\`\`

## Layouts

Create reusable layouts:

\`\`\`typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>Navigation</nav>
        </header>
        <main>{children}</main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
\`\`\`

## Server Components

By default, components are Server Components:

\`\`\`typescript
// app/blog/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
\`\`\`

## Client Components

Use the 'use client' directive for interactive components:

\`\`\`typescript
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## Dynamic Routes

Create dynamic routes with brackets:

\`\`\`typescript
// app/blog/[slug]/page.tsx
interface Props {
  params: { slug: string };
}

async function getPost(slug: string) {
  const res = await fetch(\`https://api.example.com/posts/\${slug}\`);
  return res.json();
}

export default async function BlogPost({ params }: Props) {
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
\`\`\`

## Loading and Error States

Handle loading and error states:

\`\`\`typescript
// app/blog/loading.tsx
export default function Loading() {
  return <div>Loading blog posts...</div>;
}

// app/blog/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
\`\`\`

## Metadata API

Generate metadata for SEO:

\`\`\`typescript
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - My Website',
  description: 'Read the latest blog posts',
};

export default function BlogPage() {
  return <div>Blog content</div>;
}
\`\`\`

## Migration from Pages Router

Gradually migrate from Pages Router:

1. **Install Next.js 13+**
2. **Create app directory**
3. **Move pages gradually**
4. **Update imports and exports**
5. **Test thoroughly**

## Best Practices

1. **Use Server Components** by default
2. **Minimize Client Components** for better performance
3. **Implement proper error boundaries**
4. **Leverage streaming** for faster page loads
5. **Use TypeScript** for better development experience

## Conclusion

The App Router in Next.js 13 provides a powerful foundation for modern web applications. By leveraging Server Components and the new routing system, you can build faster, more maintainable applications.`,
    excerpt: 'Master Next.js 13 App Router with Server Components, dynamic routes, layouts, and migration strategies.',
    publishedAt: '2024-01-03T13:10:00Z',
    updatedAt: '2024-01-03T13:10:00Z',
    categories: ['Tutorial', 'Next.js'],
    tags: ['nextjs', 'app-router', 'server-components', 'routing', 'react'],
    readingTime: 9,
    isPublished: true,
    isDraft: false,
    featured: true,
    bookmarked: false,
    metaTitle: 'Next.js 13 App Router: Complete Guide',
    metaDescription: 'Complete guide to Next.js 13 App Router covering Server Components, dynamic routes, layouts, and migration strategies.',
    author: {
      name: 'Maoto Mikami',
      avatar: '/avatar.jpg'
    }
  },
  {
    id: 'tailwind-css-tips',
    title: 'Tailwind CSS Tips and Tricks',
    subtitle: 'Advanced techniques for efficient styling',
    content: `# Tailwind CSS Tips and Tricks

Tailwind CSS is a powerful utility-first framework. Here are some advanced tips and tricks to level up your Tailwind game.

## Custom Utilities

Create custom utilities for repeated patterns:

\`\`\`css
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
}
\`\`\`

## Component Patterns

Use @apply for component-level styling:

\`\`\`css
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-colors;
  }
  
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-600 text-white;
  }
  
  .btn-secondary {
    @apply bg-gray-200 hover:bg-gray-300 text-gray-800;
  }
}
\`\`\`

## Advanced Responsive Design

Use responsive utilities effectively:

\`\`\`html
<!-- Mobile-first approach -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <!-- Content -->
</div>

<!-- Container queries (when supported) -->
<div class="@container">
  <div class="@lg:flex @lg:items-center">
    <!-- Content -->
  </div>
</div>
\`\`\`

## Dynamic Classes with JavaScript

Generate classes dynamically:

\`\`\`javascript
// React example
const buttonVariants = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  danger: 'bg-red-500 hover:bg-red-600 text-white'
};

function Button({ variant = 'primary', children, ...props }) {
  return (
    <button 
      className={\`px-4 py-2 rounded-lg font-medium transition-colors \${buttonVariants[variant]}\`}
      {...props}
    >
      {children}
    </button>
  );
}
\`\`\`

## Custom Color Palettes

Extend the default color palette:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
        // Custom color with CSS variables
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
      }
    }
  }
}
\`\`\`

## Animation and Transitions

Create smooth animations:

\`\`\`css
@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
}
\`\`\`

## Dark Mode Strategies

Implement dark mode effectively:

\`\`\`html
<!-- Strategy 1: Class-based -->
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content
</div>

<!-- Strategy 2: CSS variables -->
<div class="bg-background text-foreground">
  Content
</div>
\`\`\`

\`\`\`css
:root {
  --color-background: 255 255 255;
  --color-foreground: 0 0 0;
}

[data-theme="dark"] {
  --color-background: 0 0 0;
  --color-foreground: 255 255 255;
}

.bg-background {
  background-color: rgb(var(--color-background));
}

.text-foreground {
  color: rgb(var(--color-foreground));
}
\`\`\`

## Performance Optimization

Optimize your Tailwind CSS:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ]
}
\`\`\`

## Useful Plugins

Leverage community plugins:

\`\`\`bash
npm install @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio
\`\`\`

\`\`\`javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ]
}
\`\`\`

## Debugging Tips

Debug your Tailwind classes:

\`\`\`html
<!-- Add debug utilities -->
<div class="debug-screens">
  <!-- Shows current breakpoint -->
</div>

<!-- Use ring utilities for debugging -->
<div class="ring-2 ring-red-500 ring-offset-2">
  Debug this element
</div>
\`\`\`

## VS Code Extensions

Enhance your development experience:

- **Tailwind CSS IntelliSense** - Autocomplete and syntax highlighting
- **Headwind** - Class sorting
- **Tailwind Fold** - Fold long class lists

## Conclusion

These tips and tricks will help you use Tailwind CSS more effectively. Remember to balance utility classes with maintainability, and don't hesitate to create custom utilities for repeated patterns.`,
    excerpt: 'Advanced Tailwind CSS techniques including custom utilities, responsive design, dark mode, and performance optimization.',
    publishedAt: '2024-01-01T08:00:00Z',
    updatedAt: '2024-01-01T08:00:00Z',
    categories: ['Tutorial', 'CSS'],
    tags: ['tailwind', 'css', 'styling', 'utilities', 'tips'],
    readingTime: 7,
    isPublished: true,
    isDraft: false,
    featured: false,
    bookmarked: false,
    metaTitle: 'Tailwind CSS Tips and Tricks for Advanced Styling',
    metaDescription: 'Master advanced Tailwind CSS techniques with custom utilities, responsive design, dark mode, and performance optimization tips.',
    author: {
      name: 'Maoto Mikami',
      avatar: '/avatar.jpg'
    }
  }
];