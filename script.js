/* #TODO: 
    - Implement "Procesar resultados" button for form (no reference to the algorithm used yet).
    - Better CSS styling, please.
*/ 
const data = [];
const form = document.forms.namedItem('energia-form');

function validateForm(formElements) {
    // Validate that each element campus is filled with something.
    for (const iterator of formElements) {
        // Skip checking value of button, it's always empty
        if (iterator.id === 'annoyingButton') continue;
        if (iterator.value === '') return false;
    }
    return true;
}

function submitAndSave(formElements) {
    let dataObject = {};
    // Submit all the values of each element to global object data.
    // Transform formElements into an array to use array methods.
    Array.from(formElements).forEach(element => {
        if (element.id === 'annoyingButton') return;
        dataObject[element.id] = element.value;
    });
    data.push(dataObject);
    // Return data object to use as reference in addContentRow
    return dataObject;
}

function addContentRow(tableID, contentObject) {
    const table = document.getElementById(tableID);

    // Inserting table row
    const row = table.insertRow();

    for (const iterator in contentObject) {
        const cell = row.insertCell();
        cell.innerHTML = contentObject[iterator];
    }

}

form.addEventListener('submit', (event, one) => {
    // Stop submission
    event.preventDefault();
    // Validate form and submitsave if true
    if (validateForm(form.elements)){
        // Keep reference to the object
        const infoTableObject = submitAndSave(form.elements);
        addContentRow('info-table', infoTableObject);
        return;
    }
    alert('Campos invalidos');
});