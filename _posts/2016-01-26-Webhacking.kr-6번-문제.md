---
layout: post
title: "[풀이] Webhacking.kr 6번 문제"
description: ""
date: 2016-01-26
tags: ['6번', 'writeup', '문제풀이', '워게임', '웹해킹', '정답', '풀이', '해킹', '해킹문제']
comments: true
share: true
---

안녕하세요. 오늘 문제 두개 풀이를 포스팅하네요.

그것도 회사에서요..! 압박이네요. 사실 별거없습니다. 6번 문제는 100점 문제에요.

잠시 쉬는 문제라고도 할수있네요.

  

6번 문제에 접근하면 최상단에 힌트로 'base64'를 기재했네요.

아래 'index.phps'에는 링크가 걸려있네요. 해당 링크로 이동하면 아래와 같은 소스가 보입니다.

  

  

![](/assets/images/posts/496/225D4A3756A7076515A258.PNG)

  

  

  

    "); } ?>   Challenge 6  body { background:black; color:white; font-size:10pt; }    &nbsp;&nbsp;HINT : base64&nbsp;&nbsp;index.phps"); echo("ID : $decode_idPW : $decode_pw"); if($decode_id=="admin" && $decode_pw=="admin") {     @solve(6,100); } ?> 

  

Cookie값의 유무에 따라 id,pw의 값을 대입하고 그 대입한 값을 base64로 인코딩을 20회합니다.

그 후에 값을 아래와 같이 치환된다. 그럼 우린 클리어하기위해 해당 쿠키 값을 변조해야한다.

  

"1->!",

"2->@",

"3->$",

'4->^',

'5->&',

'6->*',

'7->(',

'8->)'

  

구문을 더 보면 decode부분이 눈에 보인다.

내용을 살펴보면 위에서 치환했던 내용들을 반대로 치환+decode*20 즉, 원래 문자열로 원복한다.

$decode_id=="admin" && $decode_pw=="admin" 해당 조건에 따라서 우리는 admin의 값으로 변조하여 해당
문제를 클리어할수있습니다.

  

일일히 한다면 할수야있겠지만 그런 불필요한 소모는 없었으면함. 아래는 내가 간단하게 작성한 파이썬 코드

    import base64hax0r_key='admin'for i in range(0,20):	hax0r_key = base64.b64encode(hax0r_key)hax0r_key = hax0r_key.replace("1","!");hax0r_key = hax0r_key.replace("2","@")hax0r_key = hax0r_key.replace("3","$")hax0r_key = hax0r_key.replace("4","^")hax0r_key = hax0r_key.replace("5","&")hax0r_key = hax0r_key.replace("6","*")hax0r_key = hax0r_key.replace("7","(")hax0r_key = hax0r_key.replace("8",")")print(hax0r_key)

