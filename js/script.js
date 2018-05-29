let users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "Ninja", "imaqtpie"];
let urlStream = 'https://wind-bow.glitch.me/twitch-api/streams/'; 
let urlChanel = 'https://wind-bow.glitch.me/twitch-api/channels/';
let divAll = document.querySelector('#allDiv');
console.log(divAll);
function getData(url){
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.onloadend = function(){
            if(req.readyState === 4 &&  req.status === 200){
                //console.log(req.responseText);
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

for(let i = 0; i < users.length; i++){
 getData(urlStream + users[i]).then(function (data) {
     //console.log(data.stream);
     //console.log(data.stream.channel.logo);
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
         span.textContent = data.stream.channel.status;
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
            span.textContent = "Offline";
            div.appendChild(img);
            div.appendChild(link);
            div.appendChild(span);
            divAll.appendChild(div); 
         })
     }
    
 }).catch((err)=> console.log(err));
}
