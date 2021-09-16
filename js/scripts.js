var rowId = 0;
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB || window.shimIndexedDB;
const dbName = "petDB";

var request = indexedDB.open(dbName, 2);

request.onerror = function(event) {
  console.log("Database error");
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;
  var objectStore = db.createObjectStore("pets", { keyPath: "id" });
  objectStore.createIndex("petNameInput", "petNameInput", { unique: false });
};

var request = indexedDB.open(dbName, 2);
request.onsuccess = function(event) {
	var db = event.target.result;
	var tx = db.transaction("pets");
	var objectStore = tx.objectStore("pets");
	objectStore.getAll().onsuccess = function(event) {
	  console.log(event.target.result);
	  rowId = event.target.result.length;
	};
};

document.getElementById("petsave-button").onclick = function updateTable(){
    rowId += 1
    let petData = {
        dateRegister: document.getElementById("date-input").value,
        ownerName: document.getElementById("owner-input").value,
        petName: document.getElementById("petname-input").value,
        petMicrochip: document.getElementById("petmicrochip-input").value,
        petSpecies: document.getElementById("petspecies-input").value,
        petSize: document.getElementById("petsize-input").value,
        petSex: document.getElementById("petsex-input").value,
        petDangerous: document.getElementById("petdangerous-input").value,
        esterilizacion: document.getElementById("esterilizacion-input").value,
        petLocation: document.getElementById("petlocation-input").value
    }

    var request = indexedDB.open(dbName, 2);
	request.onsuccess = function(event) {
	   var db = event.target.result;
	   var customerObjectStore = db.transaction("pets", "readwrite").objectStore("pets");
	   info["id"] = rowId;
	   customerObjectStore.add(info);
	 };

    let tr = document.createElement("tr");
    tr.setAttribute("id","row"+rowId);

    let tdId = document.createElement("td");
    tdId.innerHTML = rowId;
    tr.appendChild(tdId);
    let num = 0
    let btnModificar = document.createElement("input");
    Object.keys(petData).forEach((key) => {
        num += 1
        let td = document.createElement("td");
        td.innerHTML = petData[key]
        tr.appendChild(td);
        
    });
    let tdActions = document.createElement("td");

    btnModificar.setAttribute("id", "update-" + rowId);
    btnModificar.setAttribute("type", "button");
    btnModificar.setAttribute("class", "btn btn-danger");
    btnModificar.value = "Modificar";
    
    /*btnModificar.onclick = function () {
        window.open("ListaMastcotas.html", "Ciudadanos de 4 patas", "width=800,height=600,scrollbars=NO")
        var mascotas = [];
        var table = document.getElementById("body-table");

        while (table.firstChild) {

            var aux = table.removeChild(table.firstChild);
            var mascota = {
        
                dateInput: aux.cells[0].innerText="",
                ownerInput: aux.cells[1].innerText = "",
                petNameInput: aux.cells[2].innerText = "",
                petMicrochip: aux.cells[3].innerText = "",
                petSpeciesInput: aux.cells[4].innerText = "",
                petSexInput: aux.cells[5].innerText = "",
                petSizeInput: aux.cells[6].innerText = "",
                petDangerourInput: aux.cells[7].innerText = "",
                petSterilization: aux.cells[8].innerText = "",
                petLocalidad: aux.cells[9].innerText = "",
            }
            mascotas.push(mascota)
        }
        table.appendChild(titulo);
    }*/
    Object.keys(petData).forEach((key) => {
        let pet = "Datos: " + petData[key]
        document.cookie = pet
        console.log(document.cookie.split(";"))
    })
    tdActions.appendChild(btnModificar);
    tr.appendChild(tdActions);

    document.getElementById("body-table").appendChild(tr);
    

}