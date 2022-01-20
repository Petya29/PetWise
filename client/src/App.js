import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import AppRouter from './components/utilities/AppRouter';
import AppNavbar from './components/partials/AppNavbar';
import './styles/App.css';

function App() {

  useEffect(() => {
    //Materialize config
    M.AutoInit();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div className='bg-wrapper'>
          <AppNavbar />
          <AppRouter />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
