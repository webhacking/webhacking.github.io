---
layout: post
title: "Webhacking.kr 29번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-05-31
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

안녕하세요.

솔직히 요즘 워 게임관련해서 포스팅을 하고싶어도 귀차늠과 시간핑계로 둘러대다가 오늘 포스트를 작성합니다.

뭐 매번 같은 패턴인 것 같네요.

  

29번 문제는 400 스코어 문제이며 난이도는 전의 문제들에 비해 조금 있는 편입니다.

몇번의 삽질을 좀 하셔야 할 수 도있습니다.

  

해당 문제에 들어가면 힌트라면서 던져주는 것들이 쿼리문과 사이드쪽에 필터링 코드입니다.

추가로 *"_blind sql injection으로 풀이하실경우 정답이 출력되지 않습니다. 더 간단한 방법이 존재하니 그 방법을
이용해주세요._" 라는 메모가 있습니다. 파일 폼이 보이니 일단 파일 업로드 후 서버로 요청을 해봅니다.

  

    select password from c29_tb$file_name=str_replace(".","",$file_name);

  

업로드가 성공적으로 잘 된것같네요.

파일을 업로드하면 Time,Ip,File(파일명)이 3가지의 정보가 보여집니다.

파일 업로드 정보를 따로 DB에 저장해두는 것 같습니다. 좀 전에 업로드한 파일로 다시 업로드를 해봅니다.

이번에는 이미 존재하는 파일이라고하네요. 파일명을 바꿔서 요청해볼까요?

등록되었네요. 동일한 파일명이 없다면 업로드 시간,아이피,파일명 세개를 기록(_insert into c29_tb(time, ip, file)
values('시간','ip','파일명')_)하는 것 같습니다. 해당 아이피 기준으로 검색하여 결과값을 리턴(where ip=request
ip )해주는것이라 간단하게 프로세스를 유추해볼 수 있습니다.

  

파일명을 통해서 직접적으로 쿼리한다고 생각하면됩니다.

즉, 파일명은 전체 쿼리문의 일부분입니다. 이 부분을 봤을때 해당 문제는 서브쿼리관련 문제라 할수있고 위의 메모가 이해가되는 시점입니다.
위의 구상했던 프로세스를 근거해서 보면 우리가 작성해얗할 쿼리문은 아래와 같습니다.

  

_1\. insert into c29_tb(file,time,ip) values('파일명','시간','아이피')_

_2\. insert into c29_tb(file,time, ip)
values('__파일명__','__시간__','아이피')_=>파일명',(select password from
c29_tb),아이피(0x3132372e302e302e31 <= 루프백 IP임ㅋ));#

  

순서가 틀리네 할수도있는데요.

컬럽 Insert 순서가 업로드 후 보여지는 내용과 조금 차이가있네요. 그래서 위 순서로 작성해서 요청하면됩니다.

바인딩 되는 값 순서만 보고 팔로팔로팔로미

  

$file_name=str_replace(".","",$file_name);

추가로 서버단에서 comma를 모두 replace 하기 때문에 `127.0.0.1` 값으로 요청해도 의미없으니 이와같은 방법으로 우회합니다.

  

이와 같이 요청하면 패스워드 키값이 나옵니다.

클리어.

  

이전 28번 문제 풀이보기 ['http://blog.hax0r.info/615']

  

  

![](/assets/images/posts/641/265DCA4F574D0B5C374F75.JPEG)

  

  

![](/assets/images/posts/641/24240B49574D0AC116ED2A.JPEG)

  

