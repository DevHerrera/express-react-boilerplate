import React from "react";
import "./App.css";
import ContactPage from "./pages/contacts/index.tsx";
import EditContactPage from "./pages/contacts/EditContactPage.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavigateProvider } from "./router/NavigateContext.tsx";
import AddContactPage from "./pages/contacts/AddContactPage.tsx";

export default function App() {
  return (
    <Router>
      <NavigateProvider>
        <Routes>
          <Route path="/" element={<ContactPage />} />
          <Route path="/edit/:id" element={<EditContactPage />} />
          <Route path="/add" element={<AddContactPage />} />
        </Routes>
      </NavigateProvider>
    </Router>
  );
}
