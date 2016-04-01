(function(){
	var model = {
		data : [{
			name : 'Cat 1', 
			count : 0, 
			src : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3M1RhqKMXKPgoIE6pksQrJ74NjU1_DURtqrdXedhhO0CKeLN'
		}, {
			name : 'Cat2', 
			count : 0,
			src : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3M1RhqKMXKPgoIE6pksQrJ74NjU1_DURtqrdXedhhO0CKeLN'
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
			return this.currentCat;
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
				console.log(cat);
				var htmlStr = '';
				htmlStr = '<li>' + cat.name + '</li>';
				console.log(htmlStr);
				var listitem = listview.catlist.append(htmlStr);
				listitem.on("click", function(e){
					catview.render(cat);
				});
			});
		}
	};

	var catview = {
		init: function(){
			this.catName = $('#name');
			this.img = $('#img');
			this.count = $('#count');
		},
		render: function(){
			var currentCat = octopus.getCurrentCat();
			this.catName.html(currentCat.name);		
			this.img.attr('src', currentCat.src);
			this.count.html(currentCat.count);
			this.img.on("click", function(e){
				octopus.incrementCount(cat);	
			});
		}

	};

	var octopus = {
		getCats: function(){
			return model.getAllCats();
		}, 

		init: function(){
			listview.init();
			catview.init();
			catview.render(model.getCatAtIndex(0));
		}, 

		incrementCount: function(cat){
			cat.count = ++cat.count;
		}, 

		getCurrentCat: function(){
			return model.getCurrentCat();
		}

	};

	octopus.init();
})();
