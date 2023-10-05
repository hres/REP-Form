(function () {
    'use strict';
    angular
        .module('productInfoHelpText', [
            'services',
            'filterLists'
        ])

})();


(function () {
    'use strict';
    angular
        .module('productInfoHelpText')
        .component('cmpProductInfoHelpText', {
            templateUrl: 'app/scripts/components/productInfoHelpText/tpl-product-info-help-text.html',
            controller: ProductInfoHelpTextCtrl,
            controllerAs: 'helpCtrl',
            bindings: {
                htIndxList: '<',
                isForProd: '<'
            }
        });

    ProductInfoHelpTextCtrl.$inject = [
        '$translate',
        '$scope'];

    function ProductInfoHelpTextCtrl( $translate, $scope) {

        var vm = this;
        vm.lang = $translate.proposedLanguage() || $translate.use();

        $scope.administrativeHtmlHelpText1 = $translate.instant("HT_ADMINITRATIVE_1");
        $scope.administrativeHtmlHelpText2 = $translate.instant("HT_ADMINITRATIVE_2");
        $scope.ddQuestionsHtmlHelpText2 = $translate.instant("HT_DATA_QUEST");

        vm.$onInit = function () {
            //vm.updateSummary=vm.updateSummary+1;
            // console.log('indx list==: ' + JSON.stringify(vm.htIndxList) );
        };

    }
})();

