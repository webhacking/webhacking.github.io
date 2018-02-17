---
layout: post
title: "php shorthand condition"
description: ""
categories : development
sub_categories : ""
date: 2016-11-14
tags: []
comments: true
share: true
---

자주 사용하는 것들, 이전에도 이 주제로 포스트한게있음.

참고 : http://blog.hax0r.info/140

  

  

**Basic True / False Declaration**
    $is_admin = ($user['permissions'] == 'admin' ? true : false);

**  
**

**Conditional Welcome Message**
    echo 'Welcome '.($user['is_logged_in'] ? $user['first_name'] : 'Guest').'!';

  

**Conditional Items Message**
    echo 'Your cart contains '.$num_items.' item'.($num_items != 1 ? 's' : '').'.';

