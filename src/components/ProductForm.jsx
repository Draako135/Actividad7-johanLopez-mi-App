import React, { useState } from "react";

const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [isUsed, setIsUsed] = useState(false);
  const [categoryP, setCategoryP] = useState("");
  const [isUtility, setIsUtility] = useState(true);
  const [amount, setAmount] = useState(0);
  const [entryDate, setEntryDate] = useState(""); // Estado para la fecha de ingreso

  const handleSubmit = (e) => { // función que maneja el evento de envío del formulario
    e.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Validar que la fecha no sea futura
    const today = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato YYYY-MM-DD
    if (entryDate > today) { // Compara la fecha de ingreso con la fecha actual
      alert("La fecha de ingreso no puede ser futura.");
      return;
    }

    if (product.trim() && category.trim()) {
      onAdd({
        name: product,
        category,
        categoryP,
        status: isUsed ? "Usado" : "Nuevo",
        utility: isUtility ? "Bueno" : "Averiado",
        amount: amount,
        entryDate: entryDate 
      });

      setProduct("");
      setCategory("");
      setIsUsed(false);
      setCategoryP("");
      setIsUtility(false);
      setAmount(0);
      setEntryDate("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
      <input 
        type="text"
        placeholder="Marca del Equipo"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      </div>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
          checked={isUsed}
          onChange={() => setIsUsed(!isUsed)}
        />
        equipo: {isUsed ? "Usado" : "Nuevo"}
      </label>

      <select value={categoryP} onChange={(e) => setCategoryP(e.target.value)}>
        <option value="">Seleccione el tipo de equipo</option>
          <option value="Mouse">Mouse</option>
          <option value="Teclado">Teclado</option>
          <option value="Pantalla">Pantalla</option>
          <option value="Audifonos">Audifonos</option>
      </select>

      {/* Checkbox para la condición del producto */}
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={isUtility}
          onChange={() => setIsUtility(!isUtility)}
        />
        Condición: {isUtility ? "Bueno" : "Averiado"}
      </label>

      {/* Input para la cantidad de equipos */}
      <label className="checkbox-container">
      <div className="input-container">
        <input
          type="number"
          value={amount === 0 ? "" : amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Cantidad de equipos"
        />
      </div>
      </label>
      <label className="checkbox-container">
      <input  className="input-container"
        type="date"
        value={entryDate}
        onChange={(e) => setEntryDate(e.target.value)}
        max={new Date().toISOString().split("T")[0]} // Restringe fechas futuras
        required
        placeholder="Fecha de ingreso del equipo"
      />
      </label>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default ProductForm;
