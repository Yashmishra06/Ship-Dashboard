import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./Contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ShipsProvider } from "./Contexts/ShipContext";
import { ComponentProvider } from "./Contexts/ComponentContext";
import { seedUsers } from "./utils/localStorageUtils";
import { JobsProvider } from "./Contexts/JobsContext";
seedUsers();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ShipsProvider>
        <ComponentProvider>
          <JobsProvider>
            <App />
          </JobsProvider>
        </ComponentProvider>
      </ShipsProvider>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
