const express = require('express');
const router = express.Router();
const usersCtrl = require('../ctrl/usersCtrl');
const unitCtrl = require('../ctrl/unitCtrl');
// const jwt = require('jsonwebtoken');


// auth
router.post('/login', usersCtrl.login);
router.post('/register', usersCtrl.register);


// users
router.get('/users/', usersCtrl.getUsers);
router.get('/users/:id/units', usersCtrl.getUnits);
router.post('/users/:id/units', usersCtrl.addUnit); // should not be in use
router.post('/users/:id/attach-unit', usersCtrl.attachUnit);

// specific unit
router.get('/users/:id/units/:unitId', usersCtrl.getUnit);
router.put('/users/:id/units/:unitId', usersCtrl.updateUnit);
router.delete('/users/:id/units/:unitId', usersCtrl.deleteUnit);


// units
router.get('/units', usersCtrl.getUnits);

// scan data
router.get('/users/:id/units/:unitId/scans', usersCtrl.getUnitScans);


router.get('/sample', unitCtrl.sample);
router.delete('/delete', unitCtrl.deleteData);


// router.route('/imageUpload').post(upload.single('image'), mainCtrl.imageUpload);

/*function authenticateUser(req, res, next) {
    console.log('authenticateUser');
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, require('../config').secret, async (err, data) => {
            if (err) return res.sendStatus(403);
            try {
                const userId = data.userId;
                const user = await User.findById(userId);
                req.user = user;
                const ip = req.headers['x-forwarded-for'] ||
                    req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    (req.connection.socket ? req.connection.socket.remoteAddress : null);
                console.log(ip);
                next();
            } catch (e) {
                return res.sendStatus(403);
            }
        }
    );
    // next();
}

function authRole(allowedRoles) {
    return (req, res, next) => {
        if (allowedRoles.indexOf(req.user.role) === -1) {
            return res.status(401).send('not allowed');
        }
        next();
    }
}*/


module.exports = router;

