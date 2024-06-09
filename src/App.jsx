
import {  Routes, Route } from 'react-router-dom';
import Comics from './components/Comics';
import ComicDetails from './components/ComicDetails';

const App = () => {
  return (

    <Routes>
      
        <Route exact path="/" element={<Comics/>} />
        <Route path="/comics/:id" element={<ComicDetails/>} />
      
    </Routes>
  );
}

export default App;

