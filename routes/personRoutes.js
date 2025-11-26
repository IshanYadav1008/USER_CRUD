const express = require ('express'); 
const router  = express.Router();

const Person = require('./../models/Person'); 

// Routes for Person Model
router.post('', async (req, res) => {

    const data = req.body // Assuming the request body contains the person data.

    try{
        const newPerson   = new Person(data);
        const savedPerson = await newPerson.save();

        console.log('data saved successfully');
        res.status(200).json(savedPerson)
    }
    catch(error){
        console.log('Error saving person', error);
        res.status(500).json({error: 'Internal server error'})
    }
})

router.get('', async (req, res) => {
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
            runValidators: true // Run Mongoose validdations

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