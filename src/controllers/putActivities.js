const {Activity, Country} = require('../db')

const putActivities = async (req, res) => {

    const { id, name, dificulty, duration, season, country } = req.body;

    try {
        
        const activity = await Activity.findByPk(id);
        if (!activity) {
            return res.status(404).json("Actividad no encontrada");
        }

        activity.name = name;
        activity.dificulty = dificulty;
        activity.duration = duration;
        activity.season = season;

        await activity.save();

        const countries = await Country.findAll({
            where: { name: country }
        });

        if (!countries) {
            return res.status(404).json("País no encontrado");
        }

        await activity.setCountries(countries);

        res.status(200).json(activity);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = putActivities;