/**
 * Created by Abdessamad on 8/22/2016.
 */

(function () {
    'use strict';

    angular
        .module('appendixFourModule', ['expandingTable','appendix4RecordModule'])
})();

(function () {
    'use strict';
    angular
        .module('appendixFourModule')
        .component('cmpAppendixFour',{
            templateUrl: './app/components/appendix-four/tpl-appendix-four.html',
            controller: appendixFourCtrl,
            controllerAs: 'ap4Ctrl',
            bindings: {}
        });

    function appendixFourCtrl(){

        var self=this;

        self.$onInit = function(){
            self.ingredients = [];
            self.colNames = [
                {label: "INGRED_NAME", binding: "ingredientName", width: "98"}
            ];
            self.isDetailValid = true; //TODO needs to be managed in ADD and delete
            self.ingredientList = [
                {
                    "ingredientName": "ing1",
                    "role": "role1",
                    "abstractNum": "44",
                    "standard": "A",
                    "sourceHuman": false,
                    "sourceAnimal": false,
                    "tissuesFluidsOrigin":{},
                    "sourceAnimalDetails":{}

                },
                {
                    "ingredientName": "ing2",
                    "role": "role1",
                    "abstractNum": "655",
                    "standard": "A",
                    "sourceHuman": false,
                    "sourceAnimal": false,
                    "tissuesFluidsOrigin":{},
                    "sourceAnimalDetails":{}
                },
                {
                    "ingredientName": "ing3",
                    "role": "role2",
                    "abstractNum": "54545",
                    "standard": "A",
                    "sourceHuman": false,
                    "sourceAnimal": false,
                    "tissuesFluidsOrigin":{},
                    "sourceAnimalDetails":{}
                }
            ]
        }

    }
})();
