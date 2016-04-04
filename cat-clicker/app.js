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
			this.catlist.empty();
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
			this.render();
		},

		render: function(){
			var currentCat = octopus.getCurrentCat();
			this.catName.html(currentCat.name);		
			this.img.attr('src', currentCat.src);
			this.count.html(currentCat.count);
		
		}
	};

	var adminview = {
		init: function(){
			this.display = false;
			this.editorForm = $('#cat-editor');
			this.adminBtn = $('#admin-btn');
			this.cancelBtn = $('#cancel-btn');
			
			this.editorForm.on('submit', function(e){
				e.preventDefault();
				var data = $(this).serializeArray();	
				octopus.updateCurrentCat(data[0].value, data[1].value, data[2].value);
				catview.render();
				listview.render();
				adminview.display = false;
				adminview.render();
			});
			
			this.adminBtn.on('click', function(){
				adminview.display = true;
				adminview.render();
			});

			this.cancelBtn.on('click', function(){
				adminview.display = false;
				adminview.render();
			});

			this.render();
		}, 

		render: function(){
			if(this.display){
				$('#admin-mode').show();
				var currentCat = octopus.getCurrentCat();
				$('[name="name"]').val(currentCat.name);
				$('[name="url"]').val(currentCat.src);
				$('[name="clicks"]').val(currentCat.count);
			} else {
				$('#admin-mode').hide();
			}
		}
	};

	var octopus = {
		getCats: function(){
			return model.getAllCats();
		}, 

		init: function(){
			listview.init();
			catview.init();
			adminview.init();
		}, 

		incrementCurrentCount: function(){
			model.incrementCurrentCount();
		}, 

		getCurrentCat: function(){
			return model.getCurrentCat();
		}, 

		setCurrentCat: function(cat){
			model.setCurrentCat(cat);
		}, 

		updateCurrentCat: function(name, url, count){
			var cat = model.getCurrentCat();
			cat.name = name;
			cat.src = url;
			cat.count = count;
		}
	};

	octopus.init();
})();
