const axios = require("axios")
const {Country} = require('../db')




const apiData = async() => {
    try {
        const apiData = await axios.get('https://restcountries.com/v3/all');
        const countries =  apiData.data.map(country => {
            const model ={
                id: country.cca3,
                name: country.name.common,
                flag: country.flags[1], //png
                continent: country.continents[0], 
                capital: country.capital ? country.capital[0] : 'No Capital',
                subregion: country.subregion ? country.subregion : 'No Subregion',
                area: country.area,
                population : country.population
            }
            return model
        });
        return countries
    } catch (error) {
        console.log(error);
        return {error:error.message}
    }
    
};


const loadDb = async() => {
    try {
        const countries= await Country.findAll();
        if(countries.length===0){
            
            const allCountries = await apiData();
            await Country.bulkCreate(allCountries);
            const bd=await Country.findAll();
        }
        
    } catch (error) {
        console.log(error);
        return {error:error.message}
    }
}




module.exports=loadDb;