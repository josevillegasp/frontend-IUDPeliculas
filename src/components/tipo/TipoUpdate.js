import React, { useState, useEffect } from 'react';
import { updateTipos, getTipoById } from '../../service/tipoService';
import Swal from 'sweetalert2';

export const TipoUpdate = ({ tipoId, handleOpenModal, listTipos }) => {
  const [valoresForm, setValoresForm] = useState({
    nombre: '',
    descripcion: '',
  });

  // Obtener los datos del tipo por su ID
  useEffect(() => {
    const fetchTipo = async () => {
      try {
        const { data } = await getTipoById(tipoId);
        setValoresForm(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTipo();
  }, [tipoId]);

  // Manejar cambios en los campos del formulario
  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value });
  };

  // Manejar el envío del formulario
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!valoresForm.nombre || !valoresForm.descripcion) {
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

      // Actualizar el tipo
      await updateTipos(tipoId, valoresForm);

      // Cerrar el modal y actualizar la lista de tipos
      handleOpenModal();
      listTipos();

      // Cerrar el mensaje de carga
      Swal.close();
    } catch (error) {
      console.log(error);
      Swal.fire('Error', 'No se pudo actualizar el tipo', 'error');
    }
  };

  return (
    <div className="sidebar">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="sidebar-header">
              <h3>Editar Tipo</h3>
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
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={valoresForm.descripcion}
                  onChange={handleOnChange}
                  required
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary">Guardar Cambios</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};