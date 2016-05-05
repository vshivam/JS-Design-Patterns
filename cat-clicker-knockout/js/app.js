var Data = [{
	name : "Taffy", 
	imgSrc : "https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg", 
	nicks : ["taffy 1", "taffy 2"]
}, 
{
	name : "Puffy", 
	imgSrc : "http://pic.1fotonin.com/data/wallpapers/63/WDF_1084734.jpg",
	nicks : ["puffy 1", "puffy 2"]
}];

var ClickCounterViewModel = function() {
	var self = this;

	self.catList = ko.observableArray([]);
	Data.forEach(function(data){
		self.catList.push(new Cat(data));
	});

	self.currentCat = ko.observable(this.catList()[0]);

	self.incrementCounter = function() {
		return this.numberOfClicks(this.numberOfClicks() + 1);
	};

	self.setCurrentCat = function() {
		self.currentCat(this);
	};
}

var Cat = function(data){
	this.name = ko.observable(data.name);
	this.imgSrc = ko.observable(data.imgSrc);
	this.nicks = ko.observableArray(data.nicks);
	this.numberOfClicks = ko.observable(0);

	this.level = ko.computed(function() {
		if(this.numberOfClicks() < 10){
			return "new born";
		}
		else if(this.numberOfClicks() > 10 && this.numberOfClicks() < 20) {
			return "infant";
		} else {
			return "teen";
		}
	}, this);
}

var viewModel = new ClickCounterViewModel();
ko.applyBindings(viewModel);