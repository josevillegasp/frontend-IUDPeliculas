import React, { useState, useEffect } from 'react';
import { getDirectores } from '../../service/directorService';
import { getGeneros } from '../../service/generoService';
import { getProductoras } from '../../service/productoraService';
import { getTipos } from '../../service/tipoService';
import { createMedias } from '../../service/mediaService';
import Swal from 'sweetalert2';

export const MediaNew = ({ handleOpenModal, listMedias }) => {
  // Estados para las listas de opciones
  const [directores, setDirectores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  // Estado para los valores del formulario
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
    tipo: '',
  });

  // Obtener la lista de directores
  const listDirectores = async () => {
    try {
      const { data } = await getDirectores();
      setDirectores(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener la lista de géneros
  const listGeneros = async () => {
    try {
      const { data } = await getGeneros();
      setGeneros(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener la lista de productoras
  const listProductoras = async () => {
    try {
      const { data } = await getProductoras();
      setProductoras(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Obtener la lista de tipos
  const listTipos = async () => {
    try {
      const { data } = await getTipos();
      setTipos(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Cargar las listas al montar el componente
  useEffect(() => {
    listDirectores();
    listGeneros();
    listProductoras();
    listTipos();
  }, []);

  // Manejar cambios en los campos del formulario
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  // Manejar el envío del formulario
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Crear el objeto media con los valores del formulario
    const media = {
      serial: valoresForm.serial,
      titulo: valoresForm.titulo,
      sinopsis: valoresForm.sinopsis,
      url: valoresForm.url,
      imagen: valoresForm.imagen,
      anioestreno: valoresForm.anioestreno,
      generoprincipal: {
        _id: valoresForm.generoprincipal,
      },
      directorprincipal: {
        _id: valoresForm.directorprincipal,
      },
      productora: {
        _id: valoresForm.productora,
      },
      tipo: {
        _id: valoresForm.tipo,
      },
    };

    try {
      // Mostrar mensaje de carga
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();

      // Crear el nuevo media
      await createMedias(media);

      // Cerrar el modal y actualizar la lista de medias
      handleOpenModal();
      listMedias();

      // Cerrar el mensaje de carga
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
              <h3>Nuevo Media</h3>
              <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <hr />
          </div>
        </div>
        <form onSubmit={handleOnSubmit}>
          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Serial</label>
                <input
                  type="text"
                  name="serial"
                  value={valoresForm.serial}
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
                  value={valoresForm.titulo}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Sinopsis</label>
                <input
                  type="text"
                  name="sinopsis"
                  value={valoresForm.sinopsis}
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
                <label className="form-label">URL</label>
                <input
                  type="text"
                  name="url"
                  value={valoresForm.url}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Imagen URL</label>
                <input
                  type="text"
                  name="imagen"
                  value={valoresForm.imagen}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
            <div className="col">
              <div className="mb-3">
                <label className="form-label">Año de Estreno</label>
                <input
                  type="number"
                  name="anioestreno"
                  value={valoresForm.anioestreno}
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
                  value={valoresForm.generoprincipal}
                  onChange={handleOnChange}
                  required
                >
                  <option value="">--SELECCIONE--</option>
                  {generos.map((genero) => (
                    <option key={genero._id} value={genero._id}>
                      {genero.nombre}
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
                  value={valoresForm.directorprincipal}
                  onChange={handleOnChange}
                  required
                >
                  <option value="">--SELECCIONE--</option>
                  {directores.map((director) => (
                    <option key={director._id} value={director._id}>
                      {director.nombre}
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
                  value={valoresForm.productora}
                  onChange={handleOnChange}
                  required
                >
                  <option value="">--SELECCIONE--</option>
                  {productoras.map((productora) => (
                    <option key={productora._id} value={productora._id}>
                      {productora.nombre}
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
                  value={valoresForm.tipo}
                  onChange={handleOnChange}
                  required
                >
                  <option value="">--SELECCIONE--</option>
                  {tipos.map((tipo) => (
                    <option key={tipo._id} value={tipo._id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};