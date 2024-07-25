const express = require('express');
const faker = require('faker');

const app = express();
const port = 3000;

class Usuario {
  constructor() {
    this._id = faker.datatype.uuid();
    this.primerNombre = faker.name.firstName();
    this.apellido = faker.name.lastName();
    this.numeroTelefono = faker.phone.phoneNumber();
    this.email = faker.internet.email();
    this.contrasena = faker.internet.password();
  }
}

class Empresa {
  constructor() {
    this._id = faker.datatype.uuid();
    this.nombre = faker.company.companyName();
    this.direccion = {
      calle: faker.address.streetAddress(),
      ciudad: faker.address.city(),
      estado: faker.address.state(),
      codigoPostal: faker.address.zipCode(),
      pais: faker.address.country()
    };
  }
}

// Ruta para la raíz
app.get('/', (req, res) => {
  res.send('Faker API! Use /api/users/new, /api/companies/new, or /api/user/company');
});

//  Aqui la ruta que devuelve un nuevo usuario
app.get('/api/users/new', (req, res) => {
  const nuevoUsuario = new Usuario();
  res.json(nuevoUsuario);
});

// Aqui la ruta que devuelve una nueva compañía
app.get('/api/companies/new', (req, res) => {
  const nuevaEmpresa = new Empresa();
  res.json(nuevaEmpresa);
});

// aca la ruta que devuelve tanto un nuevo usuario y una nueva compañía
app.get('/api/user/company', (req, res) => {
  const nuevoUsuario = new Usuario();
  const nuevaEmpresa = new Empresa();
  res.json({ usuario: nuevoUsuario, empresa: nuevaEmpresa });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
