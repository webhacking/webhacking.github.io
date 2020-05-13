---
title: 프로세스 스케줄링, 그리고 기법
layout: post
categories : development
background_image: '/assets/images/posts/process-scheduling-and-techniques/Round-robin_tournament_10teams_en.png'
---

도커에서 프로세스 스케줄링 하다가 이전에 정처기에서 학습했던 선점/비선점 스케줄링에 대한 이해도 떨어지는 것 같아 정리할 겸 글을 남긴다.
여기서 스케줄링이란 **프로세스가 생성되어 실행될 떄 필요한 시스템의 여러자원을 해당 프로세스에게 할당하는 작업**을 뜻 하며, **대기 시간은 최소화 하고 최대한 공평하게 처리하는 것을 목적**으로한다. 메모리에 여러개의 프로세스를 올려놓고(=다중 프로그래밍), CPU의 가동시간을 적절히 나누어(=시분할) 각각의 프로세스에게 분배하여 실행되도록한다. 

스케줄링에서는 아래와 같이 장기, 중기, 단기 단위가 있다.

- 장기 (Long-term scheduling)
  - 어떤 프로세스가 시스템의 자원을 차지할 수 있도록 할 것인가를 결정하여 아래 준비(ready) 상태 큐로 보내는 작업을 의미한다.
  - 상위 스케줄링이라고도 하며, 작업 스케줄러에 의해 수행된다.
  - 수행 빈도 적고, 느리다.
- 중기 (middle-term scheduling)
  - 어떤 프로세스들이 CPU를 할당 받을 것인지 결정하는 작업을 의미한다.
  - CPU를 할당받으려는 프로세스가 많을 경우 프로세스를 일시 대기(waiting)시킨 후 활성화해서 일시적으로 부하를 조절한다.
  - 스왑 인/아웃 결정 (메모리 부족 시 swap out, 남으면 swap in) 한다.
- 단기 (Short-term scheduling)
  - 프로세스가 실행되기 위해 CPU를 할당받는 시기와 특정 프로세스를 지정하는 작업을 의미한다.
  - 프로세서 스케줄링, 하위 스케줄링이라고도 한다.
  - 프로세서 스케줄링 및 문맥 교환은 프로세서 스케줄러에 의해 수행한다.
  - 자주 수행되고 빠르다.

프로세스는 아래 5가지의 상태 중 하나를 가진다.

- 생성(create): 프로세스가 생성되는 중이다.
- 실행(running): 프로세스가 프로세서를 차지하여 명령어들이 실행되고 있다.
- 준비(ready): 프로세스가 프로세서를 사용하고 있지는 않지만 언제든지 사용할 수 있는 상태로, CPU가 할당되기를 기다리고 있다.
- 대기(waiting): 프로세스가 입출력 완료, 시그널 수신 등 어떤 사건을 기다리고 있는 상태를 말한다.
- 종료(terminated): 프로세스의 실행이 종료되었다.

여기서 준비 큐는 준비 상태에 있는 프로세스들을 모아놓은 큐(Queue)이다.
운영체제는 CPU 스케줄러(CPU Scheduler)를 통해 준비 큐에 있는 프로세스 중 한 프로세스를 골라 다음에 실행시킨다.
운영체제가 프로세스를 프로세서에 할당하는 것을 디스패치(Dispatch)라고 한다.

![](/assets/images/posts/process-scheduling-and-techniques/Untitled-Diagram-150.png)

스케쥴링 알고리즘 평가기준은 아래와 같다.

- CPU 이용률: 전체 시스템 시간 중, CPU가 작업을 처리하는 시간의 비율
- 처리 량: CPU가 단위 시간당 처리하는 프로세스의 개수
- 총 처리 시간: 프로세스가 시작해서 끝날때 까지 걸린 시간
- 대기시간: 프로세스가 준비완료 큐에서 대기하는 시간의 총 합
- 응답시간: 대화식 시스템에서 요청 후 첫 응답이 오기까지 걸린 시간

프로세서 스케줄링의 기법에는 크게 아래와 같이 선점(preemptive)/비선점(non-preemptive) 형태가 있다.

![](/assets/images/posts/process-scheduling-and-techniques/preemptive-vs-non-preemptive.jpg)

