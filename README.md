# lana
# Lana Store Starter

A small ecommerce starter built with Next.js App Router.

## Features

- Product list homepage
- Client-side cart state with localStorage persistence
- Checkout page that posts to `/api/create-order`
- Order tracking page using an order ID query parameter

## Folder Layout

```
public/
	logo.jpg
	products/
		product-1.jpg
		product-2.jpg
		product-3.jpg
		product-4.jpg
src/
	app/
		api/create-order/route.ts
		cart/page.tsx
		checkout/page.tsx
		track-order/page.tsx
		globals.css
		layout.tsx
		page.tsx
	components/
		CartProvider.tsx
		Footer.tsx
		Hero.tsx
		Navbar.tsx
		ProductCard.tsx
		ProductGrid.tsx
	lib/
		products.ts
```

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.
