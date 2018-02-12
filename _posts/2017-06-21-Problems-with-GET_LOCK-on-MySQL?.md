---
layout: post
title: "Problems with GET_LOCK on MySQL?"
description: ""
date: 2017-06-21
tags: ['isolation level', 'MySQL 지연현상', 'Problems with GET_LOCK on MySQL??', 'repeatable-read 지연']
comments: true
share: true
---

**Overview**

  

이번에 서비스를 운영하면서 [MySQL](https://www.mysql.com/) 지연 현상을 마주했다.

모든 자원과 지표를 보고 판단했을 때, 지연현상이 발생하는 것이 의아했다.

  

트래픽의 발생은 지연 시점 이전보다는 확실히 증가했지만 그렇다해서 현재 자원에서 이 트래픽을 처리 못하는 것은 납득 할 수 없었다.

그렇게 끝없는 삽질 끝에 락(Lock)이 매우 지연되어 다른 큐들이 진행되지않아 발생한 문제였다.

  

그렇다면 락이 발생한 이유는 무엇이고, 언락되기 까지 무기한 지연되어하는가 ?  

  

  

**Cause**

  

현재 서비스를 개발하면서 [AWS](https://aws.amazon.com/ko/) 인프라를 적극적으로 활용하고있다.

[RDS](https://aws.amazon.com/ko/rds/) 에서는 [transaction isolation
level](https://support.microsoft.com/ko-kr/help/601430)이 engine default 라,

innodb를 사용하고있는 현재 시점에서는 transaction isolation level은 `repeatable-read` 다.

  

innodb 기본 transaction isolation level 이 [repeatable-read](https://en.wikipedia
.org/wiki/Isolation_\(database_systems\)#Repeatable_reads) 이다.

  

REPEATABLE-READ에서는 현재 Select 버전을 보장하기 위해 Snapshot을 이용하는데

이 경우 해당 데이터에 관해서 암묵적으로 Lock과 비슷한 효과가 나타난다.

_  
_

_즉, Select 작업이 종료될 때까지 해당 데이터 변경 작업이 불가하다._

  

따라서 인덱싱없는 데이터의 FULL-SCAN 또는 무거운 쿼리의 질의가 이루어지면 지연현상이 발생할 가능성이 높다.

  

결국 이 부분 까지 고려하지 못 해서 지연현상이 발생했다.

운영에 있어서 exception case 가 너무나 많고, exception case 발생 시

이를 무기한 대기하여 트랜잭션을 처리하는 것은 매우 곤란하다.

왜냐하면 쿼리에 지연으로 서비스 전체의 지연으로 이어지고 운영에도 영향을 미치게 되기 때문이다.

  

트랜잭션 요소 ACID중 I에 해당하는 Isolation Level 문제를 고려의 중요성을 깨달았다.

그렇다면 얼마나 기다려야 할까 ? 또 몇 번을 재시도 해야하는가 ?

  

  

**Solution**

  

exception case 발생 시, 무기한 대기보다는 적정시간 기다린 후

재 요청을 하지않고 이후 재 요청을 하지않아야한다.

그러기 위해서는 transaction isolation level의 수준을 낮출 필요성이 있다.

.

`transaction isolation level`값을 `repeatable-read` 에서 `READ-COMMITTED`로 설정을
변경한다.

이 후 `innodb_lock_wait_timeout`의 설정 값을 기존치 보다 높여준다.(e.g. 300 to 600)

  

repeatable-read은 한 트랙잭션에서 한 행을 읽은 후에 나중에 동일한 트랜잭션에서 다시 그 행을 읽을 때 그행의 내용에 변화가
없을 경우 이러한 읽기를 repeatable read(반복 읽기)라 한다.

  

본 문제는 제법 많은 이론적인 지식이 필요하다.

트랜잭션 개념, ACID정의 SQL 92표준, Isolation Level, Record lock(row lock), Gap Lock,
Phantom read 등등

  

READ COMMITTED 란 커밋된 데이터만 읽기 가능한 격리 수준을 뜻 한다.

SQL 서버의 기본 격리 수준에 속하며 SELECT 실행 시, 공유 잠금을한다.

이 격리 수준에서는 SELECT 를 시도하려는 데이터에 다른 트랜잭션에서 업데이트를 진행한 경우, 베타적 잠금 (X-Lock)이 걸린
데이터에 공유잠금(S-Lock)을 걸려고 시도하므로 업데이트의 트랜잭션이 종료될 때 까지 SELECT 는 Block 된다.

Block 된 SELECT는 트랜잭션이 종료되면 자동으로 실행된다.

  

transaction isolation level 에는 여러 종류가 있는, 종류에 대해서는 아래 리스트를 참고하면 된다.

레벨이 높으면 높을수록 트랜잭션 수준의 읽기 일관성이 높아진다.

트랜잭션 수준 읽기 일관성(Transaction-Level Read Consistency)은 트랜잭션이 시작된 시점을 기준으로 일관성 있게
데이터를 읽어 들이는 것 을 뜻 한다.

  

  * Read Uncommitted (= Level 0)
    * 트랜잭션에서 처리 중인 또는 아직 커밋되지 않은 데이터를 다른 트랜잭션이 읽는 것을 허용한다.
    * Dirty Read, Non-repeatable Read, Phantom Read 현상 발생한다.
    * 오라클 제품군은 해당 레벨을 지원하지 않는다.
  * Read Committed (= Level 1)
    * Dirty Read 방지한다. (트랜잭션이 커밋되어 확정된 데이터만 읽는 것을 허용)
    * 대부분의 DBMS가 기본모드로 채택하고 있는 일관성 모드
    * Non-Repeatable Read, Phantom Read 현상 발생
    * DB2, SQL Server, Sybase의 경우 읽기 공유 Lock을 이용해서 구현, 하나의 레코드를 읽을 때 Lock을 설정하고 해당 레코드에서 빠지는 순간 Lock해제
    * Oracle은 Lock을 사용하지 않고 쿼리시작 시점의 Undo 데이터를 제공하는 방식으로 구현
  * Repeatable Read (= Level 2)
    * 선행 트랜잭션이 읽은 데이터는 트랜잭션이 종료될 때까지 후행 트랜잭션이 갱신하거나 삭제하는 것을 불허함으로써 같은 데이터를 두번 쿼리했을 때 일관성 있는 결과를 리턴
    * Phantom Read 현상 발생
    * DB2, SQL Server의 경우 트랜잭션 고립화 수준을 Repeatable Read로 변경하면 읽은 데이터에 걸린 공유 Lock을 커밋할 때까지 유지하는 방식으로 구현
    * Oracle은 이 레벨을 명시적으로 지원하지 않지만 for update절을 이용해 구현 가능하다.
    * SQL Server등에서도 for update 절을 사용할 수 있지만 커서를 명시적으로 선언할 때만 사용 가능하다.
  * Serializable Read (= Level 3)
    * 선행 트랜잭션이 읽은 자료를 갱신하거나 삭제하지 못할뿐아니라 새로운 레코드 삽입도 금지
    * 완벽한 읽기 일관성 모드를 제공한다.

  

격리 수준에 대해 간단한 짤방을 보면서 이해하면 좋다.

  

![](/assets/images/posts/765/2164D84E594A150D136E36.GIF)

  

  

아래와 같이 세션 설정을 변경 후 Create Table As Select, Insert into Select 수행하면 문제없다.

  

    mysql> set tx_isolation = 'READ-COMMITTED';

  

  
또는 설정 파일을 통하여 영구적으로 설정값을 변경하고자한다면 아래와 같이 진행하면된다.

  

    $ vi /etc/my.cnftransaction-isolation           = READ-COMMITTED

  

본 문제는 꼭 MySQL 제품군에만 국한되는 내용이 아닌, 트랜잭션을 지원하는 DB 사용 시 반드시 꼭 알아야되는 사항이아니다. 본인 겪은
문제가 또 다른 누군가에게 도움이 되길 바라며 본 포스트를 마무리한다.

  

  

**참고**

  

  * [Common Errors](https://github.com/nZEDb/nZEDb/wiki/Common-Errors)
  * [InnoDB’s gap locks](https://www.percona.com/blog/2012/03/27/innodbs-gap-locks/)
  * [트랜잭션 수준 읽기 일관성](http://wiki.gurubee.net/pages/viewpage.action?pageId=3900389)
  * [Visualizing Transaction Isolations For SQL Server](http://michaeljswart.com/tag/transaction-isolation-levels/)

  

