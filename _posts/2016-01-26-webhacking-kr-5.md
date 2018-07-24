---
layout: post
title: "Webhacking.kr 5번 문제"
description: ""
categories : development
sub_categories : ""
date: 2016-01-26
tags: [webhacking, 'webhacking.kr']
comments: true
share: true
background_image: /assets/images/posts/well-used/hacked.jpg
---

![](/assets/images/posts/495/22473E3C56A6FA691B8FCD.PNG)

  

  

오래간만에 포스팅하는 것 같네요. 또 바쁘다는 핑계로.. 계속 미루다가 시간이 남아 포스팅합니다.

5번 문제는 300점이네요. 자 그럼 한번 둘러볼까요? 해당 문제의 접근하면 'login','join' 버튼이 중앙에 정렬되있습니다.

  

join 버튼을 클릭 시, 'Access_Denied' alert 을 보여준다. 그렇다면 우선 로그인 부터 살펴보자.

로그인 부분에 접근하면 로그인 폼이 나온다. 아무런 값이나 입력 후 요청한다.

  

그러면 아래와 같은 응답을 받을 것 이다.

  

Access Denied!

id is not admin

  

그럼 다시 본 문제의 홈으로 돌아와서, 소스를 보자.

그럼 밑에 자바스크립트 코드가 보일것이다.

  

    function no(){alert('Access_Denied');}function move(page){if(page=='login') { location.href='mem/login.php'; }}

  

추가로 login,join 버튼 태그이다.

이때 우리는 login부분 처럼, 페이지의 경로를 유추하여 join을 대입할수있다. 즉 회원가입 페이지의 경로는 './mem/join'
이라는 것 이다.

  

<input type="button" value="Login"
style="border:0;width:100;background=black;color=green"
onmouseover="this.focus();" onclick="move('login');">

<input type="button" value="Join"
style="border:0;width:100;background=black;color=blue"
onmouseover="this.focus();" onclick="no();" class="">

  

그럼 또 다른 소스를 마주한다.

    l='a';ll='b';lll='c';llll='d';lllll='e';llllll='f';lllllll='g';llllllll='h';lllllllll='i';llllllllll='j';lllllllllll='k';llllllllllll='l';lllllllllllll='m';llllllllllllll='n';lllllllllllllll='o';llllllllllllllll='p';lllllllllllllllll='q';llllllllllllllllll='r';lllllllllllllllllll='s';llllllllllllllllllll='t';lllllllllllllllllllll='u';llllllllllllllllllllll='v';lllllllllllllllllllllll='w';llllllllllllllllllllllll='x';lllllllllllllllllllllllll='y';llllllllllllllllllllllllll='z';I='1';II='2';III='3';IIII='4';IIIII='5';IIIIII='6';IIIIIII='7';IIIIIIII='8';IIIIIIIII='9';IIIIIIIIII='0';li='.';ii='';lIllIllIllIllIllIllIllIllIllIl=lllllllllllllll+llllllllllll+llll+llllllllllllllllllllllllll+lllllllllllllll+lllllllllllll+ll+lllllllll+lllll;
    lIIIIIIIIIIIIIIIIIIl=llll+lllllllllllllll+lll+lllllllllllllllllllll+lllllllllllll+lllll+llllllllllllll+llllllllllllllllllll+li+lll+lllllllllllllll+lllllllllllllll+lllllllllll+lllllllll+lllll;if(eval(lIIIIIIIIIIIIIIIIIIl).indexOf(lIllIllIllIllIllIllIllIllIllIl)==-1) { bye; }if(eval(llll+lllllllllllllll+lll+lllllllllllllllllllll+lllllllllllll+lllll+llllllllllllll+llllllllllllllllllll+li+'U'+'R'+'L').indexOf(lllllllllllll+lllllllllllllll+llll+lllll+'='+I)==-1){alert('access_denied');history.go(-1);}else{document.write('Join');document.write('.....');document.write('<form method=post action='+llllllllll+lllllllllllllll+lllllllll+llllllllllllll+li+llllllllllllllll+llllllll+llllllllllllllll
    +'>');document.write('id');document.write('pass');document.write('');}

  

    ㅇㅇㅇl = 'a';ll = 'b';lll = 'c';llll = 'd';lllll = 'e';llllll = 'f';lllllll = 'g';llllllll = 'h';lllllllll = 'i';llllllllll = 'j';lllllllllll = 'k';llllllllllll = 'l';lllllllllllll = 'm';llllllllllllll = 'n';lllllllllllllll = 'o';llllllllllllllll = 'p';lllllllllllllllll = 'q';llllllllllllllllll = 'r';lllllllllllllllllll = 's';llllllllllllllllllll = 't';lllllllllllllllllllll = 'u';llllllllllllllllllllll = 'v';lllllllllllllllllllllll = 'w';llllllllllllllllllllllll = 'x';lllllllllllllllllllllllll = 'y';llllllllllllllllllllllllll = 'z';I = '1';II = '2';III = '3';IIII = '4';IIIII = '5';IIIIII = '6';IIIIIII = '7';IIIIIIII = '8';IIIIIIIII = '9';IIIIIIIIII = '0';li = '.';ii = '';lIllIllIllIllIllIllIllIllIllIl = lllllllllllllll + llllllllllll + llll + llllllllllllllllllllllllll + lllllllllllllll + lllllllllllll + ll + lllllllll + lllll;lIIIIIIIIIIIIIIIIIIl = llll + lllllllllllllll + lll + lllllllllllllllllllll + lllllllllllll + lllll + llllllllllllll + llllllllllllllllllll + li + lll + lllllllllllllll + lllllllllllllll + lllllllllll + lllllllll + lllll;if (eval(lIIIIIIIIIIIIIIIIIIl).indexOf(lIllIllIllIllIllIllIllIllIllIl) == -1) {    bye;}if (eval(llll + lllllllllllllll + lll + lllllllllllllllllllll + lllllllllllll + lllll + llllllllllllll + llllllllllllllllllll + li + 'U' + 'R' + 'L').indexOf(lllllllllllll + lllllllllllllll + llll + lllll + '=' + I) == -1) {    alert('access_denied');    history.go(-1);} else {    document.write('Join');    document.write('.....');    document.write('');    document.write('id');    document.write('pass');    document.write('');}

조건 != true 인 것을 console 통해서 실행한다.

물론 위와 같은 난잡한 난독화된 문장을 해석해서 원하는 조건을 충족하는 것 도 방법이지만 우리가 원하는 루트로 빨리가는 것 도 하나의
방법이다.

그러면 회원가입 폼이 보인다.

  

당연히 admin으로 요청하면 아래와 같은 화면을 보게 될 거다.

프록시를 통해서 요청값을 수정하거나, 폼 태그를 보면 maxlength 의 값을 원하는 6또는 큰 값으로 변경후에 요청하는 방법도있다.

글쓴이는 프록시를 택했고(이미 설치되있고, 워낙 자주 사용하기에) 이 글을 보는 이중 아무나 자신이 편한쪽을 선택하는게 좋다.

admin 계정으로 가입 후, 이전 로그인 페이지로 가서 자신이 기입했던 정보를 입력 후 요청하면 끝 난다.

  

  

![](/assets/images/posts/495/275A8F3D56A7007F1F2CDD.PNG)

  

  

  

![](/assets/images/posts/495/2605843756A7042D2181E8.PNG)

  

  

