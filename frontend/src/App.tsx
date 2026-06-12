import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Appointments } from "./pages/Appointments";
import { BookAppointment } from "./pages/BookAppointment";
import { ServiceList } from "./components/ServicesList";
import { PetsList } from "./components/PetsList";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/pets" element={<PetsList />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/book" element={<BookAppointment />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Layout>
  );
}

export default App;
