// ** Global variables 
let users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "Ninja", "Starladder_CS_en"];
let urlStream = 'https://wind-bow.glitch.me/twitch-api/streams/'; 
let urlChanel = 'https://wind-bow.glitch.me/twitch-api/channels/';
let divAll = document.querySelector('#container');

// ** Ajax call with promises to get data from Twitch
function getData(url){
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.onloadend = function(){
            if(req.readyState === 4 &&  req.status === 200){
                resolve(JSON.parse(req.responseText));
            }
           else{
                reject({
                    status: req.status,
                    statusText: req.statusText
                });
            } 
        }
        req.send();
    });
}
// ** Get data from Twitch and dynamicly populate DOM
for(let i = 0; i < users.length; i++){
 getData(urlStream + users[i]).then(function (data) {
     let div = document.createElement('div');
     let img = document.createElement('img');
     let link = document.createElement('a');
     let span = document.createElement('span');
     div.classList.add('holder');
     if(data.stream !== null){
         img.src = data.stream.channel.logo;
         img.alt = users[i];
         link.href = data.stream.channel.url;
         link.textContent = data.stream.channel.display_name;
         link.target = '_blank';
         link.classList.add('small');
         span.textContent = data.stream.channel.status;
         span.classList.add('small');
         div.appendChild(img);
         div.appendChild(link);
         div.appendChild(span);
         divAll.appendChild(div);
     }
     else{
         getData(urlChanel + users[i]).then(function(data){
            img.src = data.logo;
            img.alt = data.display_name;
            link.href = data.url;
            link.textContent = data.display_name;
            link.target = '_blank';
            link.classList.add('small');
            span.textContent = "Offline";
            span.classList.add('off');
            span.classList.add('small');    
            div.appendChild(img);
            div.appendChild(link);
            div.appendChild(span);
            divAll.appendChild(div); 
         })
     }
    
 }).catch((err)=> console.log(err));
}


// ** Displaying offline or online channels

let all = document.querySelector('#all');
let online = document.querySelector('#online');
let offline = document.querySelector('#offline');
let holder = divAll.children;

all.onclick = display;
online.onclick = display;
offline.onclick = display;

function display(event){
  
    let listItems = document.querySelectorAll('li');
    listItems.forEach(function(items){
        items.classList.remove('active');
        event.target.classList.add('active');
    });
    for(let i = 0; i < holder.length; i++){ 
          if(event.target.id === 'online'){
              holder[i].classList.remove('hide');
              if(holder[i].lastElementChild.textContent === "Offline"){
                  holder[i].classList.add('hide');
              }
          }
          else if(event.target.id === "offline"){
              holder[i].classList.remove('hide');
              if(holder[i].lastElementChild.textContent !== "Offline"){
                  holder[i].classList.add('hide');
              }
          }  
          else{
              holder[i].classList.remove('hide');
          }
    }

}




