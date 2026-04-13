# 🌐 Connect – Developer Networking Platform (Frontend)

**Live Demo:** 
**Backend API Repository:** https://developer-network-9ma8-three.vercel.app

## 📖 Overview
Connect is a scalable, real-time networking platform designed to facilitate seamless communication and discovery between developers. This repository houses the React-based frontend client, which is fully decoupled from the backend REST API and WebSocket server. 

The primary focus of this application is handling complex user state, secure cross-origin session management, and rendering real-time asynchronous data feeds.

## ✨ Core Features
* **Real-Time Messaging:** Integrated with Socket.io for instant, asynchronous channel-based and direct messaging.
* **Persistent Chat History:** Seamless API integration to fetch and render historical chat data efficiently.
* **Secure Sessions:** Built to securely handle cross-origin JWT access and refresh tokens via `httpOnly` cookies.
* **Dynamic Recommendation Feed:** Algorithmic user discovery interface optimized with React conditional rendering.
* **State Management:** Centralized state handling (Redux) to manage complex data flows and eliminate prop drilling.

## 🛠️ Tech Stack
* **Framework:** React.js
* **State Management:** Redux Toolkit / React Context API
* **Real-Time Communication:** Socket.io-client
* **Deployment:** Vercel

## 🚧 Current Roadmap & Active Development
*This project is an ongoing MVP. The following features and optimizations are currently being implemented:*

- [ ] Optimize initial render loads for the recommendation feed.
- [ ] Implement enhanced error boundaries and fallback UIs for WebSocket connection drops.
- [ ] Refine responsive mobile layout for the real-time chat interface.
- [ ] Add extensive unit testing for authentication workflows.

## 💻 Local Setup & Installation

To run this frontend locally, you will also need to spin up the [Backend API](https://github.com/AR-JUN-G/ConnectifyBE).

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AR-JUN-G/ConnectifyFE.git
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a .env file in the root directory and add your local API and Socket endpoints:
   ```bash
   REACT_APP_BASE_URL=http://localhost:7777/api
   REACT_APP_SOCKET_URL=http://localhost:7777
   ```
4. Start the development server:
   ```bash
   npm start
   ```
