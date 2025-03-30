import React, { useState, useEffect } from 'react';
import { getMedias, updateMedias } from '../../service/mediaService';
import { getGeneros } from '../../service/generoService';
import { getDirectores } from '../../service/directorService';
import { getProductoras } from '../../service/productoraService';
import { getTipos } from '../../service/tipoService';
import Swal from 'sweetalert2';

export const MediaUpdate = ({ handleOpenModal, listMedias, mediaId }) => {
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [valoresForm, setValoresForm] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    anioestreno: '',
    generoprincipal: '',
    directorprincipal: '',
    productora: '',
    tipo: ''
  });

  const {
    serial,
    titulo,
    sinopsis,
    url,
    imagen,
    anioestreno,
    generoprincipal,
    directorprincipal,
    productora,
    tipo
  } = valoresForm;

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await getMedias();
        const mediaToUpdate = data.find((m) => m._id === mediaId);
        if (mediaToUpdate) {
          setValoresForm({
            serial: mediaToUpdate.serial,
            titulo: mediaToUpdate.titulo,
            sinopsis: mediaToUpdate.sinopsis,
            url: mediaToUpdate.url,
            imagen: mediaToUpdate.imagen,
            anioestreno: mediaToUpdate.anioestreno.toString(),
            generoprincipal: mediaToUpdate.generoprincipal?._id || '',
            directorprincipal: mediaToUpdate.directorprincipal?._id || '',
            productora: mediaToUpdate.productora?._id || '',
            tipo: mediaToUpdate.tipo?._id || ''
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchMedia();
  }, [mediaId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: generosData } = await getGeneros();
        setGeneros(generosData);

        const { data: directoresData } = await getDirectores();
        setDirectores(directoresData);

        const { data: productorasData } = await getProductoras();
        setProductoras(productorasData);

        const { data: tiposData } = await getTipos();
        setTipos(tiposData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const updatedMedia = {
      serial,
      titulo,
      sinopsis,
      url,
      imagen,
      anioestreno: parseInt(anioestreno),
      generoprincipal,
      directorprincipal,
      productora,
      tipo
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
                <label className="form-label">Serial</label>
                <input
                  type="text"
                  name="serial"
                  value={serial}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
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
          </div>

          <div className="row">
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
                  type="number"
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
                  name="generoprincipal"
                  value={generoprincipal}
                  onChange={handleOnChange}
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
                  name="directorprincipal"
                  value={directorprincipal}
                  onChange={handleOnChange}
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
                  name="productora"
                  value={productora}
                  onChange={handleOnChange}
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
                  name="tipo"
                  value={tipo}
                  onChange={handleOnChange}
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