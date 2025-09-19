import "./App.css";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import Dashboard from "./pages/Dashboard";
import HowItWorks from "./pages/HowItWorks";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <main className="container my-5">
        <Routes>
          <Route path="/how-it-works" element={<HowItWorks />} />
           <Route path="/" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </>
  );
}

export default App;
