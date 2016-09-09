/**
 * Created by Abdessamad on 8/18/2016.
 */

(function () {
    'use strict';

    angular.module('dossierModule').
        component('cmpFileReader', {
            templateUrl: './components/file-reader-writer/tpl-file-reader.html',
            controller: fileReaderCtrl,
            controllerAs: 'frCtrl',
            bindings: {
                onFileLoaded: '&'
                //,onDeleteDossier: '&'
                // selectedCountryChanged: '&'
            }
        });

    fileReaderCtrl.$inject = ['$timeout', '$element'];

    function fileReaderCtrl($timeout, $element) {
        var self = this;

        self.$onInit = function () {

            self.jsonFile = [];
            // Read the image using the filereader
            self.fileReaderSupported = window.FileReader != null;

        }

        self.$postLink = function () {

            $element.find('input').on('change', function (changeEvent) {
                var file = changeEvent.target.files[0];

                if (!self.fileReaderSupported || angular.isUndefined(file))
                    return false;

                //console.log('file type: ' + file.f);

                var fileReader = new FileReader();
                fileReader.readAsText(file); // read the text.
                fileReader.onload = function (e) {

                    console.log('file: ' + e.target.result);
                    self.jsonFile.data = e.target.result;

                }


            });


        }


    }


})();
