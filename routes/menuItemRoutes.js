const express = require ('express'); 
const router  = express.Router();

const MenuItem = require('./../models/MenuItem');

// Routes for MenuItem Model
router.post('', async (req, res) => {

    try{
        const data     = req.body;
        const newMenu  = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Menu Item saved successfully');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('', async (req, res) => {

    try{
        const data = await MenuItem.find();
        console.log('Menu Item Fetched');
        res.status(200).json(data);  
    }
    catch{
        console.log(err);
        res.response(500).json({error: 'Internal Server Error'});
        
    }
})

router.get('/:taste', async (req, res) => {

    try{
        const taste = req.params.taste  // Extract the taste from the URL Parameter

        if(taste == 'sweet' || taste == 'spicy' || taste == 'sour'){
            
            const response = await MenuItem.find({taste: taste})
            console.log('response fetched')
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid input of Taste'})
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// Updating the menuItems by id.
router.put('/:id', async (req, res) => {

    try{

        const menuItemId         = req.params.id; // Extract the id from the URL paramater.
        const updateMenuItemData = req.body;      // Update data for the menuItems.

        const response = await MenuItem.findByIdAndUpdate(menuItemId, updateMenuItemData, {

            new: true,          // Return the updated document
            runValidators: true // Run Mongoose validations

        })

        if (!response) {
            return res.status(404).json({ error: 'menuItem not found' })
        }

        console.log('data updated');
        res.status(200).json(response); 
    }
    catch(err){

        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})

// DELETE method to delete the existing menuItem record
router.delete('/:id', async (req, res) => {

    try{
        const menuItemId = req.params.id; // Extract the menu item's ID from the URL parameter

        // Assuming you have a MenuItem model
        const response = await MenuItem.findByIdAndDelete(menuItemId)

        if(!response) {
            return res.status(404).json({ error: 'MenuItem not found' });
        }
        console.log('data deleted');
        res.status(200).json({message: 'Menu Item deleted successfully'})
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
})


module.exports = router;