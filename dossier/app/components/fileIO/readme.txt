THIS IS a copy . DO NOT MODIFIY THIS CODE

1. Depends on the library: https://github.com/abdmob/x2js

For FileIO.hpfbFileReader
To use:
<<<<<<< HEAD
requires xml2json.js. This has been moved to vendor files
Since the file read is asynchronous, need to capture the emit 'fileReadComplete' message:
=======
>>>>>>> dan_repBranch

In the calling scope create a function that will process the json object model

For example:

 vm.showContent = function (fileContent) {
            vm.content = fileContent.jsonResult;
           vm.messages=fileContent.messages;
        };


Define the function in the value of the attribute. Name the attribute fileContent

For example:

 <input type="file" hpfb-file-select="main.showContent(fileContent)" root-tag="COMPANY_ENROL"/>

Optional:

Define the expected root tag. If the root tag doesn't match, will throw an error