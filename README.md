# 🚀 Vendu: Your Ultimate Sales Dashboard

Welcome to **Vendu**, your one-stop solution for tracking and analyzing sales data with a sleek and modern dashboard.

## 📊 Frontend Dashboard (Nuxt 3 + Vue 3):
- **Trending Products:**
  - 🔥 Top 5 best-selling products, sorted by quantity.
- **Total Sales by Period:**
  - 📈 Total sales amount for a selected period.
- **Statistics:**
  - 🥧 **Pie Chart:**
    - Sales distribution by category.
  - 📊 **Histogram:**
    - Sales by product.

# 🛠️ Backend (Express.js)
- **GET /api/analytics/total_sales:**
  - 💰 Returns the total sales amount for the selected period.
- **GET /api/analytics/trending_products:**
  - 📈 Returns a list of the top 3 best-selling products, including their name, quantity sold, and total sales amount for each.
- **GET /api/analytics/category_sales:**
  - 📊 Returns the sales distribution by category, including the number of sales and the percentage.
- **GET /api/products:**
  - 🛒 Returns a table of products with the number of sales for each product.

# 🗄️ Database (MongoDB)
- The project uses **MongoDB** as the database.
- A test database is already created and linked.
- If you want to add a local database, go to `env.json` and link it.

# 🛠️ Commands

- `bun i` to install dependencies
- `bun dev` to launch the client and server simultaneously 🚀
- `bun build` to build the project
- `bun preview` to preview the built project
- `bun seed` to seed the database in case you linked a local MongoDB

> **⚠️ Note:** 
- You can test major functions at [vendu55.vercel.app](https://vendu55.vercel.app).
- This application utilizes mock data solely for demonstration purposes. 
- It highlights the core functionalities of a sales management platform while omitting certain advanced features to ensure simplicity and focus.
---

Made with ❤️ by Abdessalam Chakiri.  
Contact me at avselom@gmail.com or visit my website [avselom.me](https://avselom.me).
