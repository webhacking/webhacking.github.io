---
layout: post
title: "Webhacking.kr 18번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-03-20
tags: []
comments: true
share: true
---

18 번 문제는 SQL INJECTION 문제다.

이전 인젝션 문제보다 난이도가 낮아서 쉽게 클리어할수있을거다.

13 - 20 번까지 오늘 몰아서 쓸 예정이니, 다소 문제 풀이 내용이 부실할수있다.

몇개의 문제에서는 정답까지 공개하고 몇개의 문제에서는 공개하지않았다.

  

쉬운문제들은 본인이 좀 더 생각해서 풀길바란다.

나도 이전 기억을 좀 더듬어서 푼 것 들도많다. 삽질의 기억이랄까.

  

13번 문제에 들어가면 `index.phps` 라는 링크 태그가 보일거다.

클릭하면 해당 로직을 볼 수있다.

소스는 아래와 같다.

    if($_GET[no]) { if(eregi(" |/|\(|\)|\t|\||&|union|select|from|0x",$_GET[no])) exit("no hack"); $q=@mysql_fetch_array(mysql_query("select id from challenge18_table where id='guest' and no=$_GET[no]")); if($q[0]=="guest") echo ("hi guest"); if($q[0]=="admin") { @solve(); echo ("hi admin!"); } }  

  

![](/assets/images/posts/543/221A383E56EE877A32D287.JPEG)

  

  

코드에서 보듯이 no 라는 파라메터의 값은 필터링된다.

따라서 저 필터링 조건을 우회해야한다. no 파라메터의 0또는 1의값을 대입하여 요청했다.

0일 때는 아무것도 리턴하지않으며 1일때는 "하이 게스트" 문자를 출력한다.

  

이번에 몇개의 연산자를 대입해서 테스트했고, or 연산자는 사용가능한 것 을알았다.

따라서 위의 결과를 토대로 쿼리문을 짜서 요청했다.

  

라인피드는 URL 인코드를 치환한 값인 %0A을 사용했다.

0%0Aor%0A1 !?/

  

