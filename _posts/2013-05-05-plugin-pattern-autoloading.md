---
layout: post
category : dev
tags : [minimal, usability, dry, code reuse]
title: I have a web app and I wanna use this code again
---

Can we do 100% reusable code that allows the *pick-and-choose/mix-and-match* behaviour which fits the memory-centric world of compiled and vm-backed applications.

Thoughts on plugins, mixins and class loading.

## Some intro
> I hereby declare your admin and frontend a husband and wife

Web apps are usually something like 2-men team.

* Public to the user
* Private to website owners

So actually **1** web application consist of **2** distinct applications that share data sources and some **boilerplate codebase**. Also consider scenarios where one of these 2 distinct applications grows too big, a giant app.

Usually big apps have popular areas and not-that-popular, otherwise called **hot-and-cold** areas. **Hot-and-cold** areas are found usually by website analytics and some common human powered analysis of the traffic. When a developer has identified **hot-and-cold** areas it's time for separating the app into 2 or more apps which are to be scaled proportionally based on the frequency they've been used.

So we end up not with 2 but with multiple applications serving the concept of 1 web application.

An interesting bit is the **boilerplate codebase**. With every new web application we (the developers) use a slight variation of that **boilerplate codebase**.

This **codebase** is used to abstract the use of specific *packages*.(You may instead of *packages* call them  *modules*, *libraries*, *plugins*, etc.) Once the **codebase** is loaded (included) in your project then all packages are wrapped into *services* & other handy classes - concepts that are more domain-specific for the application.

Basically we have wrappers around *packages* that expose a cleaner, also more limited & simple interface.

It is like in this book [**DON'T MAKE ME THINK**](http://en.wikipedia.org/wiki/Don%27t_Make_Me_Think). The boilerplate wrappers minimize very proprietary package API, transform it into something useful, and only expose methods that the application will need. Nothing more. It protects the developer from too many decisions and too many API look-ups.

## Problems with boilerplate wrappers
Each application needs something specific so that wrappers can't ever be extended in an official library/module. They are meant to be changed.

Such codebase ends up as a *project template* that is shared in a dev team. It doesn't end up as a dedicated library or a module that is shared with the public. It is very much the same or at least something like a *framework* or *meta framework* if you prefer. And frameworks are usually a sign of a bad design - code that doesn't do something on its own but acts as a glue of the *bigger picture*.

## The usual solution
Class inheritance. Class `A` extends class `B` where `B` adds some new stuff. If we only need stuff that `A` have then we use `A`. Analogically if we want stuff that `B` has we use `B` instead of `A`. We might have a class `C` that also extends class `А`. `C` will once again add different set of new stuff on top of `A`. 

That is broken in a way. If we want functionality from `B` and `C` we cant have it. That is unless we use multiple class inheritance and traits but that seems to be universally considered as *the cyanide of code*. It just... doesn't work.

## Let's have an example
A *User Service* which will be required in our admin and our frontend applications.

 * Both *admin* and *frontend* are user-aware.
 * Both applications are able to fetch users and track them with *sessions*.
 * Only the admin will be able to save and modify users.

Now, the obvious thing is to have the saving and updating the user as subclass of the user service to be used by the admin. That's ok for this web app setup. 

What if our your app have a different [separations of concerns](http://en.wikipedia.org/wiki/Separation_of_concerns) and you don't need user fetching in the frontend but only session tracking? **Well we'll need to modify the code**.

Please bare in mind that this is a simplistic scenario but there could be multiple of these which add up to a lot of refactoring.

That is why we hear people say:

> Every application has its specific needs, we can't have something that fits all.

Doesn't that sound disappointing? Let's try some provocation.

But first:

## Why is it hard for deamon-like applications
Node.js and Go apps are basically deamons/servers. They are not *scriptable*. They need to run in order to respond. I'm only saying this for other developers with similar to my development background with scripting languages like PHP which launch on each request and then exit after the request finished.

So for things like Node and GO we'll have to keep the application running. That means we want as little code as possible included in the runtime (so that memory is at its minimum).

Consider the my previous rant about "1 web application is actually a multitude of many apps". Now translate this into the case of a daemon app like one written in Node. In order to minimize the code loaded in each application we can't share single all-in-one codebase with all the functionality. We'll have to branch the codebase to serve each app with minimum footprint.

## A possible setup
<p class="bleed_image">
    <a href="https://www.cubby.com/pl/codebase-plugin-pettern-autoloading.png/_41e34ae1d88a450ea6524411d02be949"><img src="https://www.cubby.com/pl/codebase-plugin-pettern-autoloading.png/_41e34ae1d88a450ea6524411d02be949" alt="asd" class="bleed"></a>
</p>

We want to have the boilerplate wrappers as *ultra*-generic modules that can actually be used in all possible scenarios.

In this way the codebase stay the same, we only need to change files in each app.

The illustration above you can see a sample web app hierarchy. On the right I've expanded it a bit showing the 2 appearances of `user.js` representing the *User Service* from the previous example.

In the same illustration I also included the concept of **plugins**. Plugins (also could be found as *mix-ins*) are alternative to inheritance for extending functionality. Addy Osmani [has mentioned them](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#mixinpatternjavascript) which I found via ↬ [js patterns repo](https://github.com/shichuan/javascript-patterns/blob/master/code-reuse-patterns/mix-ins.html).

### How would the setup work
The *User Service* (`user.js`) appear twice as `service/user.js`. The `service/user.js` is actually a relative sub-path in both the shared codebase and the admin app. 

The `service/user.js` in the codebase will be just a generic empty object which accepts plugins and the `service/user.js` in the admin app will be the definition of all those plugins appended to the base class to form the *User Service* required in the admin.

So the `service/user.js` in the codebase is the *ultra*-generic base:

```js
var UserService = function() {
}
exports = UserService;
```

`service/user.js` in the admin:

```js
var loader = require('loader');
exports = loader(loader('shared:service/user.js'), [
    loader('shared:service/user/plugins/session.js'),
    loader('shared:service/user/plugins/storage.js'),
    loader('shared:service/user/plugins/storage/fetch/simple.js'),
    loader('shared:service/user/plugins/storage/fetch/accountAware.js'),
    loader('shared:service/user/plugins/storage/create.js')
]);
```
where a sample plugin, the `storage/create.js` plugin will accept the base class and return a transformed version of it like this:

```js
var loader = require('loader');
var db = loader('db');
exports = {
    attach: function(UserService) {
        UserService.prototype.addUser = function(user, callback) {
            db.insertUser(user, {safe:true}, callback);
        }
        return UserService;
    }
}
```

`attach(UserService)` will be called when attaching the plugin.

From now on when `loader('service/user.js')` is called anywhere in our project we should get a *User Service* class described in the admin, i.e. service with ability to:

 * track user via sessions
 * fetch user
 * fetch by company name
 * create a user

### What is this `shared:` and how do we get the *User Service* we want
That is a bit of autoloading done by the `loader` package that we would write to make use of the plugin pattern.

I'm thinking something like aliased paths:

```json
{
"app": "/home/user/project/apps/admin",
"shared": "/home/user/project/app_modules"
}
```

Where the paths can be defined as an environment variable:

```
HIERARCHY_PATH=(app)/home/user/project/apps/admin:(shared)/home/user/project/app_modules
```

If we don't mentioned the path alias like we did above with `shared:` then the order of path definition will take precedence.

Something like:

```
app:/service/user.js    -> will load the service/user.js from  /home/user/project/apps/admin/service/user.js
shared:/service/user.js -> will load the service/user.js from  /home/user/project/app_modules/user.js
service/user.js         -> will load the service/user.js from  /home/user/project/apps/admin/service/user.js
```

I've given the examples for nodejs but the idea is generally applicable to any language via the use of wrappers. In some languages of course it might be a hacky process. 

## May be you like it
May be you don't. It's an attempt on solving code re-use. I've [seen path aliasing](http://www.yiiframework.com/doc/guide/1.1/en/basics.namespace) in a PHP framework and I did like the idea. After all namespaces are pretty much close to the file path. Why not just use the filepath.

If you have a `service/user.js` with different set of plugins for each applications then you've minimized the memory usage and also have a highly reusable codebase that covers if not all then a lot of scenarios.

As a perk we've done a great deal of isolation. If an app doesn't need storage modification then it doesn't have access to it. 