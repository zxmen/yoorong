
/*插件文件名为：photoMove.js
插件使用方式为  $("必须是一个Id").photoMove(参数)；
插件参数使用方法：
1：第一个参数放入一个数组；里面放入图片地址
2：第二个参数放入json，里面包含宽度、高度、小图标背景颜色，顺序要正确
3: 第三个参数放入图片轮播间隔*/

$.fn.extend({
	photoMove:function (arr,json,time){	
		var _that=this;
		var this_id=this.attr("id");

		var createElement=function (){
			var str= "";
			var str2= "";
			var css_style='<style>body,ul,li{margin:0;padding:0;list-style: none;} '+"#"+_that.attr("id")+'{position: relative;width: '+json["width"]+';height: '+json["height"]+';overflow: hidden;}#'+this_id+'_photo_container{position: relative;width:100%;height:100%;} #'+this_id+'_photo_container a{top:0;left: '+json["width"]+';position: absolute;width:100%;height: 100%;} #'+this_id+'_photo_container #'+this_id+'_photo_first{left: 0;} #'+this_id+'_photo_container a img{width:100%;height: 100%;} #'+this_id+'_photo_ul{position: absolute;width: 200px;bottom: 16px;left:50%;margin-left:-100px;text-align: center;} #'+this_id+'_photo_ul li{height: 14px;width: 14px;margin: 0 4px;border-radius: 50%;behavior: url(../static/css/ie-css3.htc);cursor: pointer;opacity: 0.9;filter:alpha(opacity=90);display: inline-block;*zoom: 1;*display: inline;} #'+this_id+'_photo_prev,#'+this_id+'_photo_next{position: absolute;width: 57px;height: 62px;cursor: pointer;display: none;opacity: 0.5} #'+this_id+'_photo_prev{left: 20%;top:50%;margin-top:-31px;background:url("images/prev.png")} #'+this_id+'_photo_next{right: 20%;top:50%;margin-top:-31px;background: url("images/next.png")}</style>';
			for(var i=0;i<arr.length;i++){
				if(i==0){
					str+="<a id="+this_id+"_photo_first><img src=\""+arr[i]+"\"/></a>";
				}else{
					str+="<a><img src=\""+arr[i]+"\"/></a>";
				}
				str2+="<li></li>";	
			}
			$("head").append(css_style);
			_that.append("<div id="+this_id+"_photo_container>"+str+"</div><ul id="+this_id+"_photo_ul>"+str2+"</ul>")
			// _that.append("<div id="+this_id+"_photo_container>"+str+"</div><ul id="+this_id+"_photo_ul>"+str2+"</ul><span id="+this_id+"_photo_prev></span><span id="+this_id+"_photo_next></span>")
		}

		createElement()
		
		var $photobox=this;
		var $width=this.outerWidth();
		var $a=$("#"+this_id+"_photo_container").children();
		var $li=$("#"+this_id+"_photo_ul").children();
		var $span=$photobox.find("span");
		var _length=$a.size();
		var $prev=$("#"+this_id+"_photo_prev");
		var $next=$("#"+this_id+"_photo_next");
	
		var photoMove={
			current:0,
			next:0,
			timer:0,
			//_this:this,//这样写并不行。underfind
			//$a:$("#this_id_photo_container").children()，这样写并不行。underfind
			init:function (){
				this.autoPlay();
				this.bindEvent();
				this.circleColor();
			},
			autoPlay:function move(){//对象的方法函数是可以命名的；且可以直接调用，这样避免定时器里this失效的这句话是错的，对象方法的函数是不能命名的，可以命名，但是不能调用	
				var _this=this;		
				this.timer=setInterval(function (){
					_this.next++;
					_this.doMove();
					_this.circleColor();
					_this.current=_this.next;
				},time);
			},
			bindEvent:function (){
				var _this = this;
				$photobox.hover( function (){
					window.clearInterval(_this.timer);
					$span.css( "display" , "block" );
				},function (){
					$span.css( "display" , "none" );
					_this.autoPlay();
				});
				// $prev.click(function (){
				// 	window.clearInterval(_this.timer);
				// 	_this.next--;
				// 	_this.photoCut();
				// });
				// $next.click(function (){
				// 	window.clearInterval(_this.timer);
				// 	_this.next++;
				// 	_this.photoCut();
				// });
				$li.click(function (){
					window.clearInterval(_this.timer);
					_this.next=$(this).index();
					_this.photoCut();
				})
			},
			photoCut:function (){
				this.circleColor();
				this.doMove();
				this.current=this.next;	
			},
			circleColor:function (){
				$li.eq(this.next%_length).siblings().css("background","#b7b7b7");
				$li.eq(this.next%_length).css("background",json["color"]);
			},
			photoChange:function (flag){

				$a.eq(this.current%_length).stop(true,true).animate({left:flag*$width});
				$a.eq(this.next%_length).css("left",-flag*$width).stop(true,true).animate({left:0});
			},
			doMove:function (){
				if(this.next>this.current){
					this.photoChange(-1);
				};
				if(this.next<this.current){
					this.photoChange(1);
				}
			}
		}
		photoMove.init()
	},
	photoMove2:function (arr,json,time){	
		var _that=this;
		var this_id=this.attr("id");

		var createElement=function (){
			var str= "";
			var str2= "";
			var width=200*arr.length;
			var css_style='<style>body,ul,li{margin:0;padding:0;list-style: none;} '+"#"+_that.attr("id")+'{position: relative;overflow: hidden;}#'+this_id+'_photo_container{position: relative;width: '+width+'px;height:100%;} #'+this_id+'_photo_container a{float: left;width: '+json["width"]+';height: '+json["height"]+';padding:5px;} #'+this_id+'_photo_container #'+this_id+'_photo_first{left: 0;} #'+this_id+'_photo_container a img{width:100%;height: 100%;}</style>';
			for(var i=0;i<arr.length;i++){
				if(i==0){
					str+="<a id="+this_id+"_photo_first><img src=\""+arr[i]+"\"/></a>";
				}else{
					str+="<a><img src=\""+arr[i]+"\"/></a>";
				}	
			}
			
			$("head").append(css_style)
			_that.append("<div id="+this_id+"_photo_container>"+str+"</div><ul id="+this_id+"_photo_ul>"+str2+"</ul><span id="+this_id+"_photo_prev>&lt;</span><span id="+this_id+"_photo_next>&gt;</span")
		}

		createElement();
		$("#"+this_id+"_photo_container").html($("#"+this_id+"_photo_container").html()+$("#"+this_id+"_photo_container").html());
		var $photobox=this;
		var $container=$("#"+this_id+"_photo_container");

		// var $span=$photobox.find("span");
		// var $prev=$("#"+this_id+"_photo_prev");
		// var $next=$("#"+this_id+"_photo_next");
		var target=-$container.outerWidth(true)/2;
		var speed=2;
		var photoMove={
			//_this:this,//这样写并不行。underfind
			//$a:$("#this_id_photo_container").children()，这样写并不行。underfind
			init:function (){
				this.autoPlay();
				this.bindEvent();
			},
			autoPlay:function move(){//对象的方法函数是可以命名的；且可以直接调用，这样避免定时器里this失效的这句话是错的，对象方法的函数是不能命名的，可以命名，但是不能调用	
					
				this.timer=setInterval(function (){
					var $left=$container.position().left;
					$left-=speed;
					if ($left<=target) {

						$container.css("left","0");
						$left=0;

					}else{
						$container.css('left',$left+'px');
					}
				},time);
			},
			bindEvent:function (){
				var _this = this;
				$photobox.hover( function (){
					window.clearInterval(_this.timer);
					// $span.css( "display" , "block" );
				},function (){
					// $span.css( "display" , "none" );
					_this.autoPlay();
				});
				// $prev.click(function (){
				// 	window.clearInterval(_this.timer);
				// 	_this.next--;
				// 	_this.photoCut();
				// });
				// $next.click(function (){
				// 	window.clearInterval(_this.timer);
				// 	_this.next++;
				// 	_this.photoCut();
				// });
				// $li.click(function (){
				// 	window.clearInterval(_this.timer);
				// 	_this.next=$(this).index();
				// 	_this.photoCut();
				// })
			},
			doMove:function (){

			}
		}
	photoMove.init()
	},
	photoMove3:function (length,time){	
		console.log(this)
		var _that=this;
		var this_id=this.attr("id");
		var css_style='<style>#'+this_id+'_container{position: relative;}</style>';
		$("head").append(css_style)
		$("#"+this_id+"_container").html($("#"+this_id+"_container").html()+$("#"+this_id+"_container").html());
		var $photobox=this;
		var $container=$("#"+this_id+"_container");
		var target=-$container.outerHeight(true)/2;
		console.log(target)
		var speed=2;
		var photoMove={
			init:function (){
				this.autoPlay();
				this.bindEvent();
			},
			autoPlay:function move(){//对象的方法函数是可以命名的；且可以直接调用，这样避免定时器里this失效的这句话是错的，对象方法的函数是不能命名的，可以命名，但是不能调用	
					
				this.timer=setInterval(function (){
					var $top=$container.position().top;
					$top-=speed;
					if ($top<=target) {

						$container.css("top","0");
						$top=0;

					}else{
						$container.css('top',$top+'px');
					}
				},time);
			},
			bindEvent:function (){
				var _this = this;
				$photobox.hover( function (){
					window.clearInterval(_this.timer);
					// $span.css( "display" , "block" );
				},function (){
					// $span.css( "display" , "none" );
					_this.autoPlay();
				});
				// $prev.click(function (){
				// 	window.clearInterval(_this.timer);
				// 	_this.next--;
				// 	_this.photoCut();
				// });
				// $next.click(function (){
				// 	window.clearInterval(_this.timer);
				// 	_this.next++;
				// 	_this.photoCut();
				// });
				// $li.click(function (){
				// 	window.clearInterval(_this.timer);
				// 	_this.next=$(this).index();
				// 	_this.photoCut();
				// })
			},
			doMove:function (){

			}
		}
	photoMove.init()
	}
})