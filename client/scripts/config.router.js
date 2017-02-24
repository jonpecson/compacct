'use strict';
angular.module('app').run(['$rootScope', '$state', '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function() {
      window.scrollTo(0, 0);
    });
    FastClick.attach(document.body);
  },
]).config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes
    $urlRouterProvider.otherwise('/');
    // Application routes
    $stateProvider.state('app', {
        abstract: true,
        templateUrl: 'views/common/layout.html',
      }).state('app.dashboard', {
        url: '/',
        templateUrl: 'views/dashboard.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/flot/jquery.flot.js', 'vendor/flot/jquery.flot.resize.js', 'vendor/flot/jquery.flot.pie.js', 'vendor/flot/jquery.flot.categories.js', 'vendor/flot/jquery.flot.stack.js', 'vendor/flot/jquery.flot.time.js', 'vendor/flot-spline/js/jquery.flot.spline.js', 'vendor/flot.orderbars/js/jquery.flot.orderBars.js']
            }, {
              name: 'angular-flot',
              files: ['vendor/angular-flot/angular-flot.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/dashboard.js');
            });
          }]
        }
      })
      // UI Routes
      .state('app.ui', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/ui',
      }).state('app.ui.buttons', {
        url: '/buttons',
        templateUrl: 'views/ui-buttons.html'
      }).state('app.ui.social-buttons', {
        url: '/social-buttons',
        templateUrl: 'views/ui-social-buttons.html'
      }).state('app.ui.directives', {
        url: '/directives',
        templateUrl: 'views/ui-general.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/checkbo/src/0.1.4/css/checkBo.min.css', 'vendor/chosen_v1.4.0/chosen.min.css']
            }, {
              files: ['vendor/checkbo/src/0.1.4/js/checkBo.min.js', 'vendor/chosen_v1.4.0/chosen.jquery.min.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/bootstrap.ui.js');
            });
          }]
        }
      }).state('app.ui.tabs_accordion', {
        url: '/tabs_accordions',
        templateUrl: 'views/ui-tabs-accordion.html'
      }).state('app.ui.portlets', {
        url: '/portlets',
        templateUrl: 'views/ui-portlets.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.js', 'vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/sortable.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/draggable.js');
            });
          }]
        }
      }).state('app.ui.icons', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/icons',
      }).state('app.ui.icons.fontawesome', {
        url: '/fontawesome',
        templateUrl: 'views/ui-fontawesome.html'
      }).state('app.ui.icons.sli', {
        url: '/sli',
        templateUrl: 'views/ui-sli.html'
      }).state('app.ui.icons.climacon', {
        url: '/climacon',
        templateUrl: 'views/ui-climacon.html'
      }).state('app.ui.progressbars', {
        url: '/progressbars',
        templateUrl: 'views/ui-progressbars.html'
      }).state('app.ui.sliders', {
        url: '/sliders',
        templateUrl: 'views/ui-sliders.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/slider.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/slider.js');
            });
          }]
        }
      }).state('app.ui.pagination', {
        url: '/pagination',
        templateUrl: 'views/ui-pagination.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/bootstrap.ui.js');
          }]
        }
      }).state('app.ui.notifications', {
        url: '/notifications',
        templateUrl: 'views/ui-notifications.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/chosen_v1.4.0/chosen.min.css']
            }, {
              serie: true,
              files: ['vendor/chosen_v1.4.0/chosen.jquery.min.js', 'vendor/noty/js/noty/packaged/jquery.noty.packaged.min.js', 'scripts/helpers/noty-defaults.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/notifications.js');
            });
          }]
        }
      }).state('app.ui.alert', {
        url: '/alert',
        templateUrl: 'views/ui-alert.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/sweetalert/dist/sweetalert.css']
            }, {
              name: 'oitozero.ngSweetAlert',
              files: ['vendor/sweetalert/dist/sweetalert.min.js', 'vendor/angular-sweetalert/SweetAlert.min.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/alert.js');
            });
          }]
        }
      }).state('app.ui.scroll', {
        url: '/scroll',
        templateUrl: 'views/ui-scroll.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'infinite-scroll',
              files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.min.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/scroll.js');
            });
          }]
        }
      }).state('app.ui.spinners', {
        url: '/spinners',
        templateUrl: 'views/ui-spinners.html'
      }).state('app.ui.skins', {
        url: '/skins',
        templateUrl: 'views/ui-skins.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/colors.js');
          }]
        }
      }).state('app.ui.colors', {
        url: '/colors',
        templateUrl: 'views/ui-colors.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/colors.js');
          }]
        }
      })
      // Forms routes
      .state('app.forms', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/forms',
      }).state('app.forms.native', {
        url: '/native_forms',
        templateUrl: 'views/form-basic.html'
      }).state('app.forms.custom_forms', {
        url: '/custom_forms',
        templateUrl: 'views/form-custom.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              files: ['scripts/helpers/classie.js', 'scripts/helpers/selectfx.js']
            }]);
          }]
        }
      }).state('app.forms.plugins', {
        url: '/plugins',
        templateUrl: 'views/form-advanced.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css', 'vendor/chosen_v1.4.0/chosen.min.css', 'vendor/jquery.tagsinput/src/jquery.tagsinput.css', 'vendor/checkbo/src/0.1.4/css/checkBo.min.css', 'vendor/intl-tel-input/build/css/intlTelInput.css', 'vendor/bootstrap-daterangepicker/daterangepicker.css', 'vendor/bootstrap-datepicker/dist/css/bootstrap-datepicker3.css', 'vendor/clockpicker/dist/bootstrap-clockpicker.min.css', 'vendor/mjolnic-bootstrap-colorpicker/dist/css/bootstrap-colorpicker.min.css', 'vendor/jquery-labelauty/source/jquery-labelauty.css', 'vendor/multiselect/css/multi-select.css', 'vendor/ui-select/dist/select.css', 'vendor/select2/select2.css', 'vendor/selectize/dist/css/selectize.css']
            }, {
              serie: true,
              files: ['vendor/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', 'vendor/chosen_v1.4.0/chosen.jquery.min.js', 'vendor/jquery.tagsinput/src/jquery.tagsinput.js', 'vendor/checkbo/src/0.1.4/js/checkBo.min.js', 'vendor/intl-tel-input//build/js/intlTelInput.min.js', 'vendor/moment/min/moment.min.js', 'vendor/bootstrap-daterangepicker/daterangepicker.js', 'vendor/bootstrap-datepicker/dist/js/bootstrap-datepicker.js', 'vendor/bootstrap-timepicker/js/bootstrap-timepicker.js', 'vendor/clockpicker/dist/jquery-clockpicker.min.js', 'vendor/mjolnic-bootstrap-colorpicker/dist/js/bootstrap-colorpicker.min.js', 'vendor/jquery-labelauty/source/jquery-labelauty.js', 'vendor/bootstrap-maxlength/src/bootstrap-maxlength.js', 'vendor/typeahead.js/dist/typeahead.bundle.js', 'vendor/multiselect/js/jquery.multi-select.js']
            }, {
              name: 'ui.select2',
              files: ['vendor/ui-select/dist/select.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/form.js');
            });
          }]
        }
      }).state('app.forms.validation', {
        url: '/validation',
        templateUrl: 'views/form-validation.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('vendor/jquery-validation/dist/jquery.validate.min.js').then(function() {
              return $ocLazyLoad.load('scripts/controllers/validation.js');
            });
          }]
        }
      }).state('app.forms.wizard', {
        url: '/wizard',
        templateUrl: 'views/form-wizard.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/checkbo/src/0.1.4/css/checkBo.min.css', 'vendor/chosen_v1.4.0/chosen.min.css']
            }, {
              files: ['vendor/checkbo/src/0.1.4/js/checkBo.min.js', 'vendor/chosen_v1.4.0/chosen.jquery.min.js', 'vendor/card/lib/js/jquery.card.js', 'vendor/bootstrap/js/tab.js', 'vendor/jquery-validation/dist/jquery.validate.min.js', 'vendor/twitter-bootstrap-wizard/jquery.bootstrap.wizard.min.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/wizard.js');
            });
          }]
        }
      }).state('app.forms.editors', {
        url: '/editors',
        templateUrl: 'views/form-editors.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/summernote/dist/summernote.css', 'vendor/bootstrap3-wysihtml5-bower/dist/bootstrap3-wysihtml5.min.css']
            }, {
              files: ['vendor/bootstrap/js/tooltip.js', 'vendor/bootstrap/js/dropdown.js', 'vendor/bootstrap/js/modal.js', 'vendor/bootstrap3-wysihtml5-bower/dist/bootstrap3-wysihtml5.all.js', 'vendor/summernote/dist/summernote.min.js']
            }, {
              name: 'summernote',
              files: ['vendor/angular-summernote/dist/angular-summernote.min.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/editor.js');
            });
          }]
        }
      }).state('app.forms.masks', {
        url: '/masks',
        templateUrl: 'views/form-masks.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('vendor/jquery.maskedinput/dist/jquery.maskedinput.min.js').then(function() {
              return $ocLazyLoad.load('scripts/controllers/mask.js');
            });
          }]
        }
      }).state('app.forms.upload', {
        url: '/upload',
        templateUrl: 'views/form-upload.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'ngFileUpload',
              files: ['vendor/ng-file-upload/ng-file-upload-all.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/upload.js');
            });
          }]
        }
      })
      // Tables routes
      .state('app.tables', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/tables',
      }).state('app.tables.table_basic', {
        url: '/table_basic',
        templateUrl: 'views/table-basic.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/sortable/css/sortable-theme-bootstrap.css']
            }, {
              files: ['vendor/sortable/js/sortable.min.js']
            }]).then(function() {
              Sortable.init();
            });
          }]
        }
      }).state('app.tables.table_responsive', {
        url: '/table_responsive',
        templateUrl: 'views/table-responsive.html'
      }).state('app.tables.datatable', {
        url: '/datatable',
        templateUrl: 'views/table-datatable.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/chosen_v1.4.0/chosen.min.css', 'vendor/datatables/media/css/datatables.bootstrap.css']
            }, {
              serie: true,
              files: ['vendor/chosen_v1.4.0/chosen.jquery.min.js', 'vendor/datatables/media/js/jquery.dataTables.js', 'vendor/datatables/media/js/datatables.bootstrap.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/table.js');
            });
          }]
        }
      }).state('app.tables.table_editable', {
        url: '/table_editable',
        templateUrl: 'views/table-editable.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/angular-xeditable/dist/css/xeditable.css']
            }, {
              name: 'xeditable',
              files: ['vendor/angular-xeditable/dist/js/xeditable.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/editable.js');
            });
          }]
        }
      }).state('app.tables.tables_ngtable', {
        url: '/tables_ngtable',
        templateUrl: 'views/table-ngtable.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/ng-table/dist/ng-table.css']
            }, {
              name: 'ngTable',
              files: ['vendor/ng-table/dist/ng-table.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/ngtable.js');
            });
          }]
        }
      })
      // Chart routes
      .state('app.charts', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/charts',
      }).state('app.charts.n3', {
        url: '/n3',
        templateUrl: 'views/charts-n3.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/moment/moment.js', 'scripts/services/utils.js', 'scripts/controllers/n3.js']
            }]);
          }]
        }
      }).state('app.charts.flot', {
        url: '/flot',
        templateUrl: 'views/charts-flot.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/flot/jquery.flot.js', 'vendor/flot/jquery.flot.resize.js', 'vendor/flot/jquery.flot.categories.js', 'vendor/flot/jquery.flot.stack.js', 'vendor/flot/jquery.flot.time.js', 'vendor/flot/jquery.flot.pie.js', 'vendor/flot-spline/js/jquery.flot.spline.js', 'vendor/flot.orderbars/js/jquery.flot.orderBars.js']
            }, {
              name: 'angular-flot',
              files: ['vendor/angular-flot/angular-flot.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/flot.js');
            });
          }]
        }
      }).state('app.charts.easypie', {
        url: '/easypie',
        templateUrl: 'views/charts-easypie.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'easypiechart',
              files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/easychart.js');
            });
          }]
        }
      }).state('app.charts.chartjs', {
        url: '/chartjs',
        templateUrl: 'views/charts-chartjs.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              files: ['vendor/chartjs/Chart.js', ]
            }, {
              name: 'angles',
              serie: true,
              files: ['vendor/angles/angles.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/chartjs.js');
            });
          }]
        }
      }).state('app.charts.rickshaw', {
        url: '/rickshaw',
        templateUrl: 'views/charts-rickshaw.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/rickshaw/rickshaw.min.css']
            }, {
              serie: true,
              files: ['vendor/d3/d3.min.js', 'vendor/rickshaw/rickshaw.min.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/rickshaw.js');
            });
          }]
        }
      }).state('app.charts.nvd3', {
        url: '/nvd3',
        templateUrl: 'views/charts-nvd3.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/nvd3/build/nv.d3.min.css']
            }, {
              name: 'nvd3',
              serie: true,
              files: ['vendor/d3/d3.min.js', 'vendor/nvd3/build/nv.d3.min.js', 'vendor/angular-nvd3/dist/angular-nvd3.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/nvd3.js');
            });
          }]
        }
      }).state('app.charts.c3', {
        url: '/c3',
        templateUrl: 'views/charts-c3.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/c3/c3.min.css']
            }, {
              serie: true,
              files: ['vendor/d3/d3.min.js', 'vendor/c3/c3.min.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/c3.js');
            });
          }]
        }
      })
      // Maps routes
      .state('app.maps', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/maps',
      }).state('app.maps.google', {
        url: '/google',
        templateUrl: 'views/map-google.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'ui.map',
              files: ['vendor/angular-ui-map/ui-map.min.js']
            },
            {
              name: 'ui.event',
              files: ['vendor/angular-ui-event/dist/event.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/google.js');
            });
          }]
        },
        data: {
          contentClasses: 'no-padding'
        }
      }).state('app.maps.vector', {
        url: '/vector',
        templateUrl: 'views/map-vector.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/bower-jvectormap/jquery-jvectormap-1.2.2.css']
            }, {
              serie: true,
              files: ['vendor/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 'data/maps/jquery-jvectormap-world-mill-en.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/vector.js');
            });
          }]
        },
        data: {
          contentClasses: 'no-padding'
        }
      })
      // Apps routes
      .state('app.cards', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/cards',
      }).state('app.cards.basic', {
        url: '/basic',
        templateUrl: 'views/cards-basic.html'
      }).state('app.cards.portlets', {
        url: '/portlets',
        templateUrl: 'views/cards-portlets.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.js', 'vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/sortable.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/draggable.js');
            });
          }]
        }
      }).state('app.cards.draggable', {
        url: '/draggable',
        templateUrl: 'views/cards-draggable.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/perfect-scrollbar/js/perfect-scrollbar.jquery.js', 'vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/sortable.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/draggable.js');
            });
          }]
        }
      }).state('app.cards.widgets', {
        url: '/widgets',
        templateUrl: 'views/cards-widgets.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/flot/jquery.flot.js', 'vendor/flot/jquery.flot.resize.js', 'vendor/flot/jquery.flot.pie.js', 'vendor/flot/jquery.flot.categories.js', 'vendor/flot/jquery.flot.stack.js', 'vendor/flot/jquery.flot.time.js', 'vendor/flot-spline/js/jquery.flot.spline.js', 'vendor/flot.orderbars/js/jquery.flot.orderBars.js']
            }, {
              name: 'angular-flot',
              files: ['vendor/angular-flot/angular-flot.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/widgets.js');
            });
          }]
        }
      })
      // Apps routes
      .state('app.apps', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/apps',
      }).state('app.apps.calendar', {
        url: '/calendar',
        templateUrl: 'views/app-calendar.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/fullcalendar/dist/fullcalendar.min.css']
            }, {
              serie: true,
              files: ['vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/draggable.js', 'vendor/moment/moment.js', 'vendor/fullcalendar/dist/fullcalendar.min.js', 'vendor/fullcalendar/dist/gcal.js']
            }, {
              name: 'ui.calendar',
              files: ['vendor/angular-ui-calendar/src/calendar.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/calendar.js');
            });
          }]
        }
      }).state('app.apps.gallery', {
        url: '/gallery',
        templateUrl: 'views/app-gallery.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              insertBefore: '#load_styles_before',
              files: ['vendor/chocolat/dist/css/chocolat.css']
            }, {
              serie: true,
              files: ['vendor/chocolat/dist/js/jquery.chocolat.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/gallery.js');
            });
          }]
        }
      }).state('app.apps.messages', {
        url: '/messages',
        templateUrl: 'views/app-messages.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/messages.js').then(function() {
              return $ocLazyLoad.load('scripts/services/messages.js');
            });
          }]
        },
        data: {
          appClasses: 'layout-small-menu',
          contentClasses: 'no-padding'
        }
      }).state('app.apps.contacts', {
        url: '/contacts',
        templateUrl: 'views/app-contacts.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              insertBefore: '#load_styles_before',
              files: ['vendor/ioslist/dist/css/jquery.ioslist.css']
            }, {
              files: ['scripts/services/contacts.js', 'vendor/ioslist/dist/js/jquery.ioslist.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/contacts.js');
            });
          }]
        },
        data: {
          contentClasses: 'no-padding'
        }
      }).state('app.apps.social', {
        url: '/social',
        templateUrl: 'views/app-social.html'
      }).state('app.apps.projects', {
        url: '/projects',
        templateUrl: 'views/app-projects.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/projects.js');
          }]
        }
      }).state('app.apps.travel', {
        url: '/travel',
        templateUrl: 'views/app-travel.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'masonry',
              files: ['vendor/isotope/dist/isotope.pkgd.js', 'vendor/imagesloaded/imagesloaded.pkgd.js', 'vendor/angular-masonry-directive/src/angular-masonry-directive.js']
            },
            {
              name: 'ui.event',
              files: ['vendor/angular-ui-event/dist/event.js']
            }, {
              name: 'ui.map',
              files: ['vendor/angular-ui-map/ui-map.min.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/travel.js');
            });
          }]
        },
        data: {
          appClasses: 'layout-small-menu',
          contentClasses: 'no-padding'
        }
      })
      // Apps routes
      .state('app.commerce', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/commerce',
      }).state('app.commerce.products', {
        url: '/products',
        templateUrl: 'views/commerce-products.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'ngCart',
              files: ['vendor/ngCart/dist/ngCart.js']
            }, {
              name: 'masonry',
              files: ['vendor/isotope/dist/isotope.pkgd.js', 'vendor/imagesloaded/imagesloaded.pkgd.js', 'vendor/angular-masonry-directive/src/angular-masonry-directive.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/products.js');
            });
          }]
        }
      }).state('app.commerce.cart', {
        url: '/cart',
        templateUrl: 'views/commerce-cart.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              name: 'ngCart',
              files: ['vendor/ngCart/dist/ngCart.js']
            }, {
              name: 'masonry',
              files: ['vendor/isotope/dist/isotope.pkgd.js', 'vendor/imagesloaded/imagesloaded.pkgd.js', 'vendor/angular-masonry-directive/src/angular-masonry-directive.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/products.js');
            });
          }]
        }
      })
      // Apps routes
      .state('app.extras', {
        template: '<div ui-view></div>',
        abstract: true,
        url: '/extras',
      }).state('app.extras.popup', {
        url: '/popup',
        templateUrl: 'views/extras-popup.html'
      }).state('app.extras.invoice', {
        url: '/invoice',
        templateUrl: 'views/extras-invoice.html'
      }).state('app.extras.timeline', {
        url: '/timeline',
        templateUrl: 'views/extras-timeline.html'
      }).state('app.extras.timeline2', {
        url: '/timeline-stacked',
        templateUrl: 'views/extras-timeline-stacked.html'
      }).state('app.extras.sortable', {
        url: '/sortable',
        templateUrl: 'views/extras-sortable.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/jquery.ui/ui/core.js', 'vendor/jquery.ui/ui/widget.js', 'vendor/jquery.ui/ui/mouse.js', 'vendor/jquery.ui/ui/sortable.js']
            }]).then(function() {
              return $ocLazyLoad.load('scripts/controllers/sortable.js');
            });
          }]
        }
      }).state('app.extras.nestable', {
        url: '/nestable',
        templateUrl: 'views/extras-nestable.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('vendor/nestable/jquery.nestable.js');
          }]
        }
      }).state('app.extras.post', {
        url: '/search',
        templateUrl: 'views/extras-post.html'
      }).state('app.extras.changelog', {
        url: '/changelog',
        templateUrl: 'views/extras-changelog.html'
      }).state('app.extras.blank', {
        url: '/blank',
        templateUrl: 'views/extras-blank.html'
      }).state('user', {
        templateUrl: 'views/common/session.html',
      }).state('user.signin', {
        url: '/signin',
        templateUrl: 'views/extras-signin.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/session.js');
          }]
        },
        data: {
          appClasses: 'signin usersession',
          contentClasses: 'session-wrapper'
        }
      }).state('user.signin_2', {
        url: '/signin_2',
        templateUrl: 'views/extras-signin-2.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/session.js');
          }]
        },
        data: {
          appClasses: 'signin v2 usersession',
          contentClasses: 'session-wrapper',
          noFooter: true
        }
      }).state('user.signup', {
        url: '/signup',
        templateUrl: 'views/extras-signup.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/session.js');
          }]
        },
        data: {
          appClasses: 'signup usersession',
          contentClasses: 'session-wrapper'
        }
      }).state('user.signup_2', {
        url: '/signup_2',
        templateUrl: 'views/extras-signup-2.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/session.js');
          }]
        },
        data: {
          appClasses: 'signup v2 usersession',
          contentClasses: 'session-wrapper',
          noFooter: true
        }
      }).state('user.forgot', {
        url: '/forgot',
        templateUrl: 'views/extras-forgot.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/session.js');
          }]
        },
        data: {
          appClasses: 'forgot-password usersession',
          contentClasses: 'session-wrapper'
        }
      }).state('app.404', {
        url: '/404',
        templateUrl: 'views/extras-404.html',
        data: {
          contentClasses: 'no-padding',
        }
      }).state('user.500', {
        url: '/500',
        templateUrl: 'views/extras-500.html',
        data: {
          appClasses: 'error-page usersession',
          contentClasses: 'session-wrapper'
        }
      }).state('user.lockscreen', {
        url: '/lockscreen',
        templateUrl: 'views/extras-lockscreen.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load('scripts/controllers/session.js');
          }]
        },
        data: {
          appClasses: 'lockscreen usersession',
          contentClasses: 'session-wrapper'
        }
      }).state('app.documentation', {
        url: '/documentation',
        templateUrl: 'views/docs.html',
        resolve: {
          deps: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([{
              serie: true,
              files: ['vendor/prism/themes/prism.css', 'vendor/prism/prism.js', ]
            }]);
          }]
        },
        data: {
          contentClasses: 'no-padding'
        }
      });
  }
]).config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
  $ocLazyLoadProvider.config({
    debug: false,
    events: false
  });
}]);