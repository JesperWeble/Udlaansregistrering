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

    // Mapping and Joining
    for (let parsedStudentKey in tablesData.student)
    {
        const parsedStudent = tablesData.student[parsedStudentKey];
        console.log(parsedStudent)
        const studentLoan = Object.values(tablesData.loan).find(
            studentLoan => studentLoan.STUDENT_ID === parsedStudent.STUDENT_ID);
        if (!studentLoan) continue;
        console.log(studentLoan)

        const detailsOfLoan = Object.values(tablesData.loanDetail).find(
            detailsOfLoan => detailsOfLoan.LOAN_ID === studentLoan.LOAN_ID);
        if (!detailsOfLoan) continue;
        console.log(detailsOfLoan)
        const loanedComputer = Object.values(tablesData.computer).find(
            loanedComputer => loanedComputer.COMPUTER_ID === detailsOfLoan.COMPUTER_ID);
        if (!loanedComputer) continue;
        console.log(loanedComputer)
        parsedStudent.COMPUTER = loanedComputer;
    };
    
    // joinForeignKeys(tablesData.loanDetail, tablesData.computer, 'foreignKey');
    // joinForeignKeys(tablesData.loanDetail, tablesData.loan, 'foreignKey');
    // joinForeignKeys(tablesData.loan, tablesData.student, 'foreignKey');

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

/**
 * @param {var} foreigner - The object that will be added to the primer.
 * @param {var} primer - The object that the foreigner will be added to.
 * @param {var} newPropName - The name of the new property that will be added to the primer.
 */
async function joinForeignKeys(foreigner, primer, newPropName)
{
    console.log(`Foreigner`);
    console.log(foreigner);
    for (let parsedPrimerKey in foreigner)
    {
        const parsedPrimer = primer[parsedPrimerKey];
        const theKey = Object.keys(parsedPrimer)[0];
        const parsedForeigner = Object.values(foreigner).filter(parsedForeigner => 
        {
            return parsedForeigner[theKey] === parsedPrimer[theKey];

        });
        console.log('Parsed Foreigner');
        console.log(parsedForeigner);
        if (parsedForeigner.length > 0)
        {
            parsedPrimer[newPropName] = Object.keys(parsedForeigner)[0];
            console.log('Testing new prop name.');
            console.log(parsedPrimer[newPropName]);
            

        };
    };
    console.log(`Primer`);
    console.log(primer);

}