/**
 * Created by dkilty on 12/07/2016.
 */

(function () {
    'use strict';
    angular
        .module('fileIO', []);

})();

(function () {
    'use strict';
    /**
     * @ngdoc directive -attribute directive for file load. Place on file input element
     * attribute must be bound to a function with a parameter named fileContent. On load
     * the function will be called to update values
     */
    angular
        .module('fileIO')
        .directive('hpfbFileSelect', ngFileSelect);

    ngFileSelect.$inject = ['hpfbFileProcessing'];
    function ngFileSelect(hpfbFileReader) {
        var directive = {

            link: link,
            restrict: 'A',
            scope: {
                hpfbFileSelect: "&",
            },
        };
        return directive;

        function link(scope, element, attrs) {
            scope.rootTag = attrs.rootTag;
            element.bind("change", function (e) {
                scope.file = (e.srcElement || e.target).files[0];

                    hpfbFileReader.readAsDataText(scope.file, scope)
                        .then(function (result) {
                            scope.hpfbFileSelect({fileContent: result});
                        })

            })
        }

    }
})();

(function () {
    'use strict';
    /**
     * @ngdoc component- fileSelect UI for loading files into a data model
     * @param updateModelRoot- the function to call and pass the JSON model
     * @param rootElem - the name of the root element. Used for comparing to the loaded file
     */
    angular.module('fileIO').component('hpfbFileSelect', {
        templateUrl: 'app/scripts/components/fileIO/fileSelect.html',
        controller: FileSelectController,
        bindings: {
            updateModelRoot: '&',
            rootElem: '@',
        }
    });


    FileSelectController.$inject = ['hpfbFileProcessing'];
    function FileSelectController(hpfbFileProcessing) {
        var vm = this;
        vm.fileTypes = ".xml, .hcsc";
        vm.modelCallback = function (fileContent) {
            vm.status = "";
            if (fileContent) {
                vm.status = fileContent.messages;
            }
            vm.updateModelRoot({fileContent: fileContent});
            angular.element(fileLoad).trigger('focus');

        };
    }
})();

(function () {
    'use strict';

    /**
     * @ngdoc component - the UI component for saving a data model
     * @param jsonToSave- the JSON data model to save
     * @param  rootTag - the string name of the root tag. Needed for lookups
     * @param saveType- valid values are 'json' or 'xml'
     * @param buttonLabel -the label for the save button
     */
    angular.module('fileIO').component('hpfbFileSave', {
        templateUrl: 'app/scripts/components/fileIO/fileSave.html',
        controller: FileWriteController,
        bindings: {
            jsonToSave: '<',
            rootTag: '@',
            saveType: '@',
            buttonLabel: '@',
            buttonDisabled:'@'
        }
    });


    FileWriteController.$inject = ['hpfbFileProcessing'];
    /**
     * @ngdoc controller - controller for file writing
     * @param hpfbFileProcessing - the service that does all the file creation and validation
     * @constructer _init- initializes state as needed. Updates button disabled
     */
    function FileWriteController(hpfbFileProcessing) {

        var vm = this;
        vm.$onInit =_init;
        vm.generate = _generateFile;

        function _generateFile(){
            if (vm.saveType.toUpperCase() === "JSON") {
                hpfbFileProcessing.writeAsJson(vm.jsonToSave, vm.fileName, vm.rootTag);
            } else if (vm.saveType.toUpperCase() === "XML") {
                hpfbFileProcessing.writeAsXml(vm.jsonToSave, vm.fileName, vm.rootTag);
            }
        }
        function _init(){
           //disabled state
            if(!vm.buttonDisabled){
               vm.buttonDisabled=false;
            }else if(vm.buttonDisabled.toLowerCase()==="true"){
                vm.buttonDisabled=true
            }else if(vm.buttonDisabled.toLowerCase()==="false"){
                vm.buttonDisabled=false;
            }else{
                vm.buttonDisabled=false;
            }
        }
    }
})();


