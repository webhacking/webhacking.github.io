---
layout: post
title: "each 메소드에서 break 또는 continue"
description: ""
categories : etc
sub_categories : ""
date: 2016-06-24
tags: ['jQuery']
comments: true
share: true
---

each

  * A generic iterator function, which can be used to seamlessly iterate over both objects and arrays. Arrays and array-like objects with a length property (such as a function's arguments object) are iterated by numeric index, from 0 to length-1. Other objects are iterated via their named properties.

  

상황에 따라서 루프에서 break 또는 continue 조건을 넣어야할 때 가있다.

루프내에서 `return 1` 일 경우, `continue` 의 역할을 한다. 반대로 0일 경우에는 `break` 역할을 한다.

  

  

We can break the $.each() loop at a particular iteration by making the
callback function return false. _Returning non-false is the same as a continue
statement in a for loop_; it will skip immediately to the next iteration.

  

True : This is equivalent of 'break' for jQuery loop

False : This is equivalent of 'continue' for jQuery loop

  

참고 : [Loop
Control](http://www.tutorialspoint.com/javascript/javascript_loop_control.htm)

