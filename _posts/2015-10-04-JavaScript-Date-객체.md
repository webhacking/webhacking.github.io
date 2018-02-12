---
layout: post
title: "JavaScript Date 객체"
description: ""
date: 2015-10-04
tags: []
comments: true
share: true
---

Date 오브젝트는 date와 time 에 대한 내용들을 다룰 수 있습니다.

  

**Try it Yourself - Examples**

Return today's date and time : Date() 함수를 이용하여 오늘 날짜를 알아내기

getFullYear() : 년도 얻기

getTime() : 1970년 1월 1일 이후 부터 지금까지의 시간을 밀리세컨드 단위의 숫자로 얻기

  

  

**JavaScript Date Object**

setFullYear() : 년도를 세팅하기

toUTCString() : 오늘의 날짜를 UTC 기준으로 얻기

getDay() :

Use getDay() and an array to write a weekday, and not just a number.

Display a clock : 시계 구현 예제

  

  

**Create a Date Object**

  

Date object는 Date() 생성자를 통해 만들 수 있다.

아래는 만드는 방법에 대한 예들이다.

new Date() // 현재 날짜와 시간이 기본으로 세팅됨

new Date(milliseconds) //1970/01/01 기준으로 밀리세컨드 지난 시간을 기본으로 세팅됨

new Date(dateString) // 사용자가 지정한 날짜 문자열을 기본으로 세팅됨

new Date(year, month, day, hours, minutes, seconds, milliseconds) : 각 요소들을 직접
지정하여 세팅함

  

위 예제의 인자 대부분은 생략이 가능하다.

Date object가 생성되면, 내장함수들을 사용할 수 있게 되고, 대부분의 내장함수들은 get 과 set 키워드를 통해 구분되어 진다.
year, month, day, hour, minute, second, milliseconds 들에 get 과 set을 붙여서 사용할 수
있는 것이다.

All dates are calculated in milliseconds from 01 January, 1970 00:00:00
Universal Time (UTC) with a day containing 86,400,000 milliseconds.

  

초기화 예제:

var today = new Date()

var d1 = new Date("October 13, 1975 11:13:00")

var d2 = new Date(79,5,24)

var d3 = new Date(79,5,24,11,33,0)

  

Set Dates

Date 오브젝트를 통해 date와 time을 쉽게 사용할 수 있다.

예를 들어 2010-01-14를 세팅하고 싶다면 아래처럼 사용할 수 있다.

var myDate=new Date();

myDate.setFullYear(2010,0,14);

그리고 5일 후를 세팅하고 싶다면 아래처럼 사용할 수 있다.

var myDate=new Date();

myDate.setDate(myDate.getDate()+5);

  

  

**Date Object Properties**

Property Description

constructor 생성자

prototype 사용자 속성과 함수들 추가

  

  

**Date Object Methods**

Method Description

getDate() 일자 반환 (from 1-31)

getDay() 요일 반환 (from 0-6)

getFullYear() 4자리 년도 반환 (four digits)

getHours() 시간 반환 (from 0-23)

getMilliseconds() 밀리세컨드 반환 (from 0-999)

getMinutes() 분 반환 (from 0-59)

getMonth() 월 반환 (from 0-11)

getSeconds() 초 반환 (from 0-59)

getTime() 1970.01.01 자정 이후 경과한 시간을 밀리세컨드로 반환

getTimezoneOffset() UTC 시간과 로컬 시간 사이의 차이를 분 단위로 반환

getUTCDate() UTC 기준 일자 반환 (from 1-31)

getUTCDay() UTC 기준 요일 반환 (from 0-6)

getUTCFullYear() UTC 기준 년도 반환 (four digits)

getUTCHours() UTC 기준 시간 반환 (from 0-23)

getUTCMilliseconds() UTC 기준 밀리세컨드 반환 (from 0-999)

getUTCMinutes() UTC 기준 분 반환 (from 0-59)

getUTCMonth() UTC 기준 월 반환 (from 0-11)

getUTCSeconds() UTC 기준 초 반환 (from 0-59)

getYear() 폐기. getFullYear() 함수로 대체

parse() 1970-01-01 자정 이후 경과한 시간을 밀리세컨드로 반환

setDate() 일자를 세팅

setFullYear() 년도를 세팅

setHours() 시간을 세팅

setMilliseconds() 밀리세컨드를 세팅

setMinutes() 분을 세팅

setMonth() 월을 세팅

setSeconds() 초를 세팅

setTime() 1970-01-01 자정을 기준으로 밀리세컨드를 세팅

setUTCDate() UTC 기준 일자 세팅

setUTCFullYear() UTC 기준 년도 세팅 (four digits)

setUTCHours() UTC 기준 시간 세팅

setUTCMilliseconds()  UTC 기준 밀리세컨드 세팅

setUTCMinutes() UTC 기준 분 세팅

setUTCMonth() UTC 기준 월 세팅

setUTCSeconds() UTC 기준 초 세팅

setYear() 폐기. setFullYear() 함수로 대체

toDateString() 문자열로 변환

toGMTString() 폐기. toUTCString() 함수로 대체

toISOString() ISO 표준 형태의 문자열로 변환

toJSON() JSON date 포맷으로 변환

toLocaleDateString() 사용자가 속한 지역의 날짜 표시 포맷 문자열로 변환

toLocaleTimeString() 사용자가 속한 지역의 시간 표시 포맷 문자열로 변환

toLocaleString() 사용자가 속한 지역의 포맷 문자열로 변환

toString() 문자열로 변환

toTimeString() 시간 문자열로 변환

toUTCString() UTC 포맷 형태 문자열로 변환

UTC() 1970-01-01 자정 기준 부터 경과한 시간을 밀리세컨드로 반환

valueOf() Date 객체의 원시 값을 반환

