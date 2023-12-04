// 1.- Impoetando Mongoose
import mongoose from 'mongoose';
import validator from 'validator';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';
// 2.- Desestructurando la fn Schema
const { Schema } = mongoose;
// 3.- Creando el esquema
const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastname: { type: String, required: true },
    grade: { type: String, required: true },
    section: { type: String, required: true },
    mail: {
      type: String,
      unique: true,
      requiered: [true, 'Es necesario ingresar email'],
      validator(mail) {
        // eslint-disable-next-line no-useless-escape
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(mail);
      },
      message: `{VALUE} no es un email valido`,
    },
    password: {
      type: String,
      required: [true, 'Es necesario ingresar password'],
      trim: true,
      minLength: [6, 'Password debe ser de al menos 6 caracteres'],
      validate: {
        validator(password) {
          if (process.env.NODE_ENV === 'development') {
            // Sin validacion rigurosa en Dev
            return true;
          }
          return validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            returnScore: false,
          });
        },
        message: 'Es necesario ingresar un password fuerte',
      },
    },
    code: {
      type: String,
      required: [true, 'Es necesario ingresar un codigo de estudiante'],
      trim: true,
      minLength: [
        9,
        'el codigo de estudiante debe ser de al menos 9 caracteres',
      ],
      validate: {
        validator(code) {
          if (process.env.NODE_ENV === 'development') {
            // Sin validacion rigurosa en Dev
            return true;
          }
          return validator.isStrongPassword(code, {
            minLength: 9,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            returnScore: false,
          });
        },
        message: 'Es necesario ingresar el codigo de estudiante',
      },
    },
    emailConfirmationToken: String,
    emailConfirmationAt: Date,
  },
  { timestamps: true },
);

// adding pluggins to Schema
UserSchema.plugin(uniqueValidator);

// Asignando methods de instancia
UserSchema.methods = {
  // Metodo para encriptar el password
  hashPassword() {
    return bcrypt.hashSync(this.password, 10);
  },
  // Genera un token de 64 caracteres aleatorios
  generateConfirmationToken() {
    return crypto.randomBytes(64).toString('hex');
  },
  // Funcion de transformacion a Json personalizada
  toJSON() {
    return {
      id: this._id,
      firstName: this.firstName,
      lastname: this.lastname,
      code: this.code,
      grade: this.grade,
      section: this.section,
      mail: this.mail,
      emailConfirmationToken: this.generateConfirmationToken,
      emailConfirmationAt: this.emailConfirmationAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  },
};

// Hooks
UserSchema.pre('save', function presave(next) {
  // Encriptar el password
  if (this.isModified('password')) {
    this.password = this.hashPassword();
  }
  return next();
});

// 4.- Compilando el modelo y exportando
export default mongoose.model('user', UserSchema);