(function () {
    'use strict';
    /**
     * @ngdoc service- processes all files for load and writing
     */
    angular
        .module('fileIO')
        .factory('hpfbFileProcessing', fileReader);

    fileReader.$inject = ['$q'];
    /* @ngInject */
    function fileReader($q) {
        //constants used for messaging
        var msg_success = "MSG_SUCCESS_LOAD"; //load was a success
        var msg_err_jsonparse = "MSG_ERR_JSONPARSE"; //json parsing error
        var msg_err_xmlparse = "MSG_ERR_XMLPARSE"; //xml parsing error
        var msg_err_load = "MSG_ERR_FILE_LOAD"; //file load error
        var msg_err_fileType = "MSG_ERR_FILE_TYPE"; //file type error
        var msg_err_formType = "MSG_ERR_FORM_TYPE"; // valid json but incorrect root tag
        var msg_err_checksum_compareFail = "MSG_ERR_CHECKSUM_FAIL";
        var draft_file_type = "hcsc"; // type of file suffix for JSON files. Can change to process other types
        /**
         * @ngObject: used to store the jsonResult and any messages
         * @type {{jsonResult: string, messages: string}}
         */
        var convertResult = {
            jsonResult: "",
            messages: ""
        };
        var service = {
            readAsDataText: readAsDataText,
            writeAsJson: jsonToFile,
            writeAsXml: xmlToFile
        };
        return service;

        ////////////////
        function onLoad(reader, deferred, scope, file) {
            return function () {
                scope.$apply(function () {
                    if (file) {
                        var splitFile = file.name.split('.');
                        var fileType = splitFile[splitFile.length - 1];
                        if ((fileType.toLowerCase()) == draft_file_type) {
                            convertToJSONObjects(reader);
                            checkRootTagMatch(reader, scope);
                            /* As per meeting of oct 21
                            if (reader.parseResult.jsonResult) {
                                compareHashInJson(reader, scope.rootTag);
                            }*/
                        } else if ((fileType.toLowerCase() === "xml")) {
                            convertXMLToJSONObjects(reader);
                            checkRootTagMatch(reader, scope);
                            /* As per meeting of oct 21
                            if (reader.parseResult.jsonResult) {
                                compareHashInXML(reader, scope)
                            }*/

                        } else {
                            convertResult.parseResult = null;
                            convertResult.messages = msg_err_fileType;
                            reader.parseResult = convertResult;
                        }
                    }
                    deferred.resolve(reader.parseResult);
                });
            }
        }

        function onError(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    //TODO need to review reject case
                    deferred.reject(msg_err_load);
                });
            }
        }
        function getReader(deferred, scope, file) {
            var reader = new FileReader();
            //extend the fileReader object
            reader.onload = onLoad(reader, deferred, scope, file);
            reader.onError = onError(reader, deferred, scope);
            reader.parseResult = null;
            return reader;
        }

        function readAsDataText(file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope, file);

            if (file) {
                reader.readAsText(file);
            } else {
                reader.parseResult = convertResult;
                reader.parseResult.messages = "";
                reader.parseResult.jsonResult = null;
                //case of clearing out the messages as no file was selected
                deferred.resolve(reader.parseResult);
            }
            return deferred.promise;
        }

        function convertToJSONObjects(reader) {

            try {
                convertResult.jsonResult = JSON.parse(reader.result);
                convertResult.messages = msg_success;
                reader.parseResult = convertResult;
            } catch (e) {
                convertResult.jsonResult = null;
                convertResult.messages = msg_err_jsonparse;
                reader.parseResult = convertResult;
            }
        }

        /**
         * @ngdoc method converts a valid XML file to a JSON object
         * @param reader- the extended file reader object
         * @returns null
         */
        function convertXMLToJSONObjects(reader) {
            var xmlConfig = {
                escapeMode: true,
                emptyNodeForm: "text",
                useDoubleQuotes: true
            };
            var xmlConverter = new X2JS(xmlConfig);
            //converts XML as a string to a json
            convertResult.jsonResult = xmlConverter.xml_str2json(reader.result);

            if (convertResult.jsonResult === null) {
                convertResult.messages = msg_err_xmlparse;
            } else {
                convertResult.messages = msg_success;
            }
            reader.parseResult = convertResult;
        }

        function convertJSONObjectsToXML(jsonObj) {
            var xmlConfig = {
                escapeMode: true,
                emptyNodeForm: "text",
                useDoubleQuotes: true
            };
            var jsonConverter = new X2JS(xmlConfig);
            var xmlResult = null;
            //converts XML as a string to a json
            xmlResult = jsonConverter.json2xml_str(jsonObj);
            return (xmlResult);
        }

        /**
         * @ngDoc method - checks if the root tag matches the expected. If it doesn't match, clears the data
         * and sets the error message
         * @param reader the file reader object that is used to read in a file
         * @param scope - scope of the service
         *  @returns null
         */
        function checkRootTagMatch(reader, scope) {
            if (!scope.rootTag || !reader.parseResult || !reader.parseResult.jsonResult) return;

            if (!reader.parseResult.jsonResult[scope.rootTag]) {
                reader.parseResult.jsonResult = null;
                reader.parseResult.messages = msg_err_formType;
            }
        }

        /**
         * @ngdoc method - inserts a hash value into a json object. Hash is calculated on the entire json
         * @param jsonObj- the json object to hash
         * @param rootTag- the root tag of the jsonObject. Used for lookups
         */
        function insertHashInJson(jsonObj, rootTag) {
            jsonObj[rootTag].data_checksum = "";
            var hash = CryptoJS.SHA256(JSON.stringify(jsonObj));
            jsonObj[rootTag].data_checksum = hash.toString();
        }
        /**
         * @ngdoc method - compares the hash in the JSON to the calculated JSON hash
         * @param reader- the reader extended object that contains the json
         * @param rootTag- the root tag of the jsonObject. Used for lookups
         */
        function compareHashInJson(reader, rootTag) {
            var currentTagValue = reader.parseResult.jsonResult[rootTag].data_checksum;
            reader.parseResult.jsonResult[rootTag].data_checksum = "";
            var generatedHash = CryptoJS.SHA256(JSON.stringify(reader.parseResult.jsonResult));
            if (currentTagValue !== generatedHash.toString()) {
                reader.parseResult.jsonResult = null;
                reader.parseResult.messages = msg_err_checksum_compareFail;
            }
        }
        /**
         * @ngdoc method - compares the hash in the XML to the calculated XML hash
         * @param reader- the reader extended object that contains the json
         * @param rootTag- the root tag of the jsonObject. Used for lookups
         */
        function compareHashInXML(reader, scope) {
            var currentTagValue = reader.parseResult.jsonResult[scope.rootTag].data_checksum;
            var convertedToJson= reader.parseResult.jsonResult;
           //remove checksum
            convertedToJson[scope.rootTag].data_checksum = "";
            //convert to xml
            var xmlResult = convertJSONObjectsToXML(convertedToJson);
            scope.hash = CryptoJS.SHA256(xmlResult);
            if (currentTagValue !== scope.hash.toString()) {
                reader.parseResult.jsonResult = null;
                reader.parseResult.messages = msg_err_checksum_compareFail;
            }
        }

        function jsonToFile(jsonObj, fileName, rootTag) {
            if (!jsonObj) return;
            //insertHashInJson(jsonObj, rootTag) as per Oct 21 meeting no checksum
            var makeStrSave = JSON.stringify(jsonObj);
            var blob = new Blob([makeStrSave], {type: "text/plain;charset=utf-8"});
            if (!fileName) {
                fileName = "hpfbDraft." + draft_file_type;
            } else {
                fileName += "." + draft_file_type;
            }
            saveAs(blob, fileName);
        }

        function xmlToFile(jsonObj, fileName, rootTag) {
            if (!jsonObj) return;
            //As per meeting of Oct 21, ignore checksum
            //clear out any previous value if it exists
            //jsonObj[rootTag].data_checksum = "";
            var xmlResult = convertJSONObjectsToXML(jsonObj);
            //TODO this needs to be configurable
           xmlResult= '<?xml version="1.0" encoding="UTF-8"?>'+ '<?xml-stylesheet  type="text/xsl" href="REP_Combined.xsl"?>'+xmlResult;
           // var hash = CryptoJS.SHA256(xmlResult);
            //jsonObj[rootTag].data_checksum = hash.toString();
            //regenerate the xml
            //xmlResult = convertJSONObjectsToXML(jsonObj)
            var blob = new Blob([xmlResult], {type: "text/plain;charset=utf-8"});
            if (!fileName) {
                fileName = "hpfbXML.xml"
            } else {
                fileName += ".xml";
            }
            saveAs(blob, fileName);
        }
    }
})();




