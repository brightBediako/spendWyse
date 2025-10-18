import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import LoginForm from "./components/Auth/Login";
import RegistrationForm from "./components/Auth/Register";
import AddCategory from "./components/Category/AddCategory";
// import { getUserFromStorage } from "./utils/getUserFromStorage";
import { useSelector } from "react-redux";
import CategoriesList from "./components/Category/CategoriesList";

function App() {
  // get token
  // const token = getUserFromStorage();
  const user = useSelector((state) => state?.auth?.user);

  return (
    <BrowserRouter>
      {/* Navbar */}
      {user ? <PrivateNavbar /> : <PublicNavbar />}
      {/* Navbar end */}
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/add-category" element={<AddCategory />} />
        <Route path="/categories" element={<CategoriesList />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
