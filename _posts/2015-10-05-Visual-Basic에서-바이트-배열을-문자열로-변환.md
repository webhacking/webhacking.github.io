---
layout: post
title: "Visual Basic에서 바이트 배열을 문자열로 변환"
description: ""
date: 2015-10-05
tags: []
comments: true
share: true
---

https://msdn.microsoft.com/ko-kr/library/ms172827.aspx  
  

1

2

3

4

5

6

Private Function UnicodeBytesToString(

ByVal bytes() As Byte) As String

Return System.Text.Encoding.Unicode.GetString(bytes)

End Function

[Colored by Color Scripter](http://colorscripter.com/info#e)

[cs](http://colorscripter.com/info#e)

  

