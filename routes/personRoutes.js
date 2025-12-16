const express = require ('express'); 
const router  = express.Router();

const Person = require('./../models/Person'); 
const {jwtAuthMiddleware, generateToken} = require('./../jwt');

// POST route to add a person
router.post('/signup', async (req, res) => {

    try{
        const data = req.body // Assuming the request body contains the person data.

        // Create a new Person document using the Mongoose model.
        const newPerson = new Person(data);

        // Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');

        const payload = {
            id: response.id,
            username: response.username
        }
        
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log("Token is : ", token);

        res.status(200).json({response: response, token: token});
    }
    catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// Login Route
router.post('/login', async (req, res) => {

    try{
        // Extract username and password from request body
        const { username, password } = req.body

        //Find the user by username
        const user = await Person.findOne({username: username})

        // If user does not exist or password does not match, return error
        if( !user || !(await user.comparePassword(password)) ){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // generate Token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);

        // return token as response
        res.json({token})
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('', jwtAuthMiddleware, async (req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// Profile Route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user;
        console.log("User Data: ", userData);

        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Serson Error' })
    }
})

// Parameterized API Call for Person work type
router.get('/:workType', async (req, res) => {
    try{
        const workType = req.params.workType

        if(workType == 'chef' || workType == 'manager' || workType == 'waiter')
        {
            const data = await Person.find({work: workType});
            console.log('data fetched');
            res.status(200).json(data);
        }
        else{
            res.status(404).json({error: 'Invalid Work Type'}) 
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// Updating the Person by id.
router.put('/:id', async (req, res) => {

    try{

        const personId         = req.params.id; // Extract the id from the URL paramater.
        const updatePersonData = req.body;      // Update data for the person.

        const response = await Person.findByIdAndUpdate(personId, updatePersonData, {

            new: true,          // Return the updated document
            runValidators: true // Run Mongoose validations

        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' })
        }

        console.log('data updated');
        res.status(200).json(response); 
    }
    catch{

        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

router.delete('/:id', async (req, res) => {

    try{
        const personId = req.params.id; // Extract the person's ID from the URL parameter

        // Assuming you have a Person model
        const response = await Person.findByIdAndDelete(personId)

        if(!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data deleted');
        res.status(200).json({message: 'person deleted successfully'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

module.exports = router;