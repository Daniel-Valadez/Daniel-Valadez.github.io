/*
 * Add your JavaScript to this file to complete the assignment.
 */
 
 var twitButton = document.getElementById("create-twit-button");
 twitButton.addEventListener('click', unhide);
 twitButton.addEventListener('click', createTwit); 

 /*Have to unhide the modal and its backdrop first*/
function unhide(){ 

	document.getElementById("modal-backdrop").classList.remove("hidden"); 
	document.getElementById("create-twit-modal").classList.remove("hidden");  
}


/*Function for creating Twits*/
/*NOTE TO SELF: This twit is going to need to be stylized like the others and be added to the DOM*/
function createTwit(){
	var createButton = document.getElementsByClassName("modal-accept-button");

	/*Creates the twit container*/
	var twitArticle = document.createElement('article'); 
	twitArticle.classList.add('twit'); 
	twitArticle.setAttribute('id', 'new-twit'); 

	/*Creates the image in the twit*/
	var twitIconContainer = document.createElement('div'); 
	twitIconContainer.classList.add('twit-icon');
	twitArticle.appendChild(twitIconContainer); 

	var img = document.createElement('i'); 
	img.classList.add('fas', 'fa-bullhorn');
	twitIconContainer.appendChild(img);

	/*Creates the container for the text*/
	var textContainer = document.createElement('div'); 
	textContainer.classList.add('twit-content'); 
	twitArticle.appendChild(textContainer);


	var flag = false; 
	createButton[0].addEventListener('click', function(flag){

		/*Exception handling comes first*/
		var stuff = document.getElementById('twit-text-input').value.length;
		var moreStuff = document.getElementById('twit-attribution-input').value.length; 

		if(stuff == 0)
		{
			if(moreStuff == 0)
				{
					alert("Please add twit content and an author...");
				}
			else
			{
				alert("Please add twit content.");
			}
		}
		if(moreStuff == 0 && stuff != 0)
		{
			alert("Please add an author!")
		}

		if(stuff != 0 && moreStuff != 0)
		{
			flag = true; 
		}

		if(flag == true)
		{
			console.log("The flag is ", flag)



			/*This code works to create the twit content. Works for both author and twits.*/
			var p1 = document.createElement('p'); 
			p1.classList.add('twit-text'); 
			var userInput = document.getElementById('twit-text-input').value; 
			var innerp1 = document.createTextNode(userInput); 
			p1.appendChild(innerp1);
			textContainer.appendChild(p1); 

			var p2 = document.createElement('p'); 
			p2.classList.add('twit-author'); 
			var a = document.createElement('a');
			var name = document.getElementById('twit-attribution-input').value; 
			authorName = document.createTextNode(name); 
			a.appendChild(authorName); 
			p2.appendChild(a); 
			textContainer.appendChild(p2); 


			var twitContainer = document.getElementsByClassName('twit-container'); 
			twitContainer[0].appendChild(twitArticle);
			rehide(); //Figure I can hide the modal once the user submits their twit.   
		}

	});
} 

/*Now, if the user clicks the cancel button or the 'x', we have to rehide the modal.*/
var cancel = document.getElementsByClassName("modal-cancel-button");
var close = document.getElementsByClassName("modal-close-button"); 
cancel[0].addEventListener('click', rehide); 
close[0].addEventListener('click', rehide); 

function rehide(){
	document.getElementById("twit-text-input").value = ""; /*Clears out the text box*/
	document.getElementById("twit-attribution-input").value = ""; 
	document.getElementById("modal-backdrop").classList.add("hidden"); 
	document.getElementById("create-twit-modal").classList.add("hidden");
}


//Step #5 Search queries... 
//I need to add an event listener to the search button. 
var searchButton = document.getElementById('navbar-search-button');
searchButton.addEventListener('click', searching); 

function searching(){
	console.log("Search Button was pressed.")
	var searchString = document.getElementById('navbar-search-input').value; /*Gets the value the user typed into search bar.*/
	searchString = searchString.toLowerCase();

	//Gotta use a string compare to remove things from the DOM. 
	//For-loop for removing from the DOM
	var twits = document.getElementsByClassName('twit');
	for(var i = twits.length - 1; i >=0; --i)
	{
		var content = document.getElementsByClassName('twit-text')[i].innerHTML;
		content = content.toLowerCase();  
		console.log("The content is: ", content); 
		var authorstuff = document.getElementsByClassName('twit-author')[i].innerText;
		authorstuff = authorstuff.toLowerCase(); 
		console.log("The author is: ", authorstuff); 
		//twits[i].parentNode.removeChild(twits[i]); //This removes stuff

		if(content.indexOf(searchString) < 0 && authorstuff.indexOf(searchString) < 0 )
		{
			twits[i].parentNode.removeChild(twits[i])
		}


		
	}

} 

