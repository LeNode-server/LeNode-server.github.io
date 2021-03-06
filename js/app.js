document.addEventListener('jQuery loaded', function(){
    'use strict';
    (function a(){
        $.get('https://api.github.com/repos/KaMeHb-UA/LeNode/releases/latest', function(data, status){
            if (status != 'success'){
                a();
            } else {
                $('a[rel="download"]').attr('href', data.assets[0].browser_download_url);
                $('#latest-version').html(data.tag_name);
                $('*[rel="release-description"]').html(data.name);
            }
        }, 'json');
    })();
    (function(){
        var actions = {
            log : function(){
                console.log.apply(null, arguments);
                console.log(this);
            },
            hide : function(){
                this.css('display', 'none')
            },
            detach : function(){
                this.detach(arguments ? arguments[0] : undefined)
            },
            remove : function(){
                this.remove(arguments ? arguments[0] : undefined)
            }
        };
        $('*[__click]').each(function(i,e){
            var e = $(e);
            e.click(function(){
                try{
                    actions[e.attr('__click')].apply(e, (function(a){
                        if (a){
                            try{
                                return JSON.parse(a);
                            } catch(e){
                                return [a];
                            }
                        } else return [];
                    })(e.attr('__click_data')));
                } catch(err){
                    console.warn('Cannot find action ' + e.attr('__click'));
                }
            });
        });
    })();
});
(function waitForJQuery(){
    if(!window.jQuery) setTimeout(waitForJQuery, 10); else document.dispatchEvent(new Event('jQuery loaded', {}));
})();
