const express = require('express');

const accountsDB = require('../data/dbConfig.js');

const router = express.Router(); 

// response [ ]  
router.get('/', async (req, res) => {
    try {
    const accounts = await accountsDB('accounts');
    // SQL SELECT * FROM accounts; 
    res.json(accounts);
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: ' Failed to get Accounts '});
    }
});

// √√  
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
    const [account] = await accountsDB('accounts').where('id', id);
    //SQL SELECT * FROM accounts WHERE id = 1; 
        res.json(account);
    } catch(error){
        console.log(error); 
        res.sendStatus(500).json({ message: ' Failed to get Account '});
    }
}); 

// √√ 
router.post('/', async (req, res) => {
    const accountData = req.body;
    try {
        const account = await accountsDB('accounts').insert(accountData);
        // SQL INSERT INTO accounts WHERE ('name', 'budget')
        //     VALUES ('Laura Theimer', ' ∞ '); 
        res.status(201).json(account);
    } catch(error) {
        console.log(error); 
        res.sendStatus(500).json({ message: ' Failed to get Account '});
    } 
});


// 
router.put('/:id', async (req, res) => {
const { id } = req.params; 
try {
    const rowsUpdated = await accountsDB('accounts')
    //SQL UPDATE accounts SET name=(' Miss Laura B Theimer') 
    //  AND budget=(' $: ∞ ') WHERE CustomerID = 1; 
    .where('id', id)
    .update(req.body); 
    res.status(200).json({ message: rowsUpdated});
} catch(error) {
    console.log(error); 
    res.sendStatus(500).json({ message: ' Failed to get Account '});
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const rowsDeleted = await accountsDB('accounts')
        //SQL DELETE FROM accounts WHERE id='14';  
        .where('id', id)
        .del();
        res.json({ message: ' rowsDeleted '})
    } catch(error){
        console.log(error); 
        res.sendStatus(500).json({ message: ' Failed to Delete Account '});
    }
});


module.exports = router;