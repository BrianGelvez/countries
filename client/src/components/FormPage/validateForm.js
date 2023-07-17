const validateForm = (formData) => {
    const errors = {};
  
    // Validate name up to 20 characters and no special symbols.
    const nameRegex = /^[a-zA-Z0-9\s]{1,20}$/;
    if (!formData.name || !nameRegex.test(formData.name)) {
      errors.name = "The activity name is invalid";
    }
  
    // Validar la dificultad
    const difficultyRegex = /^[1-5]$/;
    if (!formData.difficulty || !difficultyRegex.test(formData.difficulty)) {
      errors.difficulty = "The difficulty is invalid";
    }
  
    // Validar la duración
    const durationRegex = /^[1-9][0-9]*$/;
    if (!formData.duration || !durationRegex.test(formData.duration)) {
      errors.duration = "Duration is invalid";
    }
  
    // Validar la temporada
    const seasonRegex = /^(summer|autumn|winter|spring)$/;
    if (!formData.season || !seasonRegex.test(formData.season)) {
      errors.season = "The season is invalid";
    }
  
    // Validar los países seleccionados
    if (!formData.countries || formData.countries.length === 0) {
      errors.countries = "You must select at least one country";
    }
  
    return errors;
  };
  
  export default validateForm;
  