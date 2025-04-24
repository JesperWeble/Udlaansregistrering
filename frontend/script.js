document.addEventListener('DOMContentLoaded', async function()
{
    try
    {
        const response = await fetch ('http://localhost:3000/students');
        if (!response.ok)
        {
            throw new Error('Network response was not ok');
        }
        const students = await response.json();
        console.log(students);


        
        const rowContainer = document.getElementById("row_container");
        var i = 0;
        students.forEach(student => {
            i++
            var newRow = document.createElement("div"); 
            newRow.className = "rows"; newRow.id = "row" + i;
            rowContainer.appendChild(newRow);
            newRow.textContent = student.NAVN;
        });


    }
    catch (error)
    {
        console.error('There was a problem fetching the data:', error);
    }


})