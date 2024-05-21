import {
  HashRouter,
  Route,
  Routes,
  createBrowserRouter,
} from 'react-router-dom';
import './App.css';
import { Container, Map } from './map/Map';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Container>
        <Map />
      </Container>
    ),
  },
]);

function App() {
  const Aaa = () => {
    return (
      <Container>
        <Map />
      </Container>
    );
  };
  // return <RouterProvider router={router} />;
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Aaa />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
