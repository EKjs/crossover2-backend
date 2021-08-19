import Joi from 'joi';

const validateWithJoi = (reqData,reqType)=>{
    let schema;
    switch (reqType) {
      case 'newMsg':
        schema={
            title:Joi.string().min(1).required(),
            message:Joi.string().min(1).required(),
            userId:Joi.number().required(),
            date:Joi.date().required()
        }
        break;
      case 'newUser':
        schema={
            userName:Joi.string().min(1).required(),
            email:Joi.string().required().email(),
            password:Joi.string().min(8).required(),
        }
        break;

      default:
        break;
    };
    return Joi.object(schema).validate(reqData)
  };
export default validateWithJoi