import { UserProvider } from "./context/userContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ManagePage from "./pages/ManagePage";
import RegistrationPage from "./pages/RegistrationPage";
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/registration' element={<RegistrationPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/manage" element={<ManagePage />} />
          </Route>          
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
