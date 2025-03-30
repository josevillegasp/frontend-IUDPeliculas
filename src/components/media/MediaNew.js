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
    <div className="sidebar position-fixed top-0 start-0 w-100 h-100  shadow-lg p-4 d-flex flex-column justify-content-center align-items-center">
      <div className="container bg-white p-4 rounded shadow-lg">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2 w-100">
          <h3 className="text-primary fw-bold">Nuevo Media</h3>
          <i className="fa-solid fa-xmark text-danger fs-3 cursor-pointer" onClick={handleOpenModal}></i>
        </div>
  
        {/* Formulario */}
        <form onSubmit={handleOnSubmit} className="mt-4 w-100">
          <div className="row g-4">
            {/* Primera fila */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Serial</label>
              <input
                type="text"
                name="serial"
                value={valoresForm.serial}
                onChange={handleOnChange}
                required
                className="form-control input-modern border-primary border-primary"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Título</label>
              <input
                type="text"
                name="titulo"
                value={valoresForm.titulo}
                onChange={handleOnChange}
                required
                className="form-control input-modern border-primary"
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Año de Estreno</label>
              <input
                type="number"
                name="anioestreno"
                value={valoresForm.anioestreno}
                onChange={handleOnChange}
                required
                className="form-control input-modern border-primary"
              />
            </div>
  
            {/* Segunda fila */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">URL</label>
              <input
                type="text"
                name="url"
                value={valoresForm.url}
                onChange={handleOnChange}
                required
                className="form-control input-modern border-primary"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">Imagen URL</label>
              <input
                type="text"
                name="imagen"
                value={valoresForm.imagen}
                onChange={handleOnChange}
                required
                className="form-control input-modern border-primary"
              />
            </div>
  
            {/* Tercera fila */}
            <div className="col-12">
              <label className="form-label fw-semibold">Sinopsis</label>
              <textarea
                name="sinopsis"
                value={valoresForm.sinopsis}
                onChange={handleOnChange}
                required
                className="form-control input-modern border-primary"
                rows="3"
              />
            </div>
  
            {/* Cuarta fila - Selects */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Género Principal</label>
              <select
                className="form-select input-modern border-primary"
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
            <div className="col-md-6">
              <label className="form-label fw-semibold">Director Principal</label>
              <select
                className="form-select input-modern border-primary"
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
  
            {/* Quinta fila - Más Selects */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">Productora</label>
              <select
                className="form-select input-modern border-primary"
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
            <div className="col-md-6">
              <label className="form-label fw-semibold">Tipo</label>
              <select
                className="form-select input-modern border-primary"
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
  
          {/* Botón de guardar */}
          <div className="mt-4 text-center">
            <button className="btn btn-primary w-50 py-2 rounded-pill shadow-sm">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
  
  
  
};