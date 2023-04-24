const { Country, Activity } = require('../src/db');
const getCountries = require('../src/controllers/getCountries');

jest.mock('../src/db');

describe('Pruebas para getCountries', () => {
  test('Debería retornar países correctamente', async () => {
    // Configurar el mock de Country.findAll para que retorne datos ficticios
    Country.findAll.mockResolvedValueOnce([
      { id: 1, name: 'Argentina', Activities: [{ name: 'Actividad 1' }, { name: 'Actividad 2' }] },
      { id: 2, name: 'Brasil', Activities: [{ name: 'Actividad 3' }, { name: 'Actividad 4' }] }
    ]);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getCountries(req, res);

    expect(Country.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, name: 'Argentina', Activities: [{ name: 'Actividad 1' }, { name: 'Actividad 2' }] },
      { id: 2, name: 'Brasil', Activities: [{ name: 'Actividad 3' }, { name: 'Actividad 4' }] }
    ]);
  });

  test('Debería manejar errores correctamente', async () => {
    // Configurar el mock de Country.findAll para que arroje un error
    Country.findAll.mockRejectedValueOnce(new Error('Error en la base de datos'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await getCountries(req, res);

    expect(Country.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error en la base de datos' });
  });
});
