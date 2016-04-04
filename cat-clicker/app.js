(function(){
	var model = {
		data : [{
			name : 'Cat 1', 
			count : 0, 
			src : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3M1RhqKMXKPgoIE6pksQrJ74NjU1_DURtqrdXedhhO0CKeLN'
		}, {
			name : 'Cat2', 
			count : 0,
			src : 'http://www.medhatspca.ca/sites/default/files/news_photos/2014-Apr-15/node-147/cute-little-cat.jpg'
		}], 

		getAllCats : function(){
			return this.data;
		}, 

		getCatAtIndex: function(index){
			return this.data[index];
		}, 

		setCurrentCat : function(cat){
			this.currentCat = cat;
		}, 

		getCurrentCat : function(){
			if(typeof this.currentCat === 'undefined'){
				this.currentCat = this.data[0];
			}
			return this.currentCat;
		}, 

		incrementCurrentCount : function(){
			var cat = this.getCurrentCat();
			cat.count++;
		}
	}; 

	var listview = {
		init: function(){
			this.catlist = $('#cats-list');
			console.log(this.catlist);
			this.render();	
		},

		render: function(){
			octopus.getCats().forEach(function(cat){
				var htmlStr = '';
				htmlStr = '<li>' + cat.name + '</li>';
				var listitem = $(htmlStr);
				listitem.on("click", (function(catCopy){
					var func = function(){
						octopus.setCurrentCat(catCopy);
						catview.render();
					};
					return func;
				})(cat));

				listview.catlist.append(listitem);
			});
		}
	};

	var catview = {
		init: function(){
			this.catName = $('#name');
			this.img = $('#img');
			this.count = $('#count');
			this.img.on("click", function(e){
				octopus.incrementCurrentCount();	
				catview.render();
			});
		},

		render: function(){
			var currentCat = octopus.getCurrentCat();
			this.catName.html(currentCat.name);		
			this.img.attr('src', currentCat.src);
			this.count.html(currentCat.count);
		
		}
	};

	var octopus = {
		getCats: function(){
			return model.getAllCats();
		}, 

		init: function(){
			listview.init();
			catview.init();
			catview.render();
		}, 

		incrementCurrentCount: function(){
			model.incrementCurrentCount();
		}, 

		getCurrentCat: function(){
			return model.getCurrentCat();
		}, 

		setCurrentCat: function(cat){
			model.setCurrentCat(cat);
		}
	};

	octopus.init();
})();
