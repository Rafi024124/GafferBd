🏆 GafferBD – Demo Jersey E-Commerce Store

GafferBD is a demo e-commerce application built with Next.js to showcase football jerseys from clubs and countries.
The project demonstrates authentication, protected routes, and basic CRUD functionality with a clean UI.

📖 Project Description

Browse jerseys on the Products page.

View details of each jersey.

Social login with NextAuth (Google or credentials).

After login, users can add new jerseys via a protected dashboard form.

This project is for learning/demo purposes only and does not include checkout or payment features.

⚙️ Setup & Installation
Prerequisites

Node.js (v18+ recommended)

npm or yarn

Installation Steps
# 1. Clone the repository
git clone https://github.com/your-Rafi024124/gafferbd.git
cd gafferbd

# 2. Install dependencies
npm install

# 3. Create an .env file in the root and configure NextAuth
NEXTAUTH_URL=http://localhost:3000 or your deployed link
NEXTAUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# 4. Run the development server
npm run dev


The app will be available at http://localhost:3000
.

# 5. Routes Summary
1. Landing Page (/)

Contains 4 sections:

Navbar (navigation to Login & Products)

Hero (intro banner)

Product Highlights (top jerseys preview)

Footer

Publicly accessible, no authentication required.

2. Login Page (/login)

Implemented with NextAuth.

Supports Google login (or credentials login).

After successful login → redirects to /products.

3. Product List Page (/products)

Publicly accessible.

Fetches and displays products from a mock backend/file.

Each product includes:

Name

Description

Price

Details button

4. Product Details Page (/products/[id])

asdasdasdPublicly accessible.

Shows full details of a single product.

5. Protected Page: Add Product (/dashboard/add-product)

Only accessible when logged in.

Contains a form to add a new jersey (store in database or state).

Unauthenticated users are redirected to /login.

🛠️ Tech Stack

Next.js (App Router) – Frontend framework

Tailwind CSS – Styling

NextAuth – Authentication (Social login)

Mock backend / JSON file – Product data

MongoDB (optional) – Store added products
