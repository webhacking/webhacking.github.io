---
layout: post
title: "match against in mysql"
description: ""
categories : ""
sub_categories : ""
date: 2016-04-13
tags: []
comments: true
share: true
---

CREATE TABLE `articles` (

`id` int(11) NOT NULL DEFAULT '0',

`title` varchar(65) DEFAULT NULL,

`topic` varchar(25) NOT NULL DEFAULT '',

`author` varchar(25) NOT NULL DEFAULT '',

`ondate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',

`body` text NOT NULL,

KEY `index_id` (`id`),

FULLTEXT KEY `title` (`title`,`body`)

) ENGINE=MyISAM DEFAULT CHARSET=utf8$$

  

  

  

select id,title FROM articles WHERE

MATCH(title) AGAINST ('+cvs' IN BOOLEAN MODE) limit 1000;

  

what you have to consier is depending on DB Engine

