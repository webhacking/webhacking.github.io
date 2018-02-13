---
layout: post
title: "python 교집합, Intersection of two lists"
description: ""
date: 2016-04-19
tags: ['http://stackoverflow.com/questions/642763/python-intersection-of-two-lists']
comments: true
share: true
---


    c1 = [1, 6, 7, 10, 13, 28, 32, 41, 58, 63]c2 = [[13, 17, 18, 21, 32], [7, 11, 13, 14, 28], [1, 5, 6, 8, 15, 16]]c3 = [[13, 32], [7, 13, 28], [1,6]]c3 = [filter(lambda x: x in c1, sublist) for sublist in c2]

