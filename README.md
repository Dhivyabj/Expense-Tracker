Expense Tracker

A full‑stack MERN application to manage personal and business expenses.
Users can add, view, search, filter, and delete transactions with a clean, responsive UI.

 Features
- Authentication: Secure login & logout with JWT tokens
- Dashboard: Overview of expenses and analytics
- Transaction Explorer:
- Add new transactions with title, amount, category, date, and notes
- Retrieve data dynamically during navigation
- Search transactions using flexible text input
- Filter transactions by category, date, or amount
- Edit or delete transactions with modals
- Responsive UI: Built with React + TailwindCSS
- Backend API: Node.js + Express + MongoDB Atlas

 Tech Stack
- Frontend: React, TailwindCSS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Auth: JWT, bcrypt
- Deployment: Netlify (frontend), Render (backend)

 Project Structure
Expense-Tracker/
├── backend/        # Express API
├── src/
│   ├── hooks/      # Custom hooks (useTransactions.js)
│   ├── pages/      # Explorer.jsx, Dashboard.jsx
│   ├── components/ # TransactionForm, TransactionList
│   └── utils/      # API config
└── README.md



 Installation & Setup
- Clone the repo
git clone https://github.com/Dhivyabj/Expense-Tracker.git
cd Expense-Tracker
- Install dependencies
npm install
- Set up environment variables
- Create a .env file in backend/ with:
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
- Run backend
cd backend
npm start
- Run frontend
npm start



 Screenshots
- Login Page
- <img width="1860" height="881" alt="image" src="https://github.com/user-attachments/assets/1543ad3e-ee3a-4e48-a410-5fa11a66f41e" />

- Dashboard Overview
- <img width="1861" height="902" alt="image" src="https://github.com/user-attachments/assets/ef6bf36b-05b3-4a79-9b42-5546b50c363a" />

- Transaction Explorer with Search & Filters
- <img width="1870" height="860" alt="image" src="https://github.com/user-attachments/assets/91af4116-11db-4d4d-85db-52e556e2a79a" />


 Future Enhancements
- Pagination with Next/Prev buttons
- Export transactions to CSV/PDF
- Advanced analytics (monthly trends, category breakdowns)
- Mobile navigation improvements

 Author
- Dhivya Dharshni — Computer Science Undergraduate, Frontend Developer Intern
- Passionate about building polished, production‑ready web apps with MERN stack.

👉 Dhivya, you can copy this into a README.md file at the root of your project.
Would you like me to also add GitHub badges (like build status, license, tech stack logos) so your README looks even more professional?
