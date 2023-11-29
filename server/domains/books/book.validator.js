import * as Yup from 'yup';

// crear un esquema de validacion
const bookSchema = Yup.object().shope({
  name: Yup.string().required('Se requiere el nombre del libro'),
  description: Yup.string()
    .max(500, 'La descripcion no debe de tener mas de 500 caracteres')
    .required('se requiere una descripcion del libro'),
});

// Middle de extraccion
const getbook = (req) => {
  // extrayendo datos de la peticion
  const { name, description } = req.body;
  return {
    name,
    description,
  };
};
export default {
  bookSchema,
  getbook,
};
