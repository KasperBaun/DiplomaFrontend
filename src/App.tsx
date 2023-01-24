import React from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Footer from './components/footer/Footer';
import { EnvironmentKeys } from './utils/EnvironmentKeys';

function App() {
  return (
    <div>
      <Container />
      <Row>

      </Row>
      <Row>
        <Footer />
      </Row>
    </div>
  );
}

export default App;
