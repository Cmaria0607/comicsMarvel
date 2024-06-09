import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TiArrowBack } from 'react-icons/ti';

const ComicDetails = () => {
  // Obtiene el parámetro 'id' de la URL usando useParams
  const { id } = useParams();
  
  // Estado para almacenar los detalles del cómic
  const [comic, setComic] = useState(null);
  
  // Estado para manejar errores en la obtención de datos
  const [error, setError] = useState(null);

  // URL de la API para obtener detalles del comic
  const URL = `https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=33171723a05ace5ecb77bf5cfa7c41d6`;

  // useEffect para realizar la solicitud a la API cuando el componente se monta
  useEffect(() => {
    fetch(URL)
      .then(response => {
        return response.json(); // Convierte la respuesta a JSON
      })
      .then(json => setComic(json.data.results)) // Almacena los resultados en el estado 'comic'
      .catch(error => setError(error.message)); // Maneja errores y los almacena en el estado 'error'
  }, [URL]); // useEffect depende de la URL

  // Si hay un error, muestra un mensaje de error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // mensaje de carga
  if (!comic) {
    return <div className=' font-mono font-bold'>Cargando...</div>;
  }

  return (

    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='flex justify-center flex-col items-center border-4 w-full max-w-2xl  bg-red-700 rounded-lg drop-shadow-2xl '>
       
        <h1 className='text-6xl text-white mt-4 font-bold font-mono text-center'>{comic[0].name}</h1>
        
      
        <img
          className='my-4 w-[400px] drop-shadow-2xl'
          src={`${comic[0].thumbnail.path}.${comic[0].thumbnail.extension}`}
          alt={comic[0].name}
        />
        
       
        <p className='text-white text-center font-mono font-semibold'>{comic[0].description}</p>
        
    
        <p className='text-white text-center font-mono font-semibold'>Modificacion: {comic[0].modified}</p>
        
       
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 mb-4 flex items-center justify-center">
          <TiArrowBack className='mr-2' /> Back to Search
        </Link>
      </div>
    </div>
  );
}

export default ComicDetails;


