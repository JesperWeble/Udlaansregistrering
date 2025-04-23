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
    }
    catch (error)
    {
        console.error('There was a problem fetching the data:', error);
    }
})