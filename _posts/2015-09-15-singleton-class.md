---
layout: post
title: "singleton class"
description: ""
date: 2015-09-15
tags: []
comments: true
share: true
---

cocos2d-x 로 게임을 만들 때, 전체 레이어에서 접근 가능한 전역 변수를 만들어 사용할 경우가 있는데, 전역 변수들을 하나로 묶어
놓을 싱글톤 클래스를 만들어 사용하면 간편하고 코드도 깔끔하게 정리됩니다.

그 기본 코드를 기록해 놓습니다. dataSingleton.h

  

  

    #ifndef __dataSingleton__
    #define __dataSingleton__
    #include <iostream>
    class dataSingleton
    {
    private:
        dataSingleton() {};
        static dataSingleton* m_pInstance;
    public :
        static dataSingleton* getInstance();
        //////////////////////////////////////////////////
        // put additional variables here
    };
    #endif /* defined(__dataSingleton__) */

  
dataSingleton.cpp

    #include <stddef.h>
    #include "dataSingleton.h"
     
    dataSingleton* dataSingleton::m_pInstance = NULL;
     
    dataSingleton* dataSingleton::getInstance(){
     
        if ( ! m_pInstance )
        {
            m_pInstance = new dataSingleton;
        }
     
        return m_pInstance;
    }

  

