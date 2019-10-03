;(function(){
	function wrapper(parentElem,size){
		this.width=0;
		this.size=size;
		this.parentElem=parentElem;
		this.element=document.createElement('div');



	this.init=function(){
			
			this.element.classList.add('wrapper');
			this.element.classList.add('clearfix');
			var images=new image(this.element,size=5,height=400).init();
			this.parentElem.appendChild(this.element);

			this.element.style.backgroundColor="red";
			this.element.setAttribute("id",`wrapping${this.size}`);
			
/*			this.element.style.height="400px";*/
			this.element.style.position="relative";
			this.element.style.border="1px solid black";
			return this.element;
/*			this.makeButtonLeft();
			this.makeButtonRight();*/
			/*this.getTotalSize();*/
			
			

		}
		this.init();
		this.getTotalSize=function(){

			var totalimagesize=this.element.getElementsByTagName(`img`);
			
			console.log(totalimagesize);
			for(var i=0;i<totalimagesize.length;i++){
				this.width=this.width+totalimagesize[i].clientWidth;
			}
			var imageWidth=this.width/totalimagesize.length;
			console.log(this.width);
			return(this.width);
		}
		
	


	}

	function image(parentElem,size,height){
		this.parentElem=parentElem;
		this.size=size;
		this.height=height;
		this.init=function(){
			for(var i =0;i<size;i++){
			this.element=document.createElement('img');
			this.element.setAttribute('src',`./images/test${i}.jpg`);
			/*console.log(this.element);*/
			/*this.element.classList.add('image-define');*/
/*			this.element.style.height=this.height+'px';*/
			this.parentElem.appendChild(this.element);
		}
		}

	}

function individualWrapper(parentElem,size){
		this.slide=0;
		this.index=0;
		this.width=0;
		this.imagesize=1000;
		this.size=size;

	this.parentElem=parentElem;
	var that=this;
	this.element=document.createElement('div');
	this.element.classList.add('container');
	if(size%2==0){
		this.element.style.float="left";
	}
	else{
		this.element.style.float="right";
	}
	parentElem.appendChild(this.element,size=4);

	this.init=function(){
		var test = new wrapper(this.element,this.size);
		var x = test.getTotalSize();
		console.log(x);
		this.width=x;
		this.makeButtonLeft();
		this.makeButtonRight();
		this.makeIndicator();
		this.makeIndicatorClick();
		this.automaticSlide();
		/*var x =test.getTotalSize();*/
		/*wrapper.getTotalSize();*/
	}
	this.makeButtonLeft=function(){
			var leftButton=document.createElement("BUTTON");
				leftButton.innerHTML="left";
				this.element.appendChild(leftButton);
				leftButton.setAttribute("id","xyz");
				leftButton.style.position="absolute";
				leftButton.style.top="50%";
				leftButton.style.left="0%";

			leftButton.onclick=function(){
			var childElement = that.element.childNodes;
			console.log(that.slide);
			that.slide-=that.imagesize;
			that.slide=that.slide%that.width;

			/*that.slide=that.slide%width;*/

			childElement[0].style.marginLeft=that.slide+'px';
			that.changeActive();
			}

		}

	this.makeButtonRight=function(){
			var RightButton=document.createElement("BUTTON");
				RightButton.innerHTML="Right";
				this.element.appendChild(RightButton);
				RightButton.setAttribute("id","abc");
				RightButton.style.position="absolute";
				RightButton.style.top="50%";
				RightButton.style.right="0%";

		RightButton.onclick=function(){
			var childElement = that.element.childNodes;
			that.slide=that.width-that.slide;
			that.slide-=that.imagesize;
			that.slide=-that.slide;
			that.slide=that.slide%that.width;

			/*that.slide=that.slide%width;*/


			childElement[0].style.marginLeft=that.slide+'px';
			that.changeActive();
			}
		}
		this.makeIndicator=function(){
			var indicator = document.createElement("div");
			var totalimagesize=this.element.getElementsByTagName(`img`);
				this.element.appendChild(indicator);
				indicator.setAttribute("id","indicator");
				indicator.style.position="absolute";
				indicator.style.bottom="0%";
				indicator.style.left="50%";
				for(var i=0;i<totalimagesize.length;i++){
					console.log("test");
					var test =document.createElement("Button");
					test.innerHTML="test";
					if(i==0){
						test.style.backgroundColor="green";
					}else{
					test.style.backgroundColor="blue";
				}
					test.setAttribute("id","test"+i)
					indicator.appendChild(test);

			}

		}
		this.changeActive=function(){
				var activeButtons=this.element.querySelectorAll("#indicator>button");
					activeButtons[that.index].style.backgroundColor="blue";
					that.index=that.slide/that.imagesize;
					that.index*=-1;
					activeButtons[that.index].style.backgroundColor="green";
		}
		this.makeIndicatorClick=function(){
			var childElement = that.element.childNodes;
			var activeButtons=that.element.querySelectorAll("#indicator>button");
			for( var i=0;i<activeButtons.length;i++){
				activeButtons[i].onclick=function(){checkcolor(this.id)}
				console.log(activeButtons[i])
			}
			function checkcolor(ev){
				var index=ev[ev.length-1];
				index=parseInt(index);
				var slide=that.imagesize*index;
				console.log("imagesize",that.imagesize);
				slide*=-1;
				that.transition(slide);
				/*childElement[0].style.marginLeft=slide+"px";*/
				that.slide=slide;
				that.changeActive();


		
	
				}

			}

			this.automaticSlide=function(){
				var childElement = that.element.childNodes;
				setInterval(function(){
					var change=that.slide-1000;
					change=change%that.width;
					that.transition(change)

				},5000);
			}

			this.transition=function(newSlide){

				var childElement = that.element.childNodes;
				var activeButtons=that.element.querySelectorAll("#indicator>button");
				var slideperiod =that.slide;
				for(var i=0;i<activeButtons.length;i++){
						activeButtons[i].disabled=true;
					}
				if(slideperiod>newSlide){

					var id = setInterval(function(){
						slideperiod-=50;
						if(slideperiod>=newSlide){
						childElement[0].style.marginLeft=slideperiod+"px";
						that.slide=slideperiod;

					}
					else{
						for(var i=0;i<activeButtons.length;i++){
						activeButtons[i].disabled=false;
					}
						
						clearInterval(id);
						that.changeActive();
					}

					},10);

				}
				else{

						var id = setInterval(function(){
							slideperiod+=50;
						if(slideperiod<=newSlide){
						childElement[0].style.marginLeft=slideperiod+"px";
						that.slide=slideperiod;
					}
					else{
						for(var i=0;i<activeButtons.length;i++){
						activeButtons[i].disabled=false;
					}
						clearInterval(id);
						that.changeActive();
					}

					},10);
					
				}
			}




}


	function container(size){
		this.size=size;
		this.parentElem=document.getElementById('app');
		/*var wrapp = new wrapper(this.parentElem).init();*/
		this.init=function(){
			
			this.makeWrapper();
		}
		this.makeWrapper=function(){
			for(var i=0;i<size;i++){

				var wrapp=new individualWrapper(this.parentElem,i);
				wrapp.init();

			} 
		}


	}

	new container(size=4).init();
})()