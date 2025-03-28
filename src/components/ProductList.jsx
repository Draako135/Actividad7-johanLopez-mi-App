import React, { useState, useEffect } from "react";

const ProductList = ({ products, onDelete, onEdit }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editCategoryP, setEditCategoryP] = useState("");
  const [editUtility, setEditUtility] = useState(true);
  const [editAmount, setEditAmount] = useState(0);
  const [editEntryDate, setEditEntryDate] = useState(""); // Estado para la fecha de ingreso
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    if (editIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editIndex]);

  const handleEdit = (index, product) => {
    setEditIndex(index);
    setEditValue(product.name);
    setEditCategory(product.category);
    setEditStatus(product.status === "Usado");
    setEditCategoryP(product.categoryP);
    setEditUtility(product.utility === "Bueno");
    setEditAmount(product.amount);
    setEditEntryDate(product.entryDate); // Asegúrate de que la fecha se establezca correctamente
  };

  const handleSave = (index) => {
    const today = new Date().toISOString().split("T")[0];
    if (editEntryDate > today) {
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }
    if (editValue.trim() && editCategory.trim() && editCategoryP.trim()) {
      onEdit(index, {
        name: editValue,
        category: editCategory,
        categoryP: editCategoryP,
        status: editStatus ? "Usado" : "Nuevo",
        utility: editUtility ? "Bueno" : "Averiado",
        amount: editAmount,
        entryDate: editEntryDate // Asegúrate de que la fecha se guarde correctamente
      });
      setEditIndex(null);
    }
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditValue("");
    setEditCategory("");
    setEditStatus(false);
    setEditCategoryP("");
    setEditUtility(false);
    setEditAmount(0);
    setEditEntryDate(""); // Reinicia la fecha a una cadena vacía
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.status.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDateRange =
      (!startDate || product.entryDate >= startDate) &&
      (!endDate || product.entryDate <= endDate);

    return matchesSearch && matchesDateRange;
  });

  return (
    <div>
      <h2>Lista de Productos</h2>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-box"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="date-filter"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
          className="date-filter"
        />
        <button onClick={handleClearSearch} className="clear-btn">Limpiar</button>
      </div>

      <ul>
        {filteredProducts.map((product, index) => (
          <li key={index} className="product-item">
            <div className="product-content">
              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                  <select
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                  >
                    <option value="">Seleccione la Sala</option>
                    <optgroup label="Edificio Giordano">
                      <option value="Sala 1E">Sala 1E</option>
                      <option value="Lab. Software">Lab. Software</option>
                    </optgroup>
                    <optgroup label="Edificio Santo Domingo">
                      <option value="Sala 1F">Sala 1F</option>
                      <option value="Sala 2F">Sala 2F</option>
                    </optgroup>
                  </select>

                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={editStatus}
                      onChange={() => setEditStatus(!editStatus)}
                    />
                    equipo: {editStatus ? "Usado" : "Nuevo"}
                  </label>

                  <select
                    value={editCategoryP}
                    onChange={(e) => setEditCategoryP(e.target.value)}
                  >
                    <option value="">Seleccione el tipo de equipo</option>
                    <option value="Mouse">Mouse</option>
                    <option value="Teclado">Teclado</option>
                    <option value="Pantalla">Pantalla</option>
                    <option value="Audifonos">Audifonos</option>
                  </select>

                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={editUtility}
                      onChange={() => setEditUtility(!editUtility)}
                    />
                    Condición: {editUtility ? "Bueno" : "Averiado"}
                  </label>
                  <div className="amount-container">
                    <input
                      type="number"
                      value={editAmount === 0 ? "" : editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      placeholder="Cantidad de equipos"
                    />
                  </div>

                  <label className="checkbox-container">
                  <input
                    type="date"
                    value={editEntryDate}
                    onChange={(e) => setEditEntryDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                  />
                  </label>
                </>
              ) : (
                <span>
                  {product.name} -
                  <strong>{product.category}</strong> -
                  {product.status} -
                  <strong>{product.categoryP}</strong> -
                  {product.utility} -
                  <strong>{product.amount}</strong> -
                  {product.entryDate}
                </span>
              )}
            </div>
            <div className="button-group">
              {editIndex === index ? (
                <>
                  <button className="save-btn" onClick={() => handleSave(index)}>
                    Guardar
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index, product)}
                  >
                    Editar
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(index)}>
                    Eliminar
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;