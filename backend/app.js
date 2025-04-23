const oracleDatabase = require('oracledb');
const config = require ('./config');

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
getDataFromDatabase();