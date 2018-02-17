---
layout: post
title: "Visual Basic에서 바이트 배열을 문자열로 변환"
description: ""
categories : development
sub_categories : ""
date: 2015-10-05
tags: []
comments: true
share: true
---

https://msdn.microsoft.com/ko-kr/library/ms172827.aspx  
  
    
    Private Function UnicodeBytesToString(
    
    ByVal bytes() As Byte) As String
    
    Return System.Text.Encoding.Unicode.GetString(bytes)
    
    End Function


  

