//Reworked JavaScript for the Tweeter site.

var twitButton = document.getElementById("create-twit-button");
twitButton.addEventListener('click', unhide);
//twitButton.addEventListener('click', createTwit);


//This function will reveal the form to create a twit.
//It is used when a user clicks the button at the bottom right of the screen.
function unhide(){
  document.getElementById("modal-backdrop").classList.remove("hidden");
  document.getElementById("create-twit-modal").classList.remove("hidden");
}

//This next function will rehide hide the modal when the user either clicks cancel or the "x".
function rehide(){
  document.getElementById("twit-text-input").value = ""; //Clears out the text box
	document.getElementById("twit-attribution-input").value = "";

  //Adds the hidden class back onto the elements...
	document.getElementById("modal-backdrop").classList.add("hidden");
	document.getElementById("create-twit-modal").classList.add("hidden");
}

//Now we can use rehide() when the user clicks on cancel of the "x".
var cancel = document.getElementsByClassName("modal-cancel-button");
var close = document.getElementsByClassName("modal-close-button");
cancel[0].addEventListener('click', rehide);
close[0].addEventListener('click', rehide);

/*The next function will be responsible for manipulating the document object model (DOM)
when the user wants to add a twit.*/
function createTwit(){
  //console.log("We're going to create a twtit soon");


  //Very basic exception handling. We want to alert the user if they have not added
  //either twit text of the author of the twit.
  let flag = true;

  let twitInput = document.getElementById("twit-text-input").value.length;
  let authorInput = document.getElementById("twit-attribution-input").value.length;
  if(twitInput == 0)
  {
    //If there is no twit text or an author.
    if(authorInput == 0)
    {
      alert("Please add an author and twit text...");
    }

    //Else we're just missing twit text
    else{
      alert("Please add twit context...");
    }
    flag = false;
  }

  //The first if-statement requires that we're missing twit context.
  //This next statement only requires us to be missing the author.
  else if(authorInput == 0)
  {
    alert("Please add an author...");
    flag = false;
  }

  //Now if our flag has not been lowered, then we can start manipulating the DOM.
  if(flag == true)
  {
    /*Creates the twit container*/
  	let twitArticle = document.createElement('article');
  	twitArticle.classList.add('twit');
  	twitArticle.setAttribute('id', 'new-twit');

  	/*Creates the image in the twit*/
  	let twitIconContainer = document.createElement('div');
  	twitIconContainer.classList.add('twit-icon');
  	twitArticle.appendChild(twitIconContainer);

  	let img = document.createElement('i');
  	img.classList.add('fas', 'fa-bullhorn');
  	twitIconContainer.appendChild(img);

  	/*Creates the container for the text*/
  	let textContainer = document.createElement('div');
  	textContainer.classList.add('twit-content');
  	twitArticle.appendChild(textContainer);

    /*This code works to create the twit content. Works for both author and twits.*/
    let p1 = document.createElement('p');
    p1.classList.add('twit-text');
    let userInput = document.getElementById('twit-text-input').value;
    let innerp1 = document.createTextNode(userInput);
    p1.appendChild(innerp1);
    textContainer.appendChild(p1);

    let p2 = document.createElement('p');
    p2.classList.add('twit-author');
    let a = document.createElement('a');
    let name = document.getElementById('twit-attribution-input').value;
    authorName = document.createTextNode(name);
    a.appendChild(authorName);
    p2.appendChild(a);
    textContainer.appendChild(p2);

    //Now append to the page...
    let container = document.getElementsByClassName('twit-container');
    container[0].appendChild(twitArticle);
    rehide(); //Once the twit is created, we can hide the modal.
  }
}

var accept = document.getElementsByClassName("modal-accept-button");
accept[0].addEventListener('click', createTwit);

//Going to implement a search function to filter twits. Eventually, I'll replace this
//with a live search function.

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
		//console.log("The content is: ", content);
		var authorstuff = document.getElementsByClassName('twit-author')[i].innerText;
		authorstuff = authorstuff.toLowerCase();
		//console.log("The author is: ", authorstuff);
		//twits[i].parentNode.removeChild(twits[i]); //This removes stuff

		if(content.indexOf(searchString) < 0 && authorstuff.indexOf(searchString) < 0 )
		{
			twits[i].parentNode.removeChild(twits[i])
		}
	}
}

/*//This last bit of code will enable a live search feature on the site.
function liveSearch(){

}*/
