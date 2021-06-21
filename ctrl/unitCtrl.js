const Unit = require('../model/unit.model');
const ScanData = require('../model/scan-data.model');


module.exports.deleteData = async (req, res) => {

    try {
        await Unit.remove();
        await ScanData.remove();
        res.json({success: true});
    } catch (e) {
        res.status(500).json({success: false, message: e})
    }

};

module.exports.sample = async (req, res) => {

    try {
        let data = req.query.data;
        console.log(data);

        //UBAT4220MVOLINDExt_ONURSSI21,9
        // NETCON"Partner"MCUTMPTPM40.00EXTTMPTPS31.65LOC$GPGGA,114625.715,
        // ,,,,0,00,,,M,0.0,M,,0000*50
        // $SPEEDTAGSTID43TRSSI-51,TID48TRSSI-73,TID35TRSSI-55,TID29TRSSI-56,


        // analyze scan data
        let uid = data.substring('UID'.length, data.indexOf('UBAT'));
        let voltage = data.substring(data.indexOf('UBAT') + 'UBAT'.length, data.indexOf('MV'));
        let isExtVoltageOn = data.indexOf('OLINDExt_ON') > -1;
        let unitRSSI = data.substring(data.indexOf('URSSI') + 'URSSI'.length, data.indexOf('NETCON')).replace(/\s+/g, '');

        // find relevant unit by unit id
        let unit = await Unit.findOne({unitId: uid});
        if (!unit) {
            // this is the first sample for this unit, create new unit with unitId but without user!
            unit = await Unit.create({
                unitId: uid
            });
        }

        // create scan data object
        let newItem = await ScanData.create({
            unitId: uid,
            voltage,
            isExtVoltageOn,
            unitRSSI,
            time: new Date().getTime()
        });

        res.json({success: true, data: newItem});
    } catch (e) {
        res.status(500).json({success: false, message: e})
    }

};
