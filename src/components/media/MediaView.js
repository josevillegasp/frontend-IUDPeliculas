import React, { useState, useEffect } from 'react';
import { getMedias } from '../../service/mediaService';
import { MediaCard } from '../media/MediaCards';
import { MediaNew } from './MediaNew';
import { MediaUpdate } from './MediaUpdate';

export const MediaView = () => {
  const [medias, setMedias] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false); // Estado para el modal de actualización
  const [selectedMediaId, setSelectedMediaId] = useState(null); // Estado para almacenar el ID del media seleccionado

  const listMedias = async () => {
    try {
      const { data } = await getMedias();
      setMedias(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listMedias();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleOpenUpdateModal = (id) => {
    setSelectedMediaId(id); // Guarda el ID del media seleccionado
    setOpenUpdateModal(!openUpdateModal); // Abre o cierra el modal de actualización
  };

  return (
    <div className="container">
      <div className="mt-2 mb-2 row row-cols-1 row-cols-md-4 g-4">
        {medias.map((media) => {
          return (
            <MediaCard
              key={media._id}
              media={media}
              handleOpenUpdateModal={handleOpenUpdateModal} // Pasa la función a MediaCard
              handleDelete={listMedias} // Pasa la función para actualizar la lista
            />
          );
        })}
      </div>
      {openModal ? (
        <MediaNew
          handleOpenModal={handleOpenModal}
          listMedias={listMedias}
        />
      ) : (
        <button className="btn btn-primary newMedia" onClick={handleOpenModal}>
          <i className="fa-solid fa-plus"></i>
        </button>
      )}
      {openUpdateModal && (
        <MediaUpdate
          handleOpenModal={handleOpenUpdateModal} // Función para cerrar el modal
          listMedias={listMedias} // Función para refrescar la lista
          mediaId={selectedMediaId} // Pasa el ID del media seleccionado
        />
      )}
    </div>
  );
};