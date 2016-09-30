var earthquakeData;

// fetches JSON file with hazard data from the Relief Web server 
function loadJSONDoc() {
    "use strict";
    var selectControl = document.getElementById("mySelect");
    var s = selectControl.selectedIndex;
    var items;
    var container = document.getElementById("hazardContent");

    //remove all existing elements 
    container.innerHTML = "";

    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://api.reliefweb.int/v1/disasters?appname=apidoc&filter[field]=country&filter[value]=India&query[value]=" + selectControl.options[s].text + "&sort[]=date:asc&fields[include][]=url_alias&profile=minimal&limit=20", true);
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            //Perform action when document is read
            earthquakeData = JSON.parse(this.responseText);
            items = earthquakeData.count;
            for (var i = 0; i < 10; i++) {
                if (i <= items - 1) {

                    var hazardItem = document.createElement("DIV");

                    var hazardItemTitle = document.createElement("DIV");

                    var hazardItemBody = document.createElement("DIV");
                    hazardItem.classList.add('panel');
                    hazardItem.classList.add('panel-primary');
                    hazardItem.Id = "hazardItem";

                    hazardItemTitle.classList.add('panel-heading');
                    hazardItemBody.classList.add('panel-body');

                    hazardItemTitle.innerHTML = "<b>Title: </b>" + earthquakeData.data[i].fields.name + "<br>";

                    hazardItemBody.innerHTML = "<b>Article: </b>" + "<a href=\"" + earthquakeData.data[i].fields.url_alias + "\">" + earthquakeData.data[i].fields.url_alias + "</a>" + "<br>";

                    document.getElementById("hazardContent").appendChild(hazardItem);

                    hazardItem.appendChild(hazardItemTitle);
                    hazardItem.appendChild(hazardItemBody);

                }

            }
        }
    };
}