import { useEffect, useState } from 'react';
import './modal.css';

export default function Modal({ id, setActive, active , Personaje}) {
  const idEpisodios = id || 1;
  const [episodios, setEpisodios] = useState();
  const [episodiosDivididos, setEpisodiosDivididos] = useState();


  const episodiosApi = async () => {
    const data = await fetch(`https://rickandmortyapi.com/api/character/${idEpisodios}`);
    const resp = await data.json();
    setEpisodios(resp.episode);
  };

  useEffect(() => {
    episodiosApi();
  }, [id]);

  useEffect(() => {
    if (episodios) {
      const chunk = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
      };

      const chunkSize = 4;
      const episodiosDivididos = chunk(episodios, chunkSize);
      setEpisodiosDivididos(episodiosDivididos);
    }
  }, [episodios]);

  const cerrar = () => {
    setActive(false);
  };

  return (
    <section className='contenedor-modal'>
        <section className={`modal ${active ? 'modal-active' : ''}`}>
            <h2>Episodios en los que aparece este personaje</h2>
            <img className='personaje' src={Personaje} alt="" />
            <button className='boton-cerrar' onClick={cerrar}>Ocultar</button>
            {episodiosDivididos ? (
                episodiosDivididos.map((group, groupIndex) => (
                <div key={groupIndex} className="episodios-group">
                    {group.map((value, key) => {
                    const parts = value.split('/');
                    const episodeNumber = parts[parts.length - 1];
                    return <p key={key}>Episode {episodeNumber}</p>;
                    })}
                </div>
                ))
            ) : (
                <p>Cargando...</p>
            )}
        </section>
    </section>
  );
}