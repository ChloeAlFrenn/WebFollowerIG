//collapsible
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

 //stores all the element in the following file into the array followingList
const followingInput = document.getElementById('followingInput');
const followingList = [];
followingInput.addEventListener('change', (event) => {
    followingList.length = 0; //remove all elems from followinglist
    const file = event.target.files[0];

    if(file.name == 'following.json'){
    
        const reader = new FileReader();
        reader.onload = (e) => {
    
            const data = JSON.parse(e.target.result);
            for (const following of data["relationships_following"]) {
                 followingList.push(following["string_list_data"][0]["value"]);
            }
            console.log(followingList);
        };

        reader.readAsText(file);

    } else {
        alert("You need to sumbit the file named following.json");
        console.log('this is not the good following file');
        }

});

 //stores all the element in the follower file into the array followerList
const followerInput = document.getElementById('followerInput');
const followerList = [];
followerInput.addEventListener('change', (event) => {
    followerList.length = 0; //remove all elements from followerlist
    const file = event.target.files[0];

    if(file.name == 'followers.json'){
        
        const reader = new FileReader();
        reader.onload = (e) => {
        
            const data = JSON.parse(e.target.result);
            for (const follower of data["relationships_followers"]) {
                followerList.push(follower["string_list_data"][0]["value"]);
            }
            console.log(followerList);
        };

        reader.readAsText(file);
        
    } else {
        alert("You need to sumbit the file named followers.json");
        console.log('this is not the good follower file');
    }

});

//button
const button = document.querySelector('#myButton');
const text = document.getElementById("hiddenText");

button.addEventListener('click', ()=> {
    const notFollowingYBArray = [];
   

    
    if(followingList.length > 0 && followerList.length > 0) { //both arrays are not empty
        if(text.classList.contains("hidden")){
            text.classList.toggle("hidden");
        }
        notFollowingYBArray.length = 0; //remove all elements from notFollowingYBArray
        followingList.forEach(value => {
            if(!followerList.includes(value)){
    
                notFollowingYBArray.push(value);
            }
        });
        addToDiv(notFollowingYBArray);
    }

    else {
        if(!followerList.length > 0){
            alert("the follower file is missing");
            console.log('the follower file is missing');
        }
        if(!followingList.length > 0){
            alert("the following file is missing");
            console.log('the following file is missing');
        }
    }   

});




function addToDiv(elements){

    var div = document.getElementById("textUser");
    div.innerHTML = "";
    // Use a for loop to iterate through the array
    for (var i = 0; i < elements.length; i++) {
        // Create a new element to add to the div
        var newElement = document.createElement("p");
        // Set the innerHTML of the new element to the current array element
        newElement.innerHTML = elements[i];
        // Append the new element to the div
        div.appendChild(newElement);
    }
}