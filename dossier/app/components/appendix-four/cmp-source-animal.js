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
            templateUrl: "./app/components/appendix-four/tpl-source-animal.html",
            controller: sourceAnimalCtrl,
            controllerAs: 'saCtrl',
            bindings: {}
        });

    function sourceAnimalCtrl() {
        var self = this;
        self.animalType = "";
        self.$onInit = function () {
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
                    {label: "AGEANIMALS", type: "number", name: "age-animals", required: true, value: ""}/*,
                     {label : "SPECIFY", type: "text", name : "specify", required : false, value : "A"}*/
                ],

                countryList: []
            };
        }
        /**
         * Determines if at least one of the
         * @returns {boolean}
         */
        function _oneAnimalTypeSelected() {
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
