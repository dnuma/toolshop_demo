# toolshop_demo

Playwright E2E test suite for [practicesoftwaretesting.com](https://www.practicesoftwaretesting.com) using the Page Object Model pattern.

## Stack

- [Playwright](https://playwright.dev) + TypeScript
- dotenv — environment variable management

## Project structure

```
src/
├── lib/
│   ├── pages/          # Page Object classes
│   │   ├── base.page.ts
│   │   ├── home.page.ts
│   │   ├── categories.page.ts
│   │   ├── signin.page.ts
│   │   ├── checkout.page.ts
│   │   └── contact.page.ts
│   └── interfaces/     # TypeScript interfaces (e.g. ContactForm)
└── tests/
    ├── dashboard.spec.ts   # Home, Contact, Sign In, Categories
    ├── signin.spec.ts      # Register + sign-in flow
    ├── checkout.spec.ts    # Full checkout flow (cart → payment)
    ├── handtools.spec.ts
    ├── powertools.spec.ts
    └── other.spec.ts
```

## Setup

```bash
npm install
npx playwright install
```

Create a `.env` file in the project root:

```
FIRST_NAME=John
LAST_NAME=Doe
```

## Running tests

Run all tests:

```bash
npx playwright test
```

Run a specific tag (e.g. checkout only):

```bash
npm run test -- @checkout
```

Run with the Playwright UI:

```bash
npx playwright test --ui
```

View the HTML report after a run:

```bash
npx playwright show-report
```

## Test tags

| Tag | Covers |
|---|---|
| `@checkout` / `@addtocart` | Full cart and checkout flow |
| `@register` / `@signIn` | User registration and login |
| `@dashboard` | Home page, contact form, sign-in page UI |
| `@categories` | Category navigation (hand tools, power tools, etc.) |
| `@home` | Home page elements |
| `@contact` | Contact form submission |
| `@signin` | Sign-in page elements |

## Author

David Numa · [GitHub: dnuma](https://github.com/dnuma)
