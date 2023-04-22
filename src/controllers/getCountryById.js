const {Country, Activity} = require('../db')

const getCountryById=async(req,res)=>{
    const {id}=req.params;
    try {
        const country = await Country.findByPk(id.toUpperCase(), {
            include: [{
                model: Activity,
                attributes: ['name', 'dificulty', 'duration', 'season'],
                through: { attributes: [] }
            }]
        });


        if(country){
           
            res.status(200).json(country)
        }else{
            res.status(400).json("País no encontrado")
        }
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};

module.exports=getCountryById;