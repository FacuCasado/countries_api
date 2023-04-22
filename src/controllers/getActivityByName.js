const {Activity, Country} = require('../db')

const getActivityBiName=async(req,res)=>{
    const {name}=req.params;
    try {
        const activity=await Activity.findAll({where:{name:name},
            include:[{
            model:Country,
            attributes:['name'],
            through: { attributes: [] }
        }]})
        if(activity){
           
            res.status(200).json(activity)
        }else{
            res.status(400).json("Actividad no encontrada")
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports=getActivityBiName;