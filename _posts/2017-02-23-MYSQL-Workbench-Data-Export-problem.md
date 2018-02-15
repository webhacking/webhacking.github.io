---
layout: post
title: "MYSQL Workbench Data Export problem"
description: ""
categories : ""
sub_categories : ""
date: 2017-02-23
tags: ['MYSQL Workbench']
comments: true
share: true
---


    Error executing task: 'ascii' codec can't decode byte 0xbf in position 26: ordinal not in range(128)Error executing task [Error 32] : 'c:\\users\\\xbf\xec\xbf\xb5\xc1\xd8\\appdata\\local\\temp\\tmpemnpwj.cnf'17:47:56 Export of C:\Users\우영준\Documents\dumps\Dump20170223 has finished

  

위 와 같은 에러가 발생한다면, 계정명을 영문으로 수정하거나 생성 후 다시 실행한다.

character set 문제로 보임.

> seems that if the task temp folder cotains utf8 character, the execution
will fail, and i have no way to change the task temp folder.

>

>  

>

>  

**참고 사항**

  * [MySQL workbench failed to export a database](https://bugs.mysql.com/bug.php?id=62767)

  

