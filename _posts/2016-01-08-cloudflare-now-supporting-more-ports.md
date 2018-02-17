---
layout: post
title: "CloudFlare Now Supporting More Ports"
description: ""
categories : etc
sub_categories : ""
date: 2016-01-08
tags: []
comments: true
share: true
---

**Access Control**

The solution has always been to access the control panel via the IP address or
a subdomain setup to route around CloudFlare's proxy. That works great, but it
still requires an explanation and therefore increases the CloudFlare learning
curve. We're always looking for ways to make CloudFlare easier. A few weeks
ago we began supporting other standard ports used by web control panels. In
_addition to 80 and 443_, the list of supported ports now includes:

  

  * 2052
  * 2053  

  * 2082  

  * 2083  

  * 2086  

  * 2087  

  * 2095  

  * 2096  

  * 8080  

  * 8443  

  * 8880  

  

**FTP, SSH, and Non-Web Protocols**  

Reading this you may wonder why we can't open ports like 20, 21, 22 and 23 to
support protocols like FTP, SSH, Telnet, etc. Unfortunately, while this is an
often-requested feature, the protocols don't support it. We know where to send
traffic after it connects to CloudFlare's network based on a HOST header in
web requests. Non-web protocols like the above don't include a HOST header. As
a result, for these protocols we see the traffic connecting to our network and
have no way to route it to the origin.  
This means that you'll continue to need to SSH and FTP into your server using
an IP address or a subdomain you mark as being CloudFlare disabled on your DNS
manager (we setup "direct" by default, but you can change it for better
security). While this may seem like an inconvenience, there is an upside. By
not directly exposing your origin server to traffic over these ports, we add
an additional layer of security.  
We also monitor all the connections from SSH and other protocol scanners that
regularly try to "dictionary attack" logins. We feed this data back into our
system in order to better protect from attacks. In other words, while there
may be a bit of a learning curve to using SSH or FTP after signing up for
CloudFlare, having those  

