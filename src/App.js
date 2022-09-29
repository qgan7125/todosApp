import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from "./components/header";
import Todos from "./components/todos";
import LoginPage from "./pages/login";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<h2>No page</h2>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
