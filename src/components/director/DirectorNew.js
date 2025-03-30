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
    <div className="sidebar bg-light shadow-lg p-4 position-fixed top-0 start-0 w-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="bg-white p-4 rounded shadow-lg w-100" style={{ maxWidth: "500px" }}>
        <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
          <h3 className="text-primary">Nuevo Director</h3>
          <i className="fa-solid fa-xmark text-danger fs-4 cursor-pointer" onClick={handleOpenModal}></i>
        </div>
        <form onSubmit={handleOnSubmit} className="mt-3 d-flex flex-column gap-3">
          <div>
            <label className="form-label fw-bold">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={valoresForm.nombre}
              onChange={handleOnChange}
              required
              className="form-control border-primary shadow-sm rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="form-label fw-bold">Estado</label>
            <select
              name="estado"
              value={valoresForm.estado}
              onChange={handleOnChange}
              required
              className="form-select border-primary shadow-sm rounded px-3 py-2"
            >
              <option value="">Seleccione un estado</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </div>
          <button className="btn btn-primary w-100 py-2 rounded-pill shadow-sm">Guardar</button>
        </form>
      </div>
    </div>
  );
};  