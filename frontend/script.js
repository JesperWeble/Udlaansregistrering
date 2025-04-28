let tablesData;

document.addEventListener('DOMContentLoaded', async function()
{
    tablesData = 
    {
        student: await fetchData("student"),
        computer: await fetchData("computer")
    };

    console.log
        (
            '%c'+`[--- Tables ---]:`, 'font-size: 14px; font-weight: bold; color: blue;', tablesData
        );
    addToTab('student')
    addToTab('computer')



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
            '%c'+`[--- ${tableName.toUpperCase()} ---]:`, 'font-size: 14px; font-weight: bold; color: blue;', data
        );
        return data;

    }
    catch (error)
    {
        console.error('There was a problem fetching the data:', error);
    }
}

// Create html elements for the table to display the data.
async function addToTab(tableName)
{
    const rowContainer = document.getElementById(`${tableName}_container`);
    const data = tablesData[tableName];
    console.log(data)
    var i = 0;
    data.forEach(tableName => {
        i++
        var newRow = document.createElement("li");
        var newRowDetails = document.createElement("div");
        // newRow.className = "rows"; newRow.id = "row" + i;
        newRow.className = "rows"; newRow.id = Object.values(tableName)[1];
        // newRow.onclick = "toggleDetails";
        newRow.textContent = Object.values(tableName)[1];
        rowContainer.appendChild(newRow);
        newRowDetails.className ="rowDetails";
        newRowDetails.textContent = "Test";
        newRow.appendChild(newRowDetails);

    });
}

// Change displayed data
async function tab(tableToDisplay)
{
    // Hide all containers.
    document.querySelectorAll('.row_container').forEach(container => {
        container.style.display = 'none';
    });
    const tableContainer = document.getElementById(`${tableToDisplay}_container`);
    tableContainer.style.display = 'flex';
    console.log(tableToDisplay + " was clicked");

    
}