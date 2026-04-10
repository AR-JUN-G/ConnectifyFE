// export const BASE_URL = location.hostname === "localhost" ? "http://localhost:7777/api" : "http://51.21.250.140:7777/api";
// export const SOCKET_URL = location.hostname === "localhost" ? "http://localhost:7777" : "http://51.21.250.140:7777";



export const BASE_URL = location.hostname === "localhost" 
  ? "http://localhost:7777/api" 
  : "https://connectifybe.onrender.com/api";

export const SOCKET_URL = location.hostname === "localhost" 
  ? "http://localhost:7777" 
  : "https://connectifybe.onrender.com";