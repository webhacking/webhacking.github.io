---
layout: post
title: "The Graceful WebSocket"
description: ""
categories : ""
sub_categories : ""
date: 2015-09-16
categories : ""
sub_categories : ""
tags: []
comments: true
share: true
---

  

here https://code.google.com/p/jquery-graceful-websocket/

  

So, you want to start building realtime event driven applications using the
new HTML5 WebSocket API?

  

You want it to work in all browsers, no matter if they have WebSocket support
or not

You don't want to rely on proprietary technology such as Flash to provide a
fallback

And naturally, you don't want to write more than one implementation

Introducing, the gracefulWebSocket jQuery plugin:

  

Implements the w3c WebSocket interface

Wraps the native WebSocket if support is detected

Provides a default fallback using traditional AJAX polling over HTTP

Requires no extra code on the frontend, allows you to target the WebSocket API
today and let users take advantage of it as more browsers add support.

Default fallback behavior can be overridden by plugin options

