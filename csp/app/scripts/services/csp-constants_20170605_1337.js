/**
 * Created by dkilty on 05/04/2017.
 */

(function () {
    'use strict';
    angular
        .module('cspConstants',[])
})();


(function () {
    'use strict';
    angular.module('cspConstants')
        .constant('NOC','NOC')
        .constant('GRANT', 'GRANT')
        .constant('OWNER', 'OWNER')
        .constant('OWNER_BEHALF', 'BEHALF_OWNER')
        .constant('NO_APPLICATION', 'NO_APPLICATION')
        .constant('APPLICATION', 'APPLICATION')
        .constant('EUOTHER', 'EU_OTHER');
})();