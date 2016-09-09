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
        .component('cmpSourceAnimal',{
            templateUrl : "./components/appendix-four/tpl-source-animal.html",
            controller : sourceAnimalCtrl,
            controllerAs : 'saCtrl',
            bindings :{}
        });

    function sourceAnimalCtrl(){
        var self = this;

        self.$onInit = function(){
            self.model = {
                primateTypeList : [
                    {label : "NONHUMANPRIMATE", type: "text", name : "nhp-type", required : false, value : "A"},
                    {label : "AQUATICTYPE", type: "text", name : "aqua-type", required : false, value : "A"},
                    {label : "AVIANTYPE", type: "text", name : "avian-type", required : false, value : "A"},
                    {label : "BOVINETYPE", type: "text", name : "bovine-type", required : false, value : "A"},
                    {label : "CANINETYPE", type: "text", name : "canine-type", required : false, value : "A"},
                    {label : "CAPRINETYPE", type: "text", name : "caprine-type", required : false, value : "A"},
                    {label : "CERVIDAETYPE", type: "text", name : "cervidae-type", required : false, value : "A"},
                    {label : "EQUINETYPE", type: "text", name : "equine-type", required : false, value : "A"},
                    {label : "FELINETYPE", type: "text", name : "feline-type", required : false, value : "A"},
                    {label : "OVINETYPE", type: "text", name : "ovine-type", required : false, value : "A"},
                    {label : "PORCINETYPE", type: "text", name : "porcine-type", required : false, value : "A"},
                    {label : "RODENTTYPE", type: "text", name : "rodent-type", required : false, value : "A"},
                    {label : "OTHERANIMALTYPE", type: "text", name : "other-animal-type", required : false, value : "A"},
                    {label : "CONTROLLEDPOP", type: "select", name : "controlled-pop", required : true, value : "No"},
                    {label : "BIOTECHDERIVED", type: "select", name : "biotech-derived", required : true, value : "Yes"},
                    {label : "CELLLINE", type: "select", name : "cell-line", required : true, value : "Unknown"},
                    {label : "AGEANIMALS", type: "number", name : "age-animals", required : true, value : 2}/*,
                    {label : "SPECIFY", type: "text", name : "specify", required : false, value : "A"}*/
                ],

                countryList: []
            };
        }
    }
})();
