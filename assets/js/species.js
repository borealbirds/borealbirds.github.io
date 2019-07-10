$(document).ready(function() {

  // hide results
  document.getElementById("results").style.display = "none";

  $.getJSON('https://borealbirds.github.io/api/v4/species/',function(data){
    //console.log(data);
    var species = [];
    var link = [];
    for (var i in data.data) {
      species.push(data.data[i].combo);
      link.push(data.data[i].id);
    }
    //console.log(species);
    //console.log(link);

    // typeahead
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substringRegex;
        matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            matches.push(str);
          }
        });
        cb(matches);
      };
    };
  
    $('#spp-search .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 0
    }, {
      name: 'species',
      source: substringMatcher(species),
      limit: 1000
    });
  
    $.fn.pressEnter = function(fn) {
      return this.each(function() {
        $(this).bind('enterPress', fn);
        $(this).keyup(function(e){
          if(e.keyCode == 13){
            $(this).trigger("enterPress");
          }
        })
      });
    };
  
    function checkSpecies(arr, val) {
       return arr.some(function(arrVal) {
         return val === arrVal;
      });
    }
  
    // update function
    function updateFig(data, bcr) {
      if (bcr == 0) {
        var dbcr = data.data.habitat.dtotal.Dmean;
        var bcrName = "Canada";
      } else {
        var dbcr = data.data.habitat.dbynalc[bcr-1];
        var bcrNum = bcr + 3;
        var bcrName = "BCR " + bcrNum;
      }
      var barcolor = ['#3ad1a3',"#177c30"]
      var dataNalcPlot = [
        {
          x: data.data.nalc,
          y: dbcr,
          type: 'bar',
          marker: {
            color: [barcolor[0],barcolor[0],barcolor[0],barcolor[0],barcolor[0],
                    barcolor[0],barcolor[0],barcolor[0],barcolor[0],barcolor[0]]
          }
        }
      ];
      var layoutNalcPlot = {
          title: 'Population density, ' + bcrName,
          yaxis: {
            title: {
              text: 'Density (indsividuals/ha)'
            }
          }
        };
      var myPlot = document.getElementById('nalcplot');
      Plotly.newPlot('nalcplot', dataNalcPlot, layoutNalcPlot, {
          //displayModeBar: false,
          displaylogo: false,
          responsive: true,
          editable: false
      }
      );
      myPlot.on('plotly_hover', function(data){
        var pn='',
            tn='',
            colors=[];
        for(var i=0; i < data.points.length; i++){
          pn = data.points[i].pointNumber;
          tn = data.points[i].curveNumber;
          colors = data.points[i].data.marker.color;
        };
        colors[pn] = barcolor[1];

        var update = {'marker':{color: colors, size:16}};
        Plotly.restyle('nalcplot', update, [tn]);
      });

      myPlot.on('plotly_unhover', function(data){
        var pn='',
            tn='',
            colors=[];
        for(var i=0; i < data.points.length; i++){
          pn = data.points[i].pointNumber;
          tn = data.points[i].curveNumber;
          colors = data.points[i].data.marker.color;
        };
        colors[pn] = barcolor[0];

        var update = {'marker':{color: colors, size:16}};
        Plotly.restyle('nalcplot', update, [tn]);
      });

    }
    function updateSpecies(data){
      
      //console.log(data);
      var id = data.data.species.id;

      // update headings
      $("#speciesName").text(data.data.species.combo);
      $("#speciesFam").text(data.data.species.family);
      $("#speciesPop").text(Math.round(10*data.data.popsize.ntotal[2])/10 + "M inds.");

      // update map links
      $("#modalImg1a").attr("src", "http://borealbirds.github.io/api/v4/species/" + id + "/map.png");
      $("#modalImg1b").attr("src", "http://borealbirds.github.io/api/v4/species/" + id + "/map.png");
      $("#modalImg2a").attr("src", "http://borealbirds.github.io/api/v4/species/" + id + "/mapwdet.png");
      $("#modalImg2b").attr("src", "http://borealbirds.github.io/api/v4/species/" + id + "/mapwdet.png");
      $("#modalImg3a").attr("src", "http://borealbirds.github.io/api/v2/density/" + id + "_Density_April30_2012.jpg");
      $("#modalImg3b").attr("src", "http://borealbirds.github.io/api/v2/density/" + id + "_Density_April30_2012.jpg");
      $("#modalImg4a").attr("src", "http://borealbirds.github.io/api/v2/maxent/pts/" + id + ".jpg");
      $("#modalImg4b").attr("src", "http://borealbirds.github.io/api/v2/maxent/pts/" + id + ".jpg");
      $("#modalImg5a").attr("src", "http://borealbirds.github.io/api/v4/species/" + id + "/dbynalc.png");
      $("#modalImg5b").attr("src", "http://borealbirds.github.io/api/v4/species/" + id + "/dbynalc.png");

      // population size tabe
      Table.destroy();
      Table = $('#popsize').DataTable({
        data: data.data.popsize.nbybcr,
        columns: [
            { title: "BCR" },
            { title: "Area (x10<sup>6</sup> km<sup>2</sup>)" },
            { title: "Pop. Size (x10<sup>6</sup>)" },
            { title: "Pop. Density (/ha)" }
        ],
        searching: false, 
        paging: false, 
        info: false
      });

      // nalc plot and bcr selection
      // 0 is all, rest is 1:11 as in 4:14
      var bcr = 0;
      updateFig(data, 0);
      $("#AllBCR").click(function(){
        console.log("All BCRs selected for " + id)
        removeHighlight();
        $("#bcr4").addClass("is-primary");
        updateFig(data, 0);
      }); 
      $("#bcr4").click(function(){
        console.log("BCR 4 selected for " + id)
        removeHighlight();
        $("#bcr4").addClass("is-primary");
        updateFig(data, 1);
      }); 
      $("#bcr5").click(function(){
        console.log("BCR 5 selected for " + id)
        removeHighlight();
        $("#bcr5").addClass("is-primary");
        updateFig(data, 2);
      }); 
      $("#bcr6").click(function(){
        console.log("BCR 6 selected for " + id)
        removeHighlight();
        $("#bcr6").addClass("is-primary");
        updateFig(data, 3);
      }); 
      $("#bcr7").click(function(){
        console.log("BCR 7 selected for " + id)
        removeHighlight();
        $("#bcr7").addClass("is-primary");
        updateFig(data, 4);
      }); 
      $("#bcr8").click(function(){
        console.log("BCR 8 selected for " + id)
        removeHighlight();
        $("#bcr8").addClass("is-primary");
        updateFig(data, 5);
      }); 
      $("#bcr9").click(function(){
        console.log("BCR 9 selected for " + id)
        removeHighlight();
        $("#bcr9").addClass("is-primary");
        updateFig(data, 6);
      }); 
      $("#bcr10").click(function(){
        console.log("BCR 10 selected for " + id)
        removeHighlight();
        $("#bcr10").addClass("is-primary");
        updateFig(data, 7);
      }); 
      $("#bcr11").click(function(){
        console.log("BCR 11 selected for " + id)
        removeHighlight();
        $("#bcr11").addClass("is-primary");
        updateFig(data, 8);
      }); 
      $("#bcr12").click(function(){
        console.log("BCR 12 selected for " + id)
        removeHighlight();
        $("#bcr12").addClass("is-primary");
        updateFig(data, 9);
      }); 
      $("#bcr13").click(function(){
        console.log("BCR 13 selected for " + id)
        removeHighlight();
        $("#bcr13").addClass("is-primary");
        updateFig(data, 10);
      }); 
      $("#bcr14").click(function(){
        console.log("BCR 14 selected for " + id)
        removeHighlight();
        $("#bcr14").addClass("is-primary");
        updateFig(data, 11);
      }); 

    }

    // removes class from buttons
    function removeHighlight() {
      $("#AllBCR").removeClass("is-primary");
      $("#bcr4").removeClass("is-primary");
      $("#bcr5").removeClass("is-primary");
      $("#bcr6").removeClass("is-primary");
      $("#bcr7").removeClass("is-primary");
      $("#bcr8").removeClass("is-primary");
      $("#bcr9").removeClass("is-primary");
      $("#bcr10").removeClass("is-primary");
      $("#bcr11").removeClass("is-primary");
      $("#bcr12").removeClass("is-primary");
      $("#bcr13").removeClass("is-primary");
      $("#bcr14").removeClass("is-primary");
    }

    // initialize table (needs to be destroyed before changing data)
    Table = $('#popsize').DataTable({
      data: [[1,2,3,4],[5,6,7,8]],
      columns: [
        { title: "BCR" },
        { title: "Area (x10<sup>6</sup> km<sup>2</sup>)" },
        { title: "Pop. Size (x10<sup>6</sup>)" },
        { title: "Pop. Density (/ha)" }
      ],
      searching: false, 
      paging: false, 
      info: false
    });

    // this deals with species selection from autocomplete
    $('#spp-select').pressEnter(function(){
      var spp = $("#spp-select").val();
      var OK = checkSpecies(species, spp);
      if (spp != "" && OK == true) {
        var id = link[species.indexOf(spp)];
        console.log("Species selected: " + id);

        // show results
        document.getElementById("results").style.display = "block";
        var sppBack = null;
        var sppNext = null;
        $.getJSON('https://borealbirds.github.io/api/v4/species/' + id + "/", function(data){
          updateSpecies(data);
        });

      }
    });


  }); // close json
}); // close window
