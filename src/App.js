// import logo from './logo.svg';
// import './App.css';
import { React } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Login from './components/auth/login';
import ProtectedRoute from './components/protectedRoute/protectedRoute';
import Dashboard from './components/dashboard/dashboard';

function App() {
  return (
    <>
    <BrowserRouter>
        <Route path={'/login'}>
          <Login />
        </Route>                
        <ProtectedRoute
            exact path={'/dashboard'}
            component={Dashboard}
        >
        </ProtectedRoute>
    </BrowserRouter>
</>
  );
}

export default App;
