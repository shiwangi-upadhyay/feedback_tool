# Feedback Collector Application

A modern web app to collect, review, and manage product feedback effortlessly. Empower your users and improve your products with real-time insights!

---

## Features

- User sign-up and login (all fields required)
- Submit feedback with the following rules:
  - **Rating** (required)
  - **Name**, **Email**, **Product** (all optional)
- Real-time updating of analytics and charts (using [Recharts](https://recharts.org/))
- Admin dashboard:
  - View all feedbacks
  - Sort feedback by **newest** or **rating**
  - Filter feedback by **product**
- Secure authentication and authorization
- Responsive, modern UI
- Toast notifications for user feedback

---

## Tech Stack

**Frontend:**
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material Tailwind](https://www.material-tailwind.com/)
- [Recharts](https://recharts.org/) (for live-updating charts)
- [react-hot-toast](https://react-hot-toast.com/)

**Backend & Database:**
- [MongoDB](https://www.mongodb.com/) (all data stored here)
- Custom API routes (or API handler as per your implementation)

**Authentication:**
- Custom user context or authentication provider (can be integrated with NextAuth.js or custom API)

---


## How to Run

1. **Clone the repository**
    ```sh
    git clone https://github.com/your-username/feedback-collector-app.git
    cd feedback-collector-app
    ```

2. **Install dependencies**
    ```sh
    npm install
    ```

3. **Configure environment variables**
    - Create a `.env.local` file as needed, especially for MongoDB connection and authentication.

4. **Run the development server**
    ```sh
    npm run dev
    ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

---

## Usage & Rules

- **Feedback Form:**
  - **Rating** is required.
  - **Name**, **Email**, and **Product** fields are optional.
- **Login/Signup:**
  - All fields are required.
- **Admin Dashboard:**
  - Accessible only by admin users.
  - View, sort (by newest or rating), and filter (by product) all feedback.
- **Real-time Analytics:**
  - Feedback analytics and charts update in real time using Recharts whenever new data is pushed.

---

## Customization

- **Theme & Colors:**  
  Easily adjust Tailwind and Material Tailwind config for your brand colors (e.g., `purple-100` and `purple-800`).

- **Authentication:**  
  Integrate with your preferred auth provider or API.

- **Notifications:**  
  Toasts are handled with `react-hot-toast` (`<Toaster />` is required at the root).

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/foo`)
3. Commit your changes (`git commit -m 'Add some foo'`)
4. Push to the branch (`git push origin feature/foo`)
5. Open a Pull Request

---
