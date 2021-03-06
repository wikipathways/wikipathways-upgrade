// Generated by CoffeeScript 1.4.0

/*
 Infinite Scroll Shortcut for jQuery Waypoints - v2.0.2
 Copyright (c) 2011-2013 Caleb Troughton
 Dual licensed under the MIT license and GPL license.
 https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
 */


(function() {

     (function(root, factory) {
          if (typeof define === 'function' && define.amd) {
              return define(['jquery', 'waypoints'], factory);
          } else {
              return factory(root.jQuery);
          }
      })(this, function($) {
             var defaults;
             defaults = {
                 container: 'auto',
                 items: '.infinite-item',
                 more: '.infinite-more-link',
                 offset: 'bottom-in-view',
                 loadingClass: 'infinite-loading',
                 onBeforePageLoad: $.noop,
                 onAfterPageLoad: $.noop
             };
             return $.waypoints('extendFn', 'infinite', function(options) {
                                    var $container;
                                    options = $.extend({}, $.fn.waypoint.defaults, defaults, options);
                                    $container = options.container === 'auto' ? this : $(options.container);
                                    options.handler = function(direction) {
                                        var $this;
                                        if (direction === 'down' || direction === 'right') {
                                            $this = $(this);
                                            options.onBeforePageLoad();
                                            $this.waypoint('disable');
                                            var href=$(options.more).attr('href');
                                            if(href !== "data:") { // End of list marker.
                                                $container.addClass(options.loadingClass);
                                                // put "Loading ..." in the text of the href
                                                $(options.more).html(function() {
                                                                         return "Loading " + this.text + "...";
                                                                     } );
                                                return $.get(href, function(data) {
                                                                 var $data, $more, $newMore;
                                                                 $data = $(data);
                                                                 $more = $(options.more);
                                                                 $newMore = $data.find(options.more);
                                                                 $container.append($data.find(options.items));
                                                                 $container.removeClass(options.loadingClass);
                                                                 if ($newMore.length) {
                                                                     $more.replaceWith($newMore);
                                                                     $this.waypoint('infinite');
                                                                 } else {
                                                                     $this.waypoint('destroy');
                                                                 }
                                                                 return options.onAfterPageLoad();
                                                             });
                                            }
                                        }
                                        return false;
                                    };
                                    return this.waypoint(options);
                                });
         });

 }).call(this);
