var vid = document.querySelector("#vid");
var src = vid.querySelector("source");
var inp = document.querySelector(".hiddenInputTag");
var btn_inp = document.querySelector(".inputFile");
var nav_left = document.querySelector("#nav_left");
var nav_right = document.querySelector("#nav_right");
var header_text = document.querySelector("#header_text");

var nav_area = document.querySelector("#nav_area");

var current_item = 0;
var del_btn = null;
var inp_file = [];

if(inp_file.length <= 1){
    nav_left.style.display = "none";
    nav_right.style.display = "none";
}else{
    nav_left.style.display = "block";
    nav_right.style.display = "block";
}

inp.addEventListener("change",()=>{
    if(inp.files.length == 0){
        src.src ="";
        vid.load();
        header_text.innerHTML = "Please select something";
    }
    inp_file=[];
    nav_area.innerHTML = "";
    del_btn=null;
    current_item = 0;
    src.src = URL.createObjectURL(inp.files[current_item]);
    vid.load();
    for(let i =0; i < inp.files.length; i++){
        inp_file.push(inp.files[i]);
        let myElm = document.createElement("li");
        myElm.innerHTML=`<span>${inp_file[i].name}</span>
                        <button class="del"><i class="fas fa-times"></i></button>`;
        myElm.addEventListener("click",()=>{
            var name = myElm.querySelector("span").innerHTML;
            for(let j =0; j < inp_file.length; j++){
                if(inp_file[j].name === name){
                    current_item = j;
                    src.src = URL.createObjectURL(inp_file[current_item]);
                    vid.load();
                }
            }
        });
        nav_area.appendChild(myElm);
    }
    if(inp_file.length <= 1){
        nav_right.style.display = "none";
        nav_left.style.display = "none";
    }else{
        nav_right.style.display = "block";
        nav_left.style.display = "block";
    }
    if(document.querySelector("html").classList.contains("light")){
        document.querySelectorAll("li").forEach((item)=>{
            item.classList.toggle("light");
        });
    }
    del_btn = nav_area.querySelectorAll(".del");
    del_btn = [...del_btn];
    del_btn.forEach((item)=>{
        item.addEventListener("click",()=>{
            current_item = del_btn.indexOf(item);
            var p = item.parentElement;
            p.parentElement.removeChild(p);
            inp_file.splice(del_btn.indexOf(item),1);
            del_btn.splice(del_btn.indexOf(item),1);
            if(inp_file.length == 1){
                nav_right.style.display = "none";
                nav_left.style.display = "none";
                current_item = 0;
                src.src = URL.createObjectURL(inp_file[current_item]);
                vid.load();
            }else if(inp_file.length == 0){
                    src.src = "";
                    vid.load();
                    inp_file = [];
                    header_text.innerHTML = "Please select something";
            }else{
                nav_right.style.display = "block";
                nav_left.style.display = "block";
                current_item = 0;
                src.src = URL.createObjectURL(inp_file[current_item]);
                vid.load();
            }
        });
    });
    current_item = 0;    
});
vid.addEventListener("canplay",()=>{
    header_text.innerHTML = `PLAYING: ${inp_file[current_item].name}`;
});
btn_inp.addEventListener("click",()=>{
    inp.click();
});
nav_left.addEventListener("click",()=>{
    current_item--;
    if(current_item < 0){
        current_item = inp_file.length - 1;
    }
    src.src = URL.createObjectURL(inp_file[current_item]);
    vid.load();
});
nav_right.addEventListener("click",()=>{
    current_item++;
    if(current_item >= inp_file.length){
        current_item = 0;
    }
    src.src = URL.createObjectURL(inp_file[current_item]);
    vid.load();
});

vid.addEventListener("ended",()=>{
    if(inp_file.length != 1){
        nav_right.click();
        vid.play();
    }else{
        vid.pause();
    }
});

//Theame changing---------------

var theme = document.querySelector("#theme");
theme.addEventListener("click",()=>{
    document.querySelector("html").classList.toggle("light");
    document.querySelector("#header_text").classList.toggle("light");
    document.querySelectorAll("button").forEach((item)=>{
        item.classList.toggle("light");
    });
    document.querySelector("#right_container").classList.toggle("light");
    document.querySelectorAll("li").forEach((item)=>{
        item.classList.toggle("light");
    });
});

//Registering the Service Worker -------------------------------------------------------------
if ( 'serviceWorker' in navigator ) {
    console.log("123");
    var reg_prom = navigator.serviceWorker.register('serviceWorker.js');
    reg_prom
        .then(reg=>console.log("👍🏿👍🏿 Successfully reg..",reg))
        .catch( e=>console.log("👎🏿👎🏿 Failed to reg..", e));
}else{
    console.log("👎🏿👎🏿 No service worker..");
}