const {Country, Activity} = require('../db')
const { Op, sequelize } = require('sequelize');
const getCountries = require('./getCountries');

const getCountryByName = async(req,res)=>{
    const{name}=req.query;
    try {
        if(name){
            const countryName=name.toLowerCase();
            const founds = await Country.findAll({
                where: {
                name: {[Op.iLike]: `%${countryName}%`}
                },
                include: [{
                    model: Activity,
                    attributes: ['name', 'dificulty', 'duration', 'season'],
                    through: { attributes: [] }
                }]
            });
            if(founds.length>0){
                res.status(200).json(founds)
            }else{
                res.status(400).json("No se encontró ningún país")
            }
        }else{
            getCountries(req,res)
        }
        
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}

module.exports=getCountryByName;

// Esta ruta debe obtener todos aquellos países que coinciden con el nombre recibido por query. (No es necesario que sea una coincidencia exacta).
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el país, debe mostrar un mensaje adecuado.