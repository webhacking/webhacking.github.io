---
layout: post
title: "배열 최소값 최대값"
description: ""
categories : development
sub_categories : javascript
date: 2015-09-10
tags: []
comments: true
share: true
---

배열에서 최소값, 최대값 구할 때.

  

    var min = [1, 20, 11, 88, 3].slice(0).sort(function(a,b){a>b})[0],
          max = [1, 20, 11, 88, 3].slice(0).sort(function(a,b){a<b})[0];
    ["b","a","d","c"].slice(0).sort()[0]; //"a"
    ["b","a","d","c"].slice(0).sort().reverse()[0]; //"d"
    ["b","a","d","c"].slice(0).sort(function(a,b){return a > b;})[0]; //"a"
    ["b","a","d","c"].slice(0).sort(function(a,b){return a < b;})[0]; //"d"

