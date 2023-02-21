import '@styles/custom.scss';
import Routing from '@routes/Routes';
import Header from '@components/header/Header';
import MobXContext from '@stores/MobXContext';
import { RootStore } from '@stores/RootStore';
import  Footer  from '@components/footer/Footer';


function App() {
  return (
    <div>
      <MobXContext.Provider value={new RootStore()} key={"RootStore"}>
        <Header />
        <Routing />
        <Footer />
      </MobXContext.Provider>
    </div>
  );
}

export default App;
