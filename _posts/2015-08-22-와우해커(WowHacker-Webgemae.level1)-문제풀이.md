---
layout: post
title: "와우해커(WowHacker Webgemae.level1) 문제풀이"
description: ""
date: 2015-08-22
tags: ['심심', '와우해커', '워게임', '웹게임']
comments: true
share: true
---

게임에 들어가기 앞서, 와우해커 및 hackme , webhacking 등 여러종류의 워게임을 제공하는 서비스들이 많다.

심심풀이, 즉 할거 없을 때 하면 시간 때우기로 좋다.

  

  

![](/assets/images/posts/41/24545A4B55D8243A34CB98.PNG)

  

  

문제내용

  

  

http://webgame.wowhacker.com/level1.php

hint) php 소스코드를 봐야합니다.

  

일단, 해당 주소로 이동합시다. 추가로 힌트는 php소스코드를 봐야한다고하네요.

"?key=" 구문이있습니다. 추가로 "Can not open a key file" 키 파일을 열수가 없다네요.

?key= 구문을 봤을때 get방식 임의값을 넣어 봤습니다.

  

  

![](/assets/images/posts/41/2675014055D825C92D0626.PNG)

  

"2" 가 출력되네요.

추가로 밑에 힌트를 지금 발견했네요.

"개발자의 실수로 소스코드를 볼수있다. php파일의 소스코드를 웨에서 보기 위한 방법"

흠, 혹시나 해서 php확장자 옆에 s를 붙여보았습니다.

  

  

![](/assets/images/posts/41/266A654055D825CB33CC0F.PNG)

  

    <?
     echo "?key=";
     echo "$_GET[key]";
     echo "<br>";
    	if($_GET[key]=="wowhacker_hardware"){
    		include "./../key/key1";
    	} else echo "Can not open a key file";
    ?>
    <br>
    <br>
    Hint : 개발자의 실수로 소스코드를 볼수있다. php파일의 소스코드를 웹에서 보기 위한 방법<br>
    <br>

  

GET HTTP METHOD 의 key 값이 'wowhacker_hardware' 인 경우 해당경로의 파일을 호출합니다.

아닐경우 'Can not open a key file' 문구를 출력합니다.

  

그렇다면 wowhacker_hardware 로 요청해봅시다.

  

  

![](/assets/images/posts/41/2259604255D82584138B0E.PNG)

  

  

  

![](/assets/images/posts/41/2774243755D831B435E8B7.PNG)

  

  

'i love tiger mac' 이라는 키 값을 얻었습니다.

이제 인증하기 메뉴를 통해서 이 값을 인증하면 레벨 2로 이동하게됩니다.

너무 쉽죠?  

  

  

![](/assets/images/posts/41/251C5B4555D8317E123090.PNG)

  

![](/assets/images/posts/41/2634FF3755D831B1042280.PNG)

  

  

  

  

  

