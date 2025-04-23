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
        const testRow1 = document.getElementById("row1");
        testRow1.textContent = students[0].NAME;
    }
    catch (error)
    {
        console.error('There was a problem fetching the data:', error);
    }
})