/* global google, console */
var jerryogconrad = (function(document, $) {

    'use strict';

    var _build = function() {
        
        console.log('Yo!');

    },

    _init = function() {
        _build();
    };

    return {
        init: _init
    };

})(document, jQuery);


(function() {

    'use strict';
    jerryogconrad.init();

})();