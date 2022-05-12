/*===========================*/
/*====== EntriesList ========*/
/*===========================*/

class EntriesList {
    constructor() {
        this.Entries = [];
    }
    
    addEntry() {
        fetch('http://localhost/api/results')
            .then(response => response.json())
            .then(data => {
                
                for(let driver of data.data) {
                    // Create newEntryElement
                    if(driver.temporary_round_column_for_testing == 1) {
                        let newEntryElement = document.createElement("div");
                        newEntryElement.className = CLASS_EL_ROW;

                        // Add name to newEntryElement
                        let newEntryElementName = document.createElement("div");
                        newEntryElementName.innerText = "Driver: " + driver.racer;
                        newEntryElementName.className = CLASS_EL_NAME + " " + CLASS_VERDANA_GRAY;
                        newEntryElement.appendChild(newEntryElementName);

                        // Add newEntryElement to EntryListElement
                        _E_List_Element.appendChild(newEntryElement);
                    }
                    this.Entries.push(driver);
                }
            });
    }

}
