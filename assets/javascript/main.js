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
            link = 'http://service.weibo.com/share/share.php?content=utf-8&url=' + shareLink;
        }

        window.open(link);
    }
};

app.ready(function()
{
    app.initialize();
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