---
layout: post
title: "find 명령으로 특정 파일 찾아서 여러 명령 실행하기"
description: ""
categories : development
sub_categories : ""
date: 2016-05-15
tags: []
comments: true
share: true
---


    find . -name "improvement.out" -exec echo \{\} \; -exec cat \{\} \; > improvements.out

