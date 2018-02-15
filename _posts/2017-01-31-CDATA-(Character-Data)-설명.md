---
layout: post
title: "CDATA (Character Data) 설명"
description: ""
categories : ""
sub_categories : ""
date: 2017-01-31
tags: ['CDATA', 'Character Data']
comments: true
share: true
---

CDATA는 Character Data를 뜻 한다.

즉 문자 데이터를 말한다. 좀 더 정확한 표현을 하자면 (Unparsed) Character Data (파싱하지 않는 문자 데이터) 이다.

이 반대는 PCDATA 라 칭한다.

  

좀 더 정리하자면 SGML 또는 XML에서 스트링을 표현할 때 사용하는 토큰

해당 구문 안 내용들은 문자 데이터를 뜻 한다.  
해당 구문 안에 포함된 태그는 무시해도 된다고 파서에게 알림으로써 오동작 또는 오류를 막을 수 있다.

  

All text in an XML document will be parsed by the parser.

But text inside a CDATA section will be ignored by the parser

  
  

**CDATA - (Unparsed) Character Data**

  

The term CDATA is used about text data that should not be parsed by the XML
parser.

Characters like "<" and "&" are illegal in XML elements.

"<" will generate an error because the parser interprets it as the start of a
new element.

"&" will generate an error because the parser interprets it as the start of an
character entity.

Some text, like JavaScript code, contains a lot of "<" or "&" characters. To
avoid errors script code can be defined as CDATA.

Everything inside a CDATA section is ignored by the parser.

  

A CDATA section starts with "<![CDATA[" and ends with "]]>"

  

  

**Use of CDATA in program output**

  

CDATA sections in XHTML documents are liable to be parsed differently by web
browsers if they render the document as HTML, since HTML parsers do not
recognise the CDATA start and end markers, nor do they recognise HTML entity
references such as &lt; within <script> tags. This can cause rendering
problems in web browsers and can lead to cross-site scripting vulnerabilities
if used to display data from untrusted sources, since the two kinds of parsers
will disagree on where the CDATA section ends

