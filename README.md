# joi-validation.github.io

------

## How does Joi work?

**Joi** works by defining a schema. Once a schema is defined you can validate requests made to a Hapi application, though you don't need to be using Hapi in order to use Joi.

------ 

## Using Joi in a non Hapi environment 

For this tutorial we will be working in the ```joiful.js``` file.

### Email/Password Example:

In this first example, we are defining a variable ```schema```. 

We are working with a Joi object, as can be seen from the syntax, ```Joi.object()``` and we are defining the constraints for each key.

Let's run through these and check what they require:

```
var schema = Joi.object().options({ abortEarly: false }).keys({
    email: Joi.string().email().required().label('User Email'),
    password: Joi.string().min(8).required(),
    password_confirmation: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' }, label: 'Password Confirmation' } }).label('This label is not used because language.label takes precedence'),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    company: Joi.string().optional()
});

```

* email - requires a string, an email address and the label "User Email"

* password - requires a string of minimum 8 characters

* password_confirmation - this must match the named key 'password' which it refers to using **references**, namely ```Joi.ref('password'). This generates a reference to the value of the named key, in this case 'Password'

* first name - requires a string

* last name - requires a string

* company - optional string


If all of these constraints are met within our variable ```data``` the assertion will pass.

Let's take a look at our variable ```data```.

------

### Does our data meet the constraints of the schema object?

```
var data = {
    email: 'beetle_juice_loves_stripes',	//fail
    password: 'abcd1234', 					//pass
    password_confirmation: 'dfghsfyg', 		//fail
    first_name: 'Joe', 						//pass
    last_name: 'Doe' 						//pass
};

```

* email - 'beetle_juice_loves_stripes' is not a valid email address therefore the assertion will not pass. In order for this key to pass the assertion it must follow this format: example@example.co.uk.

* password - this will pass the assertion

* password_confirmation - this will not pass the assertion as it does not match the refereced key 'password'

* first_name - this will pass the assertion

* last_name - this will pass the assertion

------

### Running the assertion

We then run the assertion, ```Joi.assert(data, schema)```.

In our case, this validates the data against a schema and throws if validation fails where:

* data - the data (``` var data ```) to validate
* schema - the schema object
* message - optional message string prefix added in front of the error message


We run this in our command line using the following command:

``` node joiful.js ```

------

### **Please note** : 

Using the ```Joi.assert(data, schema)``` assertion means that if you have more than one schema object in your file, Joi will run until an assertion fails.

If you would like to validate various data against multiple scehemas, which all live in one file, you want to avoid using the assert method directly and explore other options.

Using the assert method will put everything to a halt if the data does not meet the constraints.

------

### Give it a go yourself!

Download the file and try it for yourself. We have another example below our Email/Password example which also needs some amendments in order to pass the assertions.

Find a way to get all of the data passing their individual schema objects in one file i.e. find an alternative to using ```Joi.assert(data, schema)```



