//Plotly HW - Diana Kennen

d3.json("../../data/samples.json").then(function(data){
    var ids = data.names;
    var metadata = data.metadata;
    var samples = data.samples;
    console.log(metadata)
    
    //Populating individual ids to dropdown menu
    d3.select('#selDataset').selectAll("option")
        .data(ids)
        .enter()
        .append('option')
        .text(function(d) {return d;});

    function filterbyId(data) {
        var selId = d3.select('#selDataset').node().value;
        console.log(selId)
        return data.id == selId;       
    };

    var filteredSamples = samples.filter(filterbyId);
    console.log(filteredSamples);
    var sel_otu_ids = filteredSamples.map(otus => otus.otu_ids);
    var sel_otu_ids_10 = sel_otu_ids[0].slice(0,10);
    var sel_otu_ids_10t = sel_otu_ids_10.map(id => `OTU ${id}`)
    console.log(sel_otu_ids_10t);
    var sel_sample_values = filteredSamples.map(otus => otus.sample_values);
    var sel_sample_values_10 = sel_sample_values[0].slice(0,10);   
    console.log(sel_sample_values_10);
    var sel_otu_labels = filteredSamples.map(otus => otus.otu_labels);
    var sel_otu_labels_10 = sel_otu_labels[0].slice(0,10);
    console.log(sel_otu_labels_10);
    var demo_info = metadata.filter(filterbyId);
    console.log(demo_info);
 
    //Initializing Charts
    //Bar Chart
    function initbar() {
        var trace1 = {
            y: sel_otu_ids_10t,
            x: sel_sample_values_10,
            text: sel_otu_labels_10,
            type: "bar",
            orientation: "h",
            width: 0.7
        }
        var data1 = [trace1];
        var layout = {
            title: "Top 10 OTUs in the Selected Individual",
            yaxis: {title: "OTU Ids"},
            xaxis: {title: "Sample Values"},
            width: 500,
            height: 500
        }
        Plotly.newPlot("bar", data1, layout)
    }

    initbar();

    //Initial Bubble Chart
    function initbubble() {
        console.log(sel_otu_ids);
        console.log(sel_sample_values);
        console.log(sel_otu_labels);
        var trace2 = {
            x: sel_otu_ids[0],
            y: sel_sample_values[0],
            text: sel_otu_labels[0],
            mode: 'markers',
            marker: {
                size: sel_sample_values[0],
                color: sel_otu_ids[0]
            }
        };

        var data2 = [trace2];
        
        var layout2 = {
            title: "Bacteria Cultures Per Sample",
            xaxis: {title: "OTU Ids"},
            yaxis: {title: "Sample Values"},
            width: 1000,
            height: 600
        };

        Plotly.newPlot("bubble", data2, layout2)
    };

    initbubble();

    //Initializing Demographic Information
    function demotable(data) {
        var demoT = d3.select("tbody")
            .selectAll("tr")
            .data(data)
            .enter().append("tr");
  
       var td = demoT.selectAll("td")
            .data(function(d, i) { return Object.values(d); })
            .enter().append("td")
            .text(function(d) { return d; });           
    };
               
    demotable(demo_info);

    //Updating Graphs Upon New Selection
    d3.selectAll("#selDataset").on("change", updatePlotly);

    function updatePlotly() {
        var filteredSamples = samples.filter(filterbyId);
        console.log(filteredSamples)
        var sel_otu_ids = filteredSamples.map(otus => otus.otu_ids);
        var sel_otu_ids_10 = sel_otu_ids[0].slice(0,10);
        var sel_otu_ids_10t = sel_otu_ids_10.map(id => `OTU ${id}`)
        var sel_sample_values = filteredSamples.map(otus => otus.sample_values);
        var sel_sample_values_10 = sel_sample_values[0].slice(0,10);   
        var sel_otu_labels = filteredSamples.map(otus => otus.otu_labels);
        var sel_otu_labels_10 = sel_otu_labels[0].slice(0,10);
    
        //Updating Bar Chart
        var x = [];
        var y = [];
        var text = [];

        y = sel_otu_ids_10t.map(x => x);
        x = sel_sample_values_10.map(x => x);
        text = sel_otu_labels_10.map(x => x);
        console.log(y)
        console.log(x)
        console.log(text)
                   
        Plotly.restyle("bar", "x", [x]);
        Plotly.restyle("bar", "y", [y]);
        Plotly.restyle("bar", "text", [text]);
        
        //Updating Bubble Graph
        var x2 = [];
        var y2 = [];
        var text2 = [];
        var marker2 = {};

        x2 = sel_otu_ids[0].map(x => x);
        y2 = sel_sample_values[0].map(x => x);
        text2 = sel_otu_labels[0].map(x => x);
        marker2 = {size: sel_sample_values[0], color: sel_otu_ids[0]}

        Plotly.restyle("bubble", "x", [x2]);
        Plotly.restyle("bubble", "y", [y2]);
        Plotly.restyle("bubble", "text", [text2]);
        Plotly.restyle("bubble", "marker", [marker2])
    }

    initbar();
    initbubble();
});