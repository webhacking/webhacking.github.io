---
layout: post
title: "블로그를 위한 SyntaxHighlighter"
description: ""
date: 2015-08-23
tags: ['asp', 'C++', 'CDN', 'CODE', 'CSS', 'highlighter', 'HTML', 'Java', 'JS', 'SyntaxHighlighter', '블로그', '소스코드', '소스하이라이트', '티스토리']
comments: true
share: true
---

**01\. 필요성**

저의 경우 프로그래밍관련 포스팅을 많이 올리기 때문에 특성상 소스코드가 노출이 많습니다.

저 처럼 소스코드가 많이 노출되는 게시물을 이용자가봤을때 가독성이 떨어질수있으므로 소스코드 하이라이트의 필요성을 느낄수있습니다. 설치(?)
라고 표현하기 정도로 민망하지만 지식이 없으셔도 누구듯이 빠르게 적용하실수있습니다. 아래 설치방법 2개만 하시면 됩니다.

  

참고 : http://alexgorbatchev.com/SyntaxHighlighter/

![](/assets/images/posts/48/24056E3355D9C1D518C177.PNG)

  

  

  

**02\. 설치방법**

1) 해당 소스를 복사후 "title" 태그 아래에 붙여넣기 해주세요.

    <link href="http://alexgorbatchev.com/pub/sh/current/styles/shThemeDefault.css" rel="stylesheet" type="text/css">
    <script src="http://alexgorbatchev.com/pub/sh/current/scripts/shCore.js" type=" text/javascript"></script>
    <script src="http://alexgorbatchev.com/pub/sh/current/scripts/shAutoloader.js" type="text/javascript"></script>
    <style type="text/css" id="hax0rinfo">
    .code code, .code a {
       font-family: courier, courier new, monaco, monospace !important;
    }
    .code .container {
       padding:0 !important;
    }
    .syntaxhighlighter .toolbar {
       display: inline;
       float: right;
    }
    .article table td {
       padding: 0 !important;
    }
    </style>

  

  

2) 다음은 스크립트를 태그를 '</body>' 바로위에 넣어주세요.

    <script type="text/javascript">
    function SyntaxHighlighterBrushPath() {
      var args = arguments, result = [];
      for(var i = 0; i < args.length; i++)
          result.push(args[i].replace('@', 'http://alexgorbatchev.com/pub/sh/current/scripts/'));
      return result;
    };
    SyntaxHighlighter.autoloader.apply(null, SyntaxHighlighterBrushPath(
      'applescript            @shBrushAppleScript.js',
      'actionscript3 as3      @shBrushAS3.js',
      'bash shell             @shBrushBash.js',
      'coldfusion cf          @shBrushColdFusion.js',
      'cpp c                  @shBrushCpp.js',
      'c# c-sharp csharp      @shBrushCSharp.js',
      'css                    @shBrushCss.js',
      'delphi pascal          @shBrushDelphi.js',
      'diff patch pas         @shBrushDiff.js',
      'erl erlang             @shBrushErlang.js',
      'groovy                 @shBrushGroovy.js',
      'java                   @shBrushJava.js',
      'jfx javafx             @shBrushJavaFX.js',
      'js jscript javascript  @shBrushJScript.js',
      'perl pl                @shBrushPerl.js',
      'php                    @shBrushPhp.js',
      'text plain             @shBrushPlain.js',
      'py python              @shBrushPython.js',
      'ruby rails ror rb      @shBrushRuby.js',
      'sass scss              @shBrushSass.js',
      'scala                  @shBrushScala.js',
      'sql                    @shBrushSql.js',
      'vb vbnet               @shBrushVb.js',
      'xml xhtml xslt html    @shBrushXml.js'
    ));
    SyntaxHighlighter.defaults['toolbar'] = false;
    SyntaxHighlighter.config.stripBrs = true;
    SyntaxHighlighter.all();
    </script>

  

03\. 사용법

<pre class="brush:javascript"> 이라고 쓰면 Javascript문법이 강조됩니다.

<pre class="brush:언어"> 라고 쓰시면 됩니다. 해당 방법은 CDN방법이며 로딩을 좀 더 최적화하고싶다면

스크립트 파일을 별도로 저장해서 본인 블로그 경로로 설정하시면됩니다.

