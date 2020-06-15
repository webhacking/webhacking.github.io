---
title: Node 프로덕트 퀄리티를 높이는 협업 방법
layout: post
categories : development
background_image: '/assets/images/posts/how-to-improve-node-product-quality/tetris-same-thing.jpg'
---

IBM에서 기후변화와 COVID-19를 주제로 해커톤을 진행한다는 소식을 접했고, 평소 특히 `COVID-19` 에 대해 관심이 많았던 나는 주저 없이 참가 신청을 했다. 코로나 바이러스는 발병 이후 현재까지도 우리 사회를 위협하고 있다. 이러한 위협적인 바이러스로부터 우리 사회에 내가 기여할 수 있는 것은 무엇일까, 어떠한 메세지를 전달할 수 있을까 내심 고심이 많았지만 이러한 고심에 시간 또한 내게는 설렘으로 다가왔다.

이번 [Call for code 2020](https://developer.ibm.com/kr/callforcode/)은 [에너지 해커톤](https://blog.hax0r.info/2016-03-28/energy-hackathon-2016-in-seoul/) 이후로 4년 만에 참가하는 해커톤이었다. 
에너지 해커톤에서 너무 많은 에너지를 소비해서 다음 해커톤 참가를 꺼리게 된 것도 있었고, 일정이 바빠서 참가할 시간이 없었다.

![](/assets/images/posts/call-for-code-ibm/call-1.png)

## Schedule

![](/assets/images/posts/call-for-code-ibm/call-2.png)

## Getting started

시작에 앞서, 저번 해커톤은 친구와 함께 참가했다면 이번에는 혼자서 참가했기 때문에 조인할 팀을 찾아야 했다. 다행히도 빠르게 컨택된 팀에 조인할 수 있게 되었고 팀원들 또한 모두 좋은 사람들이라 생각되어 내심 만족했다. 우리 팀은 여러 아이디어들을 상의 끝에`QR 코드 베이스 혼잡도` 서비스를 구현하기로 결정했다.

이용자는 QR 코드를 통해 건물에 입장 또는 퇴장할 때, `태깅` 이라는 절차를 수행하며 수행한 데이터는 서버가 수집을 하여 건물 면적을 계산하여 혼잡도를 구하고 이를 이용자들에게 제공한다. 또한 건물에 감염자 발생 시, 시간과 정확한 동선을 특정할 수 있기에 아주 `정확`하게 격리가 필요한 이들에게 알림을 보낼 수 있고 **2차 감염** 확산을 방지할 수 있다. 다만 아쉽게도 위경도를 통해 면적을 계산하는 부분은 시간 관계상 구현하기 힘들어서 절댓값을 넣어 해결했다. 또한 아쉽게도 알림과 관련한 부분도 작업하지 못했다.

우리 앱을 처음 실행하면 아래와 같이 이용자 위치 기반으로 하여 혼잡도 맵을 제공한다.
태깅 된 이용자들의 위치 정보에 따라 마커가 생성되며, 해당 마커를 클릭하면 혼잡도 및 상세정보를 확인할 수 있다.

![](/assets/images/posts/call-for-code-ibm/call-3.png)

현재 위치에 따른 혼잡도 구하고자 한다면, 크게 두가지 방법을 생각할 수 있다. 첫번째로는 현재 지도 기반으로 minimum maximum ((남,서), (북,동)) 위경도를 구하여 BETWEEN 으로 쿼리하는 간단한 방법이 있다. 아래는 카카오맵에서 제공하는 api 를 통해 쉽게 값을 구할 수 있다. `boundsMap` 을 이용자가 맵을 이동할때 마다 서버로 부터 요청을 해야하는데 이 때, `maps.event.addListener(map, 'dragend', func);` 을 통해 트리깅 이벤트를 전달 받을 수 있다.

```javascript
    const bounds = map.getBounds();
    const swLatLng = bounds.getSouthWest(); 
    const neLatLng = bounds.getNorthEast(); 
    const boundsStr = bounds.toString(); // ((남,서), (북,동)) 형식

    const boundsMap = [swLatLng.getLat(), swLatLng.getLng(), neLatLng.getLat(), neLatLng.getLng()];
```

서버는 `boundsMap` 을 클라이언트로 부터 전달 받아, 아래와 같이 맵핑하여 쿼리를 수행하면 된다. 

```sql
SELECT  locations.latitude, locations.longitude FROM locations WHERE (latitude BETWEEN {minLat}  AND  {maxLat}) AND (longitude BETWEEN {minLon} AND {maxLon})'
```

또는 두번째 방법으로 distance 기반으로 하는 방법이 존재하는데, 이후에 distance 값을 통해 좀 더 유연한 확장을 하고자 이 방법으로 구현했다. 쿼리를 작성할때 가장 먼저 생각나는 Haversine formula 를 통해 작성했다.

![](/assets/images/posts/call-for-code-ibm/call-4.png)

서비스 레이어에서 아래와 같이 표현했다.
조건문에 있는 내용은 이용자가 중복 태깅을 할 수 있다는 가정이었고, 가장 마지막에 태깅한 내용을 기준으로 보여줬다.

```javascript
public explore(
    latitude: number,
    longitude: number,
  ): Observable<ExploreModel[]> {
    return from(
      this.accessRepository.sequelize.query(
        `
        SELECT *, count(*) as total,
        ( 3959 * acos( cos( radians(" ${latitude} ") ) * cos( radians( latitude ) ) 
        * cos( radians( longitude ) - radians(" ${longitude} ") ) 
        + sin( radians(" ${latitude} ") ) * sin( radians( latitude ) ) ) ) AS distance
        FROM callforcode.AccessEntities
        where isOut = 0 and id IN (
        SELECT MAX(id)
          FROM AccessEntities
          GROUP BY address, accountId
      )
         group by address HAVING distance < 5
        `,
        {
          raw: true,
          type: Sequelize.QueryTypes.SELECT,
        },
      ),
    ).pipe(
      map(rows => {
        return rows.map(row => this.convert(row as AccessEntity));
      }),
    );
  }
```

위 내용을 포함하여 QR 코드 생성 부분 등 총 6개 정도의 API 로 구성되어 있고, 백엔드 부분은 혼자서 작업을 했다. 프론트 부분도 필요에 따라 팀원들과 함께 작업했다.

다소 아쉬움이 많이 남는 부분은 에너지 해커톤 때와 같은 열정이 별로 없어서 .. 밤을 새우면서까지 욕심을 부리며 작업을 하지 않았다는 게 아쉬움이 남는다. 욕심을 냈다면 꽤나 오버 엔지니어링을 했을 것 같은데, 후에 보아하니 오버 엔지니어링을 해야 크게 어필을 할 수 있는가 보다 생각도 했다. 실제로 의아함을 같게 하는 몇몇 장면들이 연출되었는데 이의를 가지기엔 내가 쏟아부은 내용을 볼 때 그럴 수 없었다.


## Judging Criteria

돌이켜보면 우리팀은 `경험` 부분에서 상대적으로 낮은 점수를 받지 않았을까 생각한다.
또한 `구현` 부분에 있는 적합성에서 IBM API를 적극 활용하지 않은 것 또한 한몫한 것으로 보인다. 실제로 우승팀들을 보면 대 부분 IBM 플랫폼 통해 블록체인으로 구현했는데, 이럴거면 우리도 off chain 이 아닌 on chain 으로 구현하는게 더 좋았겠다 싶었다.

![](/assets/images/posts/call-for-code-ibm/call-5.png)

## Good things

- 좋은 팀원들을 만났다.
- 코로나를 주제로한 신선한 아이디어들을 볼 수 있었다.
- 에어비앤비로 빌린 하우스 옆에 리트리버가 있었는데, 진짜 너무 귀여웠다. 조금 친해졌는데 궁딩이 팡팡을 좋아하는 친구였다. 살짝 팡팡해봤는데 만족한 눈빛으로 그윽히 쳐다봤다.

## Something wanting

- 피자를 받았는데, 피자를 못 먹었다.
- 일정이 빠듯해서 해커톤 당일에 에너지를 많이 쏟지 못했다.
- 새로운 기술 스택이 아닌, 이미 너무 익숙한 기술 스택으로 진행했다.
- 멘토링을 제공해주셨다고 하는데, 본인은 일정 때문에 멘토링 시간을 받지 못해서 그 때 여러 질문들을 못한게 조금 아쉬운점으로 남는다.
![](/assets/images/posts/call-for-code-ibm/call-6.png)


## Major Takeaways

우선, 유의미한 주제로 해커톤을 진행할 수 있게 도와준 IBM 측에 감사 인사를 전한다.
새로운 사람들과 새로운 발상을 통해 아이디어를 구상하고, 이를 구현하는 과정은 언제나 배울점이 많고 또 한번 성장한 계기가 된 것 같아 뿌듯하다. 그리고 해커톤 당일 돌아오자마자 뻗어서 자는 나를 그냥 재워준 팀원들에게도 감사 인사를 전한다.  

![](/assets/images/posts/call-for-code-ibm/call-7.png)

참가하신 모든 분들 수고 많으셨습니다.
우리들의 생각들이 이 사회에 유의미한 메세지로 전달되었길 바랍니다.
