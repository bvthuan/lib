angular.module(
  'spectrumLib.components',
  [
    'spectrumLib.components.impersonate',
    'spectrumLib.components.locale',
    'spectrumLib.components.menuMain',
    'spectrumLib.components.menuToolbar',
    'spectrumLib.components.pageHeader',
    'spectrumLib.components.pageFooter',
    'spectrumLib.components.pendingMembership',
    'spectrumLib.components.pager',
    'spectrumLib.components.typeahead',
    'spectrumLib.components.dropdownMultiselect',
    'spectrumLib.components.error',
    'spectrumLib.components.treeView',
    'spectrumLib.components.fileBrowser',
    'spectrumLib.components.tracking',
    'spectrumLib.components.collapsiblePanel',
    'spectrumLib.components.password',
    'spectrumLib.components.featureToggle'
  ]
);

angular.module(
    'spectrumLib.config',
    [
    ]
).provider('$spectrumLibConfig', [
        function () {
            var _preventGetDocumentLinks = false,
                _preventSetContextPath = false,
                _getPreventGetDocumentLinks = function () {
                    return _preventGetDocumentLinks;
                },
                _setPreventGetDocumentLinks = function (preventGetDocumentLinks) {
                    _preventGetDocumentLinks = preventGetDocumentLinks;
                },
                _getPreventSetContextPath = function () {
                    return _preventSetContextPath;
                },
                _setPreventSetContextPath = function (preventSetContextPath) {
                    _preventSetContextPath = preventSetContextPath;
                };

            return {
                $get: function () {
                    return {
                        getPreventGetDocumentLinks: _getPreventGetDocumentLinks,
                        setPreventGetDocumentLinks: _setPreventGetDocumentLinks,
                        getPreventSetContextPath: _getPreventSetContextPath,
                        setPreventSetContextPath: _setPreventSetContextPath
                    };
                },
                getPreventGetDocumentLinks: _getPreventGetDocumentLinks,
                setPreventGetDocumentLinks: _setPreventGetDocumentLinks,
                getPreventSetContextPath: _getPreventSetContextPath,
                setPreventSetContextPath: _setPreventSetContextPath
            };
        }]);

angular.module(
    'spectrumLib.core',
    [
        'spectrumLib.core.applicationModel',

        'spectrumLib.core.contextPathModel',
        'spectrumLib.core.contextPathService',
        'spectrumLib.core.contextPathUtil',

        'spectrumLib.core.serviceEndpointModel',

        'spectrumLib.core.logoutService',
        'spectrumLib.core.vatNumberService',
        'spectrumLib.core.activityService',

        'spectrumLib.core.httpInterceptorService',
        'spectrumLib.core.promiseWatcherModel',

        'spectrumLib.core.pagerConfiguration',
        'spectrumLib.core.HATEOASHelper',

        'spectrumLib.core.organisationService'
    ]
);

angular.module(
  'spectrumLib.directives',
  [
    'spectrumLib.directives.includeReplace',
    'spectrumLib.directives.styleAffix',
    'spectrumLib.directives.backButtonStackPopulate'
  ]
);

angular.module(
    'spectrumLib.filters',
    [
      'spectrumLib.filters.localeValueByIdFilter'
    ]
);

angular.module(
    'spectrumLib.libraries',
    [
      'ipCookie',
      'ngCookies',
      'ngSanitize',
      'pascalprecht.translate',
      'ui.bootstrap',
      'matchMedia'
    ]
);

angular.module(
    'spectrumLib',
    [
        'spectrumLib.config',
        'spectrumLib.core',
        'spectrumLib.components',
        'spectrumLib.directives',
        'spectrumLib.filters',
        'spectrumLib.libraries',
        'spectrumLib.utils',
        'spectrumLib.templates'
    ]
).config(
  [
    '$translateProvider',
    '$httpProvider',
    function ($translateProvider,
              $httpProvider) {
      $translateProvider.useStorage('SpectrumLocaleStorageService');
      $translateProvider.storageKey('LANG');
      $translateProvider.useUrlLoader('/dash/api/i18n/content');
      $translateProvider.preferredLanguage('en');

      $httpProvider.interceptors.push('SpectrumHttpInterceptorService');
    }
  ]

).run(
  [
    '$cookieStore',
    '$log',
    'SpectrumServiceUtil',
    'SpectrumLocaleModel',
    'SpectrumLocaleService',
    function ($cookieStore,
              $log,
              SpectrumServiceUtil,
              SpectrumLocaleModel,
              SpectrumLocaleService) {
      SpectrumServiceUtil.setContextPath('dash');
      SpectrumLocaleModel.currentLanguage = $cookieStore.get('LANG');

      if (SpectrumLocaleService.shouldGetDocumentLinks()) {
        SpectrumLocaleService.getDocumentLinks(
          angular.isDefined(SpectrumLocaleModel.currentLanguage) ? SpectrumLocaleModel.currentLanguage : 'en'
        ).then(
            function successHandler (successResponse) {
                SpectrumLocaleModel.documentLinks = successResponse.data;
            },
            function errorHandler (errorResponse) {
                $log.error('An error has occurred during the fetching of localized document links');
            }
        );
      }
    }
  ]
);

angular.module(
    'spectrumLib.utils',
    [
        'spectrumLib.utils.serviceUtil',
        'spectrumLib.utils.browserUtil',
        'spectrumLib.utils.dateUtil',
        'spectrumLib.utils.backButtonUtil'
    ]
);

angular.module(
    'spectrumLib.components.collapsiblePanel',
    [
        'spectrumLib.components.collapsiblePanelDirective',
        'spectrumLib.components.collapsiblePanelController'
    ]
);

angular.module(
    'spectrumLib.components.dropdownMultiselect',
    [
        'spectrumLib.components.dropdownMultiselectDirective',
        'spectrumLib.components.dropdownMultiselectController',
        'spectrumLib.components.dropdownMultiselectService'
    ]
);

angular.module(
    'spectrumLib.components.error',
    [
        'spectrumLib.components.errorController',
        'spectrumLib.components.errorDirective',
        'spectrumLib.components.errorModel'
    ]
);

angular.module(
  'spectrumLib.components.featureToggle',
  [
    'spectrumLib.components.featureToggleService'
  ]
);

angular.module(
  'spectrumLib.components.fileBrowser',
  [
    'spectrumLib.components.fileBrowserDirective'
  ]
);

angular.module(
  'spectrumLib.components.impersonate',
  [
    'spectrumLib.components.impersonateController',
    'spectrumLib.components.impersonateModel',
    'spectrumLib.components.impersonateService'
  ]
);

angular.module(
  'spectrumLib.components.locale',
  [
    'spectrumLib.components.localeController',
    'spectrumLib.components.localeModel',
    'spectrumLib.components.localeService',
    'spectrumLib.components.localeStorageService'
  ]
);

angular.module(
  'spectrumLib.components.menuMain',
  [
    'spectrumLib.components.menuMainController',
    'spectrumLib.components.menuMainDirective',
    'spectrumLib.components.menuMainModel',
    'spectrumLib.components.menuMainService'
  ]
);

angular.module(
  'spectrumLib.components.menuToolbar',
  [
    'spectrumLib.components.menuToolbarController',
    'spectrumLib.components.menuToolbarDirective',
    'spectrumLib.components.menuToolbarModel'
  ]
);

angular.module(
    'spectrumLib.components.pageFooter',
    [
        'spectrumLib.components.pageFooterController',
        'spectrumLib.components.pageFooterDirective',
        'spectrumLib.components.pageFooterModel'
    ]
);

angular.module(
    'spectrumLib.components.pageHeader',
    [
        'spectrumLib.components.pageHeaderController',
        'spectrumLib.components.pageHeaderDirective',
        'spectrumLib.components.pageHeaderModel'
    ]
);

angular.module(
    'spectrumLib.components.pager',
    [
        'spectrumLib.components.pagerController',
        'spectrumLib.components.pagerDirective',
        'spectrumLib.components.pagerModel'
    ]
);

angular.module(
  'spectrumLib.components.password',
  [
    'spectrumLib.components.passwordController',
    'spectrumLib.components.passwordModel',
    'spectrumLib.components.passwordService'
  ]
);

angular.module(
    'spectrumLib.components.pendingMembership',
    [
        'spectrumLib.components.pendingMembershipController',
        'spectrumLib.components.pendingMembershipDirective'
    ]
);

angular.module(
    'spectrumLib.components.tracking',
    [
        'spectrumLib.components.tracking.cedexisRadarDirective',
        'spectrumLib.components.trackingService'
    ]
);


angular.module(
  'spectrumLib.components.treeView',
  [
    'spectrumLib.components.treeViewController',
    'spectrumLib.components.treeViewDirective',
    'spectrumLib.components.treeViewModel'
  ]
);

angular.module(
    'spectrumLib.components.typeahead',
    [
        'spectrumLib.components.typeaheadDirective',
        'spectrumLib.components.typeaheadService'
    ]
);

angular.module(
    'spectrumLib.core.applicationModel',
    [
    ]
).factory(
    'SpectrumApplicationModel',
    [
        function () {
            var _mapping = {
                    AUDIT: {
                        INITIATE: '/audit/organisation/%ORG_CODE%/site/%SITE_CODE%/initiateAudit',
                        INITIATE_AS_AUDITOR: '/audit/initiateAudit',
                        VIEW_FINDINGS: '/audit/record/%AUDIT_CODE%?active=findings',
                        SITE: '/audit/site/%SITE_CODE%',
                        MY_AUDITS: '/audit/myAudits'
                    },
                    QUESTIONNAIRES: {
                        SECTIONS: '/saq/organisation/%ORG_CODE%/site/%SITE_CODE%/module/core/summary',
                        CUSTOMER_SUMMARY: '/saq/organisation/customer/site/%SITE_CODE%/modules/summary',
                        SUPPLIER_SUMMARY: '/saq/organisation/supplier/site/%SITE_CODE%/modules/summary',
                        MODULE_SUMMARY: '/saq/organisation/site/%SITE_CODE%/module/%MODULE_CODE%/summary',
                        ORG_MODULES: '/saq/organisation/modules',
                        GLOBAL: '/saq/organisation/%ORG_CODE%/module/core/view'
                    },
                    ORGANISATION: {
                        ORG: '/organisation/view/%ORG_CODE%',
                        EDIT: '/organisation/edit/%ORG_CODE%',
                        SITE: '/organisation/view/%ORG_CODE%/site/view/%SITE_CODE%',
                        SUPPLIER_SITE: '/organisation/view/%ORG_CODE%/supplier-site/view/%SITE_CODE%',
                        MY_ORG: '/organisation/myOrganisation',
                        INITIATE_RELATIONSHIP: '/organisation/view/%ORG_CODE%/initiateRelationship',
                        MY_RELATIONSHIPS: '/organisation/myRelationships',
                        CREATE: '/organisation/create/%SUBSCRIPTION_TYPE%'
                    },
                    PAYMENTS: {
                        DETAILS: '/view/%PAYMENT_CODE%'
                    },
                    DASHBOARD: {
                        HOME: '/home'
                    }
                },
                _key = {
                    AUDIT: {
                        INITIATE: 'INITIATE',
                        INITIATE_AS_AUDITOR: 'INITIATE_AS_AUDITOR',
                        SITE: 'SITE',
                        VIEW_FINDINGS: 'VIEW_FINDINGS',
                        MY_AUDITS: 'MY_AUDITS'
                    },
                    ORGANISATION: {
                        ORG: 'ORG',
                        EDIT: 'EDIT',
                        SITE: 'SITE',
                        SUPPLIER_SITE: 'SUPPLIER_SITE',
                        MY_ORG: 'MY_ORG',
                        INITIATE_RELATIONSHIP: 'INITIATE_RELATIONSHIP',
                        MY_RELATIONSHIPS: 'MY_RELATIONSHIPS',
                        CREATE: 'CREATE'
                    },
                    QUESTIONNAIRES: {
                        SECTIONS: 'SECTIONS',
                        CUSTOMER_SUMMARY: 'CUSTOMER_SUMMARY',
                        SUPPLIER_SUMMARY: 'SUPPLIER_SUMMARY',
                        MODULE_SUMMARY: 'MODULE_SUMMARY',
                        ORG_MODULES: 'ORG_MODULES',
                        GLOBAL: 'GLOBAL'
                    },
                    PAYMENTS: {
                        DETAILS: 'DETAILS'
                    },
                    DASHBOARD: {
                        HOME: 'HOME'
                    }
                },
                getMappedValue = function (application, key) {
                    if (_mapping.hasOwnProperty(application) && _mapping[application].hasOwnProperty(key)) {
                        return _mapping[application][key];
                    } else {
                        throw new Error('Mapping does not exist with the given parameters');
                    }
                };

            return {
                getMappedValue: getMappedValue,
                key: _key
            };
        }
    ]
);

