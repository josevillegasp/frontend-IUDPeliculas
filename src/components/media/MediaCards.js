import React from 'react';
import { MediaDelete } from './MediaDelete'; // Importar el componente MediaDelete

export const MediaCard = (props) => {
  const { media, handleOpenUpdateModal, handleDelete } = props;

  return (
    <div className="col">
      <div className="card h-100">
        {/* Imagen de la tarjeta */}
        <img
          src={media.imagen}
          className="card-img-top"
          alt={media.titulo}
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <div className="card-body" style={{ overflowY: 'auto', maxHeight: '400px' }}>
          <h5 className="card-title">Características</h5>
          <hr />
          <p className="card-text">{`Serial: ${media.serial}`}</p>
          <p className="card-text">{`Título: ${media.titulo}`}</p>
          <p className="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
          <p className="card-text">{`URL: ${media.url}`}</p>
          <p className="card-text">{`Imagen: ${media.imagen}`}</p>
          <p className="card-text">{`Año de estreno: ${media.anioestreno}`}</p>
          
          <p className="card-text">{`Género principal: ${media.generoprincipal?.nombre || "No disponible"}`}</p>
          <p className="card-text">{`Director principal: ${media.directorprincipal?.nombre || "No disponible"}`}</p>
          <p className="card-text">{`Productora: ${media.productora?.nombre || "No disponible"}`}</p>
          <p className="card-text">{`Tipo: ${media.tipo?.nombre || "No disponible"}`}</p>
          {/* Botón para abrir el modal de actualización */}
          <button
           className="btn btn-warning btn-sm btn-fixed-width mt-2 me-2"
          onClick={() => handleOpenUpdateModal(media._id)}
>
           <i className="fas fa-edit"></i> Editar
           </button>
          {/* Botón para eliminar el media */}
          <MediaDelete
            mediaId={media._id}
            onDeleteSuccess={handleDelete} // Pasar la función para actualizar la lista
          />
        </div>
      </div>
    </div>
  );
};