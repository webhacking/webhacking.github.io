window.app = {
    isMobile : false,
    chooseDevice : function()
    {
        app.isMobile = false;
        if ( Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= 480 ) {
            app.isMobile = true;
        }
    },
    initialize : function ()
    {
        this.chooseDevice();
    },
    ready : function(fn)
    {
        if ( document.readyState != 'loading' ) {
            fn();
        } else if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            document.attachEvent('onreadystatechange', function () {
                if ( document.readyState != 'loading' ) {
                    fn();
                }
            });
        }
    },
    addEvent : function (evnt, elem, func)
    {
        if ( !elem ) {
            return false;
        }

        if (elem.addEventListener) {
            elem.addEventListener(evnt,func,false);
        } else if (elem.attachEvent) {
            elem.attachEvent("on"+evnt, func);
        } else {
            elem[evnt] = func;
        }
    },
    addClass : function(el, className)
    {
        if ( el.classList ) {
            el.classList.add(className);
        } else {
            el.className += ' ' + className;
        }
    },
    hasClass : function(el, className)
    {
        return ( el.classList ) ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    },
    removeClass : function(el, className)
    {
        if ( el.classList ) {
            el.classList.remove(className);
        } else {
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }
};

app.extends = {
    enableSideBar : function()
    {
        app.addClass(document.querySelector('body'), 'enable-side-bar');
    },
    disableSideBar : function()
    {
        app.removeClass(document.querySelector('body'), 'enable-side-bar');
    },
    shareThis : function(shareTo)
    {
        var link = null,
            shareLink = encodeURI(window.location.href),
            shareTitle = encodeURI(window.document.title),
            shareBody = encodeURI(( document.querySelector('.post > .content') === null ) ? '' : document.querySelector('.post > .content').textContent.trim().substring(0, 120));

        if ( shareBody ) {
            if ( document.querySelector('.post > .content').textContent.trim().length > 120 ) {
                shareBody = shareBody + '...';
            }
        }

        if ( shareTo === 'facebook' ) {
            link = 'https://www.facebook.com/sharer.php?u=' + shareLink;
        } else if ( shareTo === 'twitter' ) {
            link = 'https://twitter.com/share?url=' + shareLink+ '&text='+shareBody;
        } else if ( shareTo === 'google-plus' ) {
            link = 'https://plus.google.com/share?url=' + shareLink;
        } else if ( shareTo === 'weibo' ) {
            link = 'http://service.weibo.com/share/share.php?content=utf-8&url=' + shareLink + '&title=' + shareTitle;
        }

        window.open(link);
    }
};

app.ready(function()
{
    app.initialize();

    if ( navigator.userAgent.toLowerCase().indexOf('android') > -1 ) {
        document.getElementById('metaViewport').setAttribute('content', 'width='+screen.width+', initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }

    window.addEventListener('copy', function (e) {
        document.execCommand('copy');
        e.preventDefault();
        e.clipboardData.setData('text/plain', document.getSelection() + "\n\n[출처] " + document.URL +"  [Hax0r blog]");
   }, false);
   
    var stie = site;
    (function() { 
        var d = document, s = d.createElement('script');
        s.src = '//' + site.disqusId + '.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    })();

    if ( !app.isMobile ) {
        document.querySelector('.header > h1 > a').innerHTML = ( page.title ) ? page.title : site.name;
        setTimeout(function () {
            if ( document.documentElement.getAttribute('data-page') !== 'default' ) {
                app.addClass(document.querySelector('.header > h1'), 'want-to-concentrate');
            }
            app.addEvent('mouseenter', document.querySelector('.header > h1'), function(e)
            {
                if (app.hasClass(document.querySelector('body'), 'throttle')) {
                    return;
                }
                app.removeClass(document.querySelector('.header > h1'), 'want-to-concentrate');
            });

            app.addEvent('mouseleave', document.querySelector('.header > h1'), function(e)
            {
                if (app.hasClass(document.querySelector('body'), 'throttle')) {
                    return;
                }
                app.addClass(document.querySelector('.header > h1'), 'want-to-concentrate');
            });
        }, 1600);
    }

    if ( document.documentElement.getAttribute('data-page') === 'post' ) {
        (function() { 
            var d = document, s = d.createElement('script');
            s.src = '//{{ site.disqus.id }}.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
        document.getElementById('app').addEventListener("scroll", function (event) {
            var currentScrollSize = document.getElementById('app').scrollTop;
            var headerHeight = document.querySelector('.header').offsetHeight
            var dropPoint = document.querySelector('.post-title').offsetHeight + document.querySelector('.content-container').offsetTop + headerHeight;
            var bodyElement = document.querySelector('body');
            if (currentScrollSize >= dropPoint) {
                document.querySelector('.content-container').style.top = headerHeight + 'px';
                app.addClass(bodyElement, 'throttle');
                app.removeClass(document.querySelector('.header > h1'), 'want-to-concentrate');
            } else {
                app.removeClass(bodyElement, 'throttle');
                document.querySelector('.content-container').style.top = '0px';
                app.removeClass(document.querySelector('.header > h1'), 'want-to-concentrate');
                setTimeout(function() {
                    app.addClass(document.querySelector('.header > h1'), 'want-to-concentrate');
                }, 1000);
            }
        }, false);

        var dynamicGenerateIndex = function() {
            var bindIndex = '';
            bindIndex += '<ul id="post-index" style="position: absolute; border-left: 2px solid rgb(233, 236, 239); right: -2rem; top: 15rem;">';
            var headNodes = document.querySelectorAll('.content h1, .content h2, .content h3, .content h4, .content h5');
            for (let i = 0; i < headNodes.length; i++) {
                if (!headNodes[i].tagName) {
                    continue;
                }
                if (!headNodes[i].tagName.toLowerCase().split('h')[1]) {
                    continue;
                }
                bindIndex += '<li style="display: block; color: rgb(33, 37, 41); cursor: pointer">';
                bindIndex += '<a href="#' + headNodes[i].getAttribute('id') + '" style="color: inherit; text-decoration: none; box-shadow: none; transition: none;">' + headNodes[i].innerText + '</a>';
                bindIndex += '</li>';
            }

            bindIndex += '</ul>';

            return bindIndex;
        };

        document.querySelector('.content-container .content').innerHTML += dynamicGenerateIndex();
    }

    app.addEvent('resize', window, function(e)
    {
        app.initialize();
        app.chooseDevice();
    });

    app.addEvent('click', document.querySelector('header > .left > a'), function(e)
    {
        e.preventDefault();

        if ( app.hasClass(document.querySelector('body'), 'enable-side-bar') ) {
            app.extends.disableSideBar();
        } else {
            app.extends.enableSideBar();
        }
    });

    var shareButtons = document.querySelectorAll('header > .right a, header > .right button');

    for ( var i = 0; i < shareButtons.length; i++ ) {
        app.addEvent('click', shareButtons[i], function(e)
        {
            e.preventDefault();
            var sharing = e.currentTarget.getAttribute('data-sharing');

            if ( sharing === 'another' && app.hasClass(e.currentTarget, 'opened') ) {
                app.removeClass(e.currentTarget, 'opened');
            } else if ( sharing === 'another' && !app.hasClass(e.currentTarget, 'opened') ) {
                app.addClass(e.currentTarget, 'opened');
            } else {
                app.extends.shareThis(sharing);
            }

            ga("send", "event", {
                eventCategory: "Outbound Link, Share to",
                eventAction: "click",
                eventLabel: sharing,
                transport: "beacon"
            });
        });
    }
});