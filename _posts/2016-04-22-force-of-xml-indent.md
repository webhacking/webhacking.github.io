---
layout: post
title: "XML 인덴트 강제 조정"
description: ""
categories : development
sub_categories : ""
date: 2016-04-22
tags: []
comments: true
share: true
---


    #!/usr/bin/python
    # -*- coding: utf-8 -*-
    
    import re
    
    line = 'Cats are smarter than dogs'
    
    matchObj = re.match(r'dogs', line, re.M | re.I)
    if matchObj:
        print 'match --> matchObj.group() : ', matchObj.group()
    else:
        print 'No match!!'
    
    searchObj = re.search(r'dogs', line, re.M | re.I)
    if searchObj:
        print 'search --> searchObj.group() : ', searchObj.group()
    else:
        print 'Nothing found!!'
