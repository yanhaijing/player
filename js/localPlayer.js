(function($, window) {
    "use strict";
    
    var MyVideo = function() {

    };

    MyVideo.prototype = {
        init:function(){        
             this.bindResize();
             $(window).trigger('resize');
             this.controls.init();
             this.bindLoadstartEvent();
             this.fileList.init();
            },
            /**
             * bindLoadstartEvent
             * bind change src event
             */
          bindLoadstartEvent:function(){
              var myVideo = window._V_("my-video"),
              fileList = this.fileList;
              myVideo.addEvent("loadstart", function(){
                 var src = myVideo.values.src;
                    
                  fileList.addSrc(src);
                  fileList.removeAllPlay();
                  fileList.addPlay(fileList.find(src));//添加播放属性
                  });
             },
             
             /**
                    *  帮顶resize事件
                    */
          bindResize:function(){
             $(window).resize(function(e) {
                var $body = $('body'),
                    width = $body.width(),
                    height = $body.height(),
                    myVideo = window._V_("my-video");
            
                if($(window).width() <= 800){
                    $(window).outerWidth(800);
                    e.cancelable = true;
                    e.preventDefault();
                    width = 800;
                    }
               if($(window).height() <= 600){
                    $(window).outerHeight(600);
                    e.cancelable = true;
                    e.preventDefault();
                    height = 800;
                    }
               myVideo.size(width, height);
               });
           },
           /**
            * fileList object
            */
      fileList:{
          init:function(){
              this.bindRightClickEvent();
              this.bindClickEvent();
              this.addSrc("http://hurl.ppstv.com/ugc/1/e5/1da5eb8fead420c6e27aed4256bedb51720cf756/1da5eb8fead420c6e27aed4256bedb51720cf756.mp4");
              this.addSrc("http://hurl.ppstv.com/ugc/e/3a/e8df7b9f6a20b44e6a5e91207b1dd46e0e29725a/e8df7b9f6a20b44e6a5e91207b1dd46e0e29725a.mp4");
              this.addSrc("http://hurl.ppstv.com/ugc/c/a8/cc8f1f9fe5033845e6cfdcdbcd4119ff5ef2bc11/cc8f1f9fe5033845e6cfdcdbcd4119ff5ef2bc11.mp4");
              this.addSrc("http://hurl.ppstv.com/ugc/5/9f/5cf1c25422e6ef4e5eca5a99a259b66c60afef7c/5cf1c25422e6ef4e5eca5a99a259b66c60afef7c.mp4");
              this.addSrc("http://hurl.ppstv.com/ugc/b/be/bc43615fb2d365269cf24dcac144ee563517b380/bc43615fb2d365269cf24dcac144ee563517b380.mp4");
              this.addSrc("http://hurl.ppstv.com/ugc/2/17/26b02704f002841f65452a43c96df85184848039/26b02704f002841f65452a43c96df85184848039.mp4");
              this.addSrc("http://hurl.ppstv.com/ugc/5/a5/50f0acbbaa9f7889462f82f4689a15d2a78a710b/50f0acbbaa9f7889462f82f4689a15d2a78a710b.mp4");
              this.addSrc("http://hurl.ppstv.com/ugc/9/8a/99ebc4b504c1bb0cb982deff1f11932e18f57d79/99ebc4b504c1bb0cb982deff1f11932e18f57d79.mp4");
              },
          add:function(name, src, info){
              var _$ = $,
              $ul,
              $li;
              if(!this.has(src)){
                  //not in filelist ,add it
                  $ul = _$('#file-list > ul');
                  $li = _$('<li title="' + info + '"' 
                        + 'rel="' + src + '">'
                        + name + '</li>');
                  $ul.append($li);
                   }
          },
          /**
           *  add src
           */
          addSrc:function(src){
              var
                    srcs = src.split('/'),
                    info = srcs.pop(),
                    name = info.substr(0, 25);
              this.add(name, src, info);
          },
          /**
           *  remove li
           */
          remove:function($li){
              $li.remove();
          },
          /**
           *  find
           */
          find:function(src){
              return $('#file-list ul li[rel="' + src + '"]');
          },
          /**
           *  has li 播放列表李是否有src
           */
          has:function(src){
              var _$ = $,
              result = false,
              $fileList = _$('#file-list'),
              $lis = $fileList.find('ul li');
              
              $lis.each(function(i, li){
                  if($(li).attr('rel') === src){
                      result = true;
                      return false;
                        }
                    });
               return result;
          },
          /**
           * remove All activate
           */
          removeAllActivate:function(){
              var _$ = $,
              $fileList = _$('#file-list');
              
              $fileList.find('ul > li').removeClass('activate');
          },
          /**
           * addActivate
           */
          addActivate:function($li){
              $li.addClass('activate');
          },
          /**
           *  add paly
           */
          addPlay:function($li){
              $li.addClass('play');
          },
          /**
           *  remove all play
           */
          removeAllPlay:function(){
              var _$ = $,
              $fileList = _$('#file-list');
              
              $fileList.find('ul > li').removeClass('play');
          },
          /**
           * bind click event
           * 
           */
          bindClickEvent:function(){
              var _$ = $,
              $fileList = _$('#file-list'),
              _this = this;
              //bind click event
              $fileList.delegate('ul li', 'click', function(e){
                  _this.removeAllActivate();
                  _this.addActivate($(this));
              });
              //bind dbl click event
              $fileList.delegate('ul li', 'dblclick', function(e){
              	var myVideo = window._V_("my-video"),
              		address = $(this).attr('rel');
              	myVideo.src(address);
                myVideo.ready(function(){
                	// EXAMPLE: Start playing the video.              
                	this.play();
                });
              });
          },
          /**
                 * bindRightClickEvent
                 */
            bindRightClickEvent:function(){
                var _this = this;
                $.contextMenu({
                    selector: '#file-list ul li',    
                    items: {
                         "paly": {name: "播放", callback:function(){
                             //play event
                             var myVideo = window._V_("my-video"),
                             src = $(this).attr('rel');
                             myVideo.src(src);
                             myVideo.ready(function(){
                                 // EXAMPLE: Start playing the video.
                                 this.play();                  
                                        });
                                  }},
                         "delete": {name: "删除", callback:function(e){
                             //delete event
                             _this.remove($(this));
                                   }},
                         "quit": {name: "取消", callback:function(){}}             
                            }
                    });
                }
        },
      controls:{
          init:function(){
              this.show();
              this.fileList.init();
              this.openBtn.init();
              this.modelBtn.init();
             },
          /**
          *  显示控制组件              
          *  */    
         show:function(){
             var _$ = $,
                $controls = _$(".vjs-controls");
                $controls.addClass("vjs-fade-in");
            },
         fileList:{
            init:function(){
                var _$ = $,
                $controls = _$(".vjs-controls"),
                $fileListBtn = _$('<button id="vjs-fileList-control" class="my-animate animated" for="rotateIn" title="播放列表">');
                $controls.prepend($fileListBtn);
                this.bindClickEvent();
                $fileListBtn.trigger("click");                
            },
            /**
             * open file list
             */
              open:function(){
              	  var _$ =$,
	                $fileListBtn = _$('#vjs-fileList-control'),
	                $fileList = _$('#file-list'),
	                $myVideo = _$('#my-video');	
	              $myVideo.width('79.7%');  
	              $fileList.show();
	              $fileListBtn.addClass('open');
              },
              /**
               * close file list
               */
              close:function(){
              	var _$ =$,
	                $fileListBtn = _$('#vjs-fileList-control'),
	                $fileList = _$('#file-list'),
	                $myVideo = _$('#my-video');	
	              $fileList.hide();
                  $myVideo.width('100%');
	              $fileListBtn.removeClass('open');
              },
             /**
              * 文件列表按钮点击事件          
              * */
            bindClickEvent:function(){
				var _this = this,
				$fileListBtn = $('#vjs-fileList-control');
                $fileListBtn.toggle(function(e){
                    _this.open();
                }, function(e){
                   _this.close(); 
                });
            },                
         },
         openBtn:{
             init:function(){
                var _$ = $,
                $controls = _$(".vjs-controls"),
                $openBtn = _$('<button id="vjs-open-control" class="my-animate animated" for="fadeIn" title="打开文件">');
                $controls.append($openBtn);
                this.bindClickEvent();
                 },
            bindClickEvent:function(){
                var _$ = $,
                $modelBtn = _$("#vjs-open-control");
                
                $modelBtn.click(function(e){
                    var address = prompt("请输入视频地址"),
                    myVideo = window._V_("my-video");
                    if(address !== null){
                        if(address.charAt(0) === '/'){
                            //linux
                            address = 'file://' + address;
                            
                        }else if(address.search(/^[a-z]:/i) >= 0){

                            //windows
                            address = 'file:///' + address;
                            //windows
                            address = 'file:///' + address;

                        }else if(address.search(/http/i) === -1){
                            //web
                            address = 'http://' + address;
                               }
                        myVideo.src(address);
                        myVideo.ready(function(){
                              // EXAMPLE: Start playing the video.
                              this.play();
                        });
                      }
                  });
                }
             
            },
         modelBtn:{
             init:function(){
                 var _$ = $,
                    $controls = _$(".vjs-controls"),
                    $modelBtn = _$('<button id="vjs-model-control" class="my-animate animated" for="swing" title="切换模式">');
                    $controls.append($modelBtn);
                    this.bindClickEvent();
                 },
            bindClickEvent:function(){
                var _$ = $,
                $modelBtn = _$("#vjs-model-control");
                
                $modelBtn.click(function(){
                    _$(".vjs-progress-control").toggle();
                    });
                }
           }
        }
    };

    window.testVideo = window.testVideo || {};
    window.testVideo.index = window.testVideo.index || {};
    window.testVideo.index.MyVideo = window.testVideo.index.MyVideo || MyVideo;

    $(document).ready(function() {
        var myVideo = new window.testVideo.index.MyVideo();
        myVideo.init();
    });
}(jQuery, window)); 