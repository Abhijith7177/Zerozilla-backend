
const Joi = require('joi');



function createAgencyAndClientValidation(data) {
    try {
        const schema = Joi.object({
            name: Joi.string().required(),
            address1: Joi.string().required(),
            address2: Joi.string(),
            state: Joi.string().required(),
            city: Joi.string().required(),
            phoneNumber: Joi.number().required(),
            clientName: Joi.string().required(),
            clientEmail: Joi.string().email().required(),
            clientPhoneNumber: Joi.number().required(),
            clientTotalBill: Joi.number().required()
        });

        return schema.validate({
            name: data.name,
            address1: data.address1,
            address2: data.address2,
            state: data.state,
            city: data.city,
            phoneNumber: data.phoneNumber,
            clientName: data.clientName,
            clientEmail: data.clientEmail,
            clientPhoneNumber: data.clientPhoneNumber,
            clientTotalBill: data.clientTotalBill
        });
    } catch (error) {
        return false;
    }
}


function updateClientValidation(data) {
    try {
        const schema = Joi.object({
            name: Joi.string().optional().allow(''),
            email: Joi.string().email().optional().allow(''),
            phoneNumber: Joi.number().optional().allow(''),
            totalBill: Joi.number().optional().allow(''),
        }).or('name', 'email', 'phoneNumber', 'totalBill');

        return schema.validate({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            totalBill: data.totalBill,
        });
    } catch (error) {
        return false;
    }
}



module.exports = {
    createAgencyAndClientValidation,
    updateClientValidation
};
