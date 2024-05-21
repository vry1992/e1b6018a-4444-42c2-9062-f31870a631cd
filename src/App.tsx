import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
  return <RouterProvider router={router} />;
}

export default App;
