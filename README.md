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
    <body data-controller="<%= controller_name %>" data-action="<%= action_name %>">
    ...

### Example

#### JavaScript

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

#### CoffeeScript

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