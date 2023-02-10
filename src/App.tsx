import './styling/scss/custom.scss';
import Footer from './components/footer/Footer';
import Routing from './routes/Routes';
import Header from './components/header/Header';


function App() {
  return (
    <div>
      <Header />
      <Routing />
      <Footer />
    </div>
  );
}

export default App;
