# light-Jekyll-search

The Stunningly Fast Jekyll Search Library

# Usage

Use it as an example code below.

```html
<!DOCTYPE html>
<html lang="ko">
  <body>
  <form name="search" id="search-form">
      <div>
          <i class="icon-search"></i>
          <input type="text" name="q" autocomplete="off" />
      </div>
  </form>
  <script type="text/javascript" src="scripts/light-jekyll-search.js"></script>
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