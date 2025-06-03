const express = require('express') // Express allows for sending data to frontend
const oracleDatabase = require('oracledb');
const config = require ('./config'); // Where passwords and such for the database is written.
const app = express(); // creates an app that can be interacted with for Express.
const cors = require('cors'); // a security feature in web browsers
const transporter = require('./mailer'); // Allowing for emails.
app.use(express.static('frontend'))
app.use(express.json())
app.use(cors());
const port = 3000;

async function getDataFromDatabase(table)
{
    let connection;
    try
    {
        connection = await oracleDatabase.getConnection(config.dbConfig);
        console.log('Success!')

        const result = await connection.execute
        (
            `SELECT * FROM ${table}`,
            [],
            {outFormat: oracleDatabase.OUT_FORMAT_OBJECT}
        );
        console.log(`${table} are: ${result.rows}`)
        return resultData = result.rows;


    } 
    catch (err) 
    {
        console.error('Database error:', err);
    }
    finally 
    {
        if (connection) 
        {
          await connection.close();
        }
    }
}

async function sendEmail(msg)
{
    transporter.sendMail({
        from: 'jespers_sop_test@outlook.com',
        to: 'jespers_sop_test@outlook.com',
        subject: 'Testing sending emails through node.js nodemailer',
        text: msg,
    });
}

// Send data to Frontend
app.get('/:table', async (req, res) =>
{
    const tableName = req.params.table.toUpperCase();
    console.log("App ", tableName)
    try
    {
        const data = await getDataFromDatabase(tableName);
        res.json(data);
        console.log(data)
    }
    catch (err)
    {
        res.status(500).send(`Error fetching ${tableName} data.`);
    }
});

app.post('/send-email', async (req, res) => {
    try
    {
        await sendEmail(req.body.msg)
        res.status(200).json({ success: true })
    }
    catch
    {
        res.status(500).json({ success: false, error: error.message })
    }
    
})

app.listen(port, () =>
{
    console.log(`Server is running on http://localhost:${port}`);
});






