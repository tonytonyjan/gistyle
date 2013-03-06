# GIStyle

GIStyle is a Rails plug-in for DOM-based routing of Javascript, inspired from [Paul Irish and Jason Garber](http://paulirish.com/2009/markup-based-unobtrusive-comprehensive-dom-ready-execution/).

## Usage

### Install

`app/assets/javascripts/application.js`

    ...
    //= require jquery
    //= require jquery_ujs
    //= require gistyle
    //= require_tree .

    APP.init = function() {
      console.log("application");
    };
    ...

Be sure to place `require gistyle` before `require_tree .`.

`app/views/layouts/application.html.erb`

    ...
    <body data-controller="<%= controller_name %>" data-action="<%= action_name %>">
    ...

### Example

`app/assets/javascripts/home.js`

    ...
    APP.home = {
      init: function() {
        console.log("home controller wide");
      },
      index: function(){
        console.log("home#index");
      },
      about: function() {
        console.log("home#about");
      },
      contact: function() {
        console.log("home#contact");
      }
    }

`app/assets/javascripts/posts.js.coffee`

    APP.posts =
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