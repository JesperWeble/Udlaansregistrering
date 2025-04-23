const express = require('express') // Express allows for sending data to frontend
const oracleDatabase = require('oracledb');
const config = require ('./config'); // Where passwords and such for the database is written.
const app = express(); // creates an app that can be interacted with for Express.

const port = 3000;

async function getDataFromDatabase()
{
    let connection;
    try
    {
         connection = await oracleDatabase.getConnection(config.dbConfig);
         console.log('Success!')

         const result = await connection.execute('SELECT * FROM STUDENT');
         console.log('Students are: ', result.rows)

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
// Send data to Frontend
app.get('/students', async (request, response) =>
{
    try
    {
        const students = await getDataFromDatabase();
        response.json(students);
    }
    catch (err)
    {
        response.status(500).send('Error fetching student data.');
    }
})

app.listen(port, () =>
{
    console.log(`Server is running on http://localhost:${port}`);
});