const smsModel = require('../models/smsmodel');

class SmsContro {
    user_sms = async (req, res) => {
        const { name, contact } = req.body;
        try {
            // Check if the contact already exists
            const existingSms = await smsModel.findOne({ contact });
            if (existingSms) {
                return res.status(400).json({ message: 'Contact already exists' });
            }

            // Create new SMS entry
            const newSms = new smsModel({ name, contact });
            await newSms.save();

            res.status(201).json({ message: 'User SMS saved successfully', data: newSms });
        } catch (error) {
            res.status(500).json({ message: 'Server error', error });
        }
    }
}

module.exports = new SmsContro();
