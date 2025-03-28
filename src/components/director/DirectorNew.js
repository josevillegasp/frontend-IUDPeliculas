import React, { useState } from 'react';
import { createDirectores } from '../../service/directorService'; // Importa la función corregida
import Swal from 'sweetalert2';

export const DirectorNew = ({ handleOpenModal, listDirectores }) => {
  // Estado para los valores del formulario
  const [valoresForm, setValoresForm] = useState({
    nombre: '',
    estado: '',
  });

  // Manejar cambios en los campos del formulario
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  // Manejar el envío del formulario
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!valoresForm.nombre || !valoresForm.estado) {
      Swal.fire('Error', 'Todos los campos son obligatorios', 'error');
      return;
    }

    try {
      // Mostrar mensaje de carga
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...',
      });
      Swal.showLoading();

      // Crear el nuevo director
      await createDirectores(valoresForm);

      // Cerrar el modal y actualizar la lista de directores
      handleOpenModal();
      listDirectores();

      // Cerrar el mensaje de carga
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'No se pudo crear el director', 'error');
    }
  };

  return (
    <div className="sidebar">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="sidebar-header">
              <h3>Nuevo Director</h3>
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
              <button className="btn btn-primary">Guardar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};  