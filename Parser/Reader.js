/**This module reads the input file uploaded
 * parses it to produce JSON
 * gives control to the embedded Elm module after initialising its port with the JSON string
**/

var Reader = {

  loadFile : function () {
       	
    if (typeof window.FileReader !== 'function') {
      console.log("File API is not supported in this browser.");
      return;
    }
    
    var sourceFile = document.getElementById('fileInput');
    if (!sourceFile) {
      console.log("fileInput element missing.");
    }
    else if (!sourceFile.files) {
            console.log( "'File' property of File Inputs not supported by this browser");
    }
    else if (!sourceFile.files[0]) {
      showError("Please select a file.");
    }
    else {
      var file = sourceFile.files[0];
      var fr = new FileReader();
      fr.onload = function(e) {
	          var rawtxt = fr.result;
        // Parse raw text to produce JSON
            var parsedJSON = SlateParser.parse(rawtxt);
            var expandedJSON = SlateConverter(parsedJSON);

						var jsonStr = JSON.stringify(expandedJSON);
						console.log(jsonStr);
            var instructions = document.getElementById('instructions');
            instructions.style.display = 'none';
	      // Embedded Elm Module
	      	 Elm.fullscreen(Elm.Slate,{portParsedStr:jsonStr});		
				
      }
      fr.readAsText(file,"utf8");
    }
    
    
  },

  showError : function (errStr) {
    var errDiv = document.getElementById('SlateError');
    errDiv.style.visibility= 'visible';
    errDiv.innerHTML = errStr;
  }

};



