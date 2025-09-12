export const inputErrors = {
  required: "Este campo es obligatorio",
  email: "El correo electrónico no es válido",
  invalidFormat: "Formato invalido",
  onlyPositive: "Solo numeros positivos",
  minLength: (length: number) => `Debe tener al menos ${length} caracteres`,
  maxLength: (length: number) => `No puede tener más de ${length} caracteres`,
  passwordMismatch: "Las contraseñas no coinciden",
  invalidPhone: "El número de teléfono no es válido",
}

