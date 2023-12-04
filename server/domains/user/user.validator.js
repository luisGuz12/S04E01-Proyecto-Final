import * as Yup from 'yup';

// Crear schema de validacion
const signUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Se requiere ingresar un nombre'),
  lastname: Yup.string().required('Se requiere ingresa un apellido'),
  mail: Yup.string().email().required('Se requiere ingresar un correo valido'),
  password: Yup.string()
    .min(6)
    .required('Se requiere ingresar un password de al menos 6 caracteres'),
  cpassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'El password de confirmación no coincide',
  ),
  code: Yup.string()
    .max(9, 'No escribir mas de 9 caracteres')
    .required('Se requiere codigo de estudiante'),
  grade: Yup.string().required('Se requiere ingresar un grado'),
  section: Yup.string().required('Se requiere ingresar la seccion'),
});

const sigUpGetter = (req) => {
  // Desestructurando la informacion
  const {
    firstName,
    lastname,
    mail,
    password,
    cpassword,
    code,
    grade,
    section,
  } = req.body;
  // Se ingresa al objeto singup
  return {
    firstName,
    lastname,
    mail,
    password,
    cpassword,
    code,
    grade,
    section,
  };
};

const signUp = {
  schema: signUpSchema,
  getObject: sigUpGetter,
};

export default { signUp };
