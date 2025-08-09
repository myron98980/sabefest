import React, { useState } from 'react';
import Select from 'react-select'; 
import './FormularioRegistro.css';
import headerImageDesktop from '../../assets/form-header.png';
import headerImageMobile from '../../assets/form-header-mobile.png';
import { FaUser, FaBirthdayCake, FaUniversity, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';

const opcionesAno = [
  { value: '2019', label: '2019' },
  { value: '2020', label: '2020' },
  { value: '2021', label: '2021' },
  { value: '2022', label: '2022' },
  { value: '2023', label: '2023' },
  { value: '2024', label: '2024' },
];

const customStyles = {
  control: (provided) => ({ ...provided, backgroundColor: 'transparent', border: 'none', boxShadow: 'none', fontSize: '1.3rem', color: '#34495e', minHeight: 'auto', height: '100%', cursor: 'pointer', }),
  menu: (provided) => ({ ...provided, marginTop: '8px', borderRadius: '12px', boxShadow: '0 6px 25px rgba(0, 0, 0, 0.1)', border: '1px solid #e0e0e0', }),
  option: (provided, state) => ({ ...provided, fontSize: '1.2rem', backgroundColor: state.isSelected ? '#007bff' : (state.isFocused ? '#eaf4ff' : 'white'), color: state.isSelected ? 'white' : '#333', padding: '16px', cursor: 'pointer', transition: 'all 0.2s ease', }),
  placeholder: (provided) => ({ ...provided, color: '#bdc3c7', }),
  singleValue: (provided) => ({ ...provided, color: '#34495e', }),
  indicatorSeparator: () => ({ display: 'none', }),
  dropdownIndicator: (provided) => ({ ...provided, color: '#34495e', }),
  menuPortal: base => ({ ...base, zIndex: 9999 })
};

const initialState = {
  nombres: '',
  apellidos: '',
  edad: '',
  universidad: '',
  anoIngreso: null,
};

const FormularioRegistro = () => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const camposMayusculas = ['nombres', 'apellidos', 'universidad'];
    const valorProcesado = camposMayusculas.includes(name) ? value.toUpperCase() : value;
    setFormData({ ...formData, [name]: valorProcesado });
  };

  const handleSelectChange = (selectedOption, action) => {
    setFormData({ ...formData, [action.name]: selectedOption });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
     const scriptURL = 'https://script.google.com/macros/s/AKfycbyng558SICXFe809gFOxNJW4tMfZOQ2dKijSxnMcMBj7JG6ZF02iSM2_kL8-ZwueTnhEQ/exec'; // Reemplaza esta con tu URL si es diferente
    const formDataObject = new FormData();
    formDataObject.append('nombres', formData.nombres);
    formDataObject.append('apellidos', formData.apellidos);
    formDataObject.append('edad', formData.edad);
    formDataObject.append('universidad', formData.universidad);
    formDataObject.append('anoIngreso', formData.anoIngreso ? formData.anoIngreso.value : '');
    setShowSuccess(true);
    setFormData(initialState);
    fetch(scriptURL, { method: 'POST', body: formDataObject })
      .then(response => {
        if (response.ok) console.log('Registro guardado en Google Sheets exitosamente.');
        else console.error('Error al enviar el formulario a Google Sheets.');
      })
      .catch(error => console.error('Error de red al enviar el formulario:', error))
      .finally(() => setIsSubmitting(false));
  };

  const handleReset = () => {
    setFormData(initialState);
    setShowSuccess(false);
  };
  
  return (
    <div className="form-container">
      <img src={headerImageDesktop} alt="Form Header" className="form-header-img desktop-header" />
      <img src={headerImageMobile} alt="Form Header Mobile" className="form-header-img mobile-header" />

      {/* ===== CAMBIO CLAVE AQUÍ: AÑADIMOS LOS NUEVOS TEXTOS ===== */}
      <div className="form-header-text">
        <h3 className="form-super-title">INSCRIPCIÓN PARA EL SABE FEST</h3>
        <p className="form-description">Este formulario tiene como objetivo registrar su paticipación en el SABE FEST 2025, una noche para celebrar tus logros y compartir con otros jovenes de Cerro Azul</p>
      </div>
      

      
      {showSuccess ? (
        <div className="success-container">
          <FaCheckCircle className="success-icon" />
          <h3 className="success-title">¡Registro Exitoso!</h3>
          <p className="success-text">Tus datos han sido guardados correctamente.</p>
          <button onClick={handleReset} className="btn-reset">
            Registrar a otra persona
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="form-body">
            <div className="input-group"><FaUser className="input-icon" /><input type="text" name="nombres" placeholder="Nombres" className="input-field" value={formData.nombres} onChange={handleInputChange} required /></div>
            <div className="input-group"><FaUser className="input-icon" /><input type="text" name="apellidos" placeholder="Apellidos" className="input-field" value={formData.apellidos} onChange={handleInputChange} required /></div>
            <div className="input-group"><FaBirthdayCake className="input-icon" /><input type="number" name="edad" placeholder="Edad" className="input-field" value={formData.edad} onChange={handleInputChange} required /></div>
            <div className="input-group">
              <FaUniversity className="input-icon" />
              <input type="text" name="universidad" placeholder="Universidad/instituto" className="input-field" value={formData.universidad} onChange={handleInputChange} required />
            </div>
            <div className="input-group">
              <FaCalendarAlt className="input-icon" />
              <Select
                menuPlacement="top"
                menuPosition={'fixed'}
                menuPortalTarget={document.body}
                classNamePrefix="custom-select" 
                name="anoIngreso" 
                value={formData.anoIngreso} 
                options={opcionesAno} 
                styles={customStyles}
                placeholder="Año de ingreso Sabe/Accedu" 
                onChange={handleSelectChange} 
                isSearchable={false} 
                required 
              />
            </div>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              Registrar
            </button>
        </form>
      )}
    </div>
  );
};

export default FormularioRegistro;
