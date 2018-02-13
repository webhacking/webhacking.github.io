---
layout: post
title: "텔레그램(Telegram) CLI 통해서 가지고 놀기 with BotApi"
description: ""
date: 2016-01-19
tags: ['API', 'CLI', 'telegram', '개념', '리눅스', '명령어', '봇', '서버', '소개', '영문', '우분투', '유닉스', '텔레그램', '한글', '한글화']
comments: true
share: true
---

메신저 중에 하나로 텔레그램을 이용하고있습니다. 텔레그램은 장점이 매우 많습니다. 텔레그램은
Github('git@github.com:vysheng/tg.git') 통해서 API 및 소스가 공개하고있습니다. 해당 자료 다운 받으시면
됩니다.

우선 텔레그램의 주요 특징과 장점들에 대해 간략하게 적었습니다.(이미 너무나 잘 알고있다면 스킵하셔도 좋습니다.)

  1. **Private **(Telegram messages are heavily encrypted and can self-destruct.)
  2. **Cloud-Based** (Telegram lets you access your messages from multiple devices.)
  3. **Fast** (Telegram delivers messages faster than any other application.)
  4. **Distributed** (Telegram servers are spread worldwide for security and speed.)
  5. **Open** (Telegram has an open API and protocol free for everyone.)
  6.   7. **Free** (Telegram is free forever. No ads. No subscription fees.)
  8. **Secure **(Telegram keeps your messages safe from hacker attacks.)
  9. **Powerful **(Telegram has no limits on the size of your media and chats.)

  

이 것 이외에도 프로그래머라면 디버깅할 때, 정말 도움이 많이 됩니다.

또한 cron설정을 통해서 주기적으로 스냅샷 정보 또는 서버 상태등을 피드백 받을수있어 더 좋습니다.

이러한 장점들을 보니 얼른 설치하고싶다구요? 저의 간략한 환경(Description: Ubuntu 14.04.2 LTS) 입니다. 따라하실때
참고하세요 ^^..

또 설치하기전에 가상번호를 이용하는 방법도있고 위에 말한 장점들을 사용할 때 계정을 이용하지아니하고 봇을 이용하는 방법이있는데, 본인은 봇을
이용하는 방법을 선택하겠다. 이 방법이 훨씬 간단하고 효율적일 것 같아서다. 봇 이용방법 이외 Cli를 통한 Telegram 사용방법도
기재할테니 Cli를 통한 사용법이 알고싶은 분들은 봇을 통한 이용방법 부분은 건너뛰시면 되겠습니다.

  

