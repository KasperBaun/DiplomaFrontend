import './styling/scss/custom.scss';
import Routing from './routes/Routes';
import MobXContext from './stores/MobXContext';
import { RootStore } from './stores/RootStore';


function App() {
  const rootStore = new RootStore();
  return (
    <MobXContext.Provider value={rootStore} key={"RootStore"}>
      <Routing />
    </MobXContext.Provider>
  );
}

export default App;
