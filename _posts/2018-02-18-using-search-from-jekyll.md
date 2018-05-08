---
title: Jekyll 에 검색기능을 추가해보세요.
layout: post
description: ""
categories : development
sub_categories : ""
date: 2018-02-18
tags: ['Jekyll','Jekyll search using light-Jekyll-search.js']
background_image: /assets/images/posts/using-search-from-jekyll/fetch-posts.png
---

## TL;DR

Jekyll 에 검색기능을 추가하는 방법을 서술하고있습니다.

## At the outset

jekyll theme 중, `search` 기능을 제공하는 theme 도 있지만 그렇지 않은 theme 또한 많이 존재합니다.

제가 사용한 `theme` 또한 그렇구요.

jekyll 을 통해 생성한 `static`  문서들에대해 검색기능을 추가하고자한다면 우리는 `client-side` 국한되어서 기능을 구현해야합니다.

그 이유는 `static` 블로그는 `dynamic` 블로그와 달리 서버와 상호작용이 없기 때문인데 서버에서 부담해야하는 `resource`를 client 에서 부담하게됩니다.

client side 에서 resource를 사용하니 서버의 부담을 줄이는 이점인 동시에 client 환경에 따라 `crash` 가 발생할 수 단점도 존재합니다.

질의되는 키워드를 변수 `q` , 현재 작성된 문서들을 변수 `p` 라고 가정했을 때

`p` 의 양의 비례되어 `client (= 브라우저)` 에서  `resource`  가 사용되기에 글이 아주 많은 경우 좀 더 각별히 신경을 기우일 필요가 있습니다.


## What do you prefer

github 내 `jekyll search` 기능을 구현할 수 있는 좋은 library 들이 존재한다.

대표적인 library 는 아래와 같다.

1. [simple jekyll search](https://github.com/christian-fei/Simple-Jekyll-Search)
2. [jekyll lunr js search](https://github.com/slashdotdash/jekyll-lunr-js-search)
3. [jekyll search](https://github.com/mathaywarduk/jekyll-search)

위와 같은 선택지 중 그 어떤걸 선택해도 좋은 선택일 것 같다.

하지만 나는 다르다.

> 대체로 위 기재된  library 들은 무겁고, cross browsing 이슈가 존재한다.

내가 지향하는 블로그는 어떤 것에도 의존치 않고, IE8 까지 지원하는 블로그를 만들고싶다.

솔직히 `cross browsing` 이슈에 대해 잠시나마 생각해본 결과, 모던브라우저를 사랑한다고 한들 현 시장에서 IE 점유률을 봤을 때 피치 못할 선택이었다.

최근까지 난 `vue.js` 에 빠져있었고, 원래 계획대로라면 `vue.js` 로 구현할 생각이었다.

하지만 이 또한 내가 지향한 `어떤 것에도 의존치 않고` 라는 지향점에서 벗어나기 때문에 선택지에서 제외되었다.

만약 당신이 크로스브라우징 이슈를 해결해야하지만 모던하게 개발을 하고자한다면, [backbone.js](http://backbonejs.org/) 도 좋은 선택지일 것 이다.

## Let's get it

일전 제 요구사항을 충족할 수 있는 별도의 라이브러리 [lightJekyllSearch](https://github.com/webhacking/light-Jekyll-search)을 만들었습니다.
Github 에 공유되어있으니, 필요에따라 사용하시기 바랍니다.

`lightJekyllSearch`  을 사용하고있다는 가정하에 글 적습니다.

1. 포스트들의 집합이 필요하다. 따라서 아래  `posts.json` 을 추가합니다.

```html
{% raw %}
---
layout: null
---
[
  {% for post in site.posts %}
  {
  "title"    : "{{ post.title | escape }}",
  "category" : "{{ post.category }}",
  "tags"     : "{{ post.tags | join: ', ' }}",
  "url"      : "{{ site.baseurl }}{{ post.url }}",
  "date"     : "{{ post.date }}"
  } {% unless forloop.last %},{% endunless %}
  {% endfor %}
]
{%endraw%}
```

위 `posts.json` 은, 후에 아래와 같이 작성한 문서들을 전부가지고 옵니다.

![fetch-posts](/assets/images/posts/using-search-from-jekyll/fetch-posts.png)


2. 아래와 같이 자신의 경로에 위치해 있는 [lightJekyllSearch](https://github.com/webhacking/light-Jekyll-search) 을 불러옵니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <body>
  <script type="text/javascript" src="{{ site.baseurl }}/assets/javascript/light-jekyll-search.js"></script>
  <script type="text/javascript">
      lightJekyllSearch.search({
          el : document.querySelector('form[name="search"] input[name="q"]'),
          placeholder : '검색어를 입력해주세요.',
          postJsonPath : '/assets/json/posts.json'
      });
  </script>
  </body>
</html>
```

`postJsonPath` key 의 value 는 위 서술한 json 경로를 기입하면 된다.

기본 값은 `/assets/json/posts.json` 이다.

현재는 `suggestion` 만을 지원하고 있는데, 앞으로 좀 더 나아가서 `pagination` 과 질의되는 문자의 대한 `highlight` 와 `hashbang` 을 통한 별도의 페이지 구성 없이 `javascript` 에서 검색 내용을 출력하는 것 이다. 

아직 추가되어야할 기능들이 많다.

기본적인 동작 화면은 아래와 같다.

![results](/assets/images/posts/using-search-from-jekyll/results.png)


```javascript
/**
 * lightJekyllSearch
 *
 * Copyright 2018, Woo YeongJun(a@hax0r.info)
 * Licensed under the MIT License.
 */

'use strict';

var lightJekyllSearch = {
    initialize : function()
    {
        this.posts = this.featchPosts(this.postJsonPath);
    },
    search : function(config)
    {
        var self = this;

        lightJekyllSearch.initialize();
        config.el.placeholder = ( config.placeholder ) ? config.placeholder : '';

        if ( config.postJsonPath ) {
            this.postJsonPath = config.postJsonPath;
        }

        this.innerFunctions.addEvent('keyup', config.el, function(e)
        {
            if ( document.getElementById('light-jekyll-search-suggestion') !== null ) {
                if ( document.getElementById('light-jekyll-search-suggestion').style.display === 'none' ) {
                    document.getElementById('light-jekyll-search-suggestion').style.display = '';
                }
            }

            self.suggestion(config.el, self.searchFor(e.target.value, self.posts));
        });

        this.innerFunctions.addEvent('click', document.querySelector('html'), function(e)
        {
            if ( document.getElementById('light-jekyll-search-suggestion') !== null ) {
                document.getElementById('light-jekyll-search-suggestion').style.display = 'none';
            }
        });
    },
    searchFor : function(toSearch, posts)
    {
        var results = [],
            toSearch = this.innerFunctions.trimString(toSearch);

        for ( var i = 0; i < posts.length; i++ ) {
            for ( var key in posts[i] ) {
                if ( posts[i][key].indexOf(toSearch)!=-1 ) {
                    if ( !this.innerFunctions.itemExists(results, posts[i]) ) {
                        results.push(posts[i]);
                    }
                }
            }
        }
        return results;
    },
    suggestion : function(el, related)
    {
        var suggestionHtml = '',
            suggestionNode = document.getElementById('light-jekyll-search-suggestion');

        if ( suggestionNode === null ) {
            suggestionHtml += '<div id="light-jekyll-search-suggestion">';
        } else {
            suggestionNode.innerHTML = ''
        }

        suggestionHtml += '<p class="found_results_n">';
            suggestionHtml += related.length.toString() + 'Result(s) found';
        suggestionHtml += '</p>';

        suggestionHtml += '<ul>';
            for ( var i = 0; i < related.length; i++ ) {
                suggestionHtml += '<li>';
                    suggestionHtml += '<a href="'+ related[i].url +'">';
                        suggestionHtml += related[i].title;
                    suggestionHtml += '</a>';
                suggestionHtml += '</li>';
            }
        suggestionHtml += '</ul>';

        if ( suggestionNode === null ) {
            suggestionHtml += '</div>';
            el.insertAdjacentHTML('afterend', suggestionHtml);
        } else {
            suggestionNode.innerHTML = suggestionHtml;
        }
    },
    posts : new Object,
    postJsonPath : '/assets/json/posts.json',
    featchPosts : function(postJsonPath)
    {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", postJsonPath, false );
        xmlHttp.send( null );

        return JSON.parse(xmlHttp.responseText);

    },
    innerFunctions : {
        addEvent : function (evnt, elem, func)
        {
            if (elem.addEventListener) {
                elem.addEventListener(evnt,func,false);
            } else if (elem.attachEvent) {
                elem.attachEvent("on"+evnt, func);
            } else {
                elem[evnt] = func;
            }
        },
        trimString : function(s)
        {
            var l = 0,
                r = s.length -1;

            while ( l < s.length && s[l] == ' ' ){
                l++;
            }

            while ( r > l && s[r] == ' ' ) {
                r -= 1;
            }

            return s.substring(l, r+1);
        },
        compareObjects : function(o1, o2)
        {
            var k = '';

            for ( k in o1 ) {
                if ( o1[k] != o2[k] ) {
                    return false;
                }
            }

            for ( k in o2 ) {
                if ( o1[k] != o2[k] ) {
                    return false;
                }
            }

            return true;
        },
        itemExists : function(haystack, needle)
        {
            for ( var i=0; i<haystack.length; i++ ) {
                if ( this.compareObjects(haystack[i], needle) ) {
                    return true;
                }
            }
            return false;

        }

    }
}
```

## Eneded

검색 기능을 만들며 재밌었다.

하지만 아쉬움도 많이 남는다.

좀 더 `modern` 하게 작업할 수 있는 미래를 생각하며 글 마친다.

bower 에 package register 했다.

아래 command 를 통하여 손 쉽게 설치 할 수 있다.

```
bower install light-jekyll-search
```
