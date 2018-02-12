---
layout: post
title: "[풀이] Webhacking.kr 8번 문제"
description: ""
date: 2016-03-09
tags: ['8번', 'webhacking.kr', '웹해킹', '해킹']
comments: true
share: true
---

후덜덜, 정말 바빠서 요즘 연재할 생각을 못 했습니다.

회사에서의 시간이 대부분이고 요즘은 주말에도 따로 준비하는 여러가지 일(?)들 때문에 바쁜나날을 보내고있습니다.

나의 20대 초반 이렇게 가는가...ㅋㅋ 회사에서 원래 포스팅한다는거 자체가 엄청난 깡이지만.. 빠르게 클리어한다는 전제조건으로
포스팅하고있습니다.

글에 오타가 많아도 이해해주시길바래요. 구글 애널리틱스나 티스토리에서 제공하는 방문자 유입로그등을 참고하면 webhacking.kr 문제로
검색 유입되시는 분들이 종종있으세요. 근데 처음 시작과 달리 문제 풀이가 좀 늘어나니 유입수가 상당 수 늘어났네요. 뭐 SEO라던가
부가적으로 상위검색에 노출될려고 신경쓴 제 노력(?)도 어느정도 있겠지만요. 각설하고 문제 봅시다.

  

  

![](/assets/images/posts/515/2602A43A56DF9119032E37.PNG)

  

  

소스를 참고하고 "index.phps" 문장이 주석되어있습니다.

해당 document path로 들어갑시다.

  

그럼 해당 페이지에 php 로직 소스코드가 그대로 노출되어있습니다.('와우')

    $agent=getenv("HTTP_USER_AGENT");
            $ip=$_SERVER[REMOTE_ADDR];
            $agent=trim($agent);
            $agent=str_replace(".","_",$agent);
            $agent=str_replace("/","_",$agent);
            $pat="/\/|\*|union|char|ascii|select|out|infor|schema|columns|sub|-|\+|\||!|update|del|drop|from|where|order|by|asc|desc|lv|board|\([0-9]|sys|pass|\.|like|and|\'\'|sub/";
            $agent=strtolower($agent);
            if(preg_match($pat,$agent)) exit("Access Denied!");
            $_SERVER[HTTP_USER_AGENT]=str_replace("'","",$_SERVER[HTTP_USER_AGENT]);
            $_SERVER[HTTP_USER_AGENT]=str_replace("\"","",$_SERVER[HTTP_USER_AGENT]);
            $count_ck=@mysql_fetch_array(mysql_query("select count(id) from lv0"));
            if($count_ck[0]>=70) { @mysql_query("delete from lv0"); }
            $q=@mysql_query("select id from lv0 where agent='$_SERVER[HTTP_USER_AGENT]'");
            $ck=@mysql_fetch_array($q);
            if($ck)
            { 
            echo("hi $ck[0]");
            if($ck[0]=="admin")
            {
            @solve();
            @mysql_query("delete from lv0");
            }
            }
            if(!$ck)
            {
            $q=@mysql_query("insert into lv0(agent,ip,id) values('$agent','$ip','guest')") or die("query error");
            echo("done!  ($count_ck[0]/70)");
            }

  

일단 위에 문제를 보면 해당 문제를 solve하기 위해선 'lv0'테이블 id가 admin이어야 solved된다. 즉 admin이라는 id를
가진 agent를 추가해야한다.

agent는 값을 조작해서 mysql 쿼리문 중 inset 구문에 SQL Injection을 하면된다.(요즘 인젝션 관련해서 말 많죠
ㅋㅋ?나쁜짓 하지 맙시다. 포돌이형이 잡아가요.)

유저에이전트값을 조작/수정(?)하는데 있어서 따로 프로그램을 찾아서 해도되지만, 전 파이썬으로 간단한게 소스를 짜서 했습니다.

그이유는 몇번 삽질 할 것 같아서 ㅋㅋ

HTTP_USER_AGENT를 통해서 user agent값을 요청받아서 해당 값을 변수로 저장하고 문자열 공백을 제거한 후, 여러번 스트링을
replace한다.

파이썬 코드 20줄 될 듯, 헤더부분하고 리퀘스트 그리고 프린트 이거면 끄읕

  

코드를 다 노출시키는건 풀이하시는 분한테 미안할거같아서(퍽) 그냥 간단한게 설명드릴게요.

urllib2 import하시고
request=urllib2.Request('http://webhacking.kr/challenge/web/web-08/') req라는
변수에 할당합니다.

request.add_header('User-Agent', '쿼터쿼터')

request.add_header('Cookie','PHPSESSID=%s' % '자기 세션값')

request_result=urllib2.urlopen(request).read()

print request_result

  

요렇게 짜면 됩니다.

  

그리고 쿼터문 잘 준비하시고 요청하시면 아래와 같은 메세지를 볼거에요.

hi <b>admin</b><p><script>alert('Congratulation!');</script><center><h1><br><b
r><hr><font color=gray>You have cleared the 8 problems.</font><br><br><font
color=green><b>Score + 350</b></font><br><hr></h1></center>

  

  

$agent=str_replace(".","_",$agent);

$agent=str_replace("/","_",$agent);

그 후 소문자로(strtolower) 변경한다. 소스위에서 아래로 그냥 보면서 쓰고있음(절차지향적 사고방식ㅋㅋㅋ).

$pat="/\/|\\*|union|char|ascii|select|out|infor|schema|columns|sub|-|\\+|\||!|
update|del|drop|from|where|order|by|asc|desc|lv|board|\\([0-9]|sys|pass|\\.|li
ke|and|\'\'|sub/";

pat(네이밍 굿)? 밑에보니 정규식통해서 한번 필터링하네요.

if(preg_match($pat,$agent)) exit("Access Denied!");

  

필터링된 값을 db쿼리통해서 나온 결과를 q라는 변수에 저장하고, mysql_fetch_array통해서 ck라는 변수에 할당하네요.

이제보니 이거 350점 문제였네요. 다음문제 900점이네요. 후더덜 젤 높네요.

9번(900),2번(500),8번(350) 점수순으로 솔팅하면 위와같네요.

다음 문제 900점짜리네요. 그럼 담에 또 시간나면 포스팅할게요.

빠이염. 지금 까지 착한 사람이었습니다.

  

  

![](/assets/images/posts/515/224DDC3E56DF983B34FA4B.JPEG)

  

  

참고 PHP 함수

  * [getenv](http://php.net/manual/kr/function.getenv.php) (환경 변수 값을 얻는다.)

  

