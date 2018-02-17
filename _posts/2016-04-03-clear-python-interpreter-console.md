---
layout: post
title: "clear python interpreter console"
description: ""
categories : development
sub_categories : ""
date: 2016-04-03
tags: []
comments: true
share: true
---

```python

import os

def cls():

os.system('cls' if os.name=='nt' else 'clear')

# now, to clear the screen

cls()
```

