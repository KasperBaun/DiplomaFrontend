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
        <Footer
          companyName={EnvironmentKeys.companyName}
          companyUrl={EnvironmentKeys.companyUrl}
          telephoneNumber={EnvironmentKeys.telephoneNumber}
          facebookUrl={EnvironmentKeys.facebookUrl}
          instagramUrl={EnvironmentKeys.instagramUrl}
          backgroundColor={EnvironmentKeys.groenlundGreenColor}
          textColor={EnvironmentKeys.groenlundGoldColor}
        />
      </Row>
    </div>
  );
}

export default App;
