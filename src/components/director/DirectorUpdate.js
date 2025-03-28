import React, { useState, useEffect } from 'react';
import { updateDirectores, getDirectorById } from '../../service/directorService';
import Swal from 'sweetalert2';

export const DirectorUpdate = ({ directorId, handleOpenModal, listDirectores }) => {
  const [valoresForm, setValoresForm] = useState({
    nombre: '',
    estado: '',
  });

  useEffect(() => {
    const fetchDirector = async () => {
      try {
        const { data } = await getDirectorById(directorId);
        setValoresForm(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDirector();
  }, [directorId]);

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!valoresForm.nombre || !valoresForm.estado) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();

      await updateDirectores(directorId, valoresForm);

      handleOpenModal();
      listDirectores();

      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'No se pudo actualizar el director', 'error');
    }
  };

  return (
    <div className="sidebar">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="sidebar-header">
              <h3>Editar Director</h3>
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
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={valoresForm.nombre}
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
                <label className="form-label">Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={valoresForm.estado}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary btn-sm">Guardar Cambios</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};