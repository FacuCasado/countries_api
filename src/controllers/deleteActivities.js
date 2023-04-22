const {Activity, Country} = require('../db')

const deleteActivities = async(req,res)=>{
    const {id}=req.params;
    try {

        const act=await Activity.findByPk(id);
        if(act){
            await act.destroy();
            const acts=Activity.findAll();
            res.status(200).json(acts)
        }else{
            res.status(200).json("No existe esa actividad para eliminar")
        }
        
        
    } catch (error) {
        res.status(500).json({error:error.message})
    }

}

module.exports=deleteActivities;