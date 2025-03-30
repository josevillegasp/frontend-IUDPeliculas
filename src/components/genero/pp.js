 return (
    <div className="container-fluid px-4 py-3">
        
        <div className="d-flex justify-content-between align-items-center mb-3 pr-1">
          <h2 className="mb-3 text-primary">Lista de Géneros</h2>
          {openModal ? (
            <GeneroNew handleOpenModal={handleOpenModal} listGeneros={listGeneros} />
          ) : (
            <button className="btn btn-primary btn-sm d-flex align-items-center gap-1" onClick={handleOpenModal}>
              <i className="fa-solid fa-plus"></i> Nuevo Género
            </button>
          )}
      </div>
      <div className="table-responsive shadow-sm rounded border">
        <table className="table align-middle">
          <thead className="bg-dark text-white">
            <tr>
              <th className="py-2 text-start">Nombre</th>
              <th className="py-2 text-start">Estado</th>
              <th className="py-2 text-start">Descripción</th>
              <th className="py-2 text-start">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {generos.map((genero) => (
              <tr key={genero._id} className="border-bottom">
                <td className="py-1 text-start">{genero.nombre}</td>
                <td className="py-1 text-start">
                  <span className={badge px-2 py-1 ${genero.estado === 'activo' ? 'bg-success text-white' : 'bg-danger text-white'}}>
                    {genero.estado}
                  </span>
                </td>
                <td className="py-1 text-start text-muted">{genero.descripcion}</td>
                <td className="py-1 d-flex gap-1">
                  <button
                    className="btn btn-warning btn-sm d-flex align-items-center gap-1"
                    onClick={() => handleOpenEditModal(genero)}
                  >
                    <i className="fa-solid fa-pen"></i> Editar
                  </button>
                  <GeneroDelete generoId={genero._id} onDeleteSuccess={listGeneros} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openEditModal && (
        <GeneroUpdate
          generoId={selectedGenero._id}
          handleOpenModal={() => setOpenEditModal(false)}
          listGeneros={listGeneros}
        />
      )}
    </div>
  );