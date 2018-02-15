---
layout: post
title: "Solved windows 10 folder not opening issue"
description: ""
categories : ""
sub_categories : ""
date: 2015-09-29
categories : ""
sub_categories : ""
tags: []
comments: true
share: true
---

MS 커뮤니티에서 참고함.

Click [Start] [Run] and type "REGSVR32 /i SHELL32" then press the Enter key.

  

Try the below methods and check:

**Method 1: Run the SFC.**

Follow the below steps:

Open Command Prompt.

Select “Run as Administrator”.

Type “sfc /scannow” without quotes and hit Enter.

Now check for the issue.

**Method 2: Run the DISM Tool.**

If the issue persists, I would have you run the DISM tool to check the system
health and will try to restore the files.

Click on 'Start'.

Enter 'Command prompt' in the Search box.

In the list of results, swipe down on or right-click Command prompt, and then
tap or click 'Run as administrator'.

In the Administrator: Command Prompt window, type the following commands.
Press the Enter key after each command:

DISM.exe /Online /Cleanup-image /Scanhealth

DISM.exe /Online /Cleanup-image /Restorehealth

To close the Administrator: Command Prompt window, type Exit, and then press
Enter.

Note: The tool might take 15-20 minutes to finish running, so please do not
cancel it.

**Method 3:**

I would suggest you to run virus scan to make sure the computer is free from
virus.

The Microsoft Safety Scanner is a free downloadable security tool that
provides on-demand scanning and helps remove virus, spyware, and other
malicious software. It works with your existing antivirus software.

http://www.microsoft.com/security/scanner/en-us/default.aspx

Keep us posted if you face any issues on windows in future. We will be glad to
help you.