아래는 텔레그램 bot api 관련 페이지입니다. (https://core.telegram.org/bots/api)

봇에 대한 자세한 설명은 해당 링크('https://core.telegram.org/bots')를 참조하시길 바랍니다.

  

![](/assets/images/posts/490/2616B83F569DFD501F2C03.PNG)

  

BotFather을 통하여 나의 새로운 봇을 생성해준다. 설정을 완료하면 Api Token 값이 온다.

해당 값을 통해서 봇을 핸들링할수있다. BotFather의 간략한 명령어

  * /newbot - create a new bot
  * /token - generate authorization token
  * /revoke - revoke bot access token
  * /setname - change a bot's name
  * /setdescription - change bot description
  * /setabouttext - change bot about info
  * /setuserpic - change bot profile photo
  * /setinline - change inline settings
  * /setinlinefeedback - change inline feedback settings
  * /setcommands - change bot commands list
  * /setjoingroups - can your bot be added to groups?
  * /setprivacy - what messages does your bot see in groups?
  * /deletebot - delete a bot
  * /cancel - cancel the current operation

  

  

![](/assets/images/posts/490/2726BB46569DFDC4214244.PNG)

  

  

  

![](/assets/images/posts/490/256ABB45569DFE112501AE.PNG)

  

  

![](/assets/images/posts/490/245A053D569DFEAB1B8303.JPEG)

  

Bot Api 에 기재된 내용들을 참고해서, 요청하면 된다.

  

자 그럼 이제 cli를 통한 사용법에 대해 알아봅시다.

우선 서버에 Telegram을 설치합시다.

  

소스 설치

    git clone --recursive https://github.com/vysheng/tg.git 

빌드 툴 설치

apt-get install libreadline-dev libconfig-dev libssl-dev lua5.2 liblua5.2-dev
libevent-dev libjansson-dev libpython-dev make 빌드 ./configure make

인증

  

    ./bin/telegram-cli -k tg-server.pubchange_user_group: can't find the user telegramd to switch toTelegram-cli version 1.3.3, Copyright (C) 2013-2015 Vitaly ValtmanTelegram-cli comes with ABSOLUTELY NO WARRANTY; for details type `show_license'.This is free software, and you are welcome to redistribute itunder certain conditions; type `show_license' for details.Telegram-cli uses libtgl version 2.0.3Telegram-cli includes software developed by the OpenSSL Projectfor use in the OpenSSL Toolkit. (http://www.openssl.org/)Telegram-cli uses libpython version 2.7.6I: config dir=[/root/.telegram-cli][/root/.telegram-cli] created[/root/.telegram-cli/downloads] createdphone number: 영준이code ('CALL' for phone code): 안알랴줌User 영준 우 online (was online [2016/01/19 05:11:18])

  

연결할 핸드폰 번호를 입력하고, 해당 번호로 온 인증번호를 입력합니다. 그럼 정상적으로 로그인합니다.

그럼런 간단하게 다른 사람에게 메세지를 보내보도록합시다.

  

준호에게 메세지를 보냈습니다.

  

    [05:20]  Jang Junho  msg Jang_Junho 테스트[05:20]  Jang Junho  msg Jang_Junho 테스트오호호오[05:20]  Jang Junho <<< 테스트오호호오

잘 되네요. 자신이 사용하는 사이드언어를 통해서 간단한 프로그램 만들어보세요.

위에서 말했듯이 텔레그램을 통해서 주기적인 서버상태 확인 과 명령어등을 통해서 핸들링할수있습니다. 다방면으로 아주 유용한 친구입니다.

아래 Telegram CLI 명령어들을 소개하고, 급하게 포스팅 마무리 짓 겠습니다. 바쁘다는 핑계로..ㅜㅜ 그럼 즐거운
플밍하십쇼.*(꾸벅)

  

![](/assets/images/posts/490/245EB935569E00E710F9B0.PNG)

  

  * accept_secret_chat <secret chat> Accepts secret chat. Only useful with -E option
  * add_contact <phone> <first name> <last name> Tries to add user to contact list
  * broadcast <user>+ <text> Sends text to several users at once
  * chat_add_user <chat> <user> [msgs-to-forward] Adds user to chat. Sends him last msgs-to-forward message from this chat. Default 100
  * chat_del_user <chat> <user> Deletes user from chat
  * chat_info <chat> Prints info about chat (id, members, admin, etc.)
  * chat_set_photo <chat> <filename> Sets chat photo. Photo will be cropped to square
  * chat_with_peer <peer> Interface option. All input will be treated as messages to this peer. Type /quit to end this mode
  * clear Clears all data and exits. For debug.
  * contact_list Prints contact list
  * contact_search username [limit] Searches contacts by username
  * create_group_chat <name> <user>+ Creates group chat with users
  * create_secret_chat <user> Starts creation of secret chat
  * del_contact <user> Deletes contact from contact list
  * delete_msg <msg-id> Deletes message
  * dialog_list List of last conversations
  * export_card Prints card that can be imported by another user with import_card method
  * fwd <peer> <msg-id> Forwards message to peer. Forward to secret chats is forbidden
  * fwd_media <peer> <msg-id> Forwards message media to peer. Forward to secret chats is forbidden. Result slightly differs from fwd
  * help Prints this help
  * history <peer> [limit] [offset] Prints messages with this peer (most recent message lower). Also marks messages as read
  * import_card <card> Gets user by card and prints it name. You can then send messages to him as usual
  * load_audio <msg-id> Downloads file to downloads dirs. Prints file name after download end
  * load_document <msg-id> Downloads file to downloads dirs. Prints file name after download end
  * load_document_thumb <msg-id> Downloads file to downloads dirs. Prints file name after download end
  * load_file <msg-id> Downloads file to downloads dirs. Prints file name after download end
  * load_file_thumb <msg-id> Downloads file to downloads dirs. Prints file name after download end
  * load_photo <msg-id> Downloads file to downloads dirs. Prints file name after download end
  * load_video <msg-id> Downloads file to downloads dirs. Prints file name after download end
  * load_video_thumb <msg-id> Downloads file to downloads dirs. Prints file name after download end
  * main_session Sends updates to this connection (or terminal). Useful only with listening socket
  * mark_read <peer> Marks messages with peer as read
  * msg <peer> <text> Sends text message to peer
  * quit Quits immediately
  * rename_chat <chat> <new name> Renames chat
  * rename_contact <user> <first name> <last name> Renames contact
  * restore_msg <msg-id> Restores message. Only available shortly (one hour?) after deletion
  * safe_quit Waits for all queries to end, then quits
  * search [peer] [limit] [from] [to] [offset] pattern Search for pattern in messages from date from to date to (unixtime) in messages with peer (if peer not present, in all messages) generate new key for active secret chat
  * send_audio <peer> <file> Sends audio to peer
  * send_contact <peer> <phone> <first-name> <last-name> Sends contact (not necessary telegram user)
  * send_document <peer> <file> Sends document to peer
  * send_file <peer> <file> Sends document to peer
  * send_location <peer> <latitude> <longitude> Sends geo location
  * send_photo <peer> <file> Sends photo to peer
  * send_text <peer> <file> Sends contents of text file as plain text message
  * send_typing <peer> Sends typing notification
  * send_typing <peer> Sends typing notification abort
  * send_video <peer> <file> Sends video to peer
  * set <param> <value> Sets value of param. Currently available: log_level, debug_verbosity, alarm, msg_num
  * set_password <hint> Sets password
  * set_profile_name <first-name> <last-name> Sets profile name.
  * set_profile_photo <filename> Sets profile photo. Photo will be cropped to square
  * set_ttl <secret chat> Sets secret chat ttl. Client itself ignores ttl
  * set_username <name> Sets username.
  * show_license Prints contents of GPL license
  * stats For debug purpose
  * status_online Sets status as online
  * status_offline Sets status as offline
  * user_info <user> Prints info about user (id, last online, phone)
  * view_audio <msg-id> Downloads file to downloads dirs. Then tries to open it with system default action
  * view_document <msg-id> Downloads file to downloads dirs. Then tries to open it with system default action
  * view_document_thumb <msg-id> Downloads file to downloads dirs. Then tries to open it with system default action
  * view_file <msg-id> Downloads file to downloads dirs. Then tries to open it with system default action
  * view_file_thumb <msg-id> Downloads file to downloads dirs. Then tries to open it with system default action
  * view_photo <msg-id> Downloads file to downloads dirs. Then tries to open it with system default action
  * view_video <msg-id> Downloads file to downloads dirs. Then tries to open it with system default action
  * view_video_thumb <msg-id> Downloads file to downloads dirs. Then tries to open it with system default action
  * visualize_key <secret chat> Prints visualization of encryption key (first 16 bytes sha1 of it in fact)

  

  

