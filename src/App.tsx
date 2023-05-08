import Dashboard from './pages/Dashbord';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'dashboard'} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
