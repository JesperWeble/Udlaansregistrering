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

async function startUp()
{
    await oracleDatabase.createPool(config.dbConfig);
}

startUp();

async function getDataFromDatabase(table)
{
    let connection;
    try
    {
        connection = await oracleDatabase.getConnection(); // Connect to the database
        console.log('Success! (get ' + table + ')')

        const result = await connection.execute // Get all data from the 'table'
        (
            `SELECT * FROM ${table}`,
            [],
            {outFormat: oracleDatabase.OUT_FORMAT_OBJECT} // Format data as a JS object
        );
        // console.log(`${table} are: ${result.rows}`)
        return resultData = result.rows;


    } 
    catch (err) 
    {
        // console.error('Database error:', err);
    }
    finally 
    {
        if (connection) 
        {
          await connection.close(); // close the connection
        }
    }
}

async function postDataToDatabase(STUDENT_ID, COMPUTER_ID)
{
    let connection;
    try
    {
        connection = await oracleDatabase.getConnection();
        console.log(`\nSuccess! (post) Student: ${STUDENT_ID}, Computer ${COMPUTER_ID}\n`)
        const result = await connection.execute
        (
            `INSERT INTO LOAN (STUDENT_ID, COMPUTER_ID) VALUES (${STUDENT_ID}, ${COMPUTER_ID})`, // bind variables like :VariableHere
            [], // put the bound js variables in this
            { autoCommit: true }
        );
    }
    catch {}
    finally 
    {
        if (connection) 
        {
          await connection.close(); // close the connection
        }
    }
}

// Send data to Frontend, allows "fetch()" to get data from the backend.
app.get('/:table', async (req, res) =>
{
    const tableName = req.params.table.toUpperCase();
    // console.log("App ", tableName)
    try
    {
        const data = await getDataFromDatabase(tableName);
        res.json(data);
        // console.log(data)
    }
    catch (err)
    {
        res.status(500).send(`Error fetching ${tableName} data.`);
    }
});

app.post('/POST', async (req, res) => 
{
    const { STUDENT_ID, COMPUTER_ID } = req.body
    try
    {
        await postDataToDatabase(STUDENT_ID, COMPUTER_ID);
        res.status(200).send('Insert successful');
    }
    catch 
    {
        console.error(err);
        res.status(500).send('Error inserting data');
    }

});

app.listen(port, () =>
{
    console.log(`Server is running on http://localhost:${port}`);
});


process.on('SIGINT', async () =>
{
    await oracleDatabase.getPool().close(0);
    process.exit(0);
})






