const {Activity, Country} = require('../db')
const validations = require('../helpers/validations')

const postActivities=async(req,res)=>{
    const {name,dificulty,duration,season, country}=req.body;
    try {
        if(!name||!dificulty||!duration||!season){
            const falta=validations(name,dificulty,duration,season)
            res.status(400).json(falta);
        }else{
            const [newAct, created]= await Activity.findOrCreate({
                where:{name:name},
                defaults:{
                    name:name,
                    dificulty:dificulty,
                    duration:duration,
                    season:season
                }
                
            })
            if(created){
                const count= await Country.findAll({
                    where:{name:country}
                })

                if (!count) {
                    return res.status(404).json("País no encontrado");
                }

                await newAct.addCountry(count)
                await newAct.reload();

                res.status(200).json(newAct) 
            }else{
                return res.status(404).json("Ya existe esa actividad");
            }
            
        }

    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

module.exports=postActivities;






// Esta ruta recibirá todos los datos necesarios para crear una actividad turística y relacionarla con los países solicitados.
// Toda la información debe ser recibida por body.
// Debe crear la actividad turística en la base de datos, y esta debe estar relacionada con los países indicados (al menos uno).