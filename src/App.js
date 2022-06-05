import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
