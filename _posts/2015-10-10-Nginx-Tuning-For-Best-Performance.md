---
layout: post
title: "[Nginx] Nginx Tuning For Best Performance"
description: ""
categories : ""
sub_categories : ""
date: 2015-10-10
tags: []
comments: true
share: true
---


    Nginx Tuning For Best Performance
    --
    For this configuration you can use web server you like, i decided, because i work mostly with it to use nginx.
    Generally, properly configured nginx can handle up to 400,000 to 500,000 requests per second (clustered), most what i saw is 50,000 to 80,000 (non-clustered) requests per second and 30% CPU load, course, this was 2xIntel Xeon with HT enabled, but it can work without problem on slower machines.
    You must understand that this config is used in testing environment and not in production so you will need to find a way to implement most of those features best possible for your servers.
    First, you will need to install nginx, my way to install nginx is compiling it from source, but for now we will use `apt-get`
    ```bash
    apt-get install nginx
    ```
    Backup your original configs and you can start reconfigure your configs. You will need to open your `nginx.conf` at `/etc/nginx/nginx.conf` with your favorite editor.
    ```conf
    # you must set worker processes based on your CPU cores, nginx does not benefit from setting more than that
    worker_processes = auto; #some last versions calculate it automatically, thanks to Diego :)
    # number of file descriptors used for nginx
    # the limit for the maximum FDs on the server is usually set by the OS.
    # if you don't set FD's then OS settings will be used which is by default 2000
    worker_rlimit_nofile 100000;
    # only log critical errors
    error_log /var/log/nginx/error.log crit
    # provides the configuration file context in which the directives that affect connection processing are specified.
    events {
        # determines how much clients will be served per worker
        # max clients = worker_connections * worker_processes
        # max clients is also limited by the number of socket connections available on the system (~64k)
        worker_connections 4000;
        # optmized to serve many clients with each thread, essential for linux
        use epoll;
        # accept as many connections as possible, may flood worker connections if set too low
        multi_accept on;
    }
    # cache informations about FDs, frequently accessed files
    # can boost performance, but you need to test those values
    open_file_cache max=200000 inactive=20s; 
    open_file_cache_valid 30s; 
    open_file_cache_min_uses 2;
    open_file_cache_errors on;
    # to boost IO on HDD we can disable access logs
    access_log off;
    # copies data between one FD and other from within the kernel
    # faster then read() + write()
    sendfile on;
    # send headers in one peace, its better then sending them one by one 
    tcp_nopush on;
    # don't buffer data sent, good for small data bursts in real time
    tcp_nodelay on;
    # server will close connection after this time
    keepalive_timeout 30;
    # number of requests client can make over keep-alive -- for testing
    keepalive_requests 100000;
    # allow the server to close connection on non responding client, this will free up memory
    reset_timedout_connection on;
    # request timed out -- default 60
    client_body_timeout 10;
    # if client stop responding, free up memory -- default 60
    send_timeout 2;
    # reduce the data that needs to be sent over network
    gzip on;
    gzip_min_length 10240;
    gzip_proxied expired no-cache no-store private auth;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml;
    gzip_disable "MSIE [1-6]\.";
    ```
    Now you can save config and run bottom command
    ```
    /etc/init.d/nginx start|restart
    ```
    If you wish to test config first you can run
    ```
    /etc/init.d/nginx configtest
    ```
    Just For Security Reason
    ---
    ```
    server_tokens off;
    ```
    Nginx Simple DDoS Defense
    ---
    This is far away from secure DDoS defense but can slow down some small DDoS. Those configs are also in test environment and you should do your values.
    ```conf
    # limit the number of connections per single IP
    limit_conn_zone $binary_remote_addr zone=conn_limit_per_ip:10m;
    # limit the number of requests for a given session
    limit_req_zone $binary_remote_addr zone=req_limit_per_ip:10m rate=5r/s;
    # zone which we want to limit by upper values, we want limit whole server
    server {
        limit_conn conn_limit_per_ip 10;
        limit_req zone=req_limit_per_ip burst=10 nodelay;
    }
    # if the request body size is more than the buffer size, then the entire (or partial) request body is written into a temporary file
    client_body_buffer_size  128k;
    # headerbuffer size for the request header from client, its set for testing purpose
    client_header_buffer_size 3m;
    # maximum number and size of buffers for large headers to read from client request
    large_client_header_buffers 4 256k;
    # read timeout for the request body from client, its set for testing purpose
    client_body_timeout   3m;
    # how long to wait for the client to send a request header, its set for testing purpose
    client_header_timeout 3m;
    Now you can do again test config
    ```
    ```bash
    /etc/init.d/nginx configtest
    ```
    And then reload or restart your nginx
    ```
    /etc/init.d/nginx restart|reload
    ```
    You can test this configuration with `tsung` and when you are satisfied with result you can hit `Ctrl+C` because it can run for hours.
    Happy Hacking!
    --
    http://www.codestance.com/tutorials-archive/nginx-tuning-for-best-performance-255

  