angular.module(
    'spectrumLib.core.httpInterceptorService',
    [
    ]
).factory(
    'SpectrumHttpInterceptorService',
    [
        '$q',
        'SpectrumPromiseWatcherModel',
        function ($q,
                  SpectrumPromiseWatcherModel) {
            var _matchers = [];
            return {
                getMatchers: function () {
                    return _matchers;
                },
                setMatchers: function (matchers) {
                    _matchers = matchers;
                },
                request: function (config) {
                    var i;
                    for (i = 0; i < _matchers.length; i++) {
                        if (_matchers[i].test(config.url)) {
                            SpectrumPromiseWatcherModel.addWatch(config);
                            break;
                        }
                    }
                    return config;
                },
                response: function (response) {
                    SpectrumPromiseWatcherModel.removeWatch(response.config);
                    return response;
                },
                responseError: function (rejection) {
                    SpectrumPromiseWatcherModel.removeWatch(rejection.config);
                    return $q.reject(rejection);
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.core.promiseWatcherModel',
    [
    ]
).factory(
    'SpectrumPromiseWatcherModel',
    [
        '$q',
        function ($q) {
            var _watches = {},
                _promises = [];

            return {
                addWatch: function (config) {
                    if (!_watches.hasOwnProperty(config.url)) {
                        var deferred = $q.defer();
                        _watches[config.url] = deferred;
                        _promises.push(deferred.promise);
                    }
                },
                removeWatch: function (config) {
                    if (_watches.hasOwnProperty(config.url)) {
                        var deferred = _watches[config.url],
                            promiseIndex = _promises.indexOf(deferred.promise);

                        deferred.resolve();
                        _promises.splice(promiseIndex, 1);
                        delete _watches[config.url];
                    }
                },
                promises: _promises
            };
        }
    ]
);

angular.module(
  'spectrumLib.core.serviceEndpointModel',
  [
  ]
).factory(
  'SpectrumServiceEndpointModel',
  [
    function () {
      var _ROOT = 'api',
        _SMD = '/smd/',
        _SSO = '/sso/',
        _NAVIGATION_BASE = _ROOT + '/navigation',
        _NAVIGATION_APPS = _NAVIGATION_BASE + '/apps',
        _NAVIGATION_MENUS = _NAVIGATION_BASE + '/menus',

        _LOCALE_BASE = _ROOT + '/i18n',
        _LOCALE_LANGUAGES = _LOCALE_BASE + '/languages',
        _LOCALE_LANGUAGES_CURRENT = _LOCALE_LANGUAGES + '/current',
        _LOCALE_LANGUAGES_SUPPORTED = _LOCALE_LANGUAGES + '/supported',
        _LOCALE_DOCUMENT_LINKS = _LOCALE_BASE + '/documentlinks?lang=%LANG_CODE%',

        _TRACKING_CONFIG = _ROOT + '/tracking/config',

        _SECURITY_BASE = _ROOT + '/security',
        _SECURITY_LOGOUT = _SECURITY_BASE + '/logout',

        _ORGANISATION_BASE = _ROOT + '/orgs',

        _CHECK_MISSING_VAT = _ORGANISATION_BASE + '/checkMissingVatNumber/%USER_CODE%',
        _ORGANISATION_SELF = _ROOT + '/users/self/org',

        _USERS_BASE = _ROOT + '/users',
        _USER = '/user/',
        _OPT_IN_USERS = _USER + _ROOT,
        _SMD_USER = _SECURITY_BASE + '/user',
        _USERS_ENTITY = _USERS_BASE + '/%USER_CODE%',
        _USERS_SEARCH = _USERS_BASE + '?query=%SEARCH_STRING%&offset=%OFFSET%&limit=%LIMIT%',

        _IMPERSONATE = 'app/impersonation',

        _SSO_CONTEXT_PATH = 'sso',
        _SSO_BASE = 'app/rest',
        _SSO_ACCOUNT = _SSO_BASE + '/account',
        _SSO_ACCOUNT_CHANGE_PASSWORD = _SSO_ACCOUNT + '/change_password',

        _ACTIVITIES_BASE = _ROOT + '/activities',
        _ACTIVITIES_CHECK_ICS = _ACTIVITIES_BASE + '/%ORG_CODE%/check-ics',
        _ACTIVITIES_PUBLISH_ICS_EVENT = _ACTIVITIES_BASE + '/%ORG_CODE%/industry-classification-event',

        _FEATURE_TOGGLE_BASE = _ROOT + '/features',
        _FEATURE_TOGGLE_BY_NAME = _FEATURE_TOGGLE_BASE + '/%FEATURE_NAME%',
        _FEATURE_TOGGLES = _FEATURE_TOGGLE_BASE + '/feature-toggles/%FEATURE_NAME%';

      return {
        NAVIGATION: {
          APPS: _NAVIGATION_APPS,
          MENUS: _NAVIGATION_MENUS
        },
        LOCALE: {
          LANGUAGES_SUPPORTED: _LOCALE_LANGUAGES_SUPPORTED,
          LANGUAGES_CURRENT: _LOCALE_LANGUAGES_CURRENT,
          DOCUMENT_LINKS: _LOCALE_DOCUMENT_LINKS
        },
        TRACKING: {
          CONFIG: _TRACKING_CONFIG
        },
        SECURITY: {
          LOGOUT: _SECURITY_LOGOUT
        },
        ORGANISATION: {
          CHECK_MISSING_VAT: _CHECK_MISSING_VAT,
          SELF: _ORGANISATION_SELF
        },
        IMPERSONATE: _IMPERSONATE,
        USERS: {
          ENTITY: _USERS_ENTITY,
          SEARCH: _USERS_SEARCH,
          SMD_USER: _SMD_USER
        },
        SSO: {
          CONTEXT_PATH: _SSO_CONTEXT_PATH,
          CHANGE_PASSWORD: _SSO_ACCOUNT_CHANGE_PASSWORD
        },
        FEATURE_TOGGLE: {
          BY_NAME: _FEATURE_TOGGLE_BY_NAME,
          BY_FEATURE_NAME: _FEATURE_TOGGLES
        },
        OPTIN: {
          OPT_IN_USERS: _OPT_IN_USERS
        },
        ACTIVITIES: {
          PUBLISH_ICS_EVENT: _ACTIVITIES_PUBLISH_ICS_EVENT,
          CHECK_ICS: _ACTIVITIES_CHECK_ICS
        }
      };
    }
  ]
  );

angular.module(
    'spectrumLib.directives.backButtonStackPopulate',
    [
    ]
).directive(
     'a',
     function () {
         return {
             restrict: 'E',
             link: function (scope, element, attr) {
                 // every time you click on the link
                 element.on('click', function ($event) {
                     if (this.hasAttribute('data-ng-put-on-stack')) {
                         var backButtonStack = JSON.parse(localStorage.getItem('backButtonStack')),
                             rootScope = angular.element(document.documentElement).scope(),
                             pageScope = rootScope.$$childTail,
                             pageModel = { url: '', data: {}};

                         if (backButtonStack === null) {
                             backButtonStack = [];
                         }
                         pageModel.url = pageScope.currentUrl;

                         angular.forEach(pageScope, function (value, key) {
                             if (key.charAt(0) !== '$' && key !== 'this' && key !== this && value !== null) {
                                 pageModel.data[key] = value;
                             }
                         });
                         backButtonStack.push(pageModel);

                         if (backButtonStack.length > 5) {
                             backButtonStack.shift();
                         }

                         localStorage.setItem('backButtonStack', JSON.stringify(backButtonStack));
                     }
                 });
             }
         };
     }
 ).directive(
    'button',
    function () {
        return {
            restrict: 'E',
            link: function (scope, element, attr) {
                element.on('click', function ($event) {
                    if (attr.id !== 'backButtonStackBtn' && this.hasAttribute('data-ng-put-on-stack')) {
                        var backButtonStack = JSON.parse(localStorage.getItem('backButtonStack')),
                            rootScope = angular.element(document.documentElement).scope(),
                            pageScope = rootScope.$$childTail,
                            pageModel = { url: '', data: {}};

                        if (backButtonStack === null) {
                            backButtonStack = [];
                        }
                        pageModel.url = pageScope.currentUrl || location.href;

                        angular.forEach(pageScope, function (value, key) {
                            if (key.charAt(0) !== '$' && key !== 'this' && key !== this && value !== null) {
                                pageModel.data[key] = value;
                            }
                        });
                        backButtonStack.push(pageModel);

                        if (backButtonStack.length > 5) {
                            backButtonStack.shift();
                        }

                        localStorage.setItem('backButtonStack', JSON.stringify(backButtonStack));
                    }
                });
            }
        };
    }
 );

angular.module(
  'spectrumLib.directives.includeReplace',
  [
  ]
).directive(
  'spectrumIncludeReplace',
  function () {
    return {
      require: 'ngInclude',
      restrict: 'A',
      link: function (scope, element, attrs) {
        element.replaceWith(element.children());
      }
    };
  }
);

angular.module(
  'spectrumLib.directives.styleAffix',
  [
  ]
).directive(
  'spectrumStyleAffix',
  [
    '$window',
    '$document',
    '$timeout',
    function ($window, $document, $timeout) {
      return {
        restrict: 'A',
        scope: {
          threshold: '@',
          cssClass: '@'
        },
        link: function (scope, elements, attrs) {
          var pageYOffset,
              previousYOffset,
              ele = elements[0];

          scope.handleStyle = function (e) {
              previousYOffset = pageYOffset;
              pageYOffset = $window.pageYOffset;

              var scrollHeight = $document[0].documentElement.scrollHeight,
                clientHeight = $document[0].documentElement.clientHeight,
                scrollToBottom = scrollHeight - clientHeight - pageYOffset,
                hasVScroll = scrollHeight > clientHeight;

              if (angular.isDefined(scope.cssClass)) {
                  if (scrollToBottom >= scope.threshold &&
                      (angular.isUndefined(previousYOffset) || previousYOffset >= pageYOffset)) {
                      angular.element(ele).addClass(scope.cssClass);
                  } else if (((angular.isUndefined(previousYOffset) || previousYOffset < pageYOffset) &&
                      scrollToBottom < scope.threshold) || !hasVScroll) {
                      angular.element(ele).removeClass(scope.cssClass);
                  }
              }
          };

          ['scroll', 'resize'].forEach(function(event) {
              angular.element($window).bind(event, scope.handleStyle);
          });

          $timeout(function() {
              scope.handleStyle();
          }, 250);
        }
      };
    }
  ]
);

angular.module(
  'spectrumLib.filters.localeValueByIdFilter',
  [
  ]
).filter(
  'SpectrumLocaleValueByIdFilter',
  [
    '$filter',
    function ($filter) {
      return function (input, choices, idProperty, valueProperty) {
        var returnValue = input;

        if (!angular.isDefined(idProperty)) {
          idProperty = 'id';
        }
        if (!angular.isDefined(valueProperty)) {
          valueProperty = 'value';
        }

        if (angular.isArray(choices)) {
          choices.forEach(function (choice) {
            if (choice.hasOwnProperty(idProperty) &&
              choice.hasOwnProperty(valueProperty) &&
              choice[idProperty] === input) {
              returnValue = $filter('translate')(choice[valueProperty]);
            }
          });
        }

        return returnValue;
      };
    }
  ]
);

/*global _deepMerge*/
angular.module(
    'spectrumLib.utils.backButtonUtil',
    [
    ]
).service(
    'SpectrumBackButtonUtil',
    [
        function () {
            // Merging code
            function _isMergeableObject(val) {
                var nonNullObject = val && typeof val === 'object';

                return nonNullObject && Object.prototype.toString.call(val) !== '[object RegExp]' &&
                        Object.prototype.toString.call(val) !== '[object Date]';
            }

            function _emptyTarget(val) {
                return Array.isArray(val) ? [] : {};
            }

            function _cloneIfNecessary(value, optionsArgument) {
                var clone = optionsArgument && optionsArgument.clone === true;
                return (clone && _isMergeableObject(value)) ?
                        _deepMerge(_emptyTarget(value), value, optionsArgument) : value;
            }

            function _defaultArrayMerge(target, source, optionsArgument) {
                var destination = target.slice();
                source.forEach(function (e, i) {
                    if (typeof destination[i] === 'undefined') {
                        destination[i] = _cloneIfNecessary(e, optionsArgument);
                    } else if (_isMergeableObject(e)) {
                        destination[i] = _deepMerge(target[i], e, optionsArgument);
                    } else if (target.indexOf(e) === -1) {
                        destination.push(_cloneIfNecessary(e, optionsArgument));
                    }
                });
                return destination;
            }

            function _mergeObject(target, source, optionsArgument) {
                var destination = {};
                if (_isMergeableObject(target)) {
                    Object.keys(target).forEach(function (key) {
                        destination[key] = _cloneIfNecessary(target[key], optionsArgument);
                    });
                }
                Object.keys(source).forEach(function (key) {
                    if (!_isMergeableObject(source[key]) || !target[key]) {
                        destination[key] = _cloneIfNecessary(source[key], optionsArgument);
                    } else {
                        destination[key] = _deepMerge(target[key], source[key], optionsArgument);
                    }
                });
                return destination;
            }

            function _deepMerge(target, source, optionsArgument) {
                var array = Array.isArray(source),
                    options = optionsArgument || { arrayMerge: _defaultArrayMerge },
                    arrayMerge = options.arrayMerge || _defaultArrayMerge;

                if (array) {
                    return Array.isArray(target) ? arrayMerge(target, source, optionsArgument) :
                            _cloneIfNecessary(source, optionsArgument);
                } else {
                    return _mergeObject(target, source, optionsArgument);
                }
            }
            // End of merging code

            function _isEmpty(obj) {
                if (typeof obj === 'object') {
                    for (var key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return !obj;
                }
            }

            // Reload page from stack
            function _reloadPageFromStack($scope, pageModelData) {
                angular.forEach(pageModelData, function (value, key) {
                    if (_isEmpty(value)) {
                        delete pageModelData[key];
                    }
                });
                console.log('check');
                angular.forEach(pageModelData, function (value, key) {
                    if ($scope[key] !== value) {
                        if ($scope[key] === undefined || $scope[key] === null) {
                            $scope[key] = (typeof value === 'object') ? {} : value;
                        }
                        if (typeof value === 'object') {
                            $scope[key] = _deepMerge($scope[key], value);
                        } else {
                            $scope[key] = value;
                        }
                    }
                });
            }
            // End of reloading page from stack

            // Click handler for back button to pop object from backButtonStack
            function _backButtonStackHandler() {
                var backButtonStack = JSON.parse(localStorage.getItem('backButtonStack'));

                if (backButtonStack === null || backButtonStack.length < 1) {
                    return;
                } else {
                    var pageModel = backButtonStack.pop(),
                        previousUrl = pageModel.url,
                        pageModelData = pageModel.data;

                    localStorage.setItem('pageModelData', JSON.stringify(pageModelData));

                    if (backButtonStack.length < 1) {
                        localStorage.removeItem('backButtonStack');
                    } else {
                        localStorage.setItem('backButtonStack', JSON.stringify(backButtonStack));
                    }

                    if (previousUrl === window.location.href) {
                        window.location.reload();
                    } else {
                        window.location.href = previousUrl;
                    }
                }
            }
            // End of click handler for back button to pop object from backButtonStack

            function _checkIfBackButtonStackContainsElements() {
                var backButtonStack = JSON.parse(localStorage.getItem('backButtonStack'));

                return backButtonStack !== null && backButtonStack.length > 0;
            }

            return {
                reloadPageFromStack: _reloadPageFromStack,
                backButtonStackHandler: _backButtonStackHandler,
                deepMerge: _deepMerge,
                checkIfBackButtonStackContainsElements: _checkIfBackButtonStackContainsElements
            };
        }
    ]
);

angular.module(
    'spectrumLib.utils.browserUtil',
    [
    ]
).service(
    'SpectrumBrowserUtil',
    [
        '$window',
        function ($window) {
            var _userAgent = $window.navigator.userAgent,
                _self = {},
                _constants = {
                    CHROME: 'Chrome',
                    FIREFOX: 'Firefox',
                    INTERNET_EXPLORER: 'MSIE',
                    OPERA: 'Opera',
                    SAFARI: 'Safari',
                    TRIDENT: 'Trident',
                    WEBKIT: 'WebKit'
                },
                _externalUrlPrefixPattern = /^https?:\/\//;

            _self.isChrome = _userAgent.indexOf(_constants.CHROME) !== -1;
            _self.isFirefox = _userAgent.indexOf(_constants.FIREFOX) !== -1;
            _self.isOpera = _userAgent.indexOf(_constants.OPERA) !== -1;
            _self.isSafari = _userAgent.indexOf(_constants.SAFARI) !== -1 && !_self.isChrome;
            _self.isWebKit = _userAgent.indexOf(_constants.WEBKIT) !== -1;

            _self.isIE = (_userAgent.indexOf(_constants.TRIDENT) !== -1 ||
                          _userAgent.indexOf(_constants.INTERNET_EXPLORER) !== -1);
            _self.isIE6 = _userAgent.indexOf(_constants.INTERNET_EXPLORER + ' 6') !== -1;
            _self.isIE7 = _userAgent.indexOf(_constants.INTERNET_EXPLORER + ' 7') !== -1;
            _self.isIE8 = _userAgent.indexOf(_constants.INTERNET_EXPLORER + ' 8') !== -1;
            _self.isIE9 = _userAgent.indexOf(_constants.INTERNET_EXPLORER + ' 9') !== -1;
            _self.isIE10 = _userAgent.indexOf(_constants.INTERNET_EXPLORER + ' 10') !== -1;

            _self.isIEOld = _self.isIE6 || _self.isIE7 || _self.isIE8 || _self.isIE9;
            _self.isIE11Up = (_userAgent.indexOf(_constants.TRIDENT) !== -1 &&
                              _userAgent.indexOf(_constants.INTERNET_EXPLORER) === -1);
            _self.isIE10Up = _self.isIE10 || _self.isIE11Up;
            _self.isIE9Up = _self.isIE9 || _self.isIE10Up;

            _self.isExternalUrl = function(url) {
                return _externalUrlPrefixPattern.test(url);
            };

            return _self;
        }
    ]
);

angular.module(
    'spectrumLib.utils.dateUtil',
    [
    ]
).service(
    'SpectrumDateUtil',
    [
        function () {
            var _zeroFill = function (number, targetLength) {
                    var absNumber = '' + Math.abs(number),
                        zerosToFill = targetLength - absNumber.length;

                    return Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
                },
                _toBackendDateString = function (date) {
                    if (angular.isDate(date)) {
                        var year = date.getFullYear(),
                            month = date.getMonth() + 1,
                            day = date.getDate();

                        return year +
                            '-' +
                            _zeroFill(month, 2) +
                            '-' +
                            _zeroFill(day, 2) +
                            'T00:00:00.000Z';
                    } else {
                        return null;
                    }
                };

            return {
                toBackendDateString: _toBackendDateString
            };
        }
    ]
);

angular.module(
    'spectrumLib.utils.serviceUtil',
    [
    ]
).factory(
    'SpectrumServiceUtil',
    [
        '$log',
        '$window',
        '$spectrumLibConfig',
        function ($log, $window, $spectrumLibConfig) {
            var _fqhn = '',
                _contextPath = null;

            return {
                /**
                 * @ngdoc method
                 * @name ServiceUtil#setServiceFqhn
                 * @methodOf ServiceUtil
                 * @description
                 *
                 * Set the value for the fully-qualified host name of the host that
                 * will provide services.
                 *
                 * If blank (default), the implication is that the services will be accessed from the
                 * same server.
                 *
                 * Any of the following are valid:
                 *      - `''`
                 *      - `'/'`
                 *      - `'hostname/'`
                 *      - `'http://hostname/'`
                 *      - `'https://hostname/'`
                 *      - `'http://hostname:8888/'`
                 *
                 * @param {String} newFqhn new fully-qualified host name
                 * @returns {void} void
                 */
                setServiceFqhn: function (newFqhn) {
                    _fqhn = newFqhn;
                },

                /**
                 * @ngdoc method
                 * @name ServiceUtil#createServiceUrl
                 * @methodOf ServiceUtil
                 * @description
                 *
                 * Create a fully-qualified service URL.
                 *
                 * @param {String} uri URI to prepend with FQHN; does not need leading '/'
                 * @returns {String} FQHN of service
                 *
                 */
                createServiceUrl: function (uri) {
                    return _fqhn + uri;
                },

                setContextPath: function (newContextPath) {
                    if (!$spectrumLibConfig.getPreventSetContextPath()) {
                        _contextPath = newContextPath;
                    }
                },

                createServiceUrlWithContextPath: function (uri) {
                    var origin = $window.location.origin;

                    // IE fix
                    if (angular.isUndefined(origin)) {
                        origin = $window.location.protocol + '//' + $window.location.hostname +
                        ($window.location.port ? ':' + $window.location.port: '');
                    }

                    return origin + '/' + (_contextPath ? _contextPath + '/' : '') + uri;
                },

                createServiceUrlWithCustomContextPath: function (contextPath, uri) {
                    var origin = $window.location.origin;

                    // IE fix
                    if (angular.isUndefined(origin)) {
                      origin = $window.location.protocol + '//' + $window.location.hostname +
                      ($window.location.port ? ':' + $window.location.port: '');
                    }

                    return origin + '/' + contextPath + '/' + uri;
                },

                setURLParameters: function (uri, params) {
                    var placeholderRegExp = /(%[A-Z_]+%)/g,
                        placeholders = uri.match(placeholderRegExp);

                    if (uri === null || angular.isUndefined(uri)) {
                        $log.error('URI is null or undefined');
                    }

                    if (placeholders !== null && angular.isArray(params) && placeholders.length === params.length) {
                        for (var i = 0; i < placeholders.length; i += 1) {
                            uri = uri.replace(placeholders[i], params[i]);
                        }

                        return uri;
                    } else if (placeholders === null) {
                        if (angular.isArray(params) && params.length > 0) {
                            $log.debug('URI contains no placeholder but you tried to set some');
                        }

                        return uri;
                    } else if (placeholders !== null && angular.isArray(params) && params.length === 0) {
                        $log.error('URI contains one or more placeholders but you have not provided any parameters');
                    }
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.collapsiblePanelController',
    [
    ]
).controller(
    'SpectrumCollapsiblePanelController',
    [
        '$scope',
        function ($scope) {
            var openedIconClass = angular.isDefined($scope.openedIconClass) ?
                  $scope.openedIconClass : 'glyphicon-minus',
                closedIconClass = angular.isDefined($scope.closedIconClass) ?
                  $scope.closedIconClass : 'glyphicon-chevron-down';

            $scope.clickHandler = {
                toggleCollapse: function () {
                    $scope.isCollapsed = !$scope.isCollapsed;
                }
            };

            $scope.getIconClass = function () {
                return $scope.isCollapsed ? closedIconClass : openedIconClass;
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.collapsiblePanelDirective',
    [
    ]
).directive(
    'spectrumCollapsiblePanel',
    function () {
        return {
            restrict: 'A',
            scope: {
                id: '@',
                title: '@',
                isCollapsed: '=collapsed',
                openedIconClass: '@',
                closedIconClass: '@'
            },
            templateUrl: 'spectrum-lib-ui/components/collapsible-panel/collapsible-panel-view.html',
            transclude: true
        };
    }
);

angular.module(
    'spectrumLib.components.dropdownMultiselectController', []
).controller(
    'SpectrumDropdownMultiselectController', [
        '$scope',
        '$document',
        '$timeout',
        '$filter',
        'SpectrumDropdownMultiselectService',
        'SpectrumServiceUtil',
        function ($scope,
            $document,
            $timeout,
            $filter,
            SpectrumDropdownMultiselectService,
            SpectrumServiceUtil) {
            var selectedItems = [],
                selectedLabels = [],
                label = $scope.label || $filter('translate')('global.placeholders.select'),
                staticLabel = $scope.staticLabel,
                labelField = $scope.labelField,
                valueField = $scope.valueField,
                maxDisplayedItems = $scope.maxDisplayedItems,
                isLoading = false,
                currentOffset = 0,
                nextURL = null,
                previousURL = null,
                url,
                filterButton = $scope.filterButton,
                request;

            function initialise() {
                $document.on('click', function (event) {
                    if ($scope.open && document.getElementById($scope.id).contains(event.target) === false) {
                        $timeout(function () {
                            $scope.open = false;
                        }, 0);
                    }
                });

                $scope.$watch('options', function (val) {
                    if (angular.isArray(val)) {
                        refreshCollections();
                        generateButtonText();
                    }
                });

                if (angular.isDefined($scope.asyncUrl)) {
                    url = SpectrumServiceUtil.setURLParameters($scope.asyncUrl, ['', currentOffset, $scope.pageSize]);
                    getMatches(url);
                }
            }

            function getMatches(url) {
                abortRequest();
                isLoading = true;
                clearOptions();
                (request = SpectrumDropdownMultiselectService.call(url)).then(
                    function successHandler(successResponse) {
                        isLoading = false;
                        if (successResponse !== null) {
                            if (angular.isArray(successResponse.results)) {
                                if (angular.isFunction($scope.transformationFunction)) {
                                    $scope.options = $scope.transformationFunction()(
                                        successResponse.results,
                                        $scope.model
                                    );
                                } else {
                                    $scope.options = successResponse.results;
                                }
                            }
                            if (angular.isDefined(successResponse.links)) {
                                nextURL = successResponse.links.next;
                                previousURL = successResponse.links.previous;
                            }
                        }
                    },
                    function errorHandler(errorResponse) {
                        isLoading = false;
                        clearOptions();
                    }
                );
            }

            function abortRequest() {
                if (request) {
                    request.abort();
                    isLoading = false;
                }
            }

            function clearOptions() {
                $scope.options = [];
                nextURL = null;
                previousURL = null;
            }

            function generateButtonText() {
                if (angular.isDefined(staticLabel)) {
                    return $filter('translate')(staticLabel);
                } else if ($scope.model.length > 0) {
                    if (angular.isDefined(maxDisplayedItems) && $scope.model.length > maxDisplayedItems) {
                        return $scope.model.length + ' ' + $filter('translate')('global.placeholders.itemsSelected');
                    } else if (angular.isDefined(labelField) && selectedLabels.length > 0) {
                        return selectedLabels.map(function (label) {
                            return $filter('translate')(label);
                        }).join(', ');
                    } else {
                        return selectedItems.join(', ');
                    }
                } else {
                    return label;
                }
            }

            function refreshCollections() {
                if (angular.isDefined(url)) {
                    selectedItems = $scope.model;

                    selectedLabels = selectedItems.map(function (item) {
                        return item.hasOwnProperty(labelField) ? item[labelField] : item;
                    });
                } else {
                    selectedItems = $scope.options.filter(function (item) {
                        if ((item.hasOwnProperty(valueField) && $scope.model.indexOf(item[valueField]) !== -1) ||
                            (!item.hasOwnProperty(valueField) && $scope.model.indexOf(item) !== -1)) {
                            return item;
                        }
                    });

                    selectedLabels = selectedItems.map(function (item) {
                        return item.hasOwnProperty(labelField) ? item[labelField] : item;
                    });
                }
            }

            $scope.setSelectedItem = function () {
                var selectedValue = angular.isDefined(valueField) ? this.option[valueField] : this.option,
                    selectedValueIndex = $scope.model.indexOf(selectedValue);

                if (selectedValueIndex === -1) {
                    $scope.model.push(selectedValue);
                } else {
                    $scope.model.splice(selectedValueIndex, 1);
                }

                refreshCollections();

                generateButtonText();

                return false;
            };

            $scope.openDropdown = function () {
                $scope.open = !$scope.open;
            };

            $scope.isChecked = function (option) {
                var selectedValue = angular.isDefined(valueField) ? option[valueField] : option;
                if ($scope.model.indexOf(selectedValue) !== -1) {
                    return 'glyphicon glyphicon-ok pull-right';
                }

                return false;
            };

            $scope.buttonText = function () {
                return generateButtonText();
            };

            $scope.getItemLabel = function (option) {
                if (angular.isDefined(labelField) && option.hasOwnProperty(labelField)) {
                    return option[labelField];
                } else {
                    return option;
                }
            };

            $scope.isDisabled = {
                nextButton: function () {
                    return nextURL === null;
                },
                previousButton: function () {
                    return previousURL === null;
                }
            };

            $scope.clickHandler = {
                nextButton: function () {
                    getMatches(nextURL);
                },
                previousButton: function () {
                    getMatches(previousURL);
                },
                selectAllButton: function () {
                    for (var i = 0; i < $scope.options.length; i++) {
                        var option = $scope.options[i];
                        var selectedValue = angular.isDefined(valueField) ? option[valueField] : option,
                            selectedValueIndex = $scope.model.indexOf(selectedValue);
                        if (selectedValueIndex === -1) {
                            $scope.model.push(selectedValue);
                        }
                    }
                    refreshCollections();
                    generateButtonText();
                },
                clearAll: function () {
                    for (var i = 0; i < $scope.options.length; i++) {
                        var option = $scope.options[i];
                        var selectedValue = angular.isDefined(valueField) ? option[valueField] : option,
                            selectedValueIndex = $scope.model.indexOf(selectedValue);
                        if (selectedValueIndex !== -1) {
                            $scope.model.splice(selectedValueIndex, 1);
                        }
                    }
                    refreshCollections();
                    generateButtonText();
                }
            };

            $scope.canShow = {
                pager: function () {
                    return angular.isDefined(url) && (nextURL !== null || previousURL !== null);
                },
                filterButton: function () {
                    return $scope.filterButton === 'true' || $scope.filterButton === true;
                }
            };

            initialise();
        }
    ]
);

angular.module(
    'spectrumLib.components.dropdownMultiselectDirective',
    [
    ]
).directive(
    'spectrumDropdownMultiselect',
    function factory($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                model: '=ngModel',
                options: '=',
                maxDisplayedItems: '=',
                labelField: '@',
                valueField: '@',
                label: '@',
                staticLabel: '@',
                id: '@',
                required: '=',
                asyncUrl: '=',
                pageSize: '=',
                transformationFunction: '&',
                filterButton: '@'
            },
            templateUrl: 'spectrum-lib-ui/components/dropdown-multiselect/dropdown-multiselect-view.html',
            link: function (scope, elm, attrs, ngModel) {
                var validator = function (value) {
                    ngModel.$setValidity('selectionRequired', isRequired(value));
                    return value;
                };

                if (!ngModel) {
                    return;
                }

                scope.$watch(
                    function () {
                        return ngModel.$viewValue;
                    }, function (newValue, oldValue) {
                        $timeout(function () {
                            validator();
                        });
                    }
                );

                function isRequired(value) {
                    if (!angular.isDefined(value) || value === null) {
                        return true;
                    } else if (angular.isArray(value) && value.length === 0) {
                        return true;
                    } else if (angular.isString(value) && value.trim().length === 0) {
                        return true;
                    } else {
                        return false;
                    }
                }

                ngModel.$parsers.unshift(validator);
                ngModel.$formatters.unshift(validator);
            }
        };
    }
);

angular.module(
    'spectrumLib.components.dropdownMultiselectService',
    [
    ]
).service(
    'SpectrumDropdownMultiselectService',
    [
        '$http',
        '$q',
        function ($http, $q) {
            return {
                call: function (url) {
                    var deferred = $q.defer(),
                        request = $http({
                            method: 'get',
                            url: url,
                            timeout: deferred.promise
                        }),
                        promise = request.then(
                            function successHandler (successResponse) {
                                return (successResponse.data);
                            },
                            function errorHandler (errorResponse) {
                                return ($q.reject('Something went wrong'));
                            }
                        );

                    promise.abort = function () {
                        deferred.resolve();
                    };

                    promise['finally'](
                        function () {
                            console.info('Cleaning up object references');

                            promise.abort = angular.noop;

                            deferred = request = promise = null;
                        }
                    );

                    return promise;
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.featureToggleService',
    [
    ]
).service(
    'SpectrumFeatureToggleService',
    [
        '$http',
        '$q',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        'SpectrumContextPathModel',
        'SpectrumContextPathService',
        function ($http,
                  $q,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel,
                  SpectrumContextPathModel,
                  SpectrumContextPathService) {
            var _cachedResults = null,
                url = function (uri, params) {
                    return SpectrumServiceUtil.createServiceUrlWithContextPath(
                        SpectrumServiceUtil.setURLParameters(uri, params)
                    );
                },
                getByName = function (featureName) {
                    var deferred = $q.defer(),
                        request;

                        request = $http({
                            url: url(
                                    SpectrumServiceEndpointModel.FEATURE_TOGGLE.BY_NAME,
                                    [ featureName ]),
                            method: 'GET'
                        });
                        request.then(
                            function successHandler (successResponse) {
                                deferred.resolve(successResponse.data);
                            },
                            function errorHandler (errorResponse) {
                                deferred.reject(errorResponse);
                            }
                        );
                        return deferred.promise;

                },
                _getFeatureToggle = function (featureName) {
                    var deferred = $q.defer(),
                        request;

                    request = $http({
                        url: url(
                            SpectrumServiceEndpointModel.FEATURE_TOGGLE.BY_FEATURE_NAME,
                            [ featureName ? featureName : '' ]),
                        method: 'GET'
                    });
                    request.then(
                        function successHandler (successResponse) {
                            deferred.resolve(successResponse.data);
                        },
                        function errorHandler (errorResponse) {
                            deferred.reject(errorResponse);
                        }
                    );
                    return deferred.promise;
                };

            return {
                url: url,
                getByName: getByName,
                getFeatureToggle: _getFeatureToggle
            };
        }
    ]
);


angular.module(
    'spectrumLib.components.errorController',
    [
    ]
).controller(
    'SpectrumErrorController',
    [
        '$scope',
        'SpectrumErrorModel',
        function ($scope, SpectrumErrorModel) {
            $scope.canShow = {
                serviceErrors: function () {
                    var hasErrorInScope = SpectrumErrorModel.hasErrorInScope($scope.scopeId),
                        hasErrorInGroup = angular.isDefined($scope.errorGroup) &&
                          SpectrumErrorModel.hasErrorInScope($scope.errorGroup),
                        hasSpecifiedError = angular.isDefined($scope.errorCodes) &&
                          SpectrumErrorModel.hasErrorCodes($scope.errorCodes);

                    return hasErrorInScope || hasErrorInGroup || hasSpecifiedError;
                }
            };

            $scope.serviceErrorsList = function () {
                var errorsInScope = SpectrumErrorModel.getErrorsInScope($scope.scopeId),
                    errorsInGroup = angular.isDefined($scope.errorGroup) ?
                      SpectrumErrorModel.getErrorsInScope($scope.errorGroup) : [],
                    specifiedErrors = angular.isDefined($scope.errorCodes) ?
                      SpectrumErrorModel.getErrorsForCodes($scope.errorCodes) : [];

                return errorsInScope.concat(errorsInGroup).concat(specifiedErrors);
            };

            $scope.clickHandler = {
                dismissError: function (error) {
                    var errorsInScope = SpectrumErrorModel.getErrorsInScope($scope.scopeId),
                        errorsInGroup = angular.isDefined($scope.errorGroup) ?
                          SpectrumErrorModel.getErrorsInScope($scope.errorGroup) : [],
                        specifiedErrors = angular.isDefined($scope.errorCodes) ?
                          SpectrumErrorModel.getErrorsForCodes($scope.errorCodes) : [],
                        indexOfErrorInScope = errorsInScope.indexOf(error),
                        indexOfErrorInGroup = errorsInGroup.indexOf(error),
                        indexOfErrorSpecified = specifiedErrors.indexOf(error);

                    if (indexOfErrorInScope > -1) {
                        errorsInScope.splice(indexOfErrorInScope, 1);
                    }
                    if (indexOfErrorInGroup > -1) {
                        errorsInGroup.splice(indexOfErrorInGroup, 1);
                    }
                    if (indexOfErrorSpecified > -1) {
                        specifiedErrors.splice(indexOfErrorSpecified, 1);
                    }
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.errorDirective',
    [
    ]
).directive(
    'spectrumErrorContainer',
    function () {
        return {
            restrict: 'A',
            replace: false,
            scope: {
                scopeId: '=',
                errorCodes: '=',
                errorGroup: '='
            },
            templateUrl: 'spectrum-lib-ui/components/error/error-view.html'
        };
    }
);

angular.module(
    'spectrumLib.components.errorModel',
    [
    ]
).factory(
    'SpectrumErrorModel', [
        function () {
            var _serviceErrors = {},
                _errorGroups = {
                    REFERENCE_DATA: 'REFERENCE_DATA'
                },
                _errorCodes = {
                },
                _clearErrorsForScope = function (scopeId) {
                    if (_serviceErrors.hasOwnProperty(scopeId)) {
                        _serviceErrors[scopeId] = [];
                    }
                },
                _clearAllErrors = function () {
                    for (var key in _serviceErrors) {
                        if (_serviceErrors.hasOwnProperty(key)) {
                            _serviceErrors[key] = [];
                        }
                    }
                },
                _clearErrorInScope = function (scopeId, errorCode) {
                    var i;

                    if (_serviceErrors.hasOwnProperty(scopeId)) {
                        for (i = 0; i < _serviceErrors[scopeId].length; i += 1) {
                            if (_serviceErrors[scopeId][i].errorCode === errorCode) {
                                _serviceErrors[scopeId].splice(i, 1);
                                break;
                            }
                        }
                    }
                },
                _clearErrorForAllScopes = function (errorCode) {
                    var i, key;

                    for (key in _serviceErrors) {
                        if (_serviceErrors.hasOwnProperty(key)) {
                            for (i = 0; i < _serviceErrors[key].length; i += 1) {
                                if (_serviceErrors[key][i].errorCode === errorCode) {
                                    _serviceErrors[key].splice(i, 1);
                                    break;
                                }
                            }
                        }
                    }
                },
                _hasErrorsInScope = function (scopeId) {
                    if (_serviceErrors.hasOwnProperty(scopeId) && _serviceErrors[scopeId].length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                },
                _hasErrorCode = function (errorCode) {
                    var found = false,
                        key,
                        i;

                    for (key in _serviceErrors) {
                        if (_serviceErrors.hasOwnProperty(key)) {
                            for (i = 0; i < _serviceErrors[key].length; i += 1) {
                                if (_serviceErrors[key][i].errorCode === errorCode) {
                                    found = true;
                                    break;
                                }
                            }
                            if (found) {
                                break;
                            }
                        }
                    }

                    return found;
                },
                _hasErrorCodes = function (errorCodes) {
                    var found = false,
                        key,
                        i;

                    for (key in _serviceErrors) {
                        if (_serviceErrors.hasOwnProperty(key)) {
                            for (i = 0; i < _serviceErrors[key].length; i += 1) {
                                if (errorCodes.indexOf(_serviceErrors[key][i].errorCode) !== -1) {
                                    found = true;
                                    break;
                                }
                            }
                            if (found) {
                                break;
                            }
                        }
                    }

                    return found;
                },
                _getErrorsInScope = function (scopeId) {
                    if (_serviceErrors.hasOwnProperty(scopeId) && _serviceErrors[scopeId].length > 0) {
                        return _serviceErrors[scopeId];
                    } else {
                        return [];
                    }
                },
                _getErrorsForCodes = function (errorCodes) {
                    var result = [],
                        key,
                        i;

                    for (key in _serviceErrors) {
                        if (_serviceErrors.hasOwnProperty(key)) {
                            for (i = 0; i < _serviceErrors[key].length; i += 1) {
                                if (errorCodes.indexOf(_serviceErrors[key][i].errorCode) !== -1) {
                                    result.push(_serviceErrors[key][i]);
                                }
                            }
                        }
                    }

                    return result;
                },
                _handleErrorResponse = function (scopeId, response) {
                    if (response.data.hasOwnProperty('errorCode') && response.data.hasOwnProperty('errorMessage')) {
                        if (!_serviceErrors.hasOwnProperty(scopeId)) {
                            _serviceErrors[scopeId] = [];
                        }

                        _serviceErrors[scopeId].push(response.data);
                    }
                };

            return {
                clearErrorsForScope: _clearErrorsForScope,
                clearAllErrors: _clearAllErrors,
                clearErrorInScope: _clearErrorInScope,
                clearErrorForAllScopes: _clearErrorForAllScopes,
                hasErrorInScope: _hasErrorsInScope,
                hasErrorCode: _hasErrorCode,
                hasErrorCodes: _hasErrorCodes,
                getErrorsInScope: _getErrorsInScope,
                getErrorsForCodes: _getErrorsForCodes,
                handleErrorResponse: _handleErrorResponse,
                errorGroups: _errorGroups,
                errorCodes: _errorCodes
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.fileBrowserDirective',
    [
    ]
).directive(
    'spectrumFileBrowser',
    function () {
        return {
            restrict: 'A',
            scope: {
                id: '@',
                restrictions: '=',
                maxFileSize: '=',
                buttonText: '@',
                multiple: '='
            },
            templateUrl: 'spectrum-lib-ui/components/file-browser/file-browser-view.html',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                var listener = function () {
                        var fileNames = [],
                            i,
                            fileNamesText,
                            value;

                        scope.showFileSizeWarning = false;

                        for (i = 0; i < this.files.length; i += 1) {
                            if (angular.isDefined(scope.maxFileSize) && this.files[i].size > scope.maxFileSize) {
                                scope.showFileSizeWarning = true;
                                fileNames = [];
                                this.value = null;
                                break;
                            }
                            fileNames.push(this.files[i].name);
                        }

                        fileNamesText = fileNames.join(', ');

                        switch (fileNames.length) {
                            case 1:
                                scope.displayValue = fileNamesText;
                                break;
                            case 0:
                                scope.displayValue = '';
                                break;
                            default:
                                scope.displayValue = fileNames.length + ' files selected';
                                break;
                        }

                        scope.displayValueTooltip = fileNamesText;

                        value = (scope.multiple === true) ? this.files : this.files[0];
                        scope.$apply(ctrl.$setViewValue(value));
                    },
                    fileInput = angular.element(element[0].querySelector('input[type=file]'));

                if (scope.multiple === true) {
                    fileInput[0].setAttribute('multiple', true);
                }

                if (angular.isDefined(scope.restrictions) && angular.isArray(scope.restrictions)) {
                    var typesList = scope.restrictions.map(function (type) {
                        return '.' + type;
                    }).join(',');
                    fileInput[0].setAttribute('accept', typesList);
                }

                scope.$watch(
                    function () {
                        return ctrl.$viewValue;
                    },
                    function (newValue, oldValue) {
                        if (newValue === null) {
                            scope.displayValue = '';
                        }
                    }
                );

                fileInput.bind('change', listener);
            }
        };
    }
);

angular.module(
    'spectrumLib.components.impersonateController',
    [
    ]
).controller(
    'SpectrumImpersonateController',
    [
        '$scope',
        '$modal',
        '$window',
        'SpectrumImpersonateModel',
        'SpectrumImpersonateService',
        'SpectrumErrorModel',
        function ($scope,
                  $modal,
                  $window,
                  SpectrumImpersonateModel,
                  SpectrumImpersonateService,
                  SpectrumErrorModel) {
            var noUserFoundMessageVisible = false;
            $scope.impersonateModel = SpectrumImpersonateModel;
            $scope.disabled = false;

            function initialise () {
                SpectrumImpersonateModel.clear();
                SpectrumImpersonateModel.setActiveTab(SpectrumImpersonateModel.TABS.USER_CODE);
                SpectrumErrorModel.clearErrorsForScope($scope.$id);
            }

            function getUserCode () {
                if (SpectrumImpersonateModel.isUserCodeTabActive()) {
                    SpectrumImpersonateService.getUserByCode(SpectrumImpersonateModel.userCode).then(
                        function successHandler (successResponse) {
                            impersonate(SpectrumImpersonateModel.getJSONFromUserCode(
                                SpectrumImpersonateModel.userCode
                            ));
                        },
                        function errorHandler (errorResponse) {
                            SpectrumErrorModel.handleErrorResponse($scope.$id, errorResponse);
                        }
                    );
                } else if (SpectrumImpersonateModel.isEmailTabActive()) {
                    noUserFoundMessageVisible = false;
                    SpectrumImpersonateService.searchUser(SpectrumImpersonateModel.email, 0, 1).then(
                        function successHandler (successResponse) {
                            if (angular.isArray(successResponse.data.results) &&
                                successResponse.data.results.length > 0) {
                                var userCode = successResponse.data.results[0].userCode;
                                impersonate(SpectrumImpersonateModel.getJSONFromUserCode(userCode));
                            } else {
                                noUserFoundMessageVisible = true;
                            }
                        },
                        function errorHandler (errorResponse) {
                            SpectrumErrorModel.handleErrorResponse($scope.$id, errorResponse);
                        }
                    );
                }
            }

            function impersonate (userCode) {
                SpectrumImpersonateService.impersonate(userCode).then(
                    function successHandler (successResponse) {
                        $window.location.reload();
                    },
                    function errorHandler (errorResponse) {
                        SpectrumErrorModel.handleErrorResponse($scope.$id, errorResponse);
                    }
                );
            }

            $scope.canShow = {
                inputImpersonateByEmail: function () {
                    return SpectrumImpersonateModel.isEmailTabActive();
                },
                inputImpersonateByUserCode: function () {
                    return SpectrumImpersonateModel.isUserCodeTabActive();
                },
                validationEMail: function (formField) {
                    return formField.$error.email;
                },
                validationErrorsOnField: function (formField) {
                    return formField.$invalid && formField.$dirty;
                },
                noUserFoundMessage: function () {
                    return noUserFoundMessageVisible;
                }
            };

            $scope.isDisabled = {
                impersonateButton: function (form) {
                    return form.$invalid || $scope.disabled;
                }
            };

            $scope.isSelected = {
                impersonateByEmail: function () {
                    return SpectrumImpersonateModel.isEmailTabActive();
                },
                impersonateByUserCode: function () {
                    return SpectrumImpersonateModel.isUserCodeTabActive();
                }
            };

            $scope.isRequired = {
                impersonatedUserCode: function () {
                    return SpectrumImpersonateModel.isUserCodeTabActive();
                },
                impersonatedUserEmail: function () {
                    return SpectrumImpersonateModel.isEmailTabActive();
                },
                changePerson : function(){
                    $scope.disabled = false;
                }
            };

            $scope.clickHandler = {
                impersonateButton: function () {
                    $scope.disabled = true;
                    getUserCode();
                },
                dismissErrorButton: function () {
                    noUserFoundMessageVisible = false;
                },
                impersonateByUserCodeButton: function () {
                    SpectrumImpersonateModel.setActiveTab(SpectrumImpersonateModel.TABS.USER_CODE);
                    SpectrumImpersonateModel.clear();
                },
                impersonateByEmailButton: function () {
                    SpectrumImpersonateModel.setActiveTab(SpectrumImpersonateModel.TABS.EMAIL);
                    SpectrumImpersonateModel.clear();
                },
                closeButton: function () {
                    $scope.$dismiss('close');
                }
            };

            initialise();
        }
    ]
);

angular.module(
    'spectrumLib.components.impersonateModel',
    [
    ]
).factory(
    'SpectrumImpersonateModel',
    [
        function () {
            var _TABS = {
                    USER_CODE: 'USER_CODE',
                    EMAIL: 'EMAIL'
                },
                activeTab;

            return {
                email: null,
                userCode: null,

                clear: function () {
                    this.email = null;
                    this.userCode = null;
                },

                setActiveTab: function (newActiveTab) {
                    activeTab = newActiveTab;
                },

                isUserCodeTabActive: function () {
                    return activeTab === _TABS.USER_CODE;
                },

                isEmailTabActive: function () {
                    return activeTab === _TABS.EMAIL;
                },

                getJSONFromUserCode: function (userCode) {
                    return {
                        userCode: userCode
                    };
                },

                TABS: _TABS
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.impersonateService',
    [
    ]
).service(
    'SpectrumImpersonateService',
    [
        '$http',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        'SpectrumContextPathService',
        'SpectrumContextPathModel',
        function ($http,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel,
                  SpectrumContextPathService,
                  SpectrumContextPathModel) {
            return {
                url: function (contextPath, uri, params) {
                    return SpectrumServiceUtil.createServiceUrlWithCustomContextPath(
                      contextPath,
                      SpectrumServiceUtil.setURLParameters(uri, params)
                    );
                },
                impersonate: function (requestData) {
                    var url = this.url;
                    return SpectrumContextPathService.getAll().then(
                        function successHandler (data) {
                            if (angular.isArray(data)) {
                                var filteredPaths = data.filter(function (path) {
                                    return path.contextKey === SpectrumContextPathModel.key.SSO;
                                });
                                if (angular.isDefined(filteredPaths[0])) {
                                    return $http({
                                        url: url(
                                          filteredPaths[0].contextValue,
                                          SpectrumServiceEndpointModel.IMPERSONATE
                                        ),
                                        method: 'POST',
                                        data: requestData
                                    });
                                }
                            }
                        }
                    );
                },
                getUserByCode: function (userCode) {
                    var url = this.url;
                    return SpectrumContextPathService.getAll().then(
                        function successHandler (data) {
                            if (angular.isArray(data)) {
                                var filteredPaths = data.filter(function (path) {
                                    return path.contextKey === SpectrumContextPathModel.key.USER;
                                });
                                if (angular.isDefined(filteredPaths[0])) {
                                    return $http({
                                        url: url(
                                            filteredPaths[0].contextValue,
                                            SpectrumServiceEndpointModel.USERS.ENTITY,
                                            [ userCode ]
                                        ),
                                        method: 'GET'
                                    });
                                }
                            }
                        }
                    );

                },
                searchUser: function (searchString, offset, limit) {
                    var url = this.url;
                    return SpectrumContextPathService.getAll().then(
                        function successHandler (data) {
                            if (angular.isArray(data)) {
                                var filteredPaths = data.filter(function (path) {
                                    return path.contextKey === SpectrumContextPathModel.key.USER;
                                });
                                if (angular.isDefined(filteredPaths[0])) {
                                    return $http({
                                        url: url(
                                            filteredPaths[0].contextValue,
                                            SpectrumServiceEndpointModel.USERS.SEARCH,
                                            [ searchString, offset, limit ]
                                        ),
                                        method: 'GET'
                                    });
                                }
                            }
                        }
                    );
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.localeController',
    [
    ]
).controller(
    'SpectrumLocaleController',
    [
        '$scope',
        '$modal',
        '$translate',
        '$cookieStore',
        '$window',
        'ipCookie',
        'SpectrumLocaleModel',
        'SpectrumLocaleService',
        function ($scope,
                  $modal,
                  $translate,
                  $cookieStore,
                  $window,
                  ipCookie,
                  SpectrumLocaleModel,
                  SpectrumLocaleService) {
            $scope.error = null;
            $scope.localeModel = SpectrumLocaleModel;

            function initialise() {
              SpectrumLocaleModel.proposedLanguage = SpectrumLocaleModel.currentLanguage;
            }

            function changeLanguage() {
                SpectrumLocaleService.update(
                  SpectrumLocaleModel.transformLanguageToJSON(SpectrumLocaleModel.proposedLanguage)).then(
                    function successHandler (successResponse) {
                        $translate.use(SpectrumLocaleModel.proposedLanguage);
                        $cookieStore.remove('LANG');
                        ipCookie('LANG', angular.toJson(SpectrumLocaleModel.proposedLanguage), { path: '/' });
                        SpectrumLocaleModel.currentLanguage = SpectrumLocaleModel.proposedLanguage;
                        $window.location.reload();
                    }
                );
            }

            $scope.canShow = {
                serviceErrors: function () {
                    return $scope.error !== null;
                }
            };

            $scope.isDisabled = {
                yesButton: function (form) {
                  return form && form.$invalid;
                }
            };

            $scope.clickHandler = {
                yesButton: function () {
                    changeLanguage();
                },
                noButton: function () {
                    $scope.$dismiss('close');
                }
            };

            initialise();
        }
    ]
);

angular.module(
    'spectrumLib.components.localeModel',
    [
    ]
).factory(
    'SpectrumLocaleModel',
    [
        function () {
            var _currentLanguage = '',
                _proposedLanguage = null,
                _supportedLanguages = [],
                _documentLinks = null,
                _transformLanguageToJSON = function (languageCode) {
                    var json = {
                        code: languageCode
                    };

                    return json;
                };

            return {
                currentLanguage: _currentLanguage,
                proposedLanguage: _proposedLanguage,
                supportedLanguages: _supportedLanguages,
                documentLinks: _documentLinks,
                transformLanguageToJSON: _transformLanguageToJSON,
                getLocalizedDocumentLink: function (id) {
                    if (this.documentLinks !== null && this.documentLinks.hasOwnProperty(id) &&
                      this.documentLinks[id].trim() !== '') {
                        return this.documentLinks[id];
                    } else {
                        return null;
                    }
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.localeService',
    [
    ]
).service(
    'SpectrumLocaleService',
    [
        '$http',
        '$q',
        '$spectrumLibConfig',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        function ($http,
                  $q,
                  $spectrumLibConfig,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel) {
            var _cachedResults = null,
                _url = function (uri, params) {
                    return SpectrumServiceUtil.createServiceUrlWithContextPath(
                      SpectrumServiceUtil.setURLParameters(uri, params)
                    );
                },
                _getAll = function (forceReload) {
                    var deferred = $q.defer(),
                        request;

                    if (_cachedResults === null || forceReload) {
                        request = $http({
                            url: _url(SpectrumServiceEndpointModel.LOCALE.LANGUAGES_SUPPORTED),
                            method: 'GET'
                        });
                        request.then(
                            function successHandler (successResponse) {
                                _cachedResults = successResponse.data;
                                deferred.resolve(_cachedResults);
                            },
                            function errorHandler (errorResponse) {
                                _cachedResults = [];
                                deferred.resolve(_cachedResults);
                            }
                        );
                    } else {
                        deferred.resolve(_cachedResults);
                    }

                    return deferred.promise;
                },
                _getDocumentLinks = function (languageCode) {
                    return $http({
                        url: _url(SpectrumServiceEndpointModel.LOCALE.DOCUMENT_LINKS, [ languageCode ]),
                        method: 'GET'
                    });
                },
                _update = function (data) {
                    return $http({
                        url: _url(SpectrumServiceEndpointModel.LOCALE.LANGUAGES_CURRENT),
                        method: 'PUT',
                        data: data
                    });
                },
                _shouldGetDocumentLinks = function () {
                    return !$spectrumLibConfig.getPreventGetDocumentLinks();
                };

            return {
                url: _url,
                getAll: _getAll,
                update: _update,
                getDocumentLinks: _getDocumentLinks,
                shouldGetDocumentLinks: _shouldGetDocumentLinks
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.localeStorageService',
    [
    ]
).service(
    'SpectrumLocaleStorageService',
    [
        '$browser',
        'ipCookie',
        function ($browser,
                  ipCookie) {
            return {
                put: function (name, value) {
                    ipCookie(name, angular.toJson(value), {path: '/' });
                },
                get: function (name) {
                    return angular.fromJson($browser.cookies()[name]);
                }
            };
        }
    ]
);

angular.module(
  'spectrumLib.components.menuMainController',
  [
  ]
).controller(
  'SpectrumMenuMainController',
  [
    '$scope',
    '$window',
    '$modal',
    '$http',
    '$q',
    '$location',
    '$log',
    'SpectrumMenuMainModel',
    'SpectrumMenuMainService',
    'SpectrumContextPathService',
    'screenSize',
    'SpectrumBrowserUtil',
    'SpectrumServiceEndpointModel',
    function ($scope,
      $window,
      $modal,
      $http,
      $q,
      $location,
      $log,
      SpectrumMenuMainModel,
      SpectrumMenuMainService,
      SpectrumContextPathService,
      screenSize,
      SpectrumBrowserUtil,
      SpectrumServiceEndpointModel) {
      var isMobile,
        appContextKey = $scope.appContextKey;

      $scope.menuMainModel = SpectrumMenuMainModel;
      $scope.isOpen = false;
      $scope.menuItems = 'spectrum-lib-ui/components/menu-main/menu-items-view.html';

      // Pop will open when user authentication succeeds

      $scope.openPopUpModal = function () {
        var $modalScope = $scope.$new(true);
        var modalInstance = $modal.open(
          {
            templateUrl: 'spectrum-lib-ui/components/popup/popup.html',
            scope: $modalScope,
            size: 'md',
            backdrop: 'static',
            controller: function ($scope, $modalInstance, $timeout, $http) {
              $scope.cancel = function () {
                if ($scope.checked) {
                  //do some action if checkbox is checked
                  var messageStatusCnl = $scope.checked;
                  var urlParamCnl = '/preferences/update-smd-opt-in-reminder';
                  urlParamCnl += '?optInModelStatus=' + messageStatusCnl;
                  $http({
                    method: 'PUT',
                    url: SpectrumServiceEndpointModel.OPTIN.OPT_IN_USERS + urlParamCnl,
                    // url: 'http://localhost:3000/opt/optin',
                    headers: {
                      'Content-Type': 'application/json',
                      'X-Login-Ajax-call': 'true'
                    }
                  })
                    .success(function (data) {
                      $modalInstance.dismiss('cancel');
                    })
                    .error(function (data, response) {
                      $log.error(data);
                    });
                } else {
                  sessionStorage.setItem('cancel', 'yes');
                  $modalInstance.dismiss('cancel');
                }
              };

              $scope.optin = function () {
                // API integration
                var messageStatusOpt;
                if ($scope.checked) {
                  messageStatusOpt = $scope.checked;
                } else {
                  messageStatusOpt = false;
                }
                var urlParamOpt = '/org/smd/opt-in';
                urlParamOpt += '?optInModelStatus=' + messageStatusOpt;
                $http({
                  method: 'PUT',
                  url: SpectrumServiceEndpointModel.OPTIN.OPT_IN_USERS + urlParamOpt,
                  // url: 'http://localhost:3000/opt/optin',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Login-Ajax-call': 'true'
                  }
                })
                  .success(function (data) {
                    // $scope.successMessage = 'You have successfully opted in to Sedex Member Directory';
                    $scope.successMessagebool = true;
                    $timeout(function () {
                      $scope.successMessagebool = false;
                      $modalInstance.close();
                    }, 3000);
                  })
                  .error(function (data, response) {
                    $log.error(data);
                  });
              };
            }
          }
        );
      };

      function initialise() {
        if (SpectrumBrowserUtil.isIE8) {
          isMobile = false;
        } else {
          isMobile = screenSize.on('xs', function (match) {
            isMobile = match;
          });
        }

        loadMenuItems();
      }

      function loadMenuItems() {
        SpectrumMenuMainService.getAll().then(
          function successHandler(successResponse) {
            SpectrumMenuMainModel.menuItems = successResponse;
            var menus = $scope.getMenuItems();
            var toolbars = $scope.getToolbarItems();
            var hiddens = $scope.getMenuItemsByType(SpectrumMenuMainModel.type.HIDDEN);
            var allMenus = menus.concat(toolbars).concat(hiddens);
            allMenus = SpectrumMenuMainModel.menuItems;
            if (angular.isArray(allMenus)) {
                allMenus.forEach(
                    function (menuItem) {
                        // $log.info('menuItem level 1: ' + menuItem);
                        setLinkOfMenuItem(menuItem);
                        if (menuItem.childMenuOptions && menuItem.childMenuOptions.length > 0) {
                            menuItem.childMenuOptions.forEach(
                                function (childMenuItem) {
                                    // $log.info('menuItem level 2: ' + childMenuItem);
                                    setLinkOfMenuItem(childMenuItem);
                                }
                            );
                        }
                    }
                );
            }
          }
        );
      }

      function setLinkOfMenuItem(menuItem) {
          if (SpectrumMenuMainModel.hasRoute(menuItem)) {
              resolveUrl(menuItem).then(
                  function successHandler(url) {
                      menuItem.hrefValue = url;
                  }
              );
          }
      }

      function checkToLoadPopUp() {
        var url = SpectrumServiceEndpointModel.OPTIN.OPT_IN_USERS;
        url += '/is-org-eligible-smd-enroll';
        // var url = 'http://localhost:3000/sites/opt-status';
        $http.get(url)
          .success(function (data, status) {
            if(sessionStorage.getItem('cancel') !== 'yes'){
            if (data.isEligibleToEnroll) {
              $scope.openPopUpModal();
            }
          }
          }).error(function (data, status) {
            $log.error(data);
          });
      }

      function navigateToRoute(menuItem) {
        if (SpectrumMenuMainModel.hasRoute(menuItem)) {
          var openInNewWindow = menuItem.openInNewWindow || false;
          if (SpectrumBrowserUtil.isExternalUrl(menuItem.route)) {
            if (openInNewWindow) {
              $window.open(menuItem.route);
            } else {
              $window.location.href = menuItem.route;
            }
          } else {
            resolveUrl(menuItem).then(
              function successHandler(url) {
                if (openInNewWindow) {
                  $window.open(url);
                } else {
                  // PHX-4724: if target URL inside current app domain
                  // just route internally without full page refresh
                  if (appContextKey && (menuItem.contextKey === appContextKey)) {
                    $location.path(menuItem.route);
                    window.location.reload(true);
                  } else {
                    $window.location.href = url;
                  }
                }
              }
            );
          }
        }
      }

      function resolveUrl(menuItem) {
        var deferred = $q.defer();
        if (menuItem !== null) {
          SpectrumContextPathService.getAll().then(
            function successHandler(data) {

              if (angular.isArray(data)) {
                var filteredPaths = data.filter(function (path) {
                  return path.contextKey === menuItem.contextKey;
                }),
                  origin = $window.location.origin,
                  url = null;

                if (angular.isUndefined(origin)) {
                  origin = $window.location.protocol + '//' + $window.location.hostname +
                    ($window.location.port ? ':' + $window.location.port : '');
                }

                if (angular.isDefined(filteredPaths[0])) {
                  url = origin +
                    '/' +
                    filteredPaths[0].contextValue +
                    '/#/' +
                    menuItem.route;
                  deferred.resolve(url);
                } else {
                  deferred.reject('Context path cannot be found for the defined context key');
                }
              }
            },
            function errorHandler(errorResponse) {
              deferred.reject(errorResponse);
            }
          );
        } else {
          deferred.reject('Menu item is null');
        }

        return deferred.promise;
      }



      $scope.getMenuItemsByType = function (type) {
        return angular.isDefined(SpectrumMenuMainModel.menuItems) &&
          angular.isArray(SpectrumMenuMainModel.menuItems) ?
          SpectrumMenuMainModel.menuItems.filter(function (item) {
            return item.type === type;
          }) : [];
      };

      $scope.getMenuItems = function () {
        return $scope.getMenuItemsByType(SpectrumMenuMainModel.type.MENU);
      };

      $scope.getToolbarItems = function () {
        return $scope.getMenuItemsByType(SpectrumMenuMainModel.type.TOOLBAR);
      };

      $scope.canApply = {
        hiddenOnSmallStyle: function () {
          return !SpectrumBrowserUtil.isIE8;
        }
      };

      $scope.canShow = {
        separator: function () {
          return !SpectrumBrowserUtil.isIE8;
        }
      };

      $scope.canBeIncluded = {
        desktop: function () {
          return !isMobile;
        },
        mobile: function () {
          return isMobile;
        },
        quickSearch: function (toolbarItem) {
          return toolbarItem.id === SpectrumMenuMainModel.toolbarMenuItemId.SEARCH;
        },
        defaultToolbarItem: function (toolbarItem) {
          return toolbarItem.id !== SpectrumMenuMainModel.toolbarMenuItemId.SEARCH;
        }

      };

      $scope.actionHandler = {
        quickSearch: function (event, toolbar) {
          if (event.keyCode === 13) {
            if (SpectrumMenuMainModel.quickSearchText != null &&
              SpectrumMenuMainModel.quickSearchText.toUpperCase().indexOf('ZAA') !== -1) {
              toolbar.contextKey = 'AUDIT';
              toolbar.route = 'audit/quickSearchAudits?q=';
            } else if (SpectrumMenuMainModel.quickSearchText != null &&
              SpectrumMenuMainModel.quickSearchText.toUpperCase().indexOf('ZAF') !== -1) {
              toolbar.contextKey = 'AUDIT';
              toolbar.route = 'audit/quickSearchFindingAudits?q=';
            }

            resolveUrl(toolbar).then(
              function successHandler(url) {
                $window.location.href = url + encodeURIComponent(SpectrumMenuMainModel.quickSearchText);
              }
            );
          }
        }
      };

      $scope.clickHandler = {
        primaryMenuItem: function (primaryMenuItem) {
          var menuItemId = SpectrumMenuMainModel.getUniqueMenuItemId(primaryMenuItem);

          if (SpectrumMenuMainModel.getCurrentMenuItemId() === menuItemId) {
            SpectrumMenuMainModel.setCurrentMenuItemId(null);
          } else {
            SpectrumMenuMainModel.setCurrentMenuItemId(menuItemId);
            if (SpectrumMenuMainModel.hasRoute(primaryMenuItem) &&
              !SpectrumMenuMainModel.hasChildMenus(primaryMenuItem)) {
              navigateToRoute(primaryMenuItem);
            }
          }
        },
        secondaryMenuItem: function (primaryMenuItem, secondaryMenuItem) {
          SpectrumMenuMainModel.setCurrentMenuItemId(null);
          navigateToRoute(secondaryMenuItem);
        },
        toggleCollapse: function () {
          $scope.isOpen = !$scope.isOpen;
        },
        toolbarMenuItem: function (toolbarMenuItem) {
          switch (toolbarMenuItem.id) {
            case SpectrumMenuMainModel.toolbarMenuItemId.IMPERSONATE:
              var $modalScope = $scope.$new(true);

              $modal.open(
                {
                  templateUrl: 'spectrum-lib-ui/components/impersonate/impersonate-modal.html',
                  scope: $modalScope,
                  size: 'md'
                }
              );
              break;
            default:
              if (SpectrumMenuMainModel.hasRoute(toolbarMenuItem)) {
                navigateToRoute(toolbarMenuItem);
              }
              break;
          }
        }
      };
      checkToLoadPopUp();
      initialise();
    }
  ]
  );
angular.module(
    'spectrumLib.components.menuMainDirective',
    [
    ]
).directive(
    'spectrumMenuMain',
    function factory() {
        return {
            restrict: 'A',
            scope: {
                appContextKey: '@'
            },
            templateUrl: 'spectrum-lib-ui/components/menu-main/menu-main-view.html'
        };
    }
);

angular.module(
    'spectrumLib.components.menuMainModel',
    [
    ]
).factory(
    'SpectrumMenuMainModel',
    [
        function () {
            var _currentMenuItemId = null,
                _toolbarMenuItemId = {
                    HELP: 'help',
                    LANGUAGE: 'language',
                    IMPERSONATE: 'impersonate',
                    IMPERSONATING: 'impersonating',
                    LOG_OUT: 'logOut',
                    RAT: 'rat',
                    REPORTING: 'reporting',
                    SEARCH: 'quickSearch'
                },
                _menuItems = [],
                _type = {
                    MENU: 'MENU',
                    TOOLBAR: 'TOOLBAR',
                    HIDDEN: 'HIDDEN'
                };

            return {
                menuItems: _menuItems,
                type: _type,
                toolbarMenuItemId: _toolbarMenuItemId,
                quickSearchText: null,

                getUniqueMenuItemId: function (menuItem) {
                    return 'menu-item-' + menuItem.id;
                },

                getUniqueLinkItemId: function (menuItem) {
                    return 'menu-link-' + menuItem.id;
                },

                getTranslationId: function (menuItem) {
                    return 'global.menu.' + menuItem.id;
                },

                hasChildMenus: function (menuItem) {
                    return menuItem !== null &&
                      angular.isArray(menuItem.childMenuOptions) &&
                      menuItem.childMenuOptions.length > 0;
                },

                hasRoute: function (menuItem) {
                    return menuItem && angular.isString(menuItem.route) && menuItem.route.trim().length > 0;
                },

                getMenuClass: function (menuItem) {
                    var menuClass = '';

                    switch (menuItem.id) {
                        case this.toolbarMenuItemId.IMPERSONATING:
                            menuClass = 'prj-impersonated';
                            break;
                        default:
                            break;
                    }

                    return menuClass;
                },

                getMenuItemById: function (id) {
                  var filteredMenuItems = this.menuItems.filter(function (menuItem) {
                    return menuItem.id === id;
                  });

                  return (typeof filteredMenuItems[0] === 'undefined') ? null : filteredMenuItems[0];
                },

                getCurrentMenuItemId: function () {
                    return _currentMenuItemId;
                },

                setCurrentMenuItemId: function (newCurrentMenuItemId) {
                    _currentMenuItemId = newCurrentMenuItemId;
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.menuMainService',
    [
    ]
).service(
    'SpectrumMenuMainService',
    [
        '$http',
        '$q',
        '$timeout',
        '$rootScope',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        function ($http,
                  $q,
                  $timeout,
                  $rootScope,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel) {
            var _cachedResults = [],
                _menuLoadMaxRetryCount = 10,
                _menuLoadRetryDelay = 1000,
                url = function (uri, params) {
                    return SpectrumServiceUtil.createServiceUrlWithContextPath(
                      SpectrumServiceUtil.setURLParameters(uri, params)
                    );
                },
                getAll = function (forceReload) {
                    var deferred = $q.defer();

                    if (forceReload || (
                            angular.isDefined(_cachedResults) &&
                            angular.isArray(_cachedResults) &&
                            (_cachedResults.length === 0)
                        )) {
                        // only start fetching menus when user authentication succeeds (triggered from app-ui modules)
                        var authSuccess = $rootScope.$on('event:auth-success', function () {
                            authSuccess();

                            function loadMenus (retryCount) {
                                $http({
                                    url: url(SpectrumServiceEndpointModel.NAVIGATION.MENUS),
                                    method: 'GET'
                                }).then(
                                    function successHandler(successResponse) {
                                        _cachedResults = successResponse.data;
                                        deferred.resolve(_cachedResults);
                                    },
                                    function errorHandler(errorResponse) {
                                        if (retryCount > 0) {
                                            $timeout(function () {
                                                loadMenus(--retryCount);
                                            }, _menuLoadRetryDelay);
                                        } else {
                                            deferred.resolve(_cachedResults);
                                        }
                                    }
                                );
                            }

                            loadMenus(_menuLoadMaxRetryCount);
                        });
                    } else {
                        deferred.resolve(_cachedResults);
                    }

                    return deferred.promise;
                };

            return {
                url: url,
                getAll: getAll
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.menuToolbarController',
    [
    ]
).controller(
    'SpectrumMenuToolbarController',
    [
        '$scope',
        '$location',
        '$window',
        '$modal',
        '$timeout',
        '$rootScope',
        'SpectrumMenuToolbarModel',
        'SpectrumMenuMainModel',
        'SpectrumLogoutService',
        'SpectrumLocaleService',
        'SpectrumLocaleModel',
        'SpectrumServiceUtil',
        'VatNumberService',
        'ActivityService',
        'SpectrumErrorModel',
        '$interval',
        function ($scope,
                  $location,
                  $window,
                  $modal,
                  $timeout,
                  $rootScope,
                  SpectrumMenuToolbarModel,
                  SpectrumMenuMainModel,
                  SpectrumLogoutService,
                  SpectrumLocaleService,
                  SpectrumLocaleModel,
                  SpectrumServiceUtil,
                  VatNumberService,
                  ActivityService,
                  SpectrumErrorModel,
                  $interval) {
            $scope.menuToolbarModel = SpectrumMenuToolbarModel;
            $scope.user = {email: 'example@gmail.com'};
            $scope.orgCode = '';
            $scope.logoutModal = null;

            $scope.displayPopup = false;
            localStorage.setItem('idleTime', new Date().getTime());
            localStorage.setItem('continueWorkingAfterIdling', false);
            var internalLogoutInterval,
                closeLogoutModalInterval = $interval(function () {
                    if ($scope.displayPopup) {
                        if ('true' === localStorage.getItem('continueWorkingAfterIdling')) {
                            $scope.logoutModal.dismiss('no');
                            $scope.cancelHandler();
                            $timeout(function () {
                                $scope.displayPopup = false;
                                localStorage.setItem('continueWorkingAfterIdling', false);
                            }, 2000);
                        }
                    }
                }, 1000),
                logoutInterval = $interval(function () {
                    var now = new Date(), timer = getLastActionTime();
                    if (now - timer > 1.5e+6) {
                        if (!$scope.displayPopup) {
                            $scope.logoutModal = $modal.open(
                                {
                                    templateUrl: 'spectrum-lib-ui/components/modal/idle-logout-prompt-modal.html',
                                    scope: $scope,
                                    size: 'md'
                                }
                            );
                            $scope.logoutModal.result.then(
                                function okHandler() {
                                    logOut();
                                }
                            );
                            internalLogoutInterval = $interval(function () {
                                now = new Date();
                                var lastActionTime = getLastActionTime();
                                if (now - lastActionTime >= 1.8e+6) {
                                    logOut();
                                }
                            }, 300000);
                            /*5 minute dialog timer*/
                            $scope.displayPopup = true;
                        }
                    }
                }, 5000);

            function showVatModal(templateUrl) {
                $modal.open(
                    {
                        templateUrl: templateUrl,
                        scope: $scope,
                        size: 'md',
                        backdrop: 'static',
                        keyboard: false
                    }
                );
            }

            function getLastActionTime() {
                if (localStorage.getItem('idleTime')) {
                    var lastActionTime = localStorage.getItem('idleTime');
                    return new Date(Number(lastActionTime));
                }
                var lastAction = new Date();
                localStorage.setItem('idleTime', lastAction);
                return lastAction;
            }

            $scope.resetTimer = function () {
                localStorage.setItem('idleTime', Date.now());
                /*Cancel the dialog timer on reset*/
                if (angular.isDefined(internalLogoutInterval)) {
                    $interval.cancel(internalLogoutInterval);
                    internalLogoutInterval = undefined;
                }
            };

            $scope.cancelHandler = function () {
                localStorage.setItem('continueWorkingAfterIdling', true);
                $scope.resetTimer();
            };

            $scope.cancel = function () {
                if (angular.isDefined(internalLogoutInterval)) {
                    $interval.cancel(internalLogoutInterval);
                    internalLogoutInterval = undefined;
                }
                if (angular.isDefined(logoutInterval)) {
                    $interval.cancel(logoutInterval);
                    logoutInterval = undefined;
                }
            };

            $scope.$on('$destroy', function () {
                $scope.cancel();
            });

            $scope.redirectToEditCompany = function () {
                $window.location.href = editMyOrganisation();
            };

            function editMyOrganisation () {
                return SpectrumServiceUtil.createServiceUrlWithCustomContextPath(
                    'org',
                    '#/organisation/edit/' + $scope.orgCode);
            }

            function initialise() {
                loadSupportedLanguages();
            }

            function loadSupportedLanguages() {
              SpectrumLocaleService.getAll().then(
                function successHandler (successResponse) {
                    var defaultLanguage;

                    if (angular.isArray(successResponse)) {
                        SpectrumLocaleModel.supportedLanguages = successResponse;

                        defaultLanguage = successResponse.filter(function (language) {
                            return language.isDefault === true || language.default === true;
                        })[0];

                        if (angular.isDefined(defaultLanguage) &&
                            angular.isUndefined(SpectrumLocaleModel.currentLanguage)) {
                            SpectrumLocaleModel.currentLanguage = defaultLanguage.code;

                        } else if (angular.isUndefined(defaultLanguage) &&
                            angular.isDefined(SpectrumLocaleModel.currentLanguage)) {
                            defaultLanguage.code = SpectrumLocaleModel.currentLanguage;

                        } else if (angular.isUndefined(defaultLanguage) &&
                            angular.isUndefined(SpectrumLocaleModel.currentLanguage)) {
                            defaultLanguage.code = 'en';
                            SpectrumLocaleModel.currentLanguage = defaultLanguage.code;
                        }
                    }
                }
              );
            }

            function logOut() {
              SpectrumLogoutService.logOut().then(
                function successHandler (successResponse) {
                  $window.location.href = successResponse.data;
                }
              );
            }

            function showModal(templateUrl) {
                var $modalScope = $scope.$new(true);

                $modal.open(
                    {
                        templateUrl: templateUrl,
                        scope: $modalScope,
                        size: 'md'
                    }
                );
            }

            function showLanguageModal() {
                showModal('spectrum-lib-ui/components/locale/locale-modal.html');
            }

            function showUserPasswordModal() {
                showModal('spectrum-lib-ui/components/user/password-modal.html');
            }

            $scope.clickHandler = {
                menuItem: function (menuItem) {
                  switch (menuItem) {
                    case SpectrumMenuToolbarModel.MENU_ITEMS.MENU_ITEM_LANGUAGE:
                      showLanguageModal();
                      break;
                    case SpectrumMenuToolbarModel.MENU_ITEMS.MENU_ITEM_HELP:
                      // var helpMenu = SpectrumMenuMainModel.getMenuItemById(menuItem.id);
                      // if (helpMenu) {
                      //   $window.open(helpMenu.route);
                      // }
                      break;
                    case SpectrumMenuToolbarModel.MENU_ITEMS.MENU_ITEM_LOG_OUT:
                      logOut();
                      break;
                    default:
                      break;
                  }
                },
                userPasswordMenuItem: function () {
                    showUserPasswordModal();
                },
                myUserAccountMenuItem: function () {
                    $window.location.href = viewMyUserAccount();
                },
                myEmailNotificationItem: function () {
                    $window.location.href = myEmailNotification();
                }
            };

            function viewMyUserAccount () {
                return SpectrumServiceUtil.createServiceUrlWithCustomContextPath(
                    'user',
                    '#/user/view/' + $scope.user.userCode);
            }

            function myEmailNotification() {
                return SpectrumServiceUtil.createServiceUrlWithCustomContextPath(
                    'user',
                    '#/user/emailNotification/view/' + $scope.user.userCode);
            }

            $scope.canShow = {
                userItem: function () {
                    return $scope.user.email;
                }
            };

            function showIndustryClassificationModal() {
                var icsModalShowedFor = localStorage.getItem('icsModalShowedFor') || '';
                if (icsModalShowedFor.indexOf($scope.orgCode) > -1) {
                    ActivityService.publishICSNotificationEvent($scope.user.organisationCode);
                }
                else {
                    icsModalShowedFor = icsModalShowedFor + ',' + $scope.orgCode;
                    localStorage.setItem('icsModalShowedFor', icsModalShowedFor);
                    $modal.open(
                        {
                            templateUrl: 'spectrum-lib-ui/components/modal/industry-classification-required-modal.html',
                            size: 'md'
                        }
                    ).result.then(
                        function okHandler () {
                            $scope.redirectToEditCompany();
                        },
                        function cancelHandler () {
                            ActivityService.publishICSNotificationEvent($scope.user.organisationCode);
                        }
                    ).catch(function(){
                        ActivityService.publishICSNotificationEvent($scope.user.organisationCode);
                    });
                }
            }

            $scope.init = function () {
                var userSuccess = $rootScope.$on('event:user-success', function (event, user) {
                    userSuccess();

                    $scope.user = user;

                    if ($scope.user.userCode !== undefined && $scope.user.userCode !== null) {
                        if ($location.path().indexOf('organisation/edit') === -1) {
                            VatNumberService.checkMissingVatNumber($scope.user.userCode).then(
                                function successHandler(successResponse) {
                                    if (successResponse.data.missingVatNumber) {
                                        $scope.orgCode = successResponse.data.orgCode;
                                        showVatModal('spectrum-lib-ui/components/modal/vat-number-required-modal.html');
                                    }
                                },
                                function errorHandler(errorResponse) {
                                    SpectrumErrorModel.handleErrorResponse($scope.$id, errorResponse);
                                }
                            );

                            if ($scope.user.organisationCode !== undefined && $scope.user.organisationCode !== null) {
                                ActivityService.checkMissingIndustryClassification($scope.user.organisationCode).then(
                                    function successHandler(successResponse) {
                                        if (successResponse.data === 'false') {
                                            $scope.orgCode = $scope.user.organisationCode;
                                            showIndustryClassificationModal();
                                        }
                                    },
                                    function errorHandler(errorResponse) {
                                        SpectrumErrorModel.handleErrorResponse($scope.$id, errorResponse);
                                    }
                                );
                            }
                        }
                    }
                });
            };

            $scope.showEmailNotificationsItem = function () {
                if ($scope.user.roles && ($scope.user.roles.indexOf('COMPANY_ADMIN') !== -1 ||
                  $scope.user.roles.indexOf('SITE_ADMIN') !== -1 ||
                  $scope.user.roles.indexOf('AUDIT_ADMIN') !== -1 ||
                  $scope.user.roles.indexOf('AUDIT_COMPANY_ADMIN') !== -1)) {
                    return true;
                }
            };

            initialise();
        }
    ]
);

angular.module(
    'spectrumLib.components.menuToolbarDirective',
    [
    ]
).directive(
    'spectrumMenuToolbar',
    function factory() {
        return {
            restrict: 'A',
            scope: {},
            templateUrl: 'spectrum-lib-ui/components/menu-toolbar/menu-toolbar-view.html'
        };
    }
);

angular.module(
    'spectrumLib.components.menuToolbarModel',
    [
    ]
).factory(
    'SpectrumMenuToolbarModel',
    [
        function () {
            var _MENU_ITEMS = {
                MENU_ITEM_LANGUAGE: {
                  id: 'language',
                  label: 'global.menu.language',
                  iconClass: 'glyphicon-flag'
                },
                MENU_ITEM_HELP: {
                  id: 'help',
                  label: 'global.menu.help',
                  iconClass: 'glyphicon-question-sign',
                  hrefValue: 'https://sedexadvance.sedexonline.com/sso/app/rest/lms/',
                  targetValue: '_blank'
                },
                MENU_ITEM_LOG_OUT: {
                  id: 'logOut',
                  label: 'global.menu.logOut',
                  iconClass: 'glyphicon-log-out'
                }
            };

            return {
                getMenuItems: function () {
                  return [
                      this.MENU_ITEMS.MENU_ITEM_LANGUAGE,
                      this.MENU_ITEMS.MENU_ITEM_HELP,
                      this.MENU_ITEMS.MENU_ITEM_LOG_OUT
                  ];
                },

                MENU_ITEMS: _MENU_ITEMS
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.pageFooterController',
    [
    ]
).controller(
    'SpectrumPageFooterController',
    [
        '$scope',
        'SpectrumPageFooterModel',
        function ($scope, SpectrumPageFooterModel) {
            $scope.pageFooterModel = SpectrumPageFooterModel;
        }
    ]
);

angular.module(
    'spectrumLib.components.pageFooterDirective',
    [
    ]
).directive(
    'spectrumPageFooter',
    function factory() {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'spectrum-lib-ui/components/page-footer/page-footer-view.html'
        };
    }
);

/* global angular */

/**
 * @ngdoc object
 * @name PageFooterModel
 * @function
 * @description
 *
 * This is the model for the page footer.
 *
 */

angular.module(
    'spectrumLib.components.pageFooterModel',
    [
    ]
).factory(
    'SpectrumPageFooterModel',
    function () {
        var _copyrightMessage = '';

        return {
            /**
             * @ngdoc method
             * @name PageFooterModel#setCopyrightMessage
             * @methodOf PageFooterModel
             * @description
             *
             * Setter for the copyright message in the page footer.
             *
             * @param {String} copyrightMessage The new value for the page footer copyright message.
             * @returns {void} void
             *
             */
            setCopyrightMessage: function (copyrightMessage) {
                _copyrightMessage = copyrightMessage;
            },

            /**
             * @ngdoc method
             * @name PageFooterModel#getCopyrightMessage
             * @methodOf PageFooterModel
             * @description
             *
             * Getter for the copyright message in the page footer.
             *
             * @returns {String} Page footer copyright message
             *
             */
            getCopyrightMessage: function () {
                return _copyrightMessage;
            }
        };
    }
);

angular.module(
    'spectrumLib.components.pagerController',
    [
    ]
)
    .controller(
    'SpectrumPagerController',
    [
        '$scope',
        'SpectrumPagerModel',
        function ($scope, SpectrumPagerModel) {
            $scope.pagerModel = SpectrumPagerModel;
        }
    ]
);

angular.module(
    'spectrumLib.components.pagerDirective',
    [
    ]
).directive(
    'spectrumPager',
    ['SpectrumPagerConfiguration',
    function factory(SpectrumPagerConfiguration) {
        return {
            restrict: 'A',
            scope: {
                onFirst: '&',
                onPrevious: '&',
                onNext: '&',
                onLast: '&',
                pagerConfiguration: '='
            },
            templateUrl: 'spectrum-lib-ui/components/pager/pager-view.html',
            link: function (scope, element, attrs) {
                scope.totalPages = '';
                scope.linkButtonDisabled = {
                    back: false,
                    forward: false
                };

                if (angular.isDefined(scope.pagerConfiguration)) {
                    scope.$watch('pagerConfiguration.offset', function (offset) {
                        scope.currentPage = offset / scope.pagerConfiguration.limit + 1;
                    });

                    scope.$watch('pagerConfiguration.dataPopulatedTag', function () {
                        var linkActionLast = scope.pagerConfiguration.getLinkActionByRel(
                            SpectrumPagerConfiguration.PAGE_LINKS.LAST),
                            offsetLast = linkActionLast && linkActionLast.href ?
                                SpectrumPagerConfiguration.getOffsetForLink(linkActionLast.href) :
                                (scope.pagerConfiguration && scope.pagerConfiguration.total ?
                                    scope.pagerConfiguration.total : null),
                            offset = scope.pagerConfiguration.offset;

                        scope.linkButtonDisabled.back = offset === 0;
                        scope.linkButtonDisabled.forward = (offsetLast !== null) && (offset === offsetLast);

                        if (offsetLast !== null) {
                            scope.totalPages = Math.floor(offsetLast / scope.pagerConfiguration.limit) + 1;
                        }
                    });
                }
            }
        };
    }]
);

angular.module(
    'spectrumLib.components.pagerModel',
    [
    ]
).factory(
    'SpectrumPagerModel',
    function () {
        return {

        };
    }
);

angular.module(
    'spectrumLib.components.pageHeaderController',
    [
    ]
).controller(
    'SpectrumPageHeaderController',
    [
        '$scope',
        '$window',
        '$modal',
        'SpectrumPageHeaderModel',
        'SpectrumLocaleModel',
        function (
            $scope,
            $window,
            $modal,
            SpectrumPageHeaderModel,
            SpectrumLocaleModel) {
            $scope.pageHeaderModel = SpectrumPageHeaderModel;

            $scope.canShow = {
                info: function () {
                    if (SpectrumPageHeaderModel.getHeaderId() !== null &&
                      SpectrumLocaleModel.getLocalizedDocumentLink(SpectrumPageHeaderModel.getHeaderId()) !== null) {
                        return true;
                    } else {
                        return false;
                    }
                },
                isTitleSet: function () {
                    return SpectrumPageHeaderModel.getTitle();
                }
            };

            $scope.clickHandler = {
                info: function () {
                    if (SpectrumPageHeaderModel.isPopup()) {
                        console.log(SpectrumPageHeaderModel.getlstCourse());
                        $scope.courses = SpectrumPageHeaderModel.getlstCourse();
                        var url = 'spectrum-lib-ui/components/page-header/page-header-popup/page-header-popup.html';
                        $modal.open(
                            {
                                templateUrl: url,
                                scope: $scope,
                                size: 'md'
                            }
                        );

                    } else {
                        var origin = $window.location.origin;
                        $window.open(origin + SpectrumLocaleModel
                                        .getLocalizedDocumentLink(SpectrumPageHeaderModel.getHeaderId()));
                    }
                },
                openLink: function(url) {
                    var origin = $window.location.origin;
                    $window.open(origin+url);
                },
                closeButton: function () {
                    $scope.$dismiss('close');
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.pageHeaderDirective',
    [
    ]
).directive(
    'spectrumPageHeader',
    function factory() {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'spectrum-lib-ui/components/page-header/page-header-view.html'
        };
    }
);

/* global angular */
/**
 * @ngdoc object
 * @name PageHeaderModel
 * @function
 * @description
 *
 * This is the model for the page header.
 *
 * Every page has one page header, which consists of two parts:
 *      - the title, which is the main text
 *      - the muted title, which is an appendix to the title, but of lesser importance (hence muted)
 *
 * A unique id can be set for each page header as well
 */

angular.module(
    'spectrumLib.components.pageHeaderModel',
    [
    ]
).factory(
    'SpectrumPageHeaderModel',
    [
        '$filter',
        function ($filter) {
            var _title = '',
                _headerId = null,
                _titleVars = null,
                _titleMuted,
                _isPopup = false,
                _lstCourses;

            return {
                /**
                 * @ngdoc method
                 * @name PageHeaderModel#setTitle
                 * @methodOf PageHeaderModel
                 * @param {String} newTitle The new value for the page header title.
                 * @param {Object=} newTitleVars The new variables of the page header title.
                 * @returns {void} void
                 */
                setTitle: function (newTitle, newTitleVars) {
                    _title = newTitle;
                    _titleVars = angular.isDefined(newTitleVars) ? newTitleVars : null;
                },

                /**
                 * @ngdoc method
                 * @name PageHeaderModel#getTitle
                 * @methodOf PageHeaderModel
                 * @returns {String} Page header title
                 */
                getTitle: function () {
                    if (_titleVars !== null) {
                        return $filter('translate')(_title, _titleVars);
                    } else {
                        return $filter('translate')(_title);
                    }
                },

                /**
                 * @ngdoc method
                 * @name PageHeaderModel#setTitleMuted
                 * @methodOf PageHeaderModel
                 * @param {String} newTitleMuted The new value for the muted page header title.
                 * @returns {void} void
                 */
                setTitleMuted: function (newTitleMuted) {
                    _titleMuted = newTitleMuted;
                },

                /**
                 * @ngdoc method
                 * @name PageHeaderModel#getTitleMuted
                 * @methodOf PageHeaderModel
                 * @returns {String} Page header title
                 */
                getTitleMuted: function () {
                    return _titleMuted;
                },

                /**
                 * @ngdoc method
                 * @name PageHeaderModel#setHeaderId
                 * @methodOf PageHeaderModel
                 * @param {String} newHeaderId The new unique id of the page header.
                 * @returns {void} void
                 */
                setHeaderId: function (newHeaderId) {
                    _headerId = newHeaderId;
                },

                /**
                 * @ngdoc method
                 * @name PageHeaderModel#getHeaderId
                 * @methodOf PageHeaderModel
                 * @returns {String} Unique page header id
                 */
                getHeaderId: function () {
                    return _headerId;
                },
                /**
                 * @ngdoc method
                 * @name PageHeaderModel#setisPopup
                 * @methodOf PageHeaderModel
                 * @param {String} newHeaderId The new unique id of the page header.
                 * @returns {void} void
                 */
                setPopup: function (isPopup) {
                    _isPopup = isPopup;
                },

                /**
                 * @ngdoc method
                 * @name PageHeaderModel#isPopup
                 * @methodOf PageHeaderModel
                 * @returns {String} Unique page header id
                 */
                isPopup: function () {
                    return _isPopup;
                },
                /**
                 * @ngdoc method
                 * @name PageHeaderModel#setisPopup
                 * @methodOf PageHeaderModel
                 * @param {String} newHeaderId The new unique id of the page header.
                 * @returns {void} void
                 */
                setlstCourses: function (lstCourses) {
                    _lstCourses = lstCourses;
                },

                /**
                 * @ngdoc method
                 * @name PageHeaderModel#isPopup
                 * @methodOf PageHeaderModel
                 * @returns {String} Unique page header id
                 */
                getlstCourse: function () {
                    return _lstCourses;
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.pendingMembershipController',
    [
    ]
).controller(
    'SpectrumPendingMembershipController',
    [
        '$scope',
        '$window',
        'SpectrumOrganisationService',
        function ($scope, $window, SpectrumOrganisationService) {

            /*
                Allow for the pending membership Approval message to be permanently turned on or off
             */
            function setShowPendingMembership(pendingApproval) {
                SpectrumOrganisationService.setPendingApproval(pendingApproval);
            }

            $scope.canShow = {
                pendingMembershipMessage: function () {
                    return SpectrumOrganisationService.isPendingApproval();
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.pendingMembershipDirective',
    [
    ]
).directive(
    'spectrumPendingMembership',
    function factory() {
        return {
            restrict: 'A',
            scope: true,
            templateUrl: 'spectrum-lib-ui/components/pending-membership/pending-membership-view.html'
        };
    }
);

angular.module(
    'spectrumLib.components.trackingService',
    [
    ]
).service(
    'SpectrumTrackingService',
    [
        '$http',
        '$q',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        function ($http,
                  $q,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel) {
            var _cachedResults = null,
                url = function (uri, params) {
                    return SpectrumServiceUtil.createServiceUrlWithContextPath(
                      SpectrumServiceUtil.setURLParameters(uri, params)
                    );
                },
                getAll = function (forceReload) {
                    var deferred = $q.defer(),
                        request;

                    if (_cachedResults === null || forceReload) {
                        request = $http({
                            url: url(SpectrumServiceEndpointModel.TRACKING.CONFIG),
                            method: 'GET'
                        });
                        request.then(
                            function successHandler (successResponse) {
                                _cachedResults = successResponse.data;
                                deferred.resolve(_cachedResults);
                            },
                            function errorHandler (errorResponse) {
                                _cachedResults = {};
                                deferred.resolve(_cachedResults);
                            }
                        );
                    } else {
                        deferred.resolve(_cachedResults);
                    }

                    return deferred.promise;
                };

            return {
                url: url,
                getAll: getAll
            };
        }
    ]
);


angular.module(
    'spectrumLib.components.treeViewController',
    [
    ]
).controller(
    'SpectrumTreeViewController',
    [
        '$scope',
        '$document',
        '$timeout',
        'SpectrumTreeViewModel',
        function ($scope, $document, $timeout, SpectrumTreeViewModel) {
            var filteredData = [],
                isMultiselect = false;

            $scope.treeViewModel = SpectrumTreeViewModel;
            $scope.listTemplateURL = 'spectrum-lib-ui/components/tree-view/tpl/tree-view-list-template.html';
            $scope.open = false;
            $scope.leafPostfixIcon = '';
            $scope.leafPostfixTranslatePrefix = '';

            function initialise () {
                $document.on('click', function (event) {
                    if ($scope.open && event.target.id.indexOf('tree-view-' + $scope.treeId) === -1) {
                        $timeout(function () {
                            $scope.open = false;
                        }, 0);
                    }
                });

                $scope.$watch('multiselect', function (val) {
                    isMultiselect = val;
                    if (isMultiselect === true) {
                      $scope.$watchCollection(
                        'model',
                        function (newValues, oldValues) {
                          SpectrumTreeViewModel.updateSelectedNodes(newValues, oldValues);
                        }
                      );
                    } else {
                      $scope.$watch(
                        'model',
                        function (newValue, oldValue) {
                          SpectrumTreeViewModel.updateSelectedNode(newValue, oldValue);
                        }
                      );
                    }
                });

                SpectrumTreeViewModel.setProperties({
                    code: $scope.$parent.nodeId,
                    label: $scope.$parent.nodeLabel,
                    postfix: $scope.$parent.nodeLabelPostfixProperty
                });

                $scope.leafPostfixIcon = $scope.$parent.nodeLabelPostfixIcon;
                $scope.leafPostfixTranslatePrefix = $scope.$parent.nodeLabelPostfixTranslatePrefix;

                $scope.$watch('searchString', function (val) {
                    if ($scope.open && angular.isString(val) && val.length >= 3) {
                        $scope.filterData(val);
                    }
                });
            }

            $scope.filterData = function (searchString) {
                if (angular.isArray($scope.treeModel)) {
                    var val = searchString || $scope.searchString;
                    filteredData = $scope.treeModel.filter(function (leaf) {
                        var lowerCaseSearchString = val.toLowerCase(),
                            name = leaf.name.toLowerCase(),
                            groupName = leaf.groupName.toLowerCase(),
                            subGroupName = leaf.subGroupName.toLowerCase();

                        return name.indexOf(lowerCaseSearchString) !== -1 ||
                            groupName.indexOf(lowerCaseSearchString) !== -1 ||
                            subGroupName.indexOf(lowerCaseSearchString) !== -1;
                    });
                    SpectrumTreeViewModel.setTreeData(filteredData);

                    if (isMultiselect === true) {
                        SpectrumTreeViewModel.updateSelectedNodes($scope.model, []);
                    } else {
                        SpectrumTreeViewModel.updateSelectedNode($scope.model, null);
                    }
                }
            };

            $scope.keyHandler = {
                keyDown: function (event) {
                    switch (event.keyCode) {
                        case 13:
                            event.preventDefault();
                            event.stopImmediatePropagation();

                            $scope.open = true;

                            if (angular.isString($scope.searchString) && $scope.searchString.length >= 3) {
                                $scope.filterData();
                            }

                            break;

                        case 27:
                            if ($scope.open) {
                                $scope.open = false;
                            }

                            break;
                    }
                }
            };

            $scope.clickHandler = {
                nodeLabel: function (node, event) {
                    event.cancelBubble = true;
                    if (node[$scope.nodeChildren].length === 0) {
                        node.selected = !node.selected;
                        if (isMultiselect === true) {
                          if (node.selected) {
                            $scope.model.push(node[$scope.nodeId]);
                          } else {
                            var index = $scope.model.indexOf(node[$scope.nodeId]);
                            if (index !== -1) {
                              $scope.model.splice(index, 1);
                            }
                          }
                        } else {
                          $scope.$parent.model = node.selected ? node[$scope.nodeId] : null;

                            var toFind = 'finding-edit-issueTitle-';
                            var selectElementId = event.currentTarget.offsetParent.id;
                            var startPosition = selectElementId.indexOf(toFind);
                            var endPosition = selectElementId.indexOf('-list');
                            var number = selectElementId.substring(startPosition + toFind.length, endPosition);

                            var possibleNames = ['tree-view-finding-edit-issue-title-', 
                                'finding-view-issueTitle-',
                                'SMETA_FULL_finding-edit-issue-title-'];

                            // getting the dropbox
                            var selectElement =  null;
                            for (var i = 0; i < possibleNames.length; i++) {
                                selectElement = document.getElementById(possibleNames[i] + number);
                                if (selectElement != null) {
                                    break;
                                }
                            }
                            
                            // if the select element was found
                            if (selectElement != null) {
                                
                                // getting the name of select element
                                var treeViewFindingEditIssueTitleName = selectElement.name;

                                // getting the div container
                                var div = selectElement.parentElement;

                                // removing the dropbox
                                div.removeChild(selectElement);

                                //Create an input type dynamically.
                                var textboxElement = document.createElement('input');
                                textboxElement.setAttribute('type', 'text');
                                textboxElement.setAttribute('class', 'form-control ng-pristine ng-valid');
                                textboxElement.setAttribute('value', node.name);
                                textboxElement.setAttribute('name', treeViewFindingEditIssueTitleName);
                                textboxElement.setAttribute('disabled', true);

                                // inserting the new textbox component before the search button
                                div.insertBefore(textboxElement,  div.firstChild);
                            }
                        }
                    } else {
                        node.collapsed = !node.collapsed;
                        node.children.forEach(
                            function (childNode) { 
                                if (childNode[$scope.nodeChildren].length > 0) {
                                  childNode.collapsed = true;
                                }
                            }
                        );
                    }
                },
                toggleDropdownButton: function () {
                    $scope.open = !$scope.open;

                    if ($scope.open && angular.isString($scope.searchString) && $scope.searchString.length >= 3) {
                        $scope.filterData();
                    }
                },
                selectFromListButton: function () {
                    $scope.open = !$scope.open;
                    $scope.searchString = '';
                    SpectrumTreeViewModel.setTreeData($scope.treeModel);
                    $scope.filterData();
                    $scope.treeViewModel.getTreeData().forEach(
                        function (node) { 
                            if (node[$scope.nodeChildren].length > 0) {
                              node.collapsed = true;
                            }
                        }
                    );
                }
            };

            $scope.canBeIncluded = {
                nodeChildren: function (node) {
                    return !node.collapsed && node[$scope.nodeChildren].length > 0;
                }
            };

            $scope.canShow = {
                folderClosed: function (node) {
                    return node[$scope.nodeChildren].length > 0 && node.collapsed === true;
                },
                folderOpened: function (node) {
                    return node[$scope.nodeChildren].length > 0 && node.collapsed === false;
                },
                nodeSelected: function (node) {
                    return node[$scope.nodeChildren].length === 0 && node.selected === true;
                },
                nodeUnSelected: function (node) {
                    return node[$scope.nodeChildren].length === 0 && node.selected === false;
                },
                leafPostfixIcon: function (node) {
                    return false;
                }
            };

            initialise();
        }
    ]
);

angular.module(
    'spectrumLib.components.treeViewDirective',
    [
    ]
).directive(
    'spectrumTreeView',
    function factory($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                model: '=ngModel',
                searchString: '=',
                treeId: '@',
                treeModel: '=',
                selectionRequired: '=',
                multiselect: '=',
                nodeId: '@',
                nodeLabel: '@',
                nodeLabelPostfixProperty: '@',
                nodeLabelPostfixTranslatePrefix: '@',
                nodeLabelPostfixIcon: '@',
                nodeChildren: '@'
            },
            templateUrl: 'spectrum-lib-ui/components/tree-view/tree-view-view.html',
            link: function (scope, elm, attrs, ngModel) {
                var selectionRequired = angular.isDefined(attrs.selectionRequired),
                    validator = function (value) {
                        if (selectionRequired) {
                            ngModel.$setValidity('selectionRequired', isRequired(value));
                        }

                        return value;
                };

                if (!ngModel) {
                    return;
                }

                scope.$watch(
                    function () {
                        return ngModel.$viewValue;
                    }, function (newValue, oldValue) {
                        $timeout(function () {
                            validator();
                        });
                    }
                );

                function isRequired(value) {
                    if (!angular.isDefined(value) || value === null) {
                        return true;
                    } else if (angular.isArray(value) && value.length === 0) {
                        return true;
                    } else if (angular.isString(value) && value.trim().length === 0) {
                        return true;
                    } else {
                        return false;
                    }
                }


                ngModel.$parsers.unshift(validator);
                ngModel.$formatters.unshift(validator);
            }
        };
    }
);

angular.module(
    'spectrumLib.components.treeViewModel',
    [
    ]
).factory(
    'SpectrumTreeViewModel',
    function () {
        var _treeData = [],
            _lookup = {},
            _properties,
            _updateSelectedNodes = function (newNodes, oldNodes) {
                console.time('_updateSelectedNodes');
                if (angular.isArray(newNodes) && angular.isArray(oldNodes)) {
                    var i, j;

                    // Deselect old ones
                    for (i = 0; i < oldNodes.length; i += 1) {
                        if (_lookup.hasOwnProperty(oldNodes[i])) {
                            _lookup[oldNodes[i]].selected = false;
                        }
                    }

                    // Select new ones
                    for (j = 0; j < newNodes.length; j += 1) {
                        if (_lookup.hasOwnProperty(newNodes[j])) {
                            _lookup[newNodes[j]].selected = true;
                        }
                    }
                }
                console.timeEnd('_updateSelectedNodes');
            },
            _updateSelectedNode = function (newNode, oldNode) {
              if (oldNode !== null && _lookup.hasOwnProperty(oldNode)) {
                _lookup[oldNode].selected = false;
              }

              if (newNode !== null && _lookup.hasOwnProperty(newNode)) {
                _lookup[newNode].selected = true;
              }
            },
            _setProperties = function (newProperties) {
                _properties = newProperties;
            },
            _getTreeData = function () {
                return _treeData;
            },
            _buildTreeData = function (data) {
                _treeData = [];
                if (angular.isArray(data)) {
                    _lookup = {};

                    /* Looping through the flat hierarchy and creating tree nodes,
                    while storing all parent/grandparent nodes in a lookup table */
                    data.forEach(function (leaf) {
                        var leafNode = {
                            code: leaf[_properties.code],
                            name: leaf[_properties.label],
                            parent: leaf.groupName + '#' + leaf.subGroupName,
                            postfix: leaf[_properties.postfix],
                            collapsed: false,
                            selected: false,
                            children: []
                        };

                        if (!_lookup.hasOwnProperty(leafNode.code)) {
                            _lookup[leafNode.code] = leafNode;
                        }

                        /* Creating parent nodes and storing their child nodes */
                        if (!_lookup.hasOwnProperty(leafNode.parent)) {
                            _lookup[leafNode.parent] = {
                                code: null,
                                name: leaf.subGroupName,
                                parent: leaf.groupName,
                                postfix: null,
                                collapsed: false,
                                selected: false,
                                children: []
                            };
                        }
                        _lookup[leafNode.parent].children.push(leafNode);

                        /* Creating grandparent nodes and pushing them into the final tree */
                        if (!_lookup.hasOwnProperty(leaf.groupName)) {
                            var parentNode = {
                                code: null,
                                name: leaf.groupName,
                                parent: null,
                                postfix: null,
                                collapsed: false,
                                selected: false,
                                children: []
                            };
                            _treeData.push(parentNode);
                            _lookup[leaf.groupName] = parentNode;
                        }
                    });

                    /* Finding parent nodes (with their children) in the lookup table and adding them to their parent */
                    for (var key in _lookup) {
                        if (_lookup.hasOwnProperty(key)) {
                            var node = _lookup[key];
                            if (node.parent !== null && node.children.length !== 0) {
                                var parent = node.parent;
                                _lookup[parent].children.push(node);
                            }
                        }
                    }
                }
            },
            _setTreeData = function (newTreeData) {
                _buildTreeData(newTreeData);
            };
        return {
            getTreeData: _getTreeData,
            setTreeData: _setTreeData,
            setProperties: _setProperties,
            updateSelectedNodes: _updateSelectedNodes,
            updateSelectedNode: _updateSelectedNode
        };
    }
);

angular.module(
    'spectrumLib.components.typeaheadDirective',
    [
    ]
).directive(
    'spectrumTypeahead',
    [
        '$document',
        '$timeout',
        'SpectrumTypeaheadService',
        'SpectrumServiceUtil',
        function ($document, $timeout, SpectrumTypeaheadService, SpectrumServiceUtil) {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    asyncUrl: '=',
                    pageSize: '=',
                    minLength: '=',
                    delay: '=',
                    displayName: '@',
                    displayFunction: '&',
                    displayItems: '=',
                    displayItemsFilterFunction: '&',
                    defaultSelectedItem: '=',
                    defaultSearchString: '=',
                    selectHandler: '&',
                    valueProperty: '@',
                    typeaheadId: '@'
                },
                link: function (scope, element, attrs, modelCtrl) {
                    if (!modelCtrl) {
                        return;
                    }

                    var currentOffset = 0,
                        nextURL = null,
                        previousURL = null,
                        isOpen = false,
                        url,
                        request,
                        pendingRequestCount = 0;

                    clearMatches();
                    scope.searchString = scope.defaultSearchString || '';
                    scope.searchStringInitialized = false;
                    scope.isLoading = false;

                    $document.on('click', function (event) {
                        if (isOpen && document.getElementById(scope.typeaheadId).contains(event.target) === false) {
                            $timeout(function () {
                                isOpen = false;
                            }, 0);
                        }
                    });

                    modelCtrl.$render = function () {
                        if (angular.isUndefined(modelCtrl.$modelValue) || modelCtrl.$modelValue === null) {
                            scope.searchString = '';
                        }
                    };

                    modelCtrl.$viewChangeListeners.push(function () {
                        scope.$eval(attrs.ngChange);
                    });

                    scope.onChange = function () {
                        currentOffset = 0;

                        if (angular.isDefined(scope.asyncUrl)) {
                            // escape special character:
                            var searchTxt = encodeURIComponent(scope.searchString);
                            if (scope.searchString.length >= scope.minLength) {
                                url = SpectrumServiceUtil.setURLParameters(
                                    scope.asyncUrl,
                                    [searchTxt, currentOffset, scope.pageSize]);
                                delayRequest(url);
                            } else {
                                abortRequest();
                                clearMatches();
                            }
                        } else if (angular.isDefined(scope.displayItems) &&
                            angular.isFunction(scope.displayItemsFilterFunction())) {
                            if ((scope.searchString.length >= scope.minLength)) {
                                scope.matches = scope.displayItemsFilterFunction().call(this,
                                    scope.displayItems, scope.searchString);
                            } else {
                                clearMatches();
                            }
                        }
                    };

                    scope.getLabelForItem = function (item) {
                        if (angular.isUndefined(scope.displayName) && (angular.isFunction(scope.displayFunction()))) {
                            return scope.displayFunction().call(this, item);
                        } else if (angular.isDefined(scope.displayName) && item.hasOwnProperty(scope.displayName)) {
                            return item[scope.displayName];
                        } else {
                            return item;
                        }
                    };

                    scope.getIDForItem = function (item) {
                        if (angular.isDefined(scope.valueProperty) && item.hasOwnProperty(scope.valueProperty)) {
                            return item[scope.valueProperty];
                        } else {
                            return item;
                        }
                    };

                    scope.isDisabled = {
                        nextButton: function () {
                            return nextURL === null;
                        },
                        previousButton: function () {
                            return previousURL === null;
                        },
                        inputField: function () {
                            return angular.isDefined(modelCtrl.$modelValue) && modelCtrl.$modelValue !== null;
                        }
                    };

                    scope.canShow = {
                        previousButton: function () {
                            return pendingRequestCount === 0 && currentOffset > 0;
                        },
                        nextButton: function () {
                            return (pendingRequestCount === 0 &&
                            scope.matches.length > 0 &&
                            scope.matches.length === scope.pageSize);
                        },
                        results: function () {
                            return pendingRequestCount === 0 && scope.matches.length > 0;
                        },
                        resultsPopUp: function () {
                            return (isOpen === true) && (scope.isLoading === false);
                        },
                        removeButton: function () {
                            return angular.isDefined(modelCtrl.$modelValue) && modelCtrl.$modelValue !== null;
                        },
                        loadingSpinner: function () {
                            return pendingRequestCount > 0;
                        }
                    };

                    scope.actionHandler = {
                        onInputFocus: function () {
                            isOpen = angular.isDefined(scope.matches) && (scope.matches.length > 0);
                        }
                    };

                    scope.clickHandler = {
                        nextButton: function () {
                            getMatches(nextURL);
                        },
                        previousButton: function () {
                            getMatches(previousURL);
                        },
                        item: function (item) {
                            if (angular.isDefined(scope.valueProperty) && item.hasOwnProperty(scope.valueProperty)) {
                                modelCtrl.$setViewValue(item[scope.valueProperty]);
                            } else {
                                modelCtrl.$setViewValue(item);
                            }
                            modelCtrl.$render();
                            scope.searchString = scope.getSelectedLabelForItem(item);
                            isOpen = false;
                            if (angular.isFunction(scope.selectHandler())) {
                                scope.selectHandler()(item);
                            }
                        },
                        removeButton: function () {
                            modelCtrl.$setViewValue(null);
                            modelCtrl.$render();
                            isOpen = false;
                            currentOffset = 0;
                            clearMatches();
                        }
                    };

                    function clearMatches() {
                        scope.matches = angular.isDefined(scope.displayItems) ? scope.displayItems : [];
                        isOpen = angular.isDefined(scope.matches) && (scope.matches.length > 0);
                        nextURL = null;
                        previousURL = null;
                    }

                    function delayRequest(url) {
                        if (delayRequest.timeout) {
                            clearTimeout(delayRequest.timeout);
                        }

                        var target = this;

                        delayRequest.timeout = setTimeout(function () {
                            getMatches.call(target, url);
                        }, angular.isDefined(scope.delay) ? parseInt(scope.delay, 10) : 0);
                    }

                    function abortRequest() {
                        if (request) {
                            request.abort();
                        }
                    }

                    function getMatches(url) {
                        scope.isLoading = true;
                        abortRequest();
                        clearMatches();
                        pendingRequestCount++;

                        (request = SpectrumTypeaheadService.call(url)).then(
                            function successHandler (successResponse) {
                                if (successResponse !== null) {
                                    if (angular.isArray(successResponse.results)) {
                                      scope.matches = successResponse.results;
                                    }
                                    if (angular.isDefined(successResponse.links)) {
                                      nextURL = successResponse.links.next;
                                      previousURL = successResponse.links.previous;
                                    }
                                    currentOffset = successResponse.offset || 0;
                                }
                            },
                            function errorHandler (errorResponse) {
                                clearMatches();
                            }
                        )['finally'](function () {
                            pendingRequestCount--;
                            scope.isLoading = false;
                            isOpen = angular.isDefined(scope.matches) && (scope.matches.length > 0);
                        });
                    }

                    scope.getSelectedLabelForItem = function (item) {
                        if (angular.isFunction(scope.displayFunction())) {
                            return scope.displayFunction().call(this, item);
                        } else {
                            return item;
                        }
                    };

                    if (angular.isDefined(scope.defaultSelectedItem)) {
                        scope.$watch('defaultSelectedItem', function(item) {
                            if (item) {
                                scope.clickHandler.item(item);
                            }
                        });
                    }

                    if (angular.isDefined(scope.defaultSearchString)) {
                        // enables delayed loading of the default search string
                        var defaultSearchStringListener = scope.$watch('defaultSearchString', function(str) {
                            if (scope.searchStringInitialized === false && str) {
                                scope.searchString = str || '';
                                scope.searchStringInitialized = true;
                            }

                            if (scope.searchStringInitialized === true) {
                                defaultSearchStringListener();
                            }
                        });
                    }
                },
                templateUrl: 'spectrum-lib-ui/components/typeahead/typeahead-view.html'
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.typeaheadService',
    [
    ]
).service(
    'SpectrumTypeaheadService',
    [
        '$http',
        '$q',
        function ($http, $q) {
            return {
                call: function (url) {
                    var deferred = $q.defer(),
                        request = $http({
                            method: 'get',
                            url: url,
                            timeout: deferred.promise
                        }),
                        promise = request.then(
                            function successHandler (successResponse) {
                                return (successResponse.data);
                            },
                            function errorHandler (errorResponse) {
                                return ($q.reject('Something went wrong'));
                            }
                        );

                    promise.abort = function () {
                        deferred.resolve();
                    };

                    promise['finally'](
                        function () {
                            console.info('Cleaning up object references');

                            promise.abort = angular.noop;

                            deferred = request = promise = null;
                        }
                    );

                    return promise;
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.passwordController',
    [
    ]
).controller(
    'SpectrumPasswordController',
    [
        '$scope',
        '$window',
        'SpectrumPasswordService',
        'SpectrumPasswordModel',
        function ($scope,
                  $window,
                  SpectrumPasswordService,
                  SpectrumPasswordModel) {
            SpectrumPasswordModel.password = '';
            SpectrumPasswordModel.confirmPassword = '';

            $scope.passwordModel = SpectrumPasswordModel;
            $scope.success = null;
            $scope.error = null;
            $scope.doNotMatch = null;
            $scope.passwordValidationError = null;

            var isDisallowedWordsVisible = false,
                isPasswordChangedSuccessful = false;

            $scope.changePassword = function () {
                $scope.success = null;
                $scope.error = null;
                $scope.doNotMatch = null;
                $scope.passwordValidationError = null;

                var password = $scope.passwordModel.password,
                    confirmPassword = $scope.passwordModel.confirmPassword;

                if (!password || !confirmPassword) {
                    $scope.passwordValidationError = 'ERROR';
                } else if (password !== confirmPassword) {
                    $scope.doNotMatch = 'ERROR';
                } else {
                    $scope.doNotMatch = null;

                    SpectrumPasswordService.changePassword(password).then(
                        function successHandler() {
                            isPasswordChangedSuccessful = true;
                        },
                        function errorHandler(httpResponse) {
                            $scope.success = null;

                            if (httpResponse.status === 409) {
                                $scope.passwordValidationError = 'ERROR';
                                $scope.error = null;
                            } else {
                                $scope.passwordValidationError = null;
                                $scope.error = 'ERROR';
                            }
                        }
                    );
                }
            };

            $scope.canShow = {
                disallowedWords: function () {
                    return isDisallowedWordsVisible;
                },
                changePasswordSuccessful: function () {
                    return isPasswordChangedSuccessful;
                }
            };

            $scope.clickHandler = {
                confirmButton: function () {
                    $scope.changePassword();
                },
                closeButton: function () {
                    $scope.$dismiss('close');
                },
                toggleDisallowedWords: function () {
                    isDisallowedWordsVisible = !isDisallowedWordsVisible;
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.passwordModel',
    [
    ]
).factory(
    'SpectrumPasswordModel',
    [
        function () {
            var _password = '',
                _confirmPassword = '';

            return {
                password: _password,
                confirmPassword: _confirmPassword
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.passwordService',
    [
    ]
).service(
    'SpectrumPasswordService',
    [
        '$http',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        function ($http,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel) {
            var _changePassword = function (password) {
                    var data = {
                            password: password
                        },
                        url = SpectrumServiceUtil.createServiceUrlWithCustomContextPath(
                                SpectrumServiceEndpointModel.SSO.CONTEXT_PATH,
                                SpectrumServiceEndpointModel.SSO.CHANGE_PASSWORD),
                        config = {
                            method: 'POST',
                            url: url,
                            data: angular.toJson(data)
                        };

                    return $http(config);
                };

            return {
                changePassword: _changePassword
            };
        }
    ]
);

angular.module(
    'spectrumLib.core.activityService',
    [
    ]
).service(
    'ActivityService',
    [
        '$http',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        'SpectrumContextPathService',
        'SpectrumContextPathModel',
        function ($http,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel,
                  SpectrumContextPathService,
                  SpectrumContextPathModel) {
            return {
                url: function (contextPath, uri, params) {
                    return SpectrumServiceUtil.createServiceUrlWithCustomContextPath(
                        contextPath,
                        SpectrumServiceUtil.setURLParameters(uri, params)
                    );
                },
                checkMissingIndustryClassification: function (orgCode) {
                    var url = this.url;
                    return SpectrumContextPathService.getAll().then(
                        function successHandler (data) {
                            if (angular.isArray(data)) {
                                var filteredPaths = data.filter(function (path) {
                                    return path.contextKey === SpectrumContextPathModel.key.DASHBOARD;
                                });
                                if (angular.isDefined(filteredPaths[0])) {
                                    return $http({
                                        url: url(
                                            filteredPaths[0].contextValue,
                                            SpectrumServiceEndpointModel.ACTIVITIES.CHECK_ICS,
                                            [ orgCode ]
                                        ),
                                        method: 'GET'
                                    });
                                }
                            }
                        }
                    );
                },
                publishICSNotificationEvent: function (orgCode) {
                    var url = this.url;
                    return SpectrumContextPathService.getAll().then(
                        function successHandler (data) {
                            if (angular.isArray(data)) {
                                var filteredPaths = data.filter(function (path) {
                                    return path.contextKey === SpectrumContextPathModel.key.DASHBOARD;
                                });
                                if (angular.isDefined(filteredPaths[0])) {
                                    return $http({
                                        url: url(
                                            filteredPaths[0].contextValue,
                                            SpectrumServiceEndpointModel.ACTIVITIES.PUBLISH_ICS_EVENT,
                                            [ orgCode ]
                                        ),
                                        method: 'POST'
                                    });
                                }
                            }
                        }
                    );
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.core.HATEOASHelper',
    [
    ]
).factory(
    'SpectrumHATEOASHelper',
    function () {
        function HATEOASHelper() {}

        HATEOASHelper.getLinkActionByRel = function (hateoasObj, rel) {
            var linkAction = null,
                filteredLinks,
                links = [];

            if (hateoasObj.hasOwnProperty('links') && angular.isArray(hateoasObj.links)) {
                links = hateoasObj.links;
            } else if (angular.isArray(hateoasObj)) {
                links = hateoasObj;
            }

            filteredLinks = links.filter(function (link) {
                return link.rel === rel;
            });

            if (angular.isDefined(filteredLinks[0])) {
                linkAction = filteredLinks[0];
            }

            return linkAction;
        };

        return (HATEOASHelper);
    }
);

angular.module(
    'spectrumLib.core.contextPathModel',
    [
    ]
).factory(
    'SpectrumContextPathModel',
    [
        function () {
            var _key = {
                DASHBOARD: 'DASHBOARD',
                ORGANISATION: 'ORGANISATION',
                USER: 'USER',
                AUDIT: 'AUDIT',
                QUESTIONNAIRES: 'QUESTIONNAIRES',
                PAYMENTS: 'PAYMENTS',
                SSO: 'SSO'
            };

            return {
                key: _key
            };
        }
    ]
);

angular.module(
    'spectrumLib.core.contextPathService',
    [
    ]
).service(
    'SpectrumContextPathService',
    [
        '$http',
        '$q',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        function ($http,
                  $q,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel) {
            var _cachedResults = null,
                url = function (uri, params) {
                    return SpectrumServiceUtil.createServiceUrlWithContextPath(
                      SpectrumServiceUtil.setURLParameters(uri, params)
                    );
                },
                getAll = function (forceReload) {
                    var deferred = $q.defer(),
                        request;

                    if (_cachedResults === null || forceReload) {
                        request = $http({
                            url: url(SpectrumServiceEndpointModel.NAVIGATION.APPS),
                            method: 'GET'
                        });
                        request.then(
                            function successHandler (successResponse) {
                                _cachedResults = successResponse.data;
                                deferred.resolve(_cachedResults);
                            },
                            function errorHandler (errorResponse) {
                                _cachedResults = [];
                                deferred.resolve(_cachedResults);
                            }
                        );
                    } else {
                        deferred.resolve(_cachedResults);
                    }

                    return deferred.promise;
                };

            return {
                url: url,
                getAll: getAll
            };
        }
    ]
);

angular.module(
    'spectrumLib.core.contextPathUtil',
    [
    ]
).factory(
    'SpectrumContextPathUtil',
    [
        '$window',
        '$q',
        'SpectrumContextPathService',
        'SpectrumApplicationModel',
        'SpectrumServiceUtil',
        function ($window,
                  $q,
                  SpectrumContextPathService,
                  SpectrumApplicationModel,
                  SpectrumServiceUtil) {
            var navigateToURL = function (applicationName, moduleName, params) {
                SpectrumContextPathService.getAll().then(
                    function (data) {
                        if (angular.isArray(data)) {
                            var filteredPaths = data.filter(function (path) {
                                    return path.contextKey === applicationName;
                                }),
                                url = '',
                                origin = $window.location.origin;

                            if (angular.isUndefined(origin)) {
                                origin = $window.location.protocol + '//' + $window.location.hostname +
                                ($window.location.port ? ':' + $window.location.port: '');
                            }

                            if (angular.isDefined(filteredPaths[0])) {
                                url += origin;
                                url += '/' + filteredPaths[0].contextValue + '/';
                                url += '#';
                                url += SpectrumApplicationModel.getMappedValue(applicationName, moduleName);
                                url = SpectrumServiceUtil.setURLParameters(url, params);

                                $window.location.href = url;
                            }
                        }
                    }
                );
              },

                urlOfNavigateToURL = function(applicationName, moduleName, params) {
                    var deferred = $q.defer();
                    SpectrumContextPathService.getAll().then(
                        function sucessHandler(data) {
                            if (angular.isArray(data)) {
                                var filteredPaths = data.filter(function(path) {
                                        return path.contextKey === applicationName;
                                    }),
                                    url = '',
                                    origin = $window.location.origin;

                                if (angular.isUndefined(origin)) {
                                    origin = $window.location.protocol + '//' + $window.location.hostname +
                                        ($window.location.port ? ':' + $window.location.port : '');
                                }

                                if (angular.isDefined(filteredPaths[0])) {
                                    url += origin;
                                    url += '/' + filteredPaths[0].contextValue + '/';
                                    url += '#';
                                    url += SpectrumApplicationModel.getMappedValue(applicationName, moduleName);
                                    url = SpectrumServiceUtil.setURLParameters(url, params);
                                }
                                deferred.resolve(url);
                            }
                        },
                        function errorHandler(error) {
                            deferred.reject(error);
                        }
                    );
                    return deferred.promise;
                },

              getServiceURL = function (applicationName, endpointUrl, params) {
                var deferred = $q.defer(),
                    filteredPaths = [],
                    url = null,
                    origin = null;

                SpectrumContextPathService.getAll().then(
                  function sucessHandler (data) {
                    if (angular.isArray(data)) {
                        filteredPaths = data.filter(function (path) {
                          return path.contextKey === applicationName;
                        });
                        url = '';
                        origin = $window.location.origin;

                      if (angular.isUndefined(origin)) {
                        origin = $window.location.protocol + '//' + $window.location.hostname +
                          ($window.location.port ? ':' + $window.location.port: '');
                      }

                      if (angular.isDefined(filteredPaths[0])) {
                        url += origin;
                        url += '/' + filteredPaths[0].contextValue + '/';
                        url += SpectrumServiceUtil.setURLParameters(endpointUrl, params);
                      }

                      deferred.resolve(url);
                    }
                  },
                  function errorHandler (error) {
                    deferred.reject(error);
                  }
                );

                return deferred.promise;
              };

            return {
                navigateToURL: navigateToURL,
                urlOfNavigateToURL: urlOfNavigateToURL,
                getServiceURL: getServiceURL
            };
        }
    ]
);

angular.module(
    'spectrumLib.core.logoutService',
    [
    ]
).service(
    'SpectrumLogoutService',
    [
        '$http',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        function ($http,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel) {
            return {
                url: function (uri, params) {
                    return SpectrumServiceUtil.createServiceUrlWithContextPath(
                      SpectrumServiceUtil.setURLParameters(uri, params)
                    );
                },
                logOut: function () {
                    localStorage.removeItem('pageModelData');
                    localStorage.removeItem('backButtonStack');

                    return $http({
                        url: this.url(SpectrumServiceEndpointModel.SECURITY.LOGOUT),
                        method: 'GET'
                    });
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.core.organisationService',
    [
    ]
).service(
    'SpectrumOrganisationService',
    [
        '$http',
        '$log',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        'SpectrumContextPathService',
        'SpectrumContextPathModel',
        function ($http,
                  $log,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel,
                  SpectrumContextPathService,
                  SpectrumContextPathModel) {
            var pendingApproval;
            return {
                url: function (contextPath, uri, params) {
                    return SpectrumServiceUtil.createServiceUrlWithCustomContextPath(
                        contextPath,
                        SpectrumServiceUtil.setURLParameters(uri, params)
                    );
                },
                getMy: function () {
                    var url = this.url;
                    return SpectrumContextPathService.getAll().then(
                        function successHandler (data) {
                            if (angular.isArray(data)) {
                                var filteredPaths = data.filter(function (path) {
                                    return path.contextKey === SpectrumContextPathModel.key.ORGANISATION;
                                });
                                if (angular.isDefined(filteredPaths[0])) {
                                    return $http({
                                        url: url(
                                            filteredPaths[0].contextValue,
                                            SpectrumServiceEndpointModel.ORGANISATION.SELF
                                        ),
                                        method: 'GET'
                                    });
                                }
                            }
                        }
                    );
                },
                isPendingApproval: function () {
                    if (angular.isUndefined(pendingApproval)) {
                        pendingApproval = false;
                        this.getMy().then(
                            function successHandler(successResponse) {
                                if (angular.isDefined(successResponse.data) &&
                                        angular.isDefined(successResponse.data.pendingApproval)) {
                                    pendingApproval = successResponse.data.pendingApproval;
                                }
                            },
                            function errorHandler(errorResponse) {
                                $log.error(errorResponse);
                            }
                        );
                    }
                    return pendingApproval;
                },
                setPendingApproval: function(pendingApproval) {
                    this.pendingApproval = pendingApproval;
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.core.pagerConfiguration',
    [
    ]
).factory(
    'SpectrumPagerConfiguration',
    function () {
        function PagerConfiguration (limit, contentProperty) {
            this.contentProperty = angular.isString(contentProperty) ? contentProperty : 'content';
            this.limit = angular.isNumber(limit) ? limit: 10;
            this.offset = 0;
            this.total = 1;
            this.content = [];
            this.links = [];
            this.isNewSearch = true;
        }

        PagerConfiguration.PAGE_LINKS = {
            FIRST: 'first',
            PREVIOUS: 'previous',
            NEXT: 'next',
            LAST: 'last'
        };

        PagerConfiguration.PAGE_LINKS_ARRAY = [
            PagerConfiguration.PAGE_LINKS.FIRST,
            PagerConfiguration.PAGE_LINKS.PREVIOUS,
            PagerConfiguration.PAGE_LINKS.NEXT,
            PagerConfiguration.PAGE_LINKS.LAST
        ];

        PagerConfiguration.getOffsetForLink = function (url) {
            var offset = null;

            if (angular.isString(url)) {
                var offsetRegExp = /offset=(\d*)/g,
                    match = offsetRegExp.exec(url);

                if (match !== null) {
                    offset = Number(match[1]);
                }
            }

            return offset;
        };

        PagerConfiguration.prototype = {
            dataPopulatedTag: false,
            clear: function () {
                this.offset = 0;
                this.links = [];
                this.content = [];
                this.total = 1;
                this.isNewSearch = true;
            },
            clearResults: function () {
                this.content = [];
                this.links = [];
            },
            populateFromJSON: function (json) {
                if (json) {
                    this.offset = json.offset || this.offset || 0;
                    this.total = json.total || 0;

                    // links = [ {"rel":"first","href":"http..." }, ... ]
                    if (angular.isArray(json.links)) {
                        this.links = json.links || [];
                    } else if (angular.isObject(json.links)) { // links = { "first": "http..." }
                        this.links = PagerConfiguration.PAGE_LINKS_ARRAY.map(function (linkType) {
                            return {
                                rel: linkType,
                                href: json.links[linkType]
                            };
                        });
                    } else {
                        this.links = [];
                    }

                    this.content = json[this.contentProperty];
                    this.dataPopulatedTag = !this.dataPopulatedTag;
                }
            },
            getLinkActionByRel: function (rel) {
                var linkAction = null,
                    filteredLinks;

                if (angular.isArray(this.links)) {
                    filteredLinks = this.links.filter(function (link) {
                        return link.rel === rel;
                    });

                    if (filteredLinks[0]) {
                        linkAction = filteredLinks[0];
                    }
                }

                return linkAction;
            },
            getLinkByRel: function (rel) {
                var link = null;

                if (this.links && this.links.hasOwnProperty(rel)) {
                    link = this.links[rel];
                }

                return link;
            },
            getCurrentPage: function () {
                return Math.floor(this.offset / this.limit) + 1;
            },
            getOffset: function() {
                return this.offset;
            },
            setOffset: function(newOffset) {
                this.offset = newOffset;
            },
            getPageSize: function() {
                return this.limit;
            },
            setPageSize: function(newPageSize) {
                this.limit = newPageSize;
            },
            getIsNewSearch: function () {
                return this.isNewSearch;
            },
            setIsNewSearch: function (newIsNewSearch) {
                this.isNewSearch = newIsNewSearch;
            }
        };

        return (PagerConfiguration);
    }
);

angular.module(
    'spectrumLib.core.vatNumberService',
    [
    ]
).service(
    'VatNumberService',
    [
        '$http',
        'SpectrumServiceUtil',
        'SpectrumServiceEndpointModel',
        'SpectrumContextPathService',
        'SpectrumContextPathModel',
        function ($http,
                  SpectrumServiceUtil,
                  SpectrumServiceEndpointModel,
                  SpectrumContextPathService,
                  SpectrumContextPathModel) {
            return {
                url: function (contextPath, uri, params) {
                    return SpectrumServiceUtil.createServiceUrlWithCustomContextPath(
                        contextPath,
                        SpectrumServiceUtil.setURLParameters(uri, params)
                    );
                },
                checkMissingVatNumber: function (userCode) {
                    var url = this.url;
                    return SpectrumContextPathService.getAll().then(
                        function successHandler (data) {
                            if (angular.isArray(data)) {
                                var filteredPaths = data.filter(function (path) {
                                    return path.contextKey === SpectrumContextPathModel.key.ORGANISATION;
                                });
                                if (angular.isDefined(filteredPaths[0])) {
                                    return $http({
                                        url: url(
                                            filteredPaths[0].contextValue,
                                            SpectrumServiceEndpointModel.ORGANISATION.CHECK_MISSING_VAT,
                                            [ userCode ]
                                        ),
                                        method: 'GET'
                                    });
                                }
                            }
                        }
                    );
                }
            };
        }
    ]
);

angular.module(
    'spectrumLib.components.tracking.cedexisRadarDirective',
    [
    ]
).directive(
    'spectrumTrackingCedexisRadar',
    ['SpectrumTrackingService', '$compile', function factory(SpectrumTrackingService, $compile) {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            link: function(scope, elm, attr) {
                SpectrumTrackingService.getAll().then(function(config) {
                    // This is simplified version of the tag required for cedexis
                    var a,
                        link = config['cedexis.radar.url'];

                    if (link) {
                        a = document.createElement('script');
                        a.async=!0; 
                        a.src=link;
                        document.body.appendChild(a);
                    }
                });

            } 
        };
    }] 
);

angular.module("spectrumLib.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("spectrum-lib-ui/components/collapsible-panel/collapsible-panel-view.html","<div class=\"panel panel-primary spectrum-collapsible-panel\" data-ng-controller=SpectrumCollapsiblePanelController><div class=\"panel-heading clearfix\"><h3 class=\"panel-title pull-left\" id=\"{{ id }}-title\" data-ng-click=clickHandler.toggleCollapse() data-translate=\"{{ title }}\"></h3><span class=\"spectrum-collapsible-panel-collapser pull-right glyphicon\" id=\"{{ id }}-collapser\" data-ng-click=clickHandler.toggleCollapse() data-ng-class=getIconClass()></span></div><div class=panel-body collapse=isCollapsed><div data-ng-transclude></div></div></div>");
$templateCache.put("spectrum-lib-ui/components/dropdown-multiselect/dropdown-multiselect-view.html","<div id=\"dropdown-multiselect-{{ id }}\" class=\"btn-group prj-dropdown-multiselect\" data-ng-class=\"{open: open}\" data-ng-controller=SpectrumDropdownMultiselectController><button id=\"dropdown-multiselect-button-{{ id }}\" type=button class=\"btn btn-default dropdown-toggle\" data-ng-click=openDropdown()>{{ buttonText() }} <span class=caret></span></button><ul class=dropdown-menu aria-labelledby=dropdownMenu id=\"dropdown-multiselect-list-{{ id }}\"><li><nav data-ng-show=canShow.filterButton()><ul class=pager><li><a data-ng-click=clickHandler.selectAllButton() data-translate=global.buttons.selectAll></a></li><li><a data-ng-click=clickHandler.clearAll() data-translate=global.buttons.reset></a></li></ul></nav></li><li data-ng-repeat=\"option in options\"><a id=\"dropdown-multiselect-item-{{ id }}-{{$index}}\" data-ng-click=setSelectedItem()>{{ getItemLabel(option) | translate }} <span id=\"dropdown-multiselect-tick-{{ id }}-{{$index}}\" data-ng-class=isChecked(option)></span></a></li><li role=presentation class=divider data-ng-show=canShow.pager()></li><li><nav data-ng-show=canShow.pager()><ul class=pager><li><a id=\"pager-previousButton-{{ id }}\" data-ng-disabled=isDisabled.previousButton() data-ng-click=clickHandler.previousButton() data-translate=global.pagination.previous></a></li><li><a id=\"pager-nextButton-{{ id }}\" data-ng-disabled=isDisabled.nextButton() data-ng-click=clickHandler.nextButton() data-translate=global.pagination.next></a></li></ul></nav></li></ul></div>");
$templateCache.put("spectrum-lib-ui/components/error/error-view.html","<div id=serviceErrorsContainer data-ng-controller=SpectrumErrorController data-ng-show=canShow.serviceErrors()><div data-ng-repeat=\"error in serviceErrorsList()\" class=\"alert alert-danger alert-dismissible prj-error\" role=alert id=\"error-service-{{ error.errorCode }}\"><button type=button data-ng-click=clickHandler.dismissError(error) class=close data-dismiss=alert aria-label=Close><span aria-hidden=true>&times;</span></button> <span class=\"glyphicon glyphicon-exclamation-sign\" area-hidden=true></span> <span class=sr-only>Error:</span> {{ \'global.errorMessages.\' + error.errorCode | translate:error.params }}</div></div>");
$templateCache.put("spectrum-lib-ui/components/file-browser/file-browser-view.html","<div class=\"input-group prj-file-browser\" data-ng-class=\"{\'has-error\': showFileSizeWarning}\"><span class=\"input-group-addon prj-file-browser-button\"><span class=\"btn btn-primary\">{{ buttonText }} <input type=file></span></span> <input type=text id=\"{{ id }}\" class=\"form-control prj-file-browser-input\" readonly placeholder=\"{{ displayValue }}\" data-tooltip=\"{{ displayValueTooltip }}\"> <span id=\"file-size-warning-{{ id }}\" class=\"glyphicon glyphicon-warning-sign form-control-feedback\" aria-hidden=true data-ng-show=showFileSizeWarning data-tooltip=\"{{ \'global.tooltips.fileSizeLimit\' | translate:{maxFileSize:maxFileSize} }}\"></span></div>");
$templateCache.put("spectrum-lib-ui/components/impersonate/impersonate-modal.html","<div id=impersonateModal tabindex=-1 role=dialog aria-labelledby=impersonateModalHeader aria-hidden=true data-ng-controller=SpectrumImpersonateController><form name=impersonateModalForm id=impersonateModalForm role=form class=spectrum-modal-form><div class=modal-header><h4 id=impersonateModalHeader class=modal-title data-translate=global.impersonate.title></h4></div><div class=modal-body><div spectrum-error-container data-scope-id=$id></div><div class=\"alert alert-danger alert-dismissible\" role=alert data-ng-show=canShow.noUserFoundMessage()><button type=button class=close data-ng-click=clickHandler.dismissErrorButton() data-dismiss=alert aria-label=Close><span aria-hidden=true>&times;</span></button> <span data-translate=global.impersonate.messages.noUserFoundWithEmail></span></div><div class=row><div class=form-group data-ng-class=\"{\'has-error\': canShow.validationErrorsOnField(impersonateModalForm.inputEmail)}\"><div class=btn-group data-toggle=buttons><label class=\"btn btn-default\" data-ng-class=\"{\'active\':isSelected.impersonateByUserCode()}\" data-ng-click=clickHandler.impersonateByUserCodeButton()><input type=radio name=impersonateByOptions id=impersonateByUserCodeButton autocomplete=off>{{ \'global.impersonate.form.byUserCode\' | translate }}</label> <label class=\"btn btn-default\" data-ng-class=\"{\'active\':isSelected.impersonateByEmail()}\" data-ng-click=clickHandler.impersonateByEmailButton()><input type=radio name=impersonateByOptions id=impersonateByEmailButton autocomplete=off>{{ \'global.impersonate.form.byEmail\' | translate }}</label></div><div class=input-group data-ng-show=canShow.inputImpersonateByUserCode()><span class=\"input-group-addon glyphicon glyphicon-user\" id=userCodeAddon></span> <input type=text id=inputUserCode name=inputUserCode class=form-control placeholder=\"{{ \'global.impersonate.placeholders.userCode\' | translate }}\" aria-describedby=userCodeAddon data-ng-model=impersonateModel.userCode data-ng-change=isRequired.changePerson() data-ng-required=isRequired.impersonatedUserCode()></div><div class=input-group data-ng-show=canShow.inputImpersonateByEmail()><span class=\"input-group-addon glyphicon glyphicon-envelope\" id=emailAddon></span> <input type=email id=inputEmail name=inputEmail class=form-control placeholder=\"{{ \'global.impersonate.placeholders.email\' | translate }}\" aria-describedby=emailAddon data-ng-model=impersonateModel.email data-ng-change=isRequired.changePerson() data-ng-required=isRequired.impersonatedUserEmail()></div><span id=error-email-inputEmail class=\"help-block text-error\" data-ng-show=canShow.validationEMail(impersonateModalForm.inputEmail) data-translate=global.validationMessages.email></span></div></div></div><div class=\"modal-footer text-center\"><button data-ng-click=clickHandler.closeButton() type=button class=\"btn btn-default\" id=impersonateModalCloseButton data-translate=global.buttons.close></button> <button data-ng-click=clickHandler.impersonateButton() data-ng-disabled=isDisabled.impersonateButton(impersonateModalForm) type=button class=\"btn btn-warning\" id=impersonateModalImpersonateButton data-translate=global.buttons.impersonate></button></div></form></div>");
$templateCache.put("spectrum-lib-ui/components/locale/locale-modal.html","<div id=localeModal tabindex=-1 role=dialog aria-labelledby=localeModalHeader aria-hidden=true data-ng-controller=SpectrumLocaleController><div class=modal-header><h4 id=localeModalHeader class=modal-title data-translate=global.locale.title></h4></div><div class=modal-body><form class=form-horizontal name=languageForm><div class=form-group><label for=inputSelectedLocale class=\"control-label col-sm-4\" data-translate=global.locale.selectedLanguage></label><div class=col-sm-8><select id=inputSelectedLocale name=inputSelectedLocale class=form-control data-ng-model=localeModel.proposedLanguage data-ng-required=true data-ng-options=\"locale.code as locale.name for locale in localeModel.supportedLanguages\"></select></div></div></form><p data-translate=global.locale.text></p></div><div class=\"modal-footer text-center\"><button data-ng-click=clickHandler.noButton() type=button class=\"btn btn-default\" id=changeLocaleNoButton data-translate=global.buttons.no></button> <button data-ng-click=clickHandler.yesButton() type=button class=\"btn btn-success\" id=changeLocaleYesButton data-ng-disabled=isDisabled.yesButton(languageForm) data-translate=global.buttons.yes></button></div></div>");
$templateCache.put("spectrum-lib-ui/components/menu-main/menu-items-view.html","<ul class=\"nav navbar-nav\"><span data-ng-repeat-start=\"primary in getMenuItems()\"></span><li id=\"{{ menuMainModel.getUniqueMenuItemId(primary) }}\" data-ng-if=!menuMainModel.hasChildMenus(primary)><a id=\"{{ menuMainModel.getUniqueLinkItemId(primary) }}\" href=\"\" data-ng-click=clickHandler.primaryMenuItem(primary)><span data-translate=\"{{ menuMainModel.getTranslationId(primary) }}\"></span></a></li><li id=\"{{ menuMainModel.getUniqueMenuItemId(primary) }}\" data-ng-if=menuMainModel.hasChildMenus(primary) class=dropdown><a id=\"{{ menuMainModel.getUniqueLinkItemId(primary) }}\" href=\"\" class=dropdown-toggle data-toggle=dropdown role=button aria-expanded=false data-ng-click=clickHandler.primaryMenuItem(primary)><span data-translate=\"{{ menuMainModel.getTranslationId(primary) }}\"></span> <span class=caret></span></a><ul class=dropdown-menu role=menu><li id=\"{{ menuMainModel.getUniqueMenuItemId(secondary) }}\" data-ng-repeat=\"secondary in primary.childMenuOptions\"><a id=\"{{ menuMainModel.getUniqueLinkItemId(secondary) }}\" ng-href=\"{{ secondary.hrefValue }}\" data-ng-click=\"clickHandler.secondaryMenuItem(primary, secondary)\"><span data-translate=\"{{ menuMainModel.getTranslationId(secondary) }}\"></span></a></li></ul></li><span data-ng-repeat-end></span></ul><hr class=visible-xs data-ng-show=canShow.separator()><ul class=\"nav navbar-nav navbar-right\"><span data-ng-repeat-start=\"toolbar in getToolbarItems()\"></span><li data-ng-class=menuMainModel.getMenuClass(toolbar) data-ng-if=canBeIncluded.quickSearch(toolbar)><input type=text class=form-control data-ng-model=menuMainModel.quickSearchText data-ng-keyup=\"actionHandler.quickSearch($event, toolbar)\" id=\"{{ menuMainModel.getUniqueLinkItemId(toolbar) }}\" placeholder=\"{{ \'global.placeholders.quickSearch\' | translate }}\"></li><li data-ng-class=menuMainModel.getMenuClass(toolbar) data-ng-if=canBeIncluded.defaultToolbarItem(toolbar)><a id=\"{{ menuMainModel.getUniqueLinkItemId(toolbar) }}\" data-ng-click=clickHandler.toolbarMenuItem(toolbar) href=\"\" class=navbar-link><span data-translate=\"{{ menuMainModel.getTranslationId(toolbar) }}\"></span></a></li><span data-ng-repeat-end></span></ul>");
$templateCache.put("spectrum-lib-ui/components/menu-main/menu-main-view.html","<nav class=\"spectrum-main-menu navbar navbar-default navbar-static-top\" data-ng-controller=SpectrumMenuMainController><div class=navbar-header><button type=button class=navbar-toggle data-toggle=collapse data-target=.navbar-collapse data-ng-click=clickHandler.toggleCollapse()><span class=icon-bar></span> <span class=icon-bar></span> <span class=icon-bar></span></button></div><nav class=\"visible-xs collapse\" data-ng-if=canBeIncluded.mobile() collapse=!isOpen><div ng-include src=menuItems data-spectrum-include-replace></div></nav><nav data-ng-class=\"{\'hidden-xs\':canApply.hiddenOnSmallStyle()}\" data-ng-if=canBeIncluded.desktop()><div ng-include src=menuItems data-spectrum-include-replace></div></nav></nav>");
$templateCache.put("spectrum-lib-ui/components/menu-toolbar/menu-toolbar-view.html","<ul class=\"spectrum-toolbar-menu nav navbar-nav\" data-ng-controller=SpectrumMenuToolbarController data-ng-init=init()><li data-ng-show=canShow.userItem() class=\"dropdown pointer\"><a class=dropdown-toggle id=userMenu><span id=userText title=\"{{ user.email }}\" data-ng-bind=\"user.firstName + \' \' + user.lastName\"></span> <span class=\"glyphicon glyphicon-user\"></span></a><ul class=dropdown-menu><li><a id=userPasswordMenuItem data-ng-click=clickHandler.userPasswordMenuItem()><span data-translate=global.menu.changePassword></span> <span class=\"glyphicon glyphicon-lock\"></span></a></li><li><a id=myUserAccountMenuItem data-ng-click=clickHandler.myUserAccountMenuItem()><span data-translate=global.menu.myUserAccount></span> <span class=\"glyphicon glyphicon-file\"></span></a></li><li ng-if=showEmailNotificationsItem()><a id=myEmailNotificationItem data-ng-click=clickHandler.myEmailNotificationItem()><span data-translate=global.menu.myEmailNotification></span> <span class=\"glyphicon glyphicon-envelope\"></span></a></li></ul></li><li data-ng-repeat=\"menuItem in menuToolbarModel.getMenuItems()\"><a id=\"menu-link-{{ menuItem.id }}\" data-ng-click=clickHandler.menuItem(menuItem) ng-href=\"{{ menuItem.hrefValue }}\" target=\"{{ menuItem.targetValue }}\"><span data-translate=\"{{ menuItem.label }}\"></span> <span class=\"glyphicon {{ menuItem.iconClass }}\" aria-hidden=true></span></a></li></ul>");
$templateCache.put("spectrum-lib-ui/components/modal/idle-logout-prompt-modal.html","<div id=idleLogoutPromptModal tabindex=-1 role=dialog aria-labelledby=idleLogoutPromptModalHeader aria-hidden=true data-ng-click=resetTimer() data-ng-mousemove=resetTimer()><div class=modal-header><h4 id=idleLogoutPromptModalHeader class=modal-title data-translate=global.modal.confirmation></h4></div><div class=modal-body><p data-translate=global.modal.message.confirmation></p></div><div class=modal-footer><button data-ng-click=\"$dismiss(\'no\'); cancelHandler()\" type=button class=\"btn btn-default\" id=idleLogoutPromptNoButton data-translate=global.buttons.Continue></button> <button data-ng-click=\"$close(\'yes\')\" type=button class=\"btn btn-success\" id=idleLogoutPromptYesButton data-translate=global.menu.logOut></button></div></div>");
$templateCache.put("spectrum-lib-ui/components/modal/industry-classification-required-modal.html","<div id=industryClassificationLoginModal tabindex=-1 role=dialog aria-labelledby=industryClassificationLoginModalHeader aria-hidden=true><form name=industryClassificationLoginModalForm id=industryClassificationLoginModalForm role=form class=\"prj-form form-horizontal\"><div class=modal-header><h4 id=industryClassificationLoginModalHeader class=modal-title data-translate=organisation.subscriptionsPage.industryClassificationLoginPopup.title></h4></div><div class=modal-body><p data-translate=organisation.subscriptionsPage.industryClassificationLoginPopup.content></p></div><div class=\"modal-footer prj-horizontal-center\"><button data-ng-click=$close() type=submit class=\"btn btn-success\" id=industryClassificationLoginModalSubmitButton data-translate=global.buttons.next></button></div></form></div>");
$templateCache.put("spectrum-lib-ui/components/modal/vat-number-required-modal.html","<div id=vatNumberRequiredModal tabindex=-1 role=dialog aria-labelledby=vatNumberRequiredModalHeader aria-hidden=true><div class=modal-header><h4 id=vatNumberRequiredModalHeader class=modal-title data-translate=global.modal.vatNumberRequired></h4></div><div class=modal-body><p style=color:red data-translate=global.modal.message.vatNumberRequired></p></div><div class=modal-footer><button data-ng-click=\"$close(\'yes\'); redirectToEditCompany()\" type=button class=\"btn btn-success\" id=continueButton data-translate=global.menu.continue></button></div></div>");
$templateCache.put("spectrum-lib-ui/components/page-footer/page-footer-view.html","<footer data-ng-controller=SpectrumPageFooterController class=footer><section class=main-section><div class=row><div class=\"col-sm-4 col-md-5\" data-ng-bind-html=\"pageFooterModel.getCopyrightMessage() | translate\"></div><div class=\"col-sm-offset-1 col-md-offset-2 col-sm-7 col-md-5\"><table class=pull-right><tr><td class=text-right data-translate=global.footer.chinaHelpdeskText></td><td class=text-right data-translate=global.footer.chinaHelpdeskNumber></td></tr><tr><td class=text-right data-translate=global.footer.ukHelpdeskText></td><td class=text-right data-translate=global.footer.ukHelpdeskNumber></td></tr><tr><td class=text-right data-translate=global.footer.usHelpdeskText></td><td class=text-right data-translate=global.footer.usHelpdeskNumber></td></tr></table></div></div></section></footer>");
$templateCache.put("spectrum-lib-ui/components/pager/pager-view.html","<nav class=text-center data-ng-controller=SpectrumPagerController><ul class=pagination><li><a id=firstLinkButton class=btn data-ng-disabled=linkButtonDisabled.back data-translate=global.pagination.first data-ng-click=onFirst()></a></li><li><a id=previousLinkButton class=btn data-ng-disabled=linkButtonDisabled.back data-ng-click=onPrevious()><span class=\"glyphicon glyphicon-chevron-left\" aria-hidden=true></span> {{ \'global.pagination.previous\' | translate }}</a></li><li><a id=displayedPages>{{ \'global.pagination.page\' | translate }} {{ currentPage }} {{ \'global.pagination.of\' | translate }} {{ totalPages }}</a></li><li><a id=nextLinkButton class=btn data-ng-disabled=linkButtonDisabled.forward data-ng-click=onNext()>{{ \'global.pagination.next\' | translate }} <span class=\"glyphicon glyphicon-chevron-right\" aria-hidden=true></span></a></li><li><a id=lastLinkButton class=btn data-ng-disabled=linkButtonDisabled.forward data-translate=global.pagination.last data-ng-click=onLast()></a></li></ul></nav>");
$templateCache.put("spectrum-lib-ui/components/page-header/page-header-view.html","<div class=page-header data-ng-controller=SpectrumPageHeaderController><h2 id=page-header><span data-ng-bind-html=pageHeaderModel.getTitle() id=pageTitleText></span> <a id=pageTitleInfo data-ng-click=clickHandler.info() data-ng-show=canShow.info()><span class=\"glyphicon glyphicon-info-sign\" aria-hidden=true></span></a><br><span data-ng-bind-html=\"pageHeaderModel.getTitleMuted() | translate\" class=text-muted id=pageTitleMutedText></span></h2><div data-ng-show=canShow.isTitleSet() data-spectrum-pending-membership></div></div>");
$templateCache.put("spectrum-lib-ui/components/pending-membership/pending-membership-view.html","<div class=pending-membership data-ng-controller=SpectrumPendingMembershipController><div id=spectrumPendingMembershipMessage data-ng-show=canShow.pendingMembershipMessage() class=row><div class=col-md-12><div class=\"alert alert-warning\" role=alert><span class=\"glyphicon glyphicon-warning-sign\" aria-hidden=true></span> {{ \'global.placeholders.pendingMembershipMessage\' | translate }}</div></div></div></div>");
$templateCache.put("spectrum-lib-ui/components/popup/popup.html","<div class=subsidaries tabindex=-1 role=dialog aria-labelledby=confirmActivateUserModalHeader aria-hidden=true><div class=\"col-lg-12 col-sm-12 col-xs-12 alert alert-success\" ng-show=successMessagebool><strong>{{ \'smd.success.popup.message\' | translate }}</strong></div><div class=modal-header><h4 class=modal-title>{{ \'sedex.member.directory.title\' | translate }}</h4></div><div class=modal-body><p>{{ \'smd.optin.popup.message\' | translate }} <a href=\"{{\'smd.optin.clickhere.hyperlink\' | translate}}\" target=_blank>{{\'smd.optin.clickhere.text\' | translate }}</a></p><div class=clearfix></div></div><div class=modal-footer><input type=checkbox name=donot-show class=checkbox-middle ng-model=checked id=dontShow> <label for=dontShow class=message-label>Don\'t show me this message again</label><div class=pull-right><button type=button class=\"btn btn-default cst_btn-default\" ng-click=optin()>Opt in</button> <button type=button class=\"btn btn-default cst_btn-default\" ng-click=cancel()>Cancel</button></div></div></div>");
$templateCache.put("spectrum-lib-ui/components/tree-view/tree-view-view.html","<div class=prj-tree-view data-ng-controller=SpectrumTreeViewController data-ng-class=\"{ open: open }\"><div class=input-group><input type=text id=\"tree-view-{{ treeId }}-input-search\" class=form-control data-ng-keydown=keyHandler.keyDown($event) data-ng-model=searchString> <span class=input-group-btn><button class=\"btn btn-default dropdown-toggle\" id=\"tree-view-{{ treeId }}-button-search\" data-ng-click=clickHandler.toggleDropdownButton() type=button data-toggle=dropdown data-translate=global.buttons.search></button> <button class=\"btn btn-default dropdown-toggle\" style=\"margin-left: 5px\" id=\"tree-view-{{ treeId }}-button-selectFromList\" data-ng-click=clickHandler.selectFromListButton(treeViewModel.getTreeData()) type=button data-toggle=dropdown data-translate=global.buttons.selectFromList></button></span></div><ul id=\"tree-view-{{ treeId }}-list\" class=dropdown-menu><li data-ng-repeat=\"node in treeViewModel.getTreeData()\" data-ng-include=listTemplateURL></li></ul></div>");
$templateCache.put("spectrum-lib-ui/components/typeahead/typeahead-view.html","<div id=\"{{ typeaheadId }}\" class=prj-typeahead><div class=row><div class=\"input-group col-xs-12\"><div data-ng-class=\"{\'col-xs-10\': canShow.removeButton(), \'col-xs-12\': !canShow.removeButton()}\"><input type=text id=\"typeahead-input-{{ typeaheadId }}\" data-toggle=dropdown data-ng-focus=actionHandler.onInputFocus() data-ng-model=searchString data-ng-change=onChange($event) data-ng-disabled=isDisabled.inputField() class=form-control data-test-id=instant-search-input></div><div class=col-xs-2 data-ng-show=canShow.removeButton()><button id=\"removeButton-{{ typeaheadId }}\" class=\"btn btn-default pull-right\" type=button data-ng-click=clickHandler.removeButton() data-translate=global.buttons.clear data-test-id=instant-search-remove-button></button></div></div></div><div id=\"loading-spinner-{{ typeaheadId }}\" class=\"cg-busy cg-busy-animation ng-scope ng-hide\" data-ng-show=isLoading style=\"position: relative; float: left;\" data-test-id=instant-search-loading-spinner><div class=cg-busy-default-wrapper><div class=cg-busy-default-sign><div class=cg-busy-default-spinner><div class=bar1></div><div class=bar2></div><div class=bar3></div><div class=bar4></div><div class=bar5></div><div class=bar6></div><div class=bar7></div><div class=bar8></div><div class=bar9></div><div class=bar10></div><div class=bar11></div><div class=bar12></div></div><div class=\"cg-busy-default-text ng-binding\"><span data-translate=global.spinner.loading></span></div></div></div></div><div class=dropdown-menu data-test-id=instant-search-dropdown-menu data-ng-class=\"{\'show\': canShow.resultsPopUp()}\"><div class=row><div class=col-xs-12><ul data-ng-show=canShow.results()><li data-ng-repeat=\"item in matches\" class=prj-typeahead-item id=\"result-{{ typeaheadId }}-{{ getIDForItem(item) }}\" data-ng-click=clickHandler.item(item)>{{ getLabelForItem(item) }}</li></ul><nav><ul class=pager><li><a data-translate=global.buttons.previous data-ng-show=canShow.previousButton() id=\"pager-previousButton-{{ typeaheadId }}\" data-ng-disabled=isDisabled.previousButton() data-ng-click=clickHandler.previousButton() data-test-id=instant-search-previous-button></a></li><li><a data-translate=global.buttons.next data-ng-show=canShow.nextButton() id=\"pager-nextButton-{{ typeaheadId }}\" data-ng-disabled=isDisabled.nextButton() data-ng-click=clickHandler.nextButton() data-test-id=instant-search-next-button></a></li></ul></nav></div></div></div></div>");
$templateCache.put("spectrum-lib-ui/components/user/password-modal.html","<div id=userPasswordModal tabindex=-1 role=dialog aria-labelledby=userPasswordModalHeader aria-hidden=true data-ng-controller=SpectrumPasswordController><div class=modal-header><h4 id=userPasswordModalHeader class=modal-title data-translate=global.menu.changePassword></h4></div><div class=modal-body><div data-ng-hide=canShow.changePasswordSuccessful()><form class=\"form form-horizontal form-group\" name=changePasswordForm role=form novalidate data-ng-show=!success><div class=\"alert alert-danger\" data-ng-show=error id=passwordChangeErrorMsg><p data-translate=global.user.password.form.messages.error.cantChange></p></div><div class=\"alert alert-danger\" data-ng-show=passwordValidationError id=passwordValidationErrorMsg><p data-translate=global.user.password.form.messages.validate.error></p></div><div class=\"alert alert-danger\" data-ng-show=doNotMatch id=doNotMatchErrorMsg><p class=error data-translate=global.user.password.form.messages.validate.dontMatch></p></div><div class=form-group><label for=password class=\"control-label col-sm-5\" data-translate=global.user.password.form.newPassword></label><div class=col-sm-7><input type=password class=form-control name=password id=password placeholder=\"{{\'global.user.password.form.newPasswordPlaceholder\' | translate}}\" data-ng-model=passwordModel.password data-ng-minlength=8 required></div><div class=error data-ng-show=\"form.password.$dirty && form.password.$invalid\"><p class=error data-ng-show=form.password.$error.required data-translate=global.user.password.form.messages.validate.newPassword.required></p><p class=error data-ng-show=form.password.$error.minlength data-translate=global.user.password.form.messages.validate.newPassword.minlength></p></div></div><div class=form-group><label for=confirmPassword class=\"control-label col-sm-5\" data-translate=global.user.password.form.confirmPassword></label><div class=col-sm-7><input type=password class=form-control name=confirmPassword id=confirmPassword placeholder=\"{{\'global.user.password.form.confirmPasswordPlaceholder\' | translate}}\" data-ng-model=passwordModel.confirmPassword data-ng-minlength=8 required></div><div class=error data-ng-show=\"form.confirmPassword.$dirty && form.confirmPassword.$invalid\"><p class=error data-ng-show=form.confirmPassword.$error.required data-translate=global.user.password.form.messages.validate.confirmPassword.required></p><p class=error data-ng-show=form.confirmPassword.$error.minlength data-translate=global.user.password.form.messages.validate.confirmPassword.minlength></p></div></div></form><div class=\"alert alert-info\"><p class=highlight data-translate=global.user.password.form.info.title></p><p data-translate=global.user.password.form.info.introduction></p><ul><li data-translate=global.user.password.form.info.crit1></li><li data-translate=global.user.password.form.info.crit2></li><li data-translate=global.user.password.form.info.crit3></li><li data-translate=global.user.password.form.info.crit4></li><li data-translate=global.user.password.form.info.crit5></li></ul><div class=disallowed-words><div><a id=disallowedWordsToggle title=\"{{\'global.user.password.form.info.disallowedWords.hoverText\' | translate}}\" data-toggle=collapse data-ng-click=clickHandler.toggleDisallowedWords() data-target=#disallowedWords data-translate=global.user.password.form.info.disallowedWords.prompt></a></div><div id=disallowedWords class=collapse data-ng-class=\"{\'in\': canShow.disallowedWords()}\" data-translate=global.user.password.form.info.disallowedWords.values></div></div></div></div><div data-ng-show=canShow.changePasswordSuccessful()><div class=\"alert alert-info\" data-translate=global.user.password.form.messages.success></div></div></div><div class=\"modal-footer text-center\"><div data-ng-hide=canShow.changePasswordSuccessful()><button id=confirmButton type=button data-ng-disabled=changePasswordForm.$invalid class=\"btn btn-primary\" data-translate=global.buttons.confirm data-ng-click=clickHandler.confirmButton()></button> <button id=cancelButton type=button class=\"btn btn-primary\" data-translate=global.buttons.cancel data-ng-click=clickHandler.closeButton()></button></div><div data-ng-show=canShow.changePasswordSuccessful()><button id=closeButton type=button class=\"btn btn-primary\" data-translate=global.buttons.close data-ng-click=clickHandler.closeButton()></button></div></div></div>");
$templateCache.put("spectrum-lib-ui/components/page-header/page-header-popup/page-header-popup.html","<div class=\"page-header subsidaries\" data-ng-controller=SpectrumPageHeaderController><div class=modal-header><h4 class=modal-title>E-Learning courses list</h4></div><div class=modal-body><div ng-repeat=\"item in courses\"><div><a ng-click=clickHandler.openLink(item.value)>{{item.key}}</a></div></div></div><div class=modal-footer><button data-ng-click=clickHandler.closeButton() type=button class=\"btn btn-default cst_btn-default\" id=closeButton data-translate=global.buttons.close></button></div></div>");
$templateCache.put("spectrum-lib-ui/components/tree-view/tpl/tree-view-list-template.html","<div data-ng-click=\"clickHandler.nodeLabel(node, $event)\" class=clickable><i id=\"tree-view-{{ treeId }}-folderClosed-{{ node.name.toLowerCase() }}\" class=\"glyphicon glyphicon-folder-close\" data-ng-show=canShow.folderClosed(node)></i> <i id=\"tree-view-{{ treeId }}-folderOpened-{{ node.name.toLowerCase() }}\" class=\"glyphicon glyphicon-folder-open\" data-ng-show=canShow.folderOpened(node)></i> <i id=\"tree-view-{{ treeId }}-leaf-selected-{{ node.name.toLowerCase() }}\" class=glyphicon data-ng-class=\"{\'glyphicon-check\':canShow.nodeSelected(node)}\"></i> <i id=\"tree-view-{{ treeId }}-leaf-unselected-{{ node.name.toLowerCase() }}\" class=glyphicon data-ng-class=\"{\'glyphicon-unchecked\':canShow.nodeUnSelected(node)}\"></i> <span id=\"tree-view-{{ treeId }}-{{ node[nodeChildren].length > 0 ? \'parent\' : \'leaf\' }}-{{ node.code }}\" ng-bind=node.name></span><ul ng-if=canBeIncluded.nodeChildren(node)><li data-ng-repeat=\"node in node.children\" data-ng-include=listTemplateURL></li></ul></div>");}]);