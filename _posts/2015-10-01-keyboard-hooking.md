---
layout: post
title: "keyboard hooking"
description: ""
categories : ""
sub_categories : ""
date: 2015-10-01
tags: []
comments: true
share: true
---

  

    HHOOK hKeyboardHook;
     
    LRESULT CALLBACK LowLevelKeyboardProc(int nCode, WPARAM wParam, LPARAM lParam) 
     
    {
     
        PKBDLLHOOKSTRUCT p; 
     
        if (nCode == HC_ACTION) 
        {
            p = (PKBDLLHOOKSTRUCT) lParam;
     
            if (((p->vkCode == VK_LWIN) || (p->vkCode == VK_RWIN)) 
                                                    || ( p->flags & LLKHF_ALTDOWN) 
                                                    || (p->vkCode == VK_TAB)
               )
     
                return 1; 
     
       }
     
       return CallNextHookEx(hKeyboardHook, nCode, wParam, lParam);
    }

  
[후킹](http://terms.naver.com/entry.nhn?docId=932632&cid=43667&categoryId=43667)
시작

    hKeyboardHook  = SetWindowsHookEx(WH_KEYBOARD_LL, LowLevelKeyboardProc, hInst, 0); // hook 설치

  

후킹제거

    UnhookWindowsHookEx(hKeyboardHook); //제거
    hKeyboardHook = NULL;

(이 예제코드는 'int WINAPI WinMain(HINSTANCE hInst, HINSTANCE hPrevInst, LPSTR
lpszCmdParam, int nCmdShow)' 에서 사용할때의 예제입니다..) 컴파일했는데 PKBDLLHOOKSTRUCT를 못찾는
에러가 난다면 #define _WIN32_WINNT 0x0400 를 추가하여 막을수 있습니다,

