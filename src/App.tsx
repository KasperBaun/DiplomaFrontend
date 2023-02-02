import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Footer from './components/footer/Footer';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import HomePage from './pages/Webshop/HomePage/HomePage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />}>
      <Route path="/category" element={<HomePage />} />
    </Route>
  )
)


function App() {
  return (
    <div style={{minHeight: '100vh', display:'flex', flexDirection: 'column'}}>
      <Container />
      <RouterProvider router={router}/>
      <Row>

      </Row>
      <Row>
        <Footer />
      </Row>
    </div>
  );
}

export default App;
