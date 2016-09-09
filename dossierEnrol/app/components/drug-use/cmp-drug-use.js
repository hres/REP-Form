/**
 * Created by Abdessamad on 8/13/2016.
 */


(function () {
    'use strict';

    angular
        .module('drugUseModule', ['checkBoxListModule'])
})();

(function () {
    'use strict';

    angular
        .module('drugUseModule')
        .component('cmpDrugUse', {
            templateUrl: './components/drug-use/tpl-drug-use.html',
            controller: drugUseCtrl,
            controllerAs: 'duCtrl',
            bindings: {
                listItems: '<' //array of objects
            }
        });

    function drugUseCtrl(){
        var self = this;

        self.$onInit = function(){
            self.commonName = "drugUse";

            self.myList = [
                {"name":"human", "label":"Human", "value":false},
                {"name":"radio-pharmaceutical", "label":"Radiopharmaceutical","value":false},
                {"name":"veterinary", "label":"Veterinary","value":false},
                {"name":"disinfectant", "label":"Disinfectant", "value":false}
            ]
        }
    }
})();
