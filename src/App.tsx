import './styling/scss/custom.scss';
import Footer from './components/footer/Footer';
import Routing from './routes/Routes';
import Header2 from './components/header/Header2';


function App() {
  return (
    <div>
      <Header2 />
      <Routing />
      <Footer />
    </div>
  );
}

export default App;
