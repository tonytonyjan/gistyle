// Inspired from Paul Irish and Jason Garber

APP = {};

GIStyle = {
  aliases: {}, // Aliases per controller. '*' matches all controllers.

  alias: function( controller, from, to ) {
    if ( controller === undefined )
      controller = "*";
    if ( GIStyle.aliases[controller] === undefined )
      GIStyle.aliases[controller] = {};
    if ( GIStyle.aliases[controller][from] === undefined )
      GIStyle.aliases[controller][from] = [];

    GIStyle.aliases[controller][from].push(to);
  },

  clear_all_aliases: function() {
    GIStyle.aliases = {}
  },

  clear_aliases_for_controller: function( controller ) {
    GIStyle.aliases[controller] = {}
  },

  exec: function( controller, action ) {
    var ns = APP, action = ( action === undefined ) ? "init" : action;

    // First execute aliases for this action
    if(GIStyle.aliases['*'] !== undefined && GIStyle.aliases['*'][action] !== undefined) {
      $.each(GIStyle.aliases['*'][action], function( index, alias ) {
        GIStyle.exec(controller, alias);
      });
    }
    if(GIStyle.aliases[controller] !== undefined && GIStyle.aliases[controller][action] !== undefined) {
      $.each(GIStyle.aliases[controller][action], function( index, alias ) {
        GIStyle.exec(controller, alias);
      });
    }

    // Then execute function for this action
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

// Add default aliases for all controllers (new, create, edit and update actions also call form action)
GIStyle.alias(undefined, 'new', '_new_create');
GIStyle.alias(undefined, 'create', '_new_create');
GIStyle.alias(undefined, '_new_create', '_form');
GIStyle.alias(undefined, 'edit', '_edit_update');
GIStyle.alias(undefined, 'update', '_edit_update');
GIStyle.alias(undefined, '_edit_update', '_form');

$(document).ready(GIStyle.init);
$(document).on('page:load', GIStyle.init) // Support Turbolinks
