---
layout: post
title: "C# request 인코딩 처리"
description: ""
categories : development
sub_categories : ""
date: 2015-09-22
tags: []
comments: true
share: true
---

    string url = "param1=가나다&param2=헤헤헤;
    
    System.Net.WebRequest req = System.Net.WebRequest.Create("http://url");
    
    byte[] param = UTF8Encoding.UTF8.GetBytes(url);
    
    req.Method = "POST";
    
    req.ContentType = "application/x-www-form-urlencoded; charset=UTF-8";
    
    req.ContentLength = param.Length;
    
    Stream stream = req.GetRequestStream();
    
    stream.Write(param, 0, param.Length);
    
    stream.Close();
    
    System.Net.HttpWebResponse res =
    (System.Net.HttpWebResponse)req.GetResponse();
    
    Encoding encode;
    
    if (res.CharacterSet.ToLower() == "utf-8") { encode = Encoding.UTF8; }
    
    else { encode = Encoding.Default; }
    
    Stream receive = res.GetResponseStream();
    
    StreamReader reader = new StreamReader(receive, encode);
    
    string resultText = reader.ReadToEnd();
    
    reader.Close();
    
    receive.Close();
    
    res.Close();

  

더블 인코딩으로 데이터를 달라기에 별 방법으로 인코딩을 해봤으나 위에 것만 데이터가 정상으로 넘어갔음

  

  

