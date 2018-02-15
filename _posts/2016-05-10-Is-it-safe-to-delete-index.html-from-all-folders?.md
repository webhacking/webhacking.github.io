---
layout: post
title: "Is it safe to delete index.html from all folders?"
description: ""
categories : ""
sub_categories : ""
date: 2016-05-10
tags: []
comments: true
share: true
---

The purpose of them is to prevent the contents of the directory from
displaying if directory listing is enabled on your server. Apache servers by
default have directory listing enabled.

  

There are several instances where given the right circumstances you might be
able to attempt to browse to a folder directly. These would mainly be caused
by a server which is not configured properly, or an exploit. Therefore it is
really best if you just leave the index.html files alone (they aren't hurting
anything, and they don't take up that much space).

  

I'd even go as far as to suggest that you too add an index.html file to any
and all folders which you create.

