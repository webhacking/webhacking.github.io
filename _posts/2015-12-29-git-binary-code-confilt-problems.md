---
layout: post
title: "Git: 바이너리 파일의 머지가 충돌한 경우"
description: ""
categories : development
sub_categories : ""
date: 2015-12-29
tags: []
comments: true
share: true
---

**문제:**  
바이너리 파일의 머지가 깨진 경우, HEAD나 머지한 브랜치의 것 중 하나를 선택하려고 한다.  
  
  
**해결책:**  
  
git checkout 커맨드에서 --ours 와 --theirs 옵션을 제공한다.  
  
\--ours: 현재 브랜치의 것을 선택  
\--theirs: 다른 브랜치의 것을 선택  
  
  
$ git checkout --ours -- path/to/file # 현재 브랜치의 것을 선택  
$ git checkout --theirs -- path/to/file # 머지한 브랜치의 것을 선택  
  
  
  
참고: http://stackoverflow.com/questions/278081/resolving-a-git-conflict-with-
binary-files  

