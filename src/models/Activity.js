const { DataTypes } = require('sequelize');

module.exports=(sequelize)=>{
    sequelize.define(
        "activity",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            dificulty: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    min:1,
                    max:5,
                },
            },
            duration: {
                type: DataTypes.FLOAT,
                validate: {
                    min:0,
                    max:24
                },
            },
            season: {
                type: DataTypes.ENUM('Summer','Autumn','Winter','Spring')
            }
        },
        {timestamps: false}
    )
}