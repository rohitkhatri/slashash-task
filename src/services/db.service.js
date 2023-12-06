const { Model } = require('sequelize');
const Service = require('./index');

class DBService extends Service {
    /**
     * Service constructor
     * @param {import('sequelize').ModelStatic<Model<any,any>>} model - Mongoose model
     */
    constructor(model) {
        super();
        this.model = model;
        this.modelName = model ? model.modelName : null;
    }
}

module.exports = DBService;
