import React, { useEffect, useState } from 'react';
import './tarjetas.css';
import Modal from '../modal/modal';

export default function Tarjetas({ user }) {
  const [activeButton, setActiveButton] = useState('Alive');
  const [characters, setCharacters] = useState([]);
  const [episodiosPersonaje, setEpisodiosPersonaje] = useState();
  const [modalActive, setModalActive] = useState(false);
  const [ImageCharacter, setImageCharacter] = useState()

  const handleCharacter = (e)=>{
    const id = e.target.value
    const imageCharacter = e.target.id

    console.log(imageCharacter);

    setImageCharacter(imageCharacter)
    setModalActive(true)
    setEpisodiosPersonaje(id)
  }

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  const charactersList = async () => {
    try {
      const data = await fetch(`https://rickandmortyapi.com/api/character/?&status=${activeButton}`);
      const resp = await data.json();


      const cantidad = resp.results.length;
      const valoresAleatorios = Array.from({ length: cantidad }, (_, index) => index);

      for (let i = valoresAleatorios.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [valoresAleatorios[i], valoresAleatorios[j]] = [valoresAleatorios[j], valoresAleatorios[i]];
      }

      const seisValoresAleatorios = valoresAleatorios.slice(0, 6);

      const personajesConValoresAleatorios = seisValoresAleatorios.map((index) => ({
        ...resp.results[index],
        valorAleatorio: index,
      }));

      setCharacters(personajesConValoresAleatorios);
    } catch (error) {
      console.error('Error al obtener los personajes:', error);
    }
  };

  useEffect(() => {
    charactersList();
  }, [activeButton]);

 

 


  return (
    <section className='contenedor-tarjetas'>
      <section className="tarjeta-usuario">
        <div className="info-usuario">
          <img className="user-image" src={user.image} alt="texto" />
          <div>
            <p className='texto-user'>character</p>
            <p className="nombre" style={{ fontSize: user.name.length <= 16 ? '2.2em' : '1.5em' }}>
              {user.name}
            </p>
          </div>
        </div>
        <h2>Status</h2>
      <div>
      <button
          className={activeButton === 'Alive' ? 'active' : ''}
          onClick={() => handleButtonClick('Alive')}
        >
          Alive
        </button>
        <button
          className={activeButton === 'Dead' ? 'active' : ''}
          onClick={() => handleButtonClick('Dead')}
        >
          Dead
        </button>
        <button
          className={activeButton === 'Unknown' ? 'active' : ''}
          onClick={() => handleButtonClick('Unknown')}
        >
          Unknown
        </button>
      </div>
        <div className='actualizar'>
        <button
          onClick={charactersList}  
        >
          Ver mas...
        </button>
        </div>
          
      </section>
      {characters.length > 0 && (
        <>
          <section className="cont-tarjetas-info">
            {characters.slice(0, 2).map((personaje) => (
              <section key={personaje.id} className="tarjetas">
                <div className='contenedor-imagen'>
                  <img className="tarjetas-image" src={personaje.image} alt="texto" />
                </div>
                <div className="info-tarjetas">
                  <div>
                    <p className='texto-tarjetas'>character</p>
                    <p className="especie">{personaje.species}</p> 
                    <p className="nombre-tarjetas">{personaje.name}</p>
                    <p className='texto-tarjetas'>Gender: {personaje.gender}</p>  
                    <p className='texto-tarjetas'>Origin: {personaje.origin.name}</p>
                  </div>
                  <button className='boton-capitulos' value={personaje.id} id={personaje.image} onClick={handleCharacter}>Capitulos</button>
                </div>
              </section>
            ))}
            {characters.slice(2, 4).map((personaje) => (
              <section key={personaje.id} className="tarjetas">
                <div className='contenedor-imagen'>
                  <img className="tarjetas-image" src={personaje.image} alt="texto" />
                </div>
                <div className="info-tarjetas">
                  
                  <div>
                    <p className='texto-tarjetas'>character</p>
                    <p className="especie">{personaje.species}</p>
                    <p className="nombre-tarjetas">{personaje.name}</p>
                    <p className='texto-tarjetas'>Gender: {personaje.gender}</p>  
                    <p className='texto-tarjetas'>Origin: {personaje.origin.name}</p>                                  
                  </div>
                  <button className='boton-capitulos' value={personaje.id} id={personaje.image} onClick={handleCharacter}>Capitulos</button>
                </div>
              </section>
            ))}
            {characters.slice(4, 6).map((personaje) => (
              <section key={personaje.id} className="tarjetas">
                <div className='contenedor-imagen'>
                  <img className="tarjetas-image" src={personaje.image} alt="texto" />
                </div>
                <div className="info-tarjetas">
                  <div>
                    <p className='texto-tarjetas'>character</p>
                    <p className="especie">{personaje.species}</p>
                    <p className="nombre-tarjetas">{personaje.name}</p>
                    <p className='texto-tarjetas'>Gender: {personaje.gender}</p>  
                    <p className='texto-tarjetas'>Origin: {personaje.origin.name}</p>
                  </div>
                  <button className='boton-capitulos' value={personaje.id} id={personaje.image} onClick={handleCharacter}>Capitulos</button>
                </div>
              </section>
            ))}
          </section>
        </>
      )}
      <Modal id={episodiosPersonaje} Personaje={ImageCharacter} active={modalActive} setActive={setModalActive}></Modal>
    </section>
  );
};
