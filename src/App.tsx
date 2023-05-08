import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashbord';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Protected from './utils/routes';

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path={'login'} element={<Login />} />
          <Route
            path={'dashboard'}
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
