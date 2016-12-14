/**
 * Created by Abdessamad on 8/24/2016.
 */

(function () {
    'use strict';

    angular
        .module('sourceAnimalModule', ['countryListModule'])
})();

(function () {
    'use strict';

    angular
        .module('sourceAnimalModule')
        .component('cmpSourceAnimal', {
            templateUrl: "./app/components/appendix-four/tpl-source-animal_20161214_1424.html",
            controller: sourceAnimalCtrl,
            controllerAs: 'saCtrl',
            bindings: {
                record : '<',
                onUpdate : '&'
            }
        });

    function sourceAnimalCtrl() {
        var self = this;
        self.animalType = "";
        self.oneCountrySelected=""; //used for error messaging country
        self.model = {};
        self.$onInit = function () {

            //todo should be provided with a blank model this should never happen!
            if(angular.isUndefined(self.model)) {
                console.warn("The source animal is undefined");
                self.model = {
                    primateTypeList: [
                        {label: "NONHUMANPRIMATE", type: "text", name: "nhp-type", required: false, value: ""},
                        {label: "AQUATICTYPE", type: "text", name: "aqua-type", required: false, value: ""},
                        {label: "AVIANTYPE", type: "text", name: "avian-type", required: false, value: ""},
                        {label: "BOVINETYPE", type: "text", name: "bovine-type", required: false, value: ""},
                        {label: "CANINETYPE", type: "text", name: "canine-type", required: false, value: ""},
                        {label: "CAPRINETYPE", type: "text", name: "caprine-type", required: false, value: ""},
                        {label: "CERVIDAETYPE", type: "text", name: "cervidae-type", required: false, value: ""},
                        {label: "EQUINETYPE", type: "text", name: "equine-type", required: false, value: ""},
                        {label: "FELINETYPE", type: "text", name: "feline-type", required: false, value: ""},
                        {label: "OVINETYPE", type: "text", name: "ovine-type", required: false, value: ""},
                        {label: "PORCINETYPE", type: "text", name: "porcine-type", required: false, value: ""},
                        {label: "RODENTTYPE", type: "text", name: "rodent-type", required: false, value: ""},
                        {label: "OTHERANIMALTYPE", type: "text", name: "other-animal-type", required: false, value: ""},
                        {label: "CONTROLLEDPOP", type: "select", name: "controlled-pop", required: true, value: ""},
                        {label: "BIOTECHDERIVED", type: "select", name: "biotech-derived", required: true, value: ""},
                        {label: "CELLLINE", type: "select", name: "cell-line", required: true, value: ""},
                        {label: "AGEANIMALS", type: "number", name: "age-animals", required: true, value: 0}/*,
                         {label : "SPECIFY", type: "text", name : "specify", required : false, value : ""}*/
                    ],
                    countryList: []
                };
               // self.updateAnimalSourcedModel();
            }

        };

        self.$onChanges=function(changes){
            if (changes.record ) {
                self.model = changes.record.currentValue;
            }
        };

        self.updateAnimalSourcedModel = function(){

            self.onUpdate({model:self.model});
        };

        self.updateCountryList = function(list){

            self.model.countryList = list;
            self.onUpdate({model:self.model});

        };
        /**
         * Determines if at least one of the
         * @returns {boolean}
         */
        function _oneAnimalTypeSelected() {
            if (angular.isUndefined(self.model.primateTypeList))
                return false;

            for (var i = 0; i < self.model.primateTypeList.length; i++) {
                //only test the text boxes
                if (self.model.primateTypeList[i].type === "text") {
                    if (self.model.primateTypeList[i].value) {
                        self.animalType = true;
                        return true;
                    }
                }
            }
            self.animalType = "";
            return false
        };
        self.showAnimalError = function () {
            return (!_oneAnimalTypeSelected());
        };

        self.showOneCountryError = function () {
            //if(angular.isUndefined(self.model)) return false;
            if(self.model.countryList.length>0){
                self.oneCountrySelected="selected"
                return false;
            }else{

                self.oneCountrySelected=""
                return true;
            }
        };

        self.showListError = function (isInvalid, isTouched, isRequired) {
            if (isRequired === true) {

                if (isInvalid && isTouched) {
                    return true;
                }
            }
            return false;
        }

    }
})();
