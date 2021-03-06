// Getting data and record everything to an array
 
var arrOfdataProfiles = null;
var main = document.getElementsByTagName("main")[0];
var selectSort = document.getElementsByName("slct")[0];
var startSorting = document.getElementsByClassName("start-sorted-tags")[0];
var headerTags = document.getElementsByClassName("tag");
var options = selectSort.getElementsByTagName("option")
var removeCard = document.getElementsByClassName("remove-card-btn");
var tagsInput = document.getElementsByClassName("tags-input")[0];
var wrapperTags = document.getElementsByClassName("tags-wrapper")[0];

if(localStorage.getItem('tags')) {
    tagsInput.innerHTML = "";
    var getItems = localStorage.getItem('tags').split(",");
    
    for(let i = 0; i < getItems.length; i++) {
        tagsInput.innerHTML += `<span class="tag">${getItems[i]}<span class="close"></span></span>`;
    }
}

if(!localStorage.getItem('typeSorting')) {
    localStorage.setItem('typeSorting', "Recently Updated");
}

fetch("https://api.myjson.com/bins/152f9j")
    .then((res) => res.json())
    .then((info) => {

        let tags = [];
        if(headerTags.length > 0) {
            for(let iTag = 0; iTag < headerTags.length; iTag++) {
                tags.push(headerTags[iTag].innerText);
            }
        }

        wrapperTags.addEventListener("click", () => {
            console.log(headerTags);
            let localMassive = [];
            if(headerTags.length > 0) {
                for(let iTag = 0; iTag < headerTags.length; iTag++) {
                    localMassive.push(headerTags[iTag].innerText);
                }
            }
            localStorage.setItem('tags', localMassive)
        })

        console.log(localStorage.getItem('typeSorting'));

        let mainData = Object.assign([], info["data"]);

        function compareDateUpDown(A, B) {

            var date1 = new Date(A.createdAt);
            var date2 = new Date(B.createdAt);

            return date1 - date2;
        }  

        function compareDateDownUp(A, B) {

            var date1 = new Date(A.createdAt);
            var date2 = new Date(B.createdAt);

            return date2 - date1;
        }
        let numberOfElement = 10;

        if(localStorage.getItem('typeSorting') == "Recently Updated") {
            mainData.sort(compareDateUpDown);
            showtoDisplay(mainData, numberOfElement);
        }

        if(localStorage.getItem('typeSorting') == "Least Recently Updated") {
            mainData.sort(compareDateDownUp);
            showtoDisplay(mainData, numberOfElement);
        }

        if(localStorage.getItem('typeSorting') == "Sort by tags") {
            sortedByTagsFunc();
        }


        function compareTags(A, B) {
            return B.coincidence - A.coincidence;
        }
        
        function showtoDisplay(arrayForShow, numberOfPosts) {
            let outPut = "";//`<div class="wrapper-profile-cards">`;
            console.log(arrayForShow.length);
            for(let i = 0; i < arrayForShow.length; i++) {
                        if(numberOfElement==0) {
                            numberOfElement = 10;
                        }
                        if(i < numberOfElement) {

                            outPut += `<div class="wrapper-profile-card">
        
                            <h4 class="title-profile"><i class="fa fa-id-card-o" aria-hidden="true"></i> ${arrayForShow[i].title}</h4>
            
                            <img class="wrapper-img" src=${arrayForShow[i].image} alt="front-img">
                                
                            <div class="wrapper-description-tags-date">
            
                                <h5 class="description-title-profile" >Description: <i class="fa fa-file-text-o" aria-hidden="true"></i></h5>
            
                                <p class="description-text-profile" >${arrayForShow[i].description}</p>
                                <p class="date-profile"><i class="fa fa-calendar" aria-hidden="true"></i> <span>`;
                                
                                let date = new Date(arrayForShow[i].createdAt);
            
                                var mm = date.getMonth(); 
                                var dd = date.getDate();
                                var hh = date.getHours();
                                var min = date.getMinutes();
                                var sec = date.getSeconds();
            
                                var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']; 
            
                                outPut += `${[  (hh>9 ? '' : '0') + hh + 'h', 
                                                (min>9 ? '' : '0') + min + 'm', 
                                                (sec>9 ? '' : '0') + sec + 's',
                                                (dd>9 ? '' : '0') + dd,
                                                mS[+((mm>9 ? '' : '0') + mm)],
                                                date.getFullYear()
                                            ].join(', ')} </span></p>
                                                    
                                <ul class="tags-profile">`;
            
                                for(let j = 0; j < arrayForShow[i].tags.length; j++) {
                                    outPut += `<li class="tag-profile">${arrayForShow[i].tags[j]}</li>`
                                }
                                    
                                outPut += `</ul><div class="remove-card-btn"><i class="fa fa-trash-o"></i></div>
            
                            </div>
            
                        </div>`;
                        }                        

            }
            window.onscroll = function() {
                var scrolled = window.pageYOffset || document.documentElement.scrollTop;

                console.log(scrolled);
                console.log(document.body.scrollHeight);
                console.log(numberOfElement);

                if(!document.getElementById("input-seatch-titles").value) {
                    if(document.body.scrollHeight - scrolled < 800 && document.body.scrollWidth >= 1024) {
                        numberOfElement += 10;
                        showtoDisplay(mainData, numberOfElement);
                    } 
                    if(document.body.scrollHeight - scrolled > 1700 && document.body.scrollWidth >= 1024) {
                        numberOfElement -= 10;
                        showtoDisplay(mainData, numberOfElement);
                    } 
    
                    if(document.body.scrollHeight - scrolled > 3200 && document.body.scrollWidth >= 768 && document.body.scrollWidth < 1024) {
                        numberOfElement -= 10;
                        showtoDisplay(mainData, numberOfElement);
                    }

                    
    
                    if(document.body.scrollHeight - scrolled < 500 && document.body.scrollWidth >= 768 && document.body.scrollWidth < 1024) {
                        numberOfElement += 10;
                        showtoDisplay(mainData, numberOfElement);
                    } 

                    if(document.body.scrollHeight - scrolled > 5500 && document.body.scrollWidth >= 425 && document.body.scrollWidth < 768) {
                        numberOfElement -= 10;
                        showtoDisplay(mainData, numberOfElement);
                    }

                    if(document.body.scrollHeight - scrolled < 600 && document.body.scrollWidth >= 425 && document.body.scrollWidth < 768) {
                        numberOfElement += 10;
                        showtoDisplay(mainData, numberOfElement);
                    } 

                    if(document.body.scrollHeight - scrolled > 5500 && document.body.scrollWidth >= 320 && document.body.scrollWidth < 768) {
                        numberOfElement -= 10;
                        showtoDisplay(mainData, numberOfElement);
                    }

                    if(document.body.scrollHeight - scrolled < 600 && document.body.scrollWidth >= 320 && document.body.scrollWidth < 768) {
                        numberOfElement += 10;
                        showtoDisplay(mainData, numberOfElement);
                    } 
                     
                }
                

            }
            main.innerHTML = outPut;
            for(let i = 0; i < removeCard.length; i++) {
                removeCard[i].addEventListener("click", () => {
                    if(!document.getElementById("input-seatch-titles").value){
                        mainData.splice(i, 1);
                        showtoDisplay(mainData);
                    }
                });
            }

            /* 

                for(let i = 0; i < mainData.length; i++) {
                    removeCard[i].addEventListener("click", () => {
                        mainData.splice(i, 1);
                        showtoDisplay(mainData);
                    });
                }

            */
    
        }

        selectSort.addEventListener("click", function() {
            if(selectSort.value == 1) {
                showtoDisplay(mainData.sort(compareDateUpDown));
                if(localStorage.getItem('typeSorting') !=  "Recently Updated") {
                    localStorage.setItem('typeSorting', "Recently Updated");
                }
            } else {
                if(localStorage.getItem('typeSorting') !=  "Least Recently Updated") {
                    localStorage.setItem('typeSorting', "Least Recently Updated");
                }
                showtoDisplay(mainData.sort(compareDateDownUp));
            }
        });

        startSorting.addEventListener("click", sortedByTagsFunc);


        function sortedByTagsFunc() {

            if(localStorage.getItem('typeSorting') !=  "Sort by tags") {
                localStorage.setItem('typeSorting', "Sort by tags");
            }

            let sortedByTags = Object.assign([], mainData);

            for(let k = 0; k < sortedByTags.length; k++) {
                sortedByTags[k].coincidence = 0;
            }

            tags = [];
            if(headerTags.length > 0) {
                for(let iTag = 0; iTag < headerTags.length; iTag++) {
                    tags.push(headerTags[iTag].innerText);
                }
            }

            //"Business","Culture","Politics"

            for(let i = 0; i < sortedByTags.length; i++) {
                for(let k = 0; k < tags.length; k++) {
                    for(let j = 0; j < sortedByTags[i].tags.length; j++) {
                        if(sortedByTags[i].tags[j].toLowerCase() == tags[k].toLowerCase()) {
                            sortedByTags[i].coincidence += 1;
                        }
                    }
                }
            }

            sortedByTags.sort(compareTags)
            let sosortedByTagsandDate = [];

            for(let i = sortedByTags[0].coincidence; i >= 0; i--) {
                let arrayforsorting = [];
                for(let j = 0; j < sortedByTags.length; j++) {
                    if(i == sortedByTags[j].coincidence) {
                        arrayforsorting.push(sortedByTags[j]);
                    }
                }
                arrayforsorting.sort(compareDateUpDown);

                for(let k = 0; k < arrayforsorting.length; k++) {
                    sosortedByTagsandDate.push(arrayforsorting[k]);
                }
            }

            mainData = Object.assign([], sosortedByTagsandDate);

            showtoDisplay(mainData);
        }

        // Fast finding used DOM elements directly

        function filterByTyping() {
            var input, filter, title;
            var progileCard = document.getElementsByClassName("wrapper-profile-card");
            input = document.getElementById("input-seatch-titles");
            filter = input.value.toUpperCase();
            titles = document.getElementsByClassName("title-profile");
            progileCard[0].style.display = "none";
            for (let i = 0; i < titles.length; i++) {
                if (titles[i].innerText.toUpperCase().indexOf(filter) > -1 || filter.length == 0) {
                    progileCard[i].style.display = "grid";
                    progileCard[i].getElementsByClassName("remove-card-btn")[0].addEventListener("click", (e) => {
                        console.log(progileCard[i]);
                        if(progileCard[i].style.display == "grid") {
                            mainData.splice(i, 1);
                            showtoDisplay(mainData);
                            filterByTyping();
                            progileCard[i].style.display = "none";
                        }
                    });
                } else {
                    progileCard[i].style.display = "none";
                }
            }
        }

        //Omnis officiis quaerat explicabo.
        
        document.getElementById("input-seatch-titles").addEventListener("keyup", filterByTyping);

    })
    .catch((err) => console.log(err))

let getTenCards = document.getElementsByClassName("wrapper-profile-cards");

let getCards = document.getElementsByClassName("wrapper-profile-card");


