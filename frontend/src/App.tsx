import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { ServiceList } from "./components/ServicesList";
import { PetsList } from "./components/PetsList";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServiceList />} />
        <Route path="/pets" element={<PetsList />} />
      </Routes>
    </Layout>
  );
}

export default App;