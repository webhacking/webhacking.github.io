---
title: Vuetiful Korea 4th
layout: post
tags: ['발표', 'vue.js']
background_image: /assets/images/posts/vuetiful-korea-4th/IMG_0034.jpg
---

회사에서 신규 프로젝트를 진행함에따라 기술 스택을 정의하게되었다.

상당부분은 전의 프로젝트와 동일한 기술 스택을 따랐지만, 웹 프론트엔드는 생각이 조금 달랐다.

대부분 `JQuery` 를 많이 활용했지만, 더 이상 필요성을 느끼지 못함은 둘째치고 불편함을 느끼고 있는 시점이었다.

웹 프론트엔드의 개발 환경은 급격히 진화하였고 아래와 같이 모던 브라우저들은 이미 충분히 많은 DOM/BOM API 들이 구현되어있다.

```javascript
// attribute 찾기

// jQuery
$('a[target=_blank]');

// Native
document.querySelectorAll('a[target=_blank]');
```

현재 시점에서 더 이상 `JQuery` 는 필요치 않다.

`JQuery` 를 통해 SPA 형태의 프로그램을 만들려고 한다면 상당히 공수가 많이 필요하고 코드 품질 관리 또한 힘들 것 이다.

물론 개발자의 역량에 따라 무한히 달라질 수 있겠지만, 현재는 탄탄하고 우아한 프레임워크와 라이브러리들이 대세를 이루고 있는 시점에서 그런 공수를 감수할 필요는 없다.

하지만 변수는 존재한다.

국내에는 아직 낙후된 브라우저 이용자들이 꽤나 많은데, 일전 언급한 탄탄하고 우아한 프레임워크나 라이브러리들 대부분 상위 버전의 브라우저 스펙을 요구한다.

크로스브라우징 이슈는 어쩌면 피해갈 수 없는 상황이지만, 그러한 낙후된 브라우저에서 품질을 보장하느니 업데이트를 권장해서라도 요구 스펙에 맞추는게 좋다.

만약 이용자에 맞추었다면, 카카오 뱅크가 선택한 `Backbone.js` 또한 선택지에 있었다.

`Backbone.js` 는 크로스 브라우징 이슈를 해결해 줄 뿐만 아니라, 그나마 모던하게 코딩할 수 있게 도와준다.

난 반대 이므로, 아래와 같은 선택지가 또 주었졌다.

`Angular.js`, `React.js`, `Vue.js`

어떤걸 선택해도 좋은 선택이라 생각된다.

기회가 좋아 일전에 `Angular.js`, `React.js` 를 사용한 경험이 있었지만 스터디와 토이 프로젝트 명목하에 했던거라 depth 가 낮았다.

또 내가 처음 `Angular.js` 를 사용했을 때, 버전 2였는데 지금 6까지 릴리즈 되었다.

![screen-shot-2018-05-06-01](/assets/images/posts/vuetiful-korea-4th/screen-shot-2018-05-06-01.png)

얼마만큼의 변경사항이 있는지 가늠이 안되지만, 확실한건 learning curve 가 상당히 발생할 것 같았다.

빡빡한 일정으로 인해 회사에서 이와 같은 learning curve 를 용납해주지는 않을 것 같았다.

결국에 `Vue.js` 를 선택했지만, `Vue.js` 는 `learning curve` 가 발생하지 않을까 ?

아니다. 위 선택지 세개 중 어떤 선택을 해도 `learning curve` 는 피해갈 수 없었겠지만 상대적으로 `learning curve` 가 적은 건 사실이었다.

`Angular.js`, `React.js` 두 프레임워크 모두 방대한 API를 자랑한다.

결국엔 `learning curve`란 이러한 API들을 숙지하고 익숙해지는데 소요되는 자원이라 생각한다.

반면 Vue.js 는 HTML,JavaScript만 숙지하고 있다면 가볍게 바로 시작할 수 있습니다.

퍼포먼스 측면에서도 상대적 우위를 보여주고있다.

덕분에 빠르게 개발할 수 있었고, 유연한 프로그램을 만들 수 있었다.

2개월이라는 짧은 시간 동안 애정도 많이 느껴, 한국 Vue.js 커뮤니티에도 잠깐 활동했다.

좋은 기회가 생겨서 Vuetiful Korea 4th에서 발표도 진행하게 되었는데, 첫 발표라서 그런지 무참히 깨지고 많은 교훈을 느꼈다.

![screen-shot-2018-05-06-02](/assets/images/posts/vuetiful-korea-4th/screen-shot-2018-05-06-02.png)

wording 마다 설명 텍스트를 추가했는데, 발표할때 텍스트가 나오지 않아서 wording 만 보고 얘기를 풀어나갔다.

어떻게 끝났는지도 모르겠다.

본래 내성적인 성격도 있고, 낯가림도 심한편인데 이때 절정에 다다른 것 같다.

질문도 몇차례 받았는데, 제대로 답변할 수 없어 끝나고 많이 후회했다.

왜 그렇게 답을 했을까 ? 왜 이 정도 밖에 준비를 할 수 없을까.

결국 모든 건 내 잘못 이었다.

![발표 모습](/assets/images/posts/vuetiful-korea-4th/IMG_0034.jpg)

다음에 또 어떤 주제로 발표할 수 있는 기회가 있을지 모르겠지만, 다음에는 더 잘 할 수 있을 것 같다.

아래는 내가 발표한 자료이다.

프로젝트에서 vue.js 를 사용하면서 느낀점에 대해 얘기하고자했다.

<iframe src="//slides.com/hax0r/vuetiful-korea-4th/embed" width="680" height="420" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

내가 발표에서 말하고자 했던 본질은 "흥미" 였다.

> 어떤 스택을 선택하던 그것은 중요치 않다.

개발자 본인이 흥미를 느끼고 투자하는 것 이 중요하다 생각했다.

