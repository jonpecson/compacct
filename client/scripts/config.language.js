'use strict';
angular.module('app').config(['$translateProvider',
  function($translateProvider) {
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.useStaticFilesLoader({
      prefix: 'l10n/',
      suffix: '.json'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('en_US');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }
]);