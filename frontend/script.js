document.addEventListener('DOMContentLoaded', async function()
{
    const students = await fetchData("student");
    const computers = await fetchData("computer");
    const rowContainer = document.getElementById("row_container");
    var i = 0;
    students.forEach(student => {
        i++
        var newRow = document.createElement("div"); 
        newRow.className = "rows"; newRow.id = "row" + i;
        rowContainer.appendChild(newRow);
        newRow.textContent = student.NAVN;
    });


})

async function fetchData(tableName)
{
    try
    {
        const response = await fetch (`http://localhost:3000/${tableName}`);
        if (!response.ok)
        {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log
        (
            '%c'+`[--- ${tableName.toUpperCase()} ---]: `, 'font-size: 14px; font-weight: bold; color: blue;', data
        );
        return data;

    }
    catch (error)
    {
        console.error('There was a problem fetching the data:', error);
    }
}