let tablesData;
let student;
let computer;
let loan;
let loanDetail;

document.addEventListener('DOMContentLoaded', async function()
{
    tablesData = 
    {
        student: await fetchData("student"),
        computer: await fetchData("computer"),
        loan: await fetchData("loan"),
        loanDetail: await fetchData("loan_detail")
    };
    

    console.log
    (
        '%c'+`[--- Tables ---]:`, 'font-size: 14px; font-weight: bold; color: blue;', tablesData
    );

    // Add loans to students
    student.forEach(parsedStudent => 
    {
        const studentLoan = loan.filter(parsedLoan => parsedLoan.student_id === student.student_id)
        console.log(studentLoan);


    });

    // const computerLoan = loan.filter(parsedLoan => parsedLoan.student_id === student.student_id)
    // const studentsWithLoan = student.map(parsedStudent =>
    //     {
    //     return {
    //         ...student,
    //         loan: loans.filter(parsedLoan => parsedLoan.student_id === parsedStudent.student_id)
    //     };
    // });


    addToTab('student')
    addToTab('computer')
    // joinForeignKeys(tablesData, 'student');



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
    const tableContainer = document.getElementById(`${tableName}_container`);
    const data = tablesData[tableName];
    data.forEach(tableName => 
    {
        const objectName = Object.values(tableName)[1];
        const objectEntries = Object.entries(tableName).slice(2);
        const newTable = document.createElement("table");
        
        tableContainer.appendChild(newTable);
        newTable.className = "tables"; 
        newTable.id = objectName;
        newTable.innerHTML = `<h3>${objectName}</h3>`;
        newTable.onclick = () => toggleDetails(newTable.id);
        objectEntries.forEach(([key, val]) => 
        {
            const newRow = document.createElement("tr");
            const newColumnKey = document.createElement("td");
            const newColumnValue = document.createElement("td");
            newTable.appendChild(newRow);
            newRow.className = "tableRows";
            newRow.id = key;
            
            newRow.appendChild(newColumnKey);
            newColumnKey.className = "tableKeyCell";
            newColumnKey.textContent = key;

            newRow.appendChild(newColumnValue);
            newColumnValue.className = "tableValueCell";
            newColumnValue.textContent = val;

        });
       
    });
    
}


async function toggleDetails(tableId)
{
    const table = document.getElementById(tableId);
    const tableRows = Array.from(table.children).filter(child => child.tagName !== 'H3');
    tableRows.forEach(tableRow => 
    {
        if (tableRow.style.display === 'inherit')
        {
            tableRow.style.display = 'none';
        }
        else
        {
            tableRow.style.display = 'inherit';
        }
    });
};

// Change displayed data
async function tab(tableToDisplay)
{
    // Hide all containers.
    document.querySelectorAll('.table_container').forEach(container => {
        container.style.display = 'none';
    });
    const tableContainer = document.getElementById(`${tableToDisplay}_container`);
    tableContainer.style.display = 'flex';

    
}

// /**
//  * @param {var} fullData - All the data that must be checked for foreign keys to join unto the object.
//  * @param {var} tableName - The table that the foreign keys will be joined unto.
//  */

// async function joinForeignKeys(fullData, tableName)
// {
    
//     const table = fullData[tableName];
//     console.log(table);
//     const dataArray = Object.entries(fullData) // Take the fullData object and put its contents into an array.
//         .filter(([key]) => key !== tableName) // Removes the table being joined onto from the tables that are joining.
//     console.log(dataArray);
    
    
//     table.forEach(parsedPrimary =>
//     {
//         const theKey = `${Object.keys(parsedPrimary)[0]}`;
//         console.log(theKey);
//         dataArray.forEach(([key, value]) => 
//             {
//                 console.log(key, value);
//             });
//         // dataArray.forEach(parsedForeign =>
//         // {
            
//         // });

//     });
//     const fullDataFlat = Object.values(fullData).flat()
//     const relatedItems = fullDataFlat.filter
//     (
//         item => item[theKey] === Object[theKey]
//     );
//     relatedItems.forEach(item =>
//     {
//         const nameOfTable = item.constructor.name.toUpperCase();
//         const foreignKeyValue = item[`${nameOfTable}_ID`]
//         Object[nameOfTable] = foreignKeyValue;
//     });

//     // console.log(tableName);
//     // return tableName;
// };