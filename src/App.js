import './App.css';
import Routing from './Routing/Routing';
// import {Provider} from 'react-redux';
// import store from '../src/Store/store'
import {Provider} from 'react-redux'
import store from '../src/Store/store'

function App() {
  return (
    <Provider store={store}>
      <Routing/>
    </Provider>
      

  );
}

export default App;
