---
layout: post
title: "WowHacker Webgemae level3"
description: ""
categories : development
sub_categories : ""
date: 2015-08-23
tags: ['webhacking', 'wowhacker']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

안녕하세요.

어제 부터 와우해커 문제풀이를 연재하게되었습니다.

추가로 오늘 올드좀비님에 'Webhacking.kr'도 함께 연재할 생각이니 참고하시길바래요.

와우해커 문제들은 오래된 문제(?)들이 많지만 'Webhacking.kr 신규 문제들이 많이 업데이트된게 많습니다.

  

2번 문제와 비슷한 게시판 형태입니다.

총 5개의 게시물이 있고, 게시물 하나는 비공개 처리되어있습니다.

아래와 같이 모든 게시물에 첨부파일이 있고, 우리는 저 비공개 처리된 게시물의 첨부파일을 가져오면 될 것 같습니다.

아래는 해당 게시물 번호와 날짜 그리고 첨부파일 경로입니다.

"(번호.날짜) 첨부파일" 형태로 생각해주시면 될것같습니다.

  

(01.0.25616200) http://webgame.wowhacker.com/weblevel3/down/b72776c5eb0c5a05a7
188959a49e1f1b.25616200

(02.0.5783350) http://webgame.wowhacker.com/weblevel3/down/28d805e190f11ba1da5
283d494ee8492.57833500

(03.0.78252100) http://webgame.wowhacker.com/weblevel3/down/b08e7acd151d17cbc5
f205edf151d7e7.78252100

(04.0.65272100) http://webgame.wowhacker.com/weblevel3/down/779bbf24b15bb7cb0f
6b51507f0615f4.65272100

(*05.0.85428900) ??

  

우리가 주목해야될 부분은 바로 이부분 입니다.

  

(01.0.25616200) http://webgame.wowhacker.com/weblevel3/down/b72776c5eb0c5a05a7
188959a49e1f1b.25616200

(02.0.5783350) http://webgame.wowhacker.com/weblevel3/down/28d805e190f11ba1da5
283d494ee8492.57833500

(03.0.78252100) http://webgame.wowhacker.com/weblevel3/down/b08e7acd151d17cbc5
f205edf151d7e7.78252100

(04.0.65272100) http://webgame.wowhacker.com/weblevel3/down/779bbf24b15bb7cb0f
6b51507f0615f4.65272100

  

  

우 4개의 게시물의 첨부파일은 '1번 : 오픈기념사진(Size: 55KBytes)', '2번 : 몸매짱(Size: 28KBytes)',
'3번 : Hint(Size: 11Bytes) ','4번 : 내사진(Size: 3KBytes)'입니다. 딱히 별다른 의미는 없는것같네요.

  

![](/assets/images/posts/45/2706013455D97ED7324128.PNG)

  

![](/assets/images/posts/45/2636E13455D97ED9065865.PNG)

![](/assets/images/posts/45/2437373455D97EE3062660.PNG)

  

  

  

  

  

  

위의 첨부파일 링크를 보았을 때 우리는 아래와 같이 유추해볼수있습니다.

http://webgame.wowhacker.com/weblevel3/down/???????.85428900

  

"?????" 부분을 우리는 해쉬값이라는걸 알수있습니다.

전부 소문자와 숫자로 조합된 32자리의 값으로 MD5로 해쉬되었다는걸 알수있습니다. 그럼 디코딩합시다.

  

http://www.md5online.org/

(저는 위의 사이트를 참고하여서 디코딩했습니다.)

  

  

![](/assets/images/posts/45/237DF54155D9818627B469.PNG)

  

  

디코딩을 통해서 4개의 값을 얻었습니다. "1161129925", "1161219665","1161313519","1161336283"

우선 얻은 값을 원래 자리에 붙여넣어봅시다.

  

(01.0.25616200)
http://webgame.wowhacker.com/weblevel3/down/1161129925.25616200

(02.0.5783350) http://webgame.wowhacker.com/weblevel3/down/1161219665.57833500

(03.0.78252100)
http://webgame.wowhacker.com/weblevel3/down/1161313519.78252100

(04.0.65272100)
http://webgame.wowhacker.com/weblevel3/down/1161336283.65272100

  

굳이 붙여넣지 않아도, 이값들이 timestamp값임을 알 수 있습니다. timestamp란 1970.1.1 00:00:00 이후의 시간을
초로 환산하여 문자열로 나타낸 값입니다.

  

timestamp값임을 알 수 있습니다. timestamp란 1970.1.1 00:00:00 이후의 시간을 초로 환산하여 문자열로 나타낸
값입니다.

아래 링크를 통해서 쉽게 시각->timestamp->시각변환이 가능합니다.

  

http://www.4webhelp.net/us/timestamp.php?action=stamp&stamp=1161129925&timezon
e=0

  

GMT +9 Hours를 선택(대한민국 표준시는 그리니치 표준시(GMT)보다 9시간 앞서므로 그렇습니다.)하고 timestamp 폼에 아까
디코딩 된 값("1161129925", "1161219665","1161313519","1161336283")을 Convert to date

  

01\. 1161129925 translates to Tuesday, October 17th 2006, 15:05:25 (GMT -9)

02\. 1161219665 translates to Wednesday, October 18th 2006, 16:01:05 (GMT -9)

03\. 1161313519 translates to Thursday, October 19th 2006, 18:05:19 (GMT -9)

04\. 1161336283 translates to Friday, October 20th 2006, 00:24:43 (GMT -9)

  

게시물 작성시간과 동일합니다.

5번의 첨부파일 값을 볼려면 게시물 작성시간과 timestamp값으로 변환하여 이를 MD로 인코딩하면 될것같습니다.

비공개 처리된 게시물의 작성날짜는 '2006.10.22 15:49.52'입니다.

'year:2006','Month:10','day:22','hour:15','Minute:49','Second : 52' 이상태로 이전처럼
Timezone은 GMT +9 Hours를 선택하고 Convert to a timestamp를 누릅니다. 아래와 같은 답을 얻었습니다.

  

'Sunday, October 22nd 2006, 15:49:52 (GMT +9) translates to 1161499792'

  

1161499792을 이전 md5 디코딩 사이트에 들어가서 디코딩 메뉴 옆에 인코딩이라는 메뉴가 보일것입니다.

해당 메뉴로 이동후 '1161499792'를 md5로 인코딩합니다.

  

MD5 hash for 1161499792 is : fb6e412cf733d6b9cdf777cbcafa35c3

  

'fb6e412cf733d6b9cdf777cbcafa35c3' 라는 값을 얻었습니다.

그럼 이제 퍼즐조각을 찾았으니 맞춰봅시다.

  

http://webgame.wowhacker.com/weblevel3/down/???????.85428900 - >http://webgame
.wowhacker.com/weblevel3/down/fb6e412cf733d6b9cdf777cbcafa35c3.85428900

  

![](/assets/images/posts/45/217B404F55D9865611D00F.PNG)

  

  

레벨3의 키값을 얻었습니다. ' iwantknowmoreMrjones! '

  

![](/assets/images/posts/45/2154A73555D986CD02B8ED.PNG)

재미없는 글 재미있게 포스팅하려고 노력했는데 . .

재미가없네요. 다음은 4번 문제 풀이를 올리겠습니다.

  

  

![](/assets/images/posts/45/23186C3355D9872D2C8BEC.JPEG)

  

