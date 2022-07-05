import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./contexts/auth";
import { UserContextProvider } from "./contexts/user";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard";

const App = () => {
  const {
    auth: { isAuth },
  } = useAuthContext();

  return (
    <Router>
      <Routes>
        {!isAuth && <Route path="/" element={<Login />} />}

        {isAuth && (
          <Route
            path="/dashboard"
            element={
              <UserContextProvider>
                <Dashboard />
              </UserContextProvider>
            }
          />
        )}
      </Routes>
    </Router>
  );
};

export default App;
