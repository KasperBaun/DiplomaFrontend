import { Routing } from './routes/Routes';
import MobXContext from './stores/MobXContext';
import { RootStore } from './stores/RootStore';
import React from 'react';

function App() {
  const rootStore = new RootStore();
  return (
    <MobXContext.Provider value={rootStore} key={"RootStore"}>
      <Routing />
    </MobXContext.Provider>
  );
}

export default App;
