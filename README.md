# GIStyle

GIStyle (Garber-Irish Style) is a Rails plug-in for DOM-based routing of Javascript, inspired from [Paul Irish](http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/) and [Jason Garber](http://viget.com/inspire/extending-paul-irishs-comprehensive-dom-ready-execution).

## Usage

### Install

`Gemfile`

    ...
    gem 'gistyle'
    ...

`app/assets/javascripts/application.js`

    ...
    //= require jquery
    //= require jquery_ujs
    //= require gistyle
    //= require_tree .

    APP.init = function() {
      console.log("application"); // global
    };
    ...

Be sure to place `require gistyle` before `require_tree .`.

`app/views/layouts/application.html.erb`

    ...
    <body data-controller="<%= controller_path %>" data-action="<%= action_name %>">
    ...

### Example

#### JavaScript

`app/assets/javascripts/home.js`

    ...
    APP.home = {
      init: function() {
        console.log("home controller wide");
      },
      index: function() {
        console.log("home#index");
      },
      new: function() {
        console.log("home#new");
      },
      _new_create: function() {
        console.log("home#new or home#create)");
      },
      _edit_update: function() {
        console.log("home#edit or home#update)");
      },
      _form: function() {
        console.log("Action with form (by default new, create, edit and update). See aliases (below) for more info.");
      },
      about: function() {
        console.log("home#about");
      },
      contact: function() {
        console.log("home#contact");
      }
    }

#### CoffeeScript

`app/assets/javascripts/admin/posts.js.coffee`

    APP['admin/posts'] = # supports namespace as wall
      index: () ->
        # blablabla
      show: () ->
        # blablabla
      new: () ->
        # blablabla
      edit: () ->
        # blablabla
      update: () ->
        # blablabla
        this.subroutine()
      subroutine () ->
        # blablabla

### Aliases
It is possible to define aliases, i.e. actions that (also) trigger another action. This is useful to for example have an action _form that is triggered for all actions with a form (by default new, create, edit and update).

Aliases are defined by calling: `GIStyle.alias(controller, action_from, action_to)`. It is also possible to define general aliases for all controllers by setting controller to `undefined`.

A few general aliases are included by default:
* `new`, `create`, `edit`, `update` => `_form`
* `new`, `create` => `_new_create`
* `edit`, `update` => `_new_update`

Aliases can be cleared by calling either:
* `GIStyle.clear_aliases_for_controller(controller)` or
* `GIStyle.clear_all_aliases()`.