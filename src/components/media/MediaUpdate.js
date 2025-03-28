import React, { useState, useEffect } from 'react';
import { getMedias, updateMedias } from '../../service/mediaService';
import { getGeneros } from '../../service/generoService'; // Servicio para géneros
import { getDirectores } from '../../service/directorService'; // Servicio para directores
import { getProductoras } from '../../service/productoraService'; // Servicio para productoras
import { getTipos } from '../../service/tipoService'; // Servicio para tipos
import Swal from 'sweetalert2';

export const MediaUpdate = ({ handleOpenModal, listMedias, mediaId }) => {
  const [generos, setGeneros] = useState([]); // Estado para géneros
  const [directores, setDirectores] = useState([]); // Estado para directores
  const [productoras, setProductoras] = useState([]); // Estado para productoras
  const [tipos, setTipos] = useState([]); // Estado para tipos
  const [valoresForm, setValoresForm] = useState({
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    anioestreno: '',
    generoprincipal: { _id: '' }, // Género principal
    directorprincipal: { _id: '' }, // Director principal
    productora: { _id: '' }, // Productora
    tipo: { _id: '' }, // Tipo
  });

  const {
    titulo,
    sinopsis,
    url,
    imagen,
    anioestreno,
    generoprincipal,
    directorprincipal,
    productora,
    tipo,
  } = valoresForm;

  // Cargar los datos del media al montar el componente
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await getMedias();
        const mediaToUpdate = data.find((m) => m._id === mediaId);
        if (mediaToUpdate) {
          setValoresForm(mediaToUpdate); // Cargar los datos en el estado
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedia();
  }, [mediaId]);

  // Cargar géneros, directores, productoras y tipos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: generosData } = await getGeneros(); // Obtener géneros
        setGeneros(generosData);

        const { data: directoresData } = await getDirectores(); // Obtener directores
        setDirectores(directoresData);

        const { data: productorasData } = await getProductoras(); // Obtener productoras
        setProductoras(productorasData);

        const { data: tiposData } = await getTipos(); // Obtener tipos
        setTipos(tiposData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  // Manejar cambios en los campos de objetos anidados
  const handleNestedChange = ({ target }) => {
    const { name, value } = target;
    const [parent, child] = name.split('.');
    setValoresForm({
      ...valoresForm,
      [parent]: {
        ...valoresForm[parent],
        [child]: value,
      },
    });
  };

  // Manejar el envío del formulario
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updatedMedia = {
      titulo,
      sinopsis,
      url,
      imagen,
      anioestreno,
      generoprincipal: {
        _id: generoprincipal._id,
      },
      directorprincipal: {
        _id: directorprincipal._id,
      },
      productora: {
        _id: productora._id,
      },
      tipo: {
        _id: tipo._id,
      },
    };

    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();
      await updateMedias(mediaId, updatedMedia);
      handleOpenModal();
      listMedias();
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.close();
    }
  };

  return (
    <div className="sidebar">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="sidebar-header">
              <h3>Actualizar Media</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <hr />
          </div>
        </div>
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  type="text"
                  name="titulo"
                  value={titulo}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Sinopsis</label>
                <textarea
                  name="sinopsis"
                  value={sinopsis}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">URL</label>
                <input
                  type="text"
                  name="url"
                  value={url}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Imagen</label>
                <input
                  type="text"
                  name="imagen"
                  value={imagen}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Año de Estreno</label>
                <input
                  type="date"
                  name="anioestreno"
                  value={anioestreno}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Género Principal</label>
                <select
                  className="form-select"
                  name="generoprincipal._id"
                  value={generoprincipal._id}
                  onChange={handleNestedChange}
                  required
                >
                  <option value="">--SELECCIONE--</option>
                  {generos.map(({ _id, nombre }) => (
                    <option key={_id} value={_id}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Director Principal</label>
                <select
                  className="form-select"
                  name="directorprincipal._id"
                  value={directorprincipal._id}
                  onChange={handleNestedChange}
                  required
                >
                  <option value="">--SELECCIONE--</option>
                  {directores.map(({ _id, nombre }) => (
                    <option key={_id} value={_id}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Productora</label>
                <select
                  className="form-select"
                  name="productora._id"
                  value={productora._id}
                  onChange={handleNestedChange}
                  required
                >
                  <option value="">--SELECCIONE--</option>
                  {productoras.map(({ _id, nombre }) => (
                    <option key={_id} value={_id}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select
                  className="form-select"
                  name="tipo._id"
                  value={tipo._id}
                  onChange={handleNestedChange}
                  required
                >
                  <option value="">--SELECCIONE--</option>
                  {tipos.map(({ _id, nombre }) => (
                    <option key={_id} value={_id}>
                      {nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button className="btn btn-primary">Actualizar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};