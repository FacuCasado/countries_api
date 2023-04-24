const { Activity, Country } = require('../src/db');
const getActivities = require('../src/controllers/getActivities');

// Mockear los objetos req y res
const req = {};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn()
};


describe('getActivities', () => {
  it('debe retornar las actividades con sus países relacionados', async () => {
    // Mockear la función de base de datos Activity.findAll para que retorne un resultado esperado
    Activity.findAll = jest.fn().mockResolvedValueOnce([
      { name: 'Actividad1', Countries: [{ name: 'País1' }, { name: 'País2' }] },
      { name: 'Actividad2', Countries: [{ name: 'País3' }, { name: 'País4' }] }
    ]);

    // Llamar a la función getActivities con los objetos req y res simulados
    await getActivities(req, res);

    // Verificar que se haya llamado a res.status con el código de estado correcto
    expect(res.status).toHaveBeenCalledWith(200);

    // Verificar que se haya llamado a res.json con el resultado esperado
    expect(res.json).toHaveBeenCalledWith([
      { name: 'Actividad1', Countries: [{ name: 'País1' }, { name: 'País2' }] },
      { name: 'Actividad2', Countries: [{ name: 'País3' }, { name: 'País4' }] }
    ]);
  });

  it('debe manejar errores y retornar un mensaje de error', async () => {
    // Mockear la función de base de datos Activity.findAll para que arroje un error
    const error = new Error('Error en la consulta a la base de datos');
    Activity.findAll = jest.fn().mockRejectedValueOnce(error);

    // Llamar a la función getActivities con los objetos req y res simulados
    await getActivities(req, res);

    // Verificar que se haya llamado a res.status con el código de estado correcto para errores
    expect(res.status).toHaveBeenCalledWith(500);

    // Verificar que se haya llamado a res.json con el mensaje de error
    expect(res.json).toHaveBeenCalledWith({ error: error.message });
  });
});