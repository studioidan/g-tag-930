const User = require('../model/user.model');
const Unit = require('../model/unit.model');
const ScanData = require('../model/scan-data.model');
const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports.login = async (req, res) => {

    try {
        const email = req.body.email;
        const password = req.body.password;

        if (!email || !password) return res.status(400).json({
            success: false,
            message: 'please enter username and password'
        });

        let user = await User.findOne({email: email, password: password});
        if (!user) return res.status(400).json({success: false, message: 'email or password are incorrect'});

        const token = jwt.sign({userId: user._id, email: email}, config.env.JWT_SECRET);
        res.json({success: true, data: token});
    } catch (e) {
        res.status(500).json({success: false, message: e})
    }

};


module.exports.register = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const name = req.body.name || '';

        if (!email || !password) return res.status(400).json({
            success: false,
            message: 'please enter email and password'
        });

        let user = await User.findOne({email: email, password: password});
        if (user) return res.status(400).json({success: false, message: 'email already taken'});

        let newUser = await User.create({
            email,
            password,
            name,
        });

        res.json({success: true, data: newUser});
    } catch (e) {
        res.status(500).json({success: false, message: e})
    }
};


module.exports.getUsers = async (req, res) => {
    res.json(await User.find());
    // res.json(await Unit.find({user: userId}).populate('user'));
};


module.exports.getUnit = async (req, res) => {
    const unitId = req.params.unitId;
    res.json(await Unit.findById(unitId));
    // res.json(await Unit.find({user: userId}).populate('user'));
};


module.exports.getUnits = async (req, res) => {
    const userId = req.user._id;
    if (req.user.role === 'admin') {
        return res.json(await Unit.find({}));
    }
    res.json(await Unit.find({user: userId}));
};


module.exports.addUnit = async (req, res) => {
    try {
        const color = req.body.color || '#000000';
        const name = req.body.name;

        if (!name) return res.status(400).json({
            success: false,
            message: 'please enter unit name'
        });

        // let user = await User.findById(req.user._id);
        // if (!user) return res.status(400).json({success: false, message: 'user was not found'});

        let newItem = await Unit.create({
            color,
            name,
            user: req.user,
        });

        res.json({success: true, data: newItem});
    } catch (e) {
        res.status(500).json({success: false, message: e})
    }
};


module.exports.attachUnit = async (req, res) => {
    const uid = req.body.unitId; // real unit id (not DB id)

    // let user = await User.findById(userId);
    // if (!user) return res.status(400).json({success: false, message: 'user was not found'});

    try {

        // find relevant unit
        let unit = await Unit.findOne({unitId: uid});
        if (!unit) {
            unit = await Unit.create({
                user: req.user,
                unitId: uid
            });

            return res.json({success: true, data: unit});
        }

        unit.user = req.user;
        await unit.save();
        res.json({success: true, data: unit});
    } catch (e) {
        res.status(500).json({success: false, message: e})
    }
};


module.exports.addUnit = async (req, res) => {
    const userId = req.params.id;
    try {
        const color = req.body.color || '#000000';
        const name = req.body.name;

        if (!name) return res.status(400).json({
            success: false,
            message: 'please enter unit name'
        });

        let user = await User.findById(userId);
        if (!user) return res.status(400).json({success: false, message: 'user was not found'});

        let newItem = await Unit.create({
            color,
            name,
            user,
        });

        res.json({success: true, data: newItem});
    } catch (e) {
        res.status(500).json({success: false, message: e})
    }
};


module.exports.updateUnit = async (req, res) => {
    const unitId = req.params.unitId;
    try {
        const color = req.body.color || '#000000';
        const name = req.body.name;

        let unit = await Unit.findById(unitId);
        if (!unit) return res.status(400).json({success: false, message: 'unit was not found'});

        unit.color = color;
        unit.name = name;
        await unit.save();
        res.json({success: true, data: unit});

    } catch (e) {
        res.status(500).json({success: false, message: e})
    }
};


module.exports.deleteUnit = async (req, res) => {
    const unitId = req.params.unitId;
    try {

        await Unit.deleteOne({_id: unitId});
        res.json({success: true, data: 'deleted'});
    } catch (e) {
        res.status(500).json({success: false, message: e})
    }
};


module.exports.getUnitScans = async (req, res) => {
    // todo - check that the unit belongs to the connected user (unit.user.id == req.user.id)
    const unitId = req.params.unitId;
    res.json(await ScanData.find({unitId: (unitId)}));
};