먼저, **비선점(non-preemptive)** 은 이미 할당된 CPU 를 다른 프로세스가 강제로 빼앗아 사용할 수 없는 스케줄링 기법이다.
프로세스가 CPUS 를 할당 받으면 해당 프로세스가 완료될 때 까지 CPU 를 사용하지 않는다. RDS 로 따지면 테이블에 Lock 을 걸어둔다 이해하면 편하다. 매우 공정한 방법이지만 priority 가 높은 프로세스에 대응하기에는 비효율적인 기법이다.

비선점 기법에 종류로는 크게 아래 종류들이 존재한다.

**FCFS 스케줄링 (First Come First Serve Scheduling)**

CPU 를 먼저 요청한 프로세스가 먼저 CPU 를 배정 받는 스케줄링 방법이다.
P1(24ms), P2(3ms), P3(3ms) 프로세스가 있다 가정하면, CPU 스케줄링의 결과는 다음과 같이 표현된다.

![](/assets/images/posts/process-scheduling-and-techniques/maxresdefault.jpg)

가장 간단한 방식이지만, 평균 대기 시간(average waiting time) 을 생각해보자, (p1(0) + p2(24) + p3(27)) / 3 = 17ms.
p3 가 priority 가 가장 높은 프로세스였다면, 의미 없는 대기 시간을 기다려야만한다.
p3 가 가장 먼저들어와 먼저 실행될 수 있으나, 이러한 확률에 의존할 필요는 없다.

이런 식으로 다른 모든 프로세스들이 커다란 한 프로세스가 끝날때까지 계속 기다리는 현상을 **convey effect** 라 한다. convey effect는 CPU와 장치들의 사용률을 낮추기 때문에 되도록이면 지양해야 한다.


**SPN(Shortest Process Next) 혹은 Shortest Job First**

준비 큐에서 기다리고 있는 프로세스 중에서 가장 CPU 요구량이 적은 것을 먼저 실행시켜 주는 방식이다. 평균 응답 시간을 최소화할 수 있으나, 실행 시간이 긴 프로세스가 CPU를 할당받지 못하고 계속해서 대기하는 무한 대기 현상이 발생할 수 있다.

![](/assets/images/posts/process-scheduling-and-techniques/spn..jpg)

**HRRN(Highest Response Ratio Next)**

준비 큐에 있는 프로세스들 중에서 응답률(Response Ratio = (대기시간 + CPU 요구량) / CPU 요구량)이 가장 높은 프로세스에게 높은 우선순위를 주는 방식이다. SPN과 SRT 방식의 약점인 수행 시간이 긴 프로세스의 무한 대기 현상을 방지하기 위한 기법이다


**선점(preemptive)** 은 CPU 사용권을 `선점` 한다고 생각하면 이해가 쉽다. 특정 요건에 따라 각 프로세스의 요청이 있을 때 프로세스에게 분배하는 방식이다. 가장 자원을 필요로하는 프로세스에게 CPU 를 분배하며 상황에 따라 강제로 회수할 수 도 있다. 따라서 빠른 응답신을 요하는 대화식 시분할 시스템에 적합하며 긴급한 프로세스를 제어할 수 있다.

**라운드 로빈(Round-Robin/RR) 스케줄링**

FCFS 스케줄링을 기반으로 하여 CPU를 할당하되, 각 프로세스는 한 번에 쓸 수 있는 CPU 시간 크기(시간 할당량)이 지나면 시간 종료 인터럽트에 의해 CPU를 뺏기게 되는 방식이다. 주로 우선순위 스케줄링(Priority scheduling)과 결합해 프로세스의 시간 할당량을 조절하는 방식으로 활용한다.
단, FCFS에서 프로세스 하나가 CPU를 독점하는 단점을 방지하지만 Context Switch의 오버헤드를 감수해야한다.

![](/assets/images/posts/process-scheduling-and-techniques/round-robin-1.jpg)

**SRT(Shortest Remaining Time) 스케줄링**

준비 큐에서 완료까지 남은 CPU 요구량이 가장 짧은 것을 먼저 실행시켜주는 방식이다. 실행 도중 남은 실행 시간이 더 적은 프로세스가 준비 큐에 들어올 경우, 현재 실행 중인 것을 중단하고 새 프로세스에게 CPU를 할당한다.

**다단계 큐(Multi-level Queue) 스케줄링**

프로세스들의 우선순위 개수만큼의 큐가 필요하다. 프로세스들은 자신의 우선순위 값에 해당하는 큐에 들어가게 되며, 우선순위가 낮은 하위 단계 큐의 작업은 실행 중이더라도 상위 단계 큐에 프로세스가 도착하면 CPU를 뺏긴다.