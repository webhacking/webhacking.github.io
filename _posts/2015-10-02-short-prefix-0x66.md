---
layout: post
title: "short 주소 앞에 0x66 Prefix가 붙으면"
description: ""
categories : think
sub_categories : ""
date: 2015-10-02
tags: []
comments: true
share: true
---

x86 어셈블리에서 Short Call (0xE8) 또는 Short Jump (0xEB) 앞에 0x66 Prefix가 붙으면

기존에 Short 방식으로 갈 수 없는 외계 행성?? 으로 갈 수 있다. ㅋㅋㅋ

왜냐면 66 Prefix가 오퍼랜드 크기를 줄여서 읽기 때문에 그런 것

```
#include <windows.h>

typedef DWORD (__stdcall *ZWALLOC)(HANDLE ProcessHandle,

ULONG *BaseAddress,

ULONG* ZeroBits,

PSIZE_T RegionSize,

ULONG AllocationType,

ULONG Protect);

int main()

{

ZWALLOC ZwAlloc;

ZwAlloc =

(ZWALLOC)GetProcAddress(GetModuleHandle("ntdll.dll"),
"ZwAllocateVirtualMemory");

ULONG addr = 1;

ULONG size = 0xFFFF;

ZwAlloc((HANDLE)0xffffffff, &addr, 0, &size,

MEM_COMMIT | MEM_RESERVE, PAGE_EXECUTE_READWRITE);

memset((PVOID)NULL, 0xC3, size);

BYTE code[] = {0x66, 0x6A, 0x00, 0x66, 0xE8, 0x00, 0x00, 0xC3};

addr = (ULONG)code;

__asm {

mov eax, addr

call eax

}

return 0;

}

</windows.h>
```


  

