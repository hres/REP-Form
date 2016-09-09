/**
 * Created by Abdessamad on 8/22/2016.
 */

(function () {
    'use strict';

    angular
        .module('appendix4RecordModule', ['tissuesFluidsOriginModule', 'sourceAnimalModule'])
})();

(function () {
    'use strict';

    angular
        .module('appendix4RecordModule')
        .component('cmpAppendixFourRecord', {
            templateUrl: './components/appendix-four/tpl-appendix-four-record.html',
            controllerAs: 'ap4RecCtrl',
            controller: app4RecCtrl,
            bindings: {
                record:'<'
            }

        });

    function app4RecCtrl(){

        var self = this;

        self.$onInit = function(){

            self.model = {
                ingredientName : "zcdcsdc",
                humanSourced : false,
                animalSourced : false,

                tissuesFluidsOrigin : {},

                animalSourcedInfo : {}
            }

            if(self.record){
                self.model = angular.copy(self.record);

               // console.log('appendix4RecordModule record: ' + JSON.stringify(self.record) );

            }
        }

    }
})();
