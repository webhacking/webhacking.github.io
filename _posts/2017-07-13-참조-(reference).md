---
layout: post
title: "참조 (reference)"
description: ""
categories : ""
sub_categories : ""
date: 2017-07-13
tags: []
comments: true
share: true
---

**Get down to business**

  

참조는 아시는 분은 아시겠지만 _메모리의 주소값을 같이 사용_하는 개념입니다.

C언어를 공부하셨다면, 아마 쉽게 아시는 내용이실 겁니다.

  

확실히 알고 넘어가야할 것 은 _"참조" 와 "대입"_은 다릅니다.

  

대입은 $a의 값을 $b에 대입하면서 내용을 완전히 복사하여 다른 메모리 위치에 저장하는 것 입니다.

만약 $a의 값이 변경되어도 $b의 값에는 전혀 영향을 미치지 않고 완전히 독립된 두 개의 변수를 만드는 반면,  
_참조는 같은 저장소(메모리 위치)를 가리키기_ 때문에 동일한 내용을 다루게 됩니다.  

  

단점은 참조 일때는 변수가 값을 가지고 있는게 아니라, 값에 대한 메모리 주소를 소유하고 있는 것이기 때문에

그 주소를 찾으러 가야합니다.  
  

비교적 속도가 느린편입니다.

  

아래는 PHP 언어 기준으로 벤치마킹한 내용입니다.

  

> In a test with 100 000 iterations of calling a function with a string of 20
kB, the results are

  

**Function that just reads / uses the parameter**

  

    pass by value:      0.12065005 secondspass by reference:  1.52171397 seconds

**  
**

**Function to write / change the parameter**

  

    pass by value:      1.52223396 secondspass by reference:  1.52388787 seconds

  

  

결론은 요약하자면 아래와 같습니다.

  

  * Pass the parameter by value is always faster
  * If the function change the value of the variable passed, for practical purposes is the same as pass by reference than by value

  

저는 본 포스트에서 PHP에서의 참조에 대하여 얘기를 나눠보고자 합니다.

  

**What References Are**

  

  

PHP 에서도 참조를 지원합니다.

공식 문서에는 아래와 같이 설명을 적었습니다.

  

> 참조에 의한 반환하기는 참조에 연결되어 있는 변수를 찾는 함수를 사용할때 유용하다.

>

> 하지만 참조에 의한 반환을 성능 증가 목적으로 하지말아라, 엔진이 스스로 최적화한다.

  

    $obj =& new myClass();

  

위의 구문은 클래스의 인스턴스를 새로 생성하는 구문입니다.

여기 "&" 는 참조(reference)를 뜻 하는 연산자입니다.

  

유닉스 파일 시스템의 [Hardlink](https://kb.iu.edu/d/aibc) 와 같은 의미입니다.

하지만 C언어의 포인터와는 다릅니다.

별명에 좀 더 가깝습니다.

  

그 이유는 _PHP 에서는 모든 변수가 다 동일한 "참조 방식" _이기 때문입니다.

  
한개의 변수를 다른 하나의 변수가 가르키는 것이 아닌, 모든 변수가 이 변수를 참조하고 있습니다.

변수 이름, 내용은 서로 구별되고 하나의 변수 내용이 서로 다른 여러개의 변수 이름을 가질 수 있습니다.

  

일반적 함수는 호출되면 함수는 그 값을 반환하고 그 값이 변수에 복사 된 후 함수 내부의 변수들은 해제될 것이나

참조에 의한 함수 반환의 경우 내부 변수들이 해제 되지않고 게속 참조를 하게됩니다.

  

프로그래밍 언어에 따라 함수나 메소드에 인자 값을 전달할 때 값에 의한 전달(pass by value) 인지 또는 참조에 의한 전달(pass
by reference) 방식인지가 중요한 요소가 되곤 한다.

  

"값에 의한 전달" 과 "참조에 의한 전달" 은 아래 그림을 보면 좀 더 이해하는데 도움이 될 것 입니다.

  

![](/assets/images/posts/777/25827433596768462AC685.GIF)

  

자바, 파이썬은 모두 값에 값에 의한 전달입니다.

아래 목록은 참고하면 좋은 링크들입니다.

  * [Cup Size a story about variables](http://www.javaranch.com/campfire/StoryCups.jsp)
  * [Pass ](http://www.javaranch.com/campfire/StoryPassBy.jsp)[by ](http://www.javaranch.com/campfire/StoryPassBy.jsp)[Value Please (Cup Size continued)](http://www.javaranch.com/campfire/StoryPassBy.jsp)

  

  

**What References Do**

  

아래 예제 코드는 함수 getvalue에 의해 반환하는 객체의 속성을 설정하지만,

참조 문법을 사용하지 않을 때와 같은 복사가 아닙니다.

  

    class foo {    public $value = 42;    public function &getValue() {        retrun $this->value;    }}$obj = new foo;/* $myValue는 $obj->value의 참조로, 42입니다. */$myValue = &$obj->getValue();$obj->value = 2;/* $obj->value의 새 값, 즉 2를 출력합니다. */echo $myValue;

  

  

  

**참고**

  * [Function pass by value vs pass by reference](http://courses.washington.edu/css342/zander/css332/passby.html)

  

  

