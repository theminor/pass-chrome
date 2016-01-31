$(document).ready(function() {


  $("#fileBtn").bind("click", function() {
    $(this).text("Clicked!!");
    chrome.fileSystem.chooseEntry({type: 'openFile'}, function(readOnlyEntry) {
      readOnlyEntry.file(function(file) {
        var reader = new FileReader();
        reader.onerror = function(err) {
          $("#tstPar").text(err);
        };
        reader.onloadend = function(e) {
          $("#tstPar").text(e.target.result);
        };
        reader.readAsText(file);
      });
    });
  });


  $("#dirBtn").bind("click", function() {
    $(this).text("Clicked!!");
    chrome.fileSystem.chooseEntry({type: 'openDirectory'}, function(readOnlyEntry) {
      function toArray(list) {
        return Array.prototype.slice.call(list || [], 0);
      }

      var dirReader = readOnlyEntry.createReader();
      var entries = [];
      // Keep calling readEntries() until no more results are returned.
      var readEntries = function() {
         dirReader.readEntries (function(results) {
          if (!results.length) {
            var outTxt = "entries: ";
            entries.sort().forEach(function(entry, i) {
              outTxt += entry.name + ", ";
            });
            $("#tstPar").text(outTxt);
          } else {
            entries = entries.concat(toArray(results));
            readEntries();
          }
        }, function(err) { $("#tstPar").text(err);  });
      };
      readEntries();
    });
  });


});
