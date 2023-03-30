import './styling/scss/custom.scss';
import Routing from './routes/Routes';
import MobXContext from './stores/MobXContext';
import { RootStore } from './stores/RootStore';
import { observer } from 'mobx-react-lite';


const App: React.FC = observer(function App() {
  return (
    <div>
      <MobXContext.Provider value={new RootStore()} key={"RootStore"}>
        <Routing />
      </MobXContext.Provider>
    </div>
  );
});

export default App;
