---
layout: post
title: "AWS Route 53 DNS&Cloud flare DNS 서비스"
description: ""
categories : development
sub_categories : ""
date: 2015-10-10
tags: ['AWS', 'AWS Route 53', 'Cloud flare DNS', 'DDos', 'dns', 'DNS free', '디도스', '라우트', '레일건', '무려', '분산처리', '설명', '소개', '아마존', '앱', '웹서비스']
comments: true
share: true
---

우선 수많은 DNS 서비스 중에서 나는 [Cloud Flare](https://www.cloudflare.com/)와 [AWS
Route53](https://aws.amazon.com/ko/route53/)를 주로 이용하고있다. 서비스 구성에 관한 나의
포스팅("http://blog.hax0r.info/243")인데 도움이 됬으면 좋겠다. 이번 포스팅을 통해서 해당 서비스들의 개념을 조금
정리하고자한다. AWS,구글앱스,SoftLayer 일단 뭐든지 이용하고보는데 개인적으로 AWS가 제일 무난하고 좋다. 물론 어디까지나 지극히
개인적인 생각이다.

  

[DNS('domain name system')](https://en.wikipedia.org/wiki/Domain_Name_System)의
일반 개념은 Domain name(www.hax0r.info) 를 ip주소로 바꿔주는 일종의 dictionary(사전) 서비스이다.

이러한 맵핑 정보를 저장해 놓는 파일을 DNS Zone file이라고 한다.

질의하는 기기를 DNS Client, DNS 서비스를 제공하는 기기를 DNS Server라고 한다.

DNS 서버 접속 포트는 53번, UDP 프로토콜을 사용한다. 아래 사진을 DNS가 작동과정('how to dns work?')을
보여주고있다.

  

  

  

![](/assets/images/posts/231/2338AB4B5619045D1BBD66.JPEG)

  

  

  

모든 단말(PC)은 DNS 서버의 IP(*인터넷에 연결된 컴퓨터와 컴퓨터를 식별하는 주소로 전화로 비유하면 전화번호에 해당) 주소가 설정되어
있어야한다. 보통 PC는 DHCP 프로토콜로 IP주소를 할당 받으면서 DNS 서버 IP주소를 DHCP Option6을 통해 함께 받는다.
일반적으로 2개의 DNS IP주소를 받는다. Primary DNS서버가 죽었을때 Secondary DNS 서버에 물어보기 위해서입니다.

  

  

  

![](/assets/images/posts/231/263BD74B5619076A2A4AF8.JPEG)

  

  

  

DNS는 분산 관리 원치에 의해 트리 형태의 구조를 가지고 있는데, 아래의 사진을 보면 최상위에 "ROOT DNS"가 있고 하위에는 각
분류에 따른 DNS가 있다. 이때 도메인 이름은 왼쪽에서 오른쪽으로 갈수록 "최상위 도메인 "(최상위 레벨 도메인(Top Level
Domain) -> 제2레벨 도메인(Second Level Domain) -> 제3레벨 또는 서브 도메인(Third Level/sub
domain))이 된다.

  

  

  * 1.브라우저 주소창에 "http://www.hax0r.info"를 입력할 경우 PC는 미리 설정되어있는 DNS에게 "http://www.hax0r.info"라는 hostname에 대한 ip주소를 물어봅니다.
  * 2.Local DNS(기본 설정되어있는 DNS 나의 경우 210.220.16*.**)에 "http://www.hax0r.info"에 대한 IP주소가 존재할수도 존재안할수도있습니다. 만약 존재한다면 Local DNS가 바로 PC에 IP주소를 주고 끝납니다. 그렇다면 만약 존재하지 않을 경우를 가정해봅시다.
  * 3.Local DNS는 이제 "http://www.hax0r.info"에 대한 IP 주소를 찾아내기 위해 다른 DNS서버들과 통신(DNS 메세지)을 시작합니다. 먼저 ROOT DNS 서버에게 해당 도메인의 IP주소를 아냐고 물어봅니다.이를 위해 각 LocalDNS 서버에는 ROOT DNS서버의 정보가 미리 설정되어 있어야합니다.
  * 4.ROOT DNS서버는 전 세계에 13대가 구축되어있습니다. 미국에 10대, 일본/네덜란드/노르웨이에 각 1대씩. 우리나라의 경우 ROOT DNS 서버가 존재하지는 않지만 ROOT DNS서버에 대한 미러 서버를 3대 운용하고 있습니다.
  * 5.ROOT DNS 서버가 해당 아이피 주소를 모를 경우 다른 DNS서버로 응답합니다.
  * 6.다른 DNS서버는"INFO 도메인"을 관리하는 DNS서버입니다. Local DNS서버는 "info" 도메인을 관리하는 DNS서버에게 다시 요청합니다.
  * 7\. 역시 "info 도메인을 관리하는 DNS 서버"에도 해당 정보가 없습니다. 그래서 이 DNS 서버는 Local DNS 서버에게 "난 www.naver.com" 에 대한 IP주소를 몰라, 나 말고 다른 DNS 서버에게 물어봐" 라고 응답합니다. 이 다른 DNS 서버는 "hax0r.info"를 관리하는 DNS서버입니다.
  * 8.Local DNS는 "hax0r.info 를 관리하는 DNS 서버"에게 다시 요청합니다. "hax0r.info 를 관리하는 DNS서버"에는 "www.hax0r.info" 호스트네임에 대한 IP주소가있습니다. 이 IP주소를 Local DNS가 응답받습니다.
  * 9\. 이를 수신한 Local DNS는 "hax0r.info"에 대한 IP주소를 캐싱을 하고 그 IP 주소 정보를 단말(PC)에 전달해줍니다.

  

  

이와 같이 Local DNS는 서버가 여러 DNS 서버를 차례대로 (Root DNS 서버 -> com DNS 서버 -> naver.com
DNS 서버) 물어봐서 그 답을 찾는 과정을 Recursive('반복되는') Query라고 부릅니다.

  

  

  

  

![](/assets/images/posts/231/26780A3A561905AC1485F0.PNG)

  

  

  

이로써 짤만한 domain name system에 대하여 설명했습니다.

그럼 AWS("아마존 웹 서비스")에서 제공하는 DNS 서비스 "Route 53"에 대하여 추가로 설명하겠습니다.

  

예전에 개인 서버를 운영할 때 갑작스러운 DDOS 공격을 받은 적 있다. 자체 DNS를 생성해서 사용하고 있었는데 무차별적으로 당하고
IDC에서 차단당하고 나니 참 기분이 꿀꿀했다.

여러 방면으로 DDOS 공격에 대한 대응방법을 알아보던 중에 Anycast 기반의 분상 대응이 가장 효율적이었고 다음으로는 편하게 DNS
서비스를 제공하는 곳에 맡기기로 했다.

Cloudflare 와 AWS Route 53였는데 지금은 두 개다 이용하고 있다.

  

이 서비스는 DNS 서버에 저장해놓은 파일을 기반으로 주소를 변환하는데, 여기에 정의되는 레코드를 중에서 대표적인 레코드는 아래와 같다.

  

  * 1.SOA 레코드 : 해당 DNS 서버 자체의 설정 정보를 정의한다. DNS 서버는 Primary/Secondary 구조로 장애 대응을 할 수 있는 구조인데, 이를 위해서 SOA 레코드에는 이를 위한 설정이 반영되어있다.
  * serial # - revision #로 Zone 파일이 업데이트 될때 마다 증가하는 일종의 버전,refresh - secondary server가 primary server로 부터 업데이트를 하는 주기,retry - primary server로 부터의 query가 실패하였을때, 다음 retry 까지 시간,expire : secondary server에서 zone 파일을 유지 하는 시간,TTL : DNS 응답을 받아가는 서버가 해당 레코드 응답을 얼마나 유지해야 하는 TTL 시간
  * 2.NS 레코드 : DNS 서버가 참조하는 다른 DNS서버이다. DNS 서버 자신에서 domain name에 대한 주소를 알아내지 못할때, 이 NS레코드에 정의된 서버로가서 주소를 알아본다.
  * 3.CNAME 레코드 : 도메인명을 다른 도메인과 맵핑할때 사용
  * 4.A 레코드 : 도메인을 IP로 맵핑
  * 5.PTR 레코드 : IP를 도메인으로 맵핑

  

아래는 AWS 에서 제공하는 문서("[Amazon Route 53란 무엇입니까?](http://docs.aws.amazon.com/ko_kr
/Route53/latest/DeveloperGuide/Welcome.html)")입니다.

자세한 사항은 해당 문서를 참고하시길 바랍니다. Amazon Route 53의 주요 기능은 **세 가지**입니다.

  

  * 도메인 등록 – Amazon Route 53에서 example.com과 같은 도메인 이름을 등록할 수 있습니다.
  * 도메인 이름 시스템(DNS) 서비스 – Amazon Route 53은 www.example.com과 같은 친숙한 도메인 이름을 192.0.2.1과 같은 IP 주소로 변환해 줍니다. Amazon Route 53은** 전 세계 권한 DNS 서버 네트워크를 사용하여 DNS 쿼리에 응답**함으로써 지연 시간을 줄입니다.
  * 상태 확인 – Amazon Route 53은 인터넷을 통해 애플리케이션으로 자동화된 요청을 보내어 접근 및 사용이 가능하고 정상 작동 중인지 확인합니다.

  

Route 53 특징 중에 하나는 "Latency Based Routing"입니다. "Latency Based Routing"은 도메인
하나에 여러 개의 Region을 연결해서 사용할 때 Latency 가 가장 빠른 곳으로 연결해주는 서비스입니다. 유사 서비스로는 GeoDNS
서비스가 있습니다. 차이점은 GeoDNS는 접속지역에 따라서 가까운 곳에 할당합니다. "Latency Based Routing"은 일반
Route 53와는 별개로 한 달에 백만 쿼리당 $0.750의 추가요금이 발생합니다. 추가로 Weighted Round Robin은 서버
IP 주소 또는, 도메인(ELB) 마다 가중치Weight를 부여하여 트래픽을 조절하는 기능입니다.

  

  

![](/assets/images/posts/231/256E784456191E7029BC8F.PNG)

  

(*Route 53 Latency Based Routing 에 대한 그림)

  

아래 사진은 저의 AWS Route53의 패널입니다. Create Hosted Zone 을 통하여 간단하게 생성할 수 있습니다.

도메인 서버는 Route 53에서 할당받은 값으로 변경하면 됩니다. 제공하는 환경마다 설정 시간이 차이가 있는데 5 - 10분 후 DNS
Lookup을 해봅니다. (https://www.ultratools.com/tools/dnsLookup) 정상적으로 변경이 되었으면 정상
접근 가능할 겁니다.

  

  

  

다음은 Cloud flare 서비스 설명을 하기위해 여기까지 Route53에 대한 포스팅을 마치겠습니다.

  

![](/assets/images/posts/231/2323AE3E56191B4F1AB4A3.JPEG)

  

**Cloud flare?**

우선 CloudFlare는 무료/유료(프리 플랜, 프로 플랜, 비즈니스 플랜, 엔터프라이즈 플랜이 있으며, 프리 플랜은 무료로 이용 가능)
서비스를 제공하는데, 본인은 두개다 이용해봤다. 개인적으로 무료환경에서도 제한이 그렇게 많지가않아서 좋았다. 무료로 이용할수있는 서비스는
대표적으로 CDN, DNS, SSL, DDoS 방어 서비스, Always Online™, CloudFlare Railgun™ 등을 제공한다.

  

  * DNS 서비스는 클라우드플레어의 핵심이라고 할 수 있는데, 제공되는 서비스들을 사용하기 위해서는 네임서버 설정이 클라우드플레어로 되어있어야 한다.
  * SSL 서비스는 DNS 설정에서 클라우드플레어 CDN 기능을 사용하도록 한 경우에만 사용할수있다.
  * Always Online™ 서비스는 서버가 내려간 경우에도 클라우드플레어 CDN 서버에 저장된 캐싱된 내용을 보여준다. 프리 플랜에서는 일주일에 한번 캐싱, 프로 플랜에서는 3일에 한번 캐싱, 비즈니스 플랜부터는 매일 캐싱한다.
  * CloudFlare Railgun™ 서비스는 비즈니스 플랜부터 사용 가능하며 캐시할 수 없는 데이터를 서버로부터 클라우드플레어 CDN 네트워크까지 최대 99.6% 압축하여 전송하는 기술이다.

  

Cloudflare에 대한 나의 생각은 디도스와 이외 해킹으로부터 너를 도와주는 친구라고 먼저 생각된다. "Under DDoS attack?
CloudFlare can protect you. (''https://www.cloudflare.com/under-attack")
Cloudflare는 유례를 찾을수없는 디도스공격을 막아낸것으로도 유명하다. 아래는 Cloud flare의 이용자 패널이다. 실제 프랑스의
한 웹사이트에서 초당 400GB가 넘는 초대형 디도스 공격을 받았는데, 이를 CloudFlare이 성공적으로 방어하였다.

  

![](/assets/images/posts/231/252A5A4F5619226E24AA01.PNG)

  

  

  

아래 영상(*CloudFlare Security Overview)은 참고하기 좋은 영상이라서 기재합니다. 퍼가실때는 댓글 부탁드립니다^^_
오타 피드백좀요 TT

  

