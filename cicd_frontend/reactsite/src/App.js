import { useState } from 'react';
import ListaArtistas from './components/ListaArtistas.js';
import ListaAlbuns from './components/ListaAlbuns.js';
import ListaMusicas from './components/ListaMusicas.js';
import './App.css';

function App() {

  const[idArtista, setIdArtista] = useState(null);
  const[idAlbum, setIdAlbum] = useState(null);
  
  const handleArtista = (artista) => {
    setIdArtista(artista);
  }

  const handleAlbum = (album) => {
    setIdAlbum(album);
  }

  return (
    <div className="App">
      <div className='App-Content'>
          <ListaArtistas handleArtista={handleArtista} handleAlbum={handleAlbum}/>
          <ListaAlbuns idArtista={idArtista} handleAlbum={handleAlbum}/>
          <ListaMusicas idAlbum={idAlbum}/>
      </div>
    </div>
  );
}

export default App;
