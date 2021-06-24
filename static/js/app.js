//Plotly HW - Diana Kennen

//Bar Chart Section

d3.json("../../data/samples.json").then(function(data){console.log(data)});

//Populating individual ids to dropdown menu
let dropdown = document.getElementById('selDataset');
dropdown.length = 0;

function fillMenu() {
    for (i=0; i < data.length; i++) {
        option = document.createElement('option');
        option.text = data[i].names;
        option.value = data[i].names;
        dropdown.addEventListener(option);}}


fillMenu(data.names)



//Event handler to determine individual selection
d3.selectAll("#selDataset").on("change", getData);

function getData() {
    var dropdownMenu = d3.select("#selDataset");
    //Assign the value of the dropdown menu option to a variable
    var individual = dropdownMenu.property("value");

}

//
function buildPlot(individual) {
    d3.json("../../data/samples.json").then(function(data) {

        var otu_ids = data.samples.otu_ids;
        var sample_values = data.samples.sample_values;
        var otu_labels = data.samples.otu_labels;

        //var trace1 = 