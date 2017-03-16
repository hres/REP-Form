/**
 * Created by dkilty on 12/07/2016.
 */

(function () {
    'use strict';
    angular
        .module('fileIODiff', []);

})();

(function () {
    'use strict';
    /**
     * @ngdoc directive -attribute directive for file load. Place on file input element
     * attribute must be bound to a function with a parameter named fileContent. On load
     * the function will be called to update values
     */
    angular
        .module('fileIODiff')
        .directive('hpfbFileSelect', ngFileSelect);

    ngFileSelect.$inject = ['fileIODiff'];
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
    angular.module('fileIODiff').component('hpfbFileSelect', {
        templateUrl: 'app/scripts/components/fileIODiff/fileSelect.html',
        controller: FileSelectController,
        bindings: {
            updateModelRoot: '&',
            rootElem: '@',
        }
    });


    FileSelectController.$inject = ['fileIODiff'];
    function FileSelectController(hpfbFileProcessing) {
        var vm = this;
        vm.fileTypes = ".xml,.json,.hcsc";
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
     * @ngdoc service- processes all files for load and writing
     */
    angular
        .module('fileIODiff')
        .factory('fileIODiff', fileReader);

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
            readAsDataText: readAsDataText
        };
        return service;

        ////////////////
        function onLoad(reader, deferred, scope, file) {
            return function () {
                scope.$apply(function () {
                    if (file) {
                        var splitFile = file.name.split('.');
                        var fileType = splitFile[splitFile.length - 1];
                        if ((fileType.toLowerCase()) == 'json' ||(fileType.toLowerCase()) == draft_file_type) {
                            convertToJSONObjects(reader);

                        } else if ((fileType.toLowerCase() === "xml")) {
                            convertXMLToJSONObjects(reader);

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

    }
})();




