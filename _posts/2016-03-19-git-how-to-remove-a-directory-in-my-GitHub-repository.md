---
layout: post
title: "Git how to remove a directory in my GitHub repository"
description: ""
date: 2016-03-19
tags: []
comments: true
share: true
---

**Remove directory from git and local**

You could checkout 'master' with both directories;

  

    git rm -r one-of-the-directories git commit -m "Remove duplicated directory" git push origin master

  

**Remove directory from git but NOT local**

As mentioned in the comments, what you usually want to do is remove this
directory from git but not delete it entirely from the filesystem (local)

In that case use:

  

    git rm -r --cached myFolder

