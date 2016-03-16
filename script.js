/*Created by Dmitriy Pavlovskyi*/

var ToDoList = function(root) {
	var root = document.querySelector(root),
		input = root.querySelector('.input'),
		output = root.querySelector('.output'),
		activeFilter = "all",
		todoData = [{
			title: "my first task",
			completed: false,
			id:0
		}];

 function createElem () {
 	output.innerHTML = "";

 	var filteredArray = toFilter() ;

 	filteredArray.forEach(function (item) {
 		var contentCheck = document.createElement('input'),
 			contentTitle = document.createElement('span'),
 			contentButton = document.createElement('button'),
 			content = document.createElement('li');
 			
 			contentTitle.innerHTML = item.title;
 			contentCheck.type = 'checkBox';

 			if (item.completed) {
 				contentCheck.checked = true;
 				contentTitle.classList.add('completed');
 			}

 			content.appendChild(contentCheck);
 			content.appendChild(contentTitle);
 			content.appendChild(contentButton);
			
 			output.appendChild(content);
 			
 			content.id = item.id;
 			
 			contentButton.addEventListener('click', function () {
 				deleteElement(this.parentNode.id);
 				createElem();
 				createFooter();

 			});

 			contentCheck.addEventListener('click', function () {
 				checkedToggle(this.parentNode.id);
 				createElem();
 				createFooter();
 			});

 	});
};

	function toFilter () {

		var filters = {
			'all': function () {
				return todoData;
			},
			'completed': function () {
				return todoData.filter(function (item) {
					return item.completed;
				})
			},
			'active': function () {
				return todoData.filter(function (item) {
					return !item.completed;
				})
			}
		}

		return filters[activeFilter]();
	};



	function createFooter () {
		if (todoData.length > 0) {
			var footerWrapper = document.createElement('div'),
				footerCounter = document.createElement('span'),
				footerAll = document.createElement('li'),
				footerActive = document.createElement('li'),
				footerCompleted = document.createElement('li'),
				footerClear = document.createElement('span');

				footerAll.id = "all";
				footerCompleted.id = "completed";
				footerActive.id = "active";

				footerClear.classList.add('clearCompleted');
				footerWrapper.classList.add('footer');
		
				if (activeFilter === "all") {
					footerAll.classList.add('liActive');
					footerActive.classList.remove('liActive');
					footerCompleted.classList.remove('liActive');
				};
				if(activeFilter === "active") {
					footerAll.classList.remove('liActive');
					footerActive.classList.add('liActive');
					footerCompleted.classList.remove('liActive');
				};
				if(activeFilter === "completed") {	
					footerAll.classList.remove('liActive');
					footerActive.classList.remove('liActive');
					footerCompleted.classList.add('liActive');
				};

				footerCounter.innerHTML = todoData.filter(function(item) {
					return item.completed === false;
				}).length  + ' item left';

				footerAll.appendChild(document.createTextNode('All'));
				footerActive.appendChild(document.createTextNode('Active'));
				footerCompleted.appendChild(document.createTextNode('Completed'));
				footerClear.appendChild(document.createTextNode('Clear completed'));

				footerWrapper.appendChild(footerCounter);
				footerWrapper.appendChild(footerAll);
				footerWrapper.appendChild(footerActive);
				footerWrapper.appendChild(footerCompleted);

				if(todoData.filter(function(item) {
					return item.completed;
				}).length > 0) {
						footerWrapper.appendChild(footerClear);
				};

				output.appendChild(footerWrapper);
					
				footerClear.addEventListener('click', function() {
					clearCompleted(this.parentNode.completed);
					
					createElem();
					createFooter();
				});
					
				footerActive.addEventListener('click', function () {
					activeFilter = this.id;
					createElem();
					createFooter();
				});

				footerCompleted.addEventListener('click', function () {
					activeFilter = this.id;
					createElem();
					createFooter();
				});

				footerAll.addEventListener('click', function () {
					activeFilter = this.id;
					createElem();
					createFooter();
				});
		};
	};

	function clearCompleted () {
		todoData.forEach(function (item,i,array) {
			if (item.completed === true) {
				delete todoData[i];
			};
		});

		todoData = todoData.filter(function (item) {
			return item !== undefined;
		});
	};

	function eventHandler () {
		input.addEventListener ('keypress', function (e) {
			if (e.keyCode === 13 && input.value.trim()) {
				
				addData(input.value);
				
				createElem();
				createFooter();

				input.value = "";
			};
		});

	};

	function idGenerate () {
		return Math.floor(Math.random()*10000);
	}

	function addData (text) {
		var newElem = {
			title: text, 
			completed: false,
			id: idGenerate()
	};
	todoData.push(newElem);
};

	function deleteElement (id) {
		todoData.forEach(function (item, i, arr) {
			if (item.id == id) {
				todoData.splice(i, 1);
			};
		});
};

	function checkedToggle (id) {
		todoData.forEach( function (item, i, arr) {
			if (item.id == id) {
				item.completed = !item.completed;
			};
		});
	};

eventHandler();
createElem();
createFooter();
};