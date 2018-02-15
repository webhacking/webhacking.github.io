---
layout: post
title: "Nginx error “conflicting server name” ignored"
description: ""
categories : ""
sub_categories : ""
date: 2016-06-25
tags: []
comments: true
share: true
---

서버 리부팅하고 웹서버 띄울려니깐 에러나길래 로그보니깐 내가 설정한 서버들이 모두 제외되있음.

설정 경로에 `.save`이있으면 삭제하고 다시 리부팅하면 됨.

  

참고 :

I assume that you're running a Linux, and you're using gEdit to edit your
files. In the _/etc/nginx/sites-enabled_, it may have left a temp file e.g.
default~ (watch the ~). Depending on your editor, the file could be named
_.save_ or something like it. Just run $ ls -lahto see which files are
unintended to be there and remove them

