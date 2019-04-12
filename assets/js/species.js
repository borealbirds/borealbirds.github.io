$(document).ready(function() {
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
  
    // this deals with species selection
    $('#spp-select').pressEnter(function(){
      var spp = $("#spp-select").val();
      var OK = checkSpecies(species, spp);
      if (spp != "" && OK == true) {
        var id = link[species.indexOf(spp)];
        console.log("Species selected: " + id);
//          window.location.href=lnk;
        $.getJSON('https://borealbirds.github.io/api/v4/species/' + id + "/", function(data){
          console.log(data);
          $("#results").html(`
          <h2 class="title" id="intro">Title</h2>` + data.data.species.common[0] +
          `<p>
            Results come here
          <p>
          `);

        });

      }
    });

  }); // close json
}); // close window
