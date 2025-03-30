import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Header from "./components/Ui/Header";
import { DirectorView } from './components/director/DirectorView';
import { DirectorNew } from './components/director/DirectorNew'; // Importar DirectorNew
import { GeneroView } from './components/genero/GeneroView';
import { GeneroNew } from './components/genero/GeneroNew'; // Importar GeneroNew
import { MediaView } from './components/media/MediaView';
import { MediaNew } from './components/media/MediaNew'; // Importar MediaNew
import { ProductoraView } from './components/productora/ProductoraView';
import { TipoView } from './components/tipo/TipoView';

function App() {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route exact path='/' component={MediaView} />
        <Route exact path='/genero' component={GeneroView} />
        <Route exact path='/genero/nuevo' component={GeneroNew} /> {/* Ruta para GeneroNew */}
        <Route exact path='/director' component={DirectorView} />
        <Route exact path='/director/nuevo' component={DirectorNew} /> {/* Ruta para DirectorNew */}
        <Route exact path='/productora' component={ProductoraView} />
        <Route exact path='/tipo' component={TipoView} />
        <Route exact path='/media/nuevo' component={MediaNew} /> {/* Ruta para MediaNew */}
        <Redirect to='/' />
      </Switch>
    </Router>
  );
}

export default App;