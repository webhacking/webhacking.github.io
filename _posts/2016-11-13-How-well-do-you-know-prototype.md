---
layout: post
title: "How well do you know prototype"
description: ""
date: 2016-11-13
tags: []
comments: true
share: true
---

Prototype 1.6의 옳은 사용법과 바르지 못한 사용법을 비교하는 포스트(How well do you know prototype)를
작성했습니다.

  

출처 :

  * [How well do you know prototype Part 2](http://thinkweb2.com/projects/prototype/?p=3)
  * http://firejune.com/1216
    // 옳지 않은 방법
    document.getElementById("foo ")
    //적당한 방법: 놀랍게도 어떤 사람들은 이것에 대해 잘 모른다.// 옳지 않은 방법
    $("foo ")
    //바르지 못한 방법:
    var woot = document.getElementById("bar").value
    var woot = $("bar").value
    //적당한 방법: 폼 값의 편리하고 빠른 호출
    var woot = $F("bar")
    $('footer').style.height = '100px';
    $('footer').style.background = '#ffc';    
    //적당한 방법: 모든 브라우저가 W3C의 권고를 따르고 있지 않다.
    $('footer').setStyle({
        height: '100px',
        background: '#ffc'
    })
    $('coolestWidgetEver').innerHTML = 'some nifty content'
    //적당한 방법:
    $('coolestWidgetEver').update('some nifty content')
    $('coolestWidgetEver').update('some nifty content').addClassName('highlight').next().hide()
    //바르지 못한 방법:
    new Ajax.Request('ninja.php?weapon1=foo&weapon2=bar')
    new Ajax.Request('ninja.php', {
        parameters: {
            weapon1: 'foo',
            weapon2: 'bar'
        }
    })
    new Ajax.Request('blah.php', {
        method: 'POST',
        asynchronous: true,
        contentType: 'application/x-www-form-urlencoded',
        encoding: 'UTF-8',
    })
    new Ajax.Request('blah.php')
    //바르지 못한 방법:
    Event.observe('myContainer', 'click', doSomeMagic)
    //적당한 방법: 논쟁의 여지가 있지만 객체지향적이다!
    $('myContainer').observe('click', doSomeMagic)
    //바르지 못한 방법:
    $$('div.hidden').each(function(el){
        el.show();
    })
    //적당한 방법: 슬프게도 이 사용법을 아는 사람들이 많지 않다는 사실.
    $$('div.hidden').invoke('show')
    //바르지 못한 방법:
    $$('div.collapsed').each(function(el){
        el.observe('click', expand);
    })
    //적당한 방법: invoke를 이용한 이벤트 핸들링, 졸라 쉽다!
    $$('div.collapsed').invoke('observe', 'click', expand)
    //바르지 못한 방법:
    $$('input.date').invoke('observe', 'focus', onFocus);
    $$('input.date').invoke('observe', 'blur', onBlur);
    //적당한 방법: $$는 오버해드가 크기 때문에 invoke를 사용하면 $$를 여러번 사용할 필요도 없다.
    $$('input.date').invoke('observe', 'focus', onFocus).invoke('observe', 'blur', onBlur)
    //바르지 못한 방법:
    $('productTable').innerHTML = 
        $('productTable').innerHTML + 
        '' + productId + ' '
        + productName + '' 
        + productId + ' ' + productPrice + 
        ''
    //적당한 방법: Template 클래스는 정말 쓸만한 DOM 솔루션이다. 하지만 잘 사용되고 있지 않는 것 같다.
    var rowTemplate = new Template('#{id} #{name}#{id} #{price}');
    $('productTable').insert(
        rowTemplate.evaluate({
            id: productId,
            name: productName,
            price: productPrice
        }))
    )

  

  

