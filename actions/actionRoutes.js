const express = require('express');
const db = require('../data/helpers/actionModel.js');

const router = express.Router();

module.exports = router;

router.get('/', (req, res) => {
    db.get()
        .then(response => {
            console.log(response);
        })

})

router.post()
router.put()
router.delete()


// .then(actions => {
//     res.status(200).json({ actions })
// })
// .catch(err => {
//     res.status(500).json({ error: "Actions information could not be retrieved." })
// })