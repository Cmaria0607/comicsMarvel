import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Comics = () => {
  // Inicialización de los estados
  const [comics, setComics] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // URL de la API
  const URL = 'https://gateway.marvel.com:443/v1/public/characters?apikey=33171723a05ace5ecb77bf5cfa7c41d6';

  // Efecto para traer los datos de la API
  useEffect(() => {
    fetch(URL)
      .then(response => response.json())
      .then(json => {
        console.log('Response from API:', json); // Mostrar la respuesta en consola
        setComics(json.data.results);
        setResults(json.data.results); // Mostrar todos los comics por defecto
      })
      .catch(error => console.error('Error fetching comics:', error));
  }, [URL]);

  // Función para manejar el cambio en el input de búsqueda
  const searcher = (e) => {
    setSearch(e.target.value);
  }

  // Función para manejar el botón de búsqueda
  const botonSearch = () => {
    if (search) {
      const filteredResults = comics.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults(comics);
    }
  }

  // Renderizado del componente
  return (
    <div className='bg-comic-bg bg-cover bg-center min-h-screen  flex flex-col items-center '>
      <h1 className='shadow-xl font-bold font-mono bg-black text-white mt-20 text-6xl text-center'>BUSCA TU COMIC</h1>
      <div className='flex justify-center h-12 gap-4 mt-8'>
        <input
          value={search}
          onChange={searcher}
          type="text"
          placeholder='Search comics'
          className='text-center form-control rounded-full w-52 border-red-700 border-4'
        />
        <button
          onClick={botonSearch}
          className='bg-red-700 hover:bg-red-900 text-white font-bold font-mono rounded-full w-32'>
          Search
        </button>
      </div>
      <div className='flex justify-center  border-4 w-full max-w-2xl  mt-8 bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg drop-shadow-2xl '>
        <table className='table  table-striped table-hover text-center font-mono font-semibold text-2xl'>
          <thead>
            <tr className='text-white bg-black'>
              <th>SELECT FOR DETAILS</th>
            </tr>
          </thead>
          <tbody className='text-white '>
            {results?.map((comic) => (
              <tr key={comic.id}>
                <td className='text-xl hover:text-black  '>
                  <Link to={`/comics/${comic.id}`}>{comic.name}</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Comics;


