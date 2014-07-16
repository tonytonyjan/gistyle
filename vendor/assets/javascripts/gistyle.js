// Inspired from Paul Irish and Jason Garber

APP = {};
 
GIStyle = {
  exec: function( controller, action ) {
    var ns = APP, action = ( action === undefined ) ? "init" : action;
 
    if ( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ) {
      ns[controller][action]();
    }
  },
 
  init: function() {
    var body = document.body,
        controller = body.getAttribute("data-controller"),
        action = body.getAttribute("data-action");
 
    if(typeof APP.init == "function") APP.init();
    GIStyle.exec(controller);
    GIStyle.exec(controller, action);
  }
};
$(document).on(typeof(Turbolinks) == 'undefined' ? 'ready' : 'page:change', GIStyle.init) // support Turbolinks