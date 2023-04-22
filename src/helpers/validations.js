
const validations=(name,dificulty,duration,season)=>{
    if(!name)return("Falta el nombre");
    if(!dificulty)return("Falta la dificultad")
    if(!duration)return("Falta la duración")
    if(!season)return("Falta la temporada")
}

module.exports=validations;