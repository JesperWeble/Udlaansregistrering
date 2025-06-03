const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: 'jespers_sop_test@outlook.com',
        pass:   'sueqewcgiimtumif'
    },
});

module.exports = transporter;