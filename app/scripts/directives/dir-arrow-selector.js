/**
 * Created by Abdessamad on 6/16/2016.
 */


(function(){
    'use strict';
    angular.module('dossierApp')
        .directive('arrowSelector',['$document',function($document){
        return{
            restrict:'A',
            controllerAs: 'vm',
            scope: true,
            bindToController:{
                selectedRow: '='
            },
            controller: function(){
                var vm = this;
                return vm.selectedRow;
            },
            link:function(scope,elem,attrs,ctrl){
                var elemFocus = false;
                elem.on('mouseenter',function(){
                    elemFocus = true;
                });
                elem.on('mouseleave',function(){
                    elemFocus = false;
                });
                $document.bind('keydown',function(e){
                    //console.log("jsdaks");
                    if(elemFocus){
                        if(e.keyCode == 38){
                           // console.log(scope.selectedRow);
                            if(scope.selectedRow == 0){
                                return;
                            }
                            scope.selectedRow--;
                            scope.$apply();
                            e.preventDefault();
                        }
                        if(e.keyCode == 40){
                            if(scope.selectedRow == scope.vm.storeDataModel.storedata.length - 1){
                                return;
                            }
                            scope.selectedRow++;
                            scope.$apply();
                            e.preventDefault();
                        }
                    }
                });
            }
        };
    }]);
})();