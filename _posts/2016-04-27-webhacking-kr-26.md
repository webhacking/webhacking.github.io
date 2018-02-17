---
layout: post
title: "Webhacking.kr 26번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-04-27
tags: ['26번']
comments: true
share: true
---

26번 문제는 100스코어 문제이며 난이도가 낮아서 이번에도 쉬어가는 문제라 볼 수 있습니다.

회사 출근과 동시에 문서 몇개보다가 갑자기 생각나서 풀이해봅니다.

3개의 라인만 보면 답이 보입니다. 그럼 `admin` 값을 [url
인코딩](http://www.w3schools.com/tags/ref_urlencode.asp)합시다.

  

'a' => %61

'd' => %64

'm' => %6D

'i' => %69

'n' => %6E

  

`%61%64%6D%69%6E` 해당 값을 한번 더 인코딩한후에 요청합니다.

2번째 라인에서 해당 값이 urldecode 되기때문에 3번째 조건에 만족하여 해당 문제를 해결할 수 있습니다.

  

    if(eregi("admin",$_GET[id])) { echo("no!"); exit(); } $_GET[id]=urldecode($_GET[id]); if($_GET[id]=="admin") { @solve(26,100); } 

  

