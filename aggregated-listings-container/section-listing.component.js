'use strict';
define(['event.angular.app.directives.module', 'utils', 'tracking'], function (app, utils, tracking) {
    app.component('sectionListing', {
        templateUrl: '/Areas/event/aggregated-listings-container/section-listing.html',
        bindings: {
            listing: '<',
            onSelect: '&',
            onHighlight: '&',
            highlightedListings: '<'
        },
        controller: ['stateService', '$rootScope', 'eventService', 'debounce',
            function (stateService, $rootScope, eventService, debounce) {
                var $ctrl = this;

                $ctrl.$onChanges = onChanges;
                $ctrl.section = getSection();

                
                function getSection() {
                    return _.find($ctrl.listing.fp, function(value, key){
                        return value !== null;
                    });
                }

                function onChanges(changes) {
                    if (changes.highlightedListings) {
                        $ctrl.isHighlighted = _.some(changes.highlightedListings.currentValue, function (id) { return id == $ctrl.listing.id; });
                    }
                }
            }]
    });
});