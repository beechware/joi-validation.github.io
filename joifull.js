var Joi = require('joi');


var schema = Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().email().required().label('User Email'),
    password: Joi.string().min(8).required(),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' }, label: 'Password Confirmation' } }).label('This label is not used because language.label takes precedence'),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    company: Joi.string().optional()
});


var data = {
    email: 'beetle_juice_loves_stripes',
    password: 'abcd1234',
    password_confirmation: 'dfghsfyg',
    first_name: 'Joe',
    last_name: 'Doe'
};

Joi.assert(data, schema);


// var Joi = require('joi');


// var schema2 = {
//     type: Joi.string().required(),
//     subtype: Joi.alternatives()
//         .when('type', {is: 'video', then: Joi.valid('mp4', 'wav')})
//         .when('type', {is: 'audio', then: Joi.valid('mp3')})
//         .when('type', {is: 'image', then: Joi.valid('jpg', 'png')})
//         .when('type', {is: 'pdf'  , then: Joi.valid('document')})
// };


// Joi.assert({ type: 'video', subtype: 'mp4' }, schema2); // Pass
// Joi.assert({ type: 'video', subtype: 'wav' }, schema2); // Pass
// Joi.assert({ type: 'pdf', subtype: 'document' }, schema2); // Fail
// Joi.assert({ type: 'audio', subtype: 'mp4' }, schema2); // Fail