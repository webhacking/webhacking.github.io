---
layout: post
title: "Git 에서 Out of Memory"
description: ""
categories : ""
sub_categories : ""
date: 2016-12-28
tags: []
comments: true
share: true
---

Out of MemoryCommit ,Pull, 병합 또는 Rebase 시에 out of memory에러가 발생할 경우가 발생한다.

위 의 에러사항의 대처방법은 아래와 같이 `.gitconfig` 파일 (git 설정 파일)을 수정하여 해결할 수 있다.

  

  

    ## 본인의 설정파일
    [user]
     email = a@hax0r.info
     name = webhacking
    [core]
     packedGitLimit = 128m
     packedGitWindowSize = 128m
    [pack]
      deltaCacheSize = 128m
      packSizeLimit = 128m
      windowMemory = 128m

  

참고

1\. http://unix.stackexchange.com/questions/203183/git-fatal-out-of-memory-
malloc-failed-on-branch-push

