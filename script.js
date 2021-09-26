var vid = document.querySelector("#vid");
var src = vid.querySelector("source");
var inp = document.querySelector(".hiddenInputTag");
var btn_inp = document.querySelector(".inputFile");
var nav_left = document.querySelector("#nav_left");
var nav_right = document.querySelector("#nav_right");
var header_text = document.querySelector("#header_text");


var nav_area = document.querySelector("#nav_area");
var arr = [];
var current_item = 0;
var del_btn = null;

inp.addEventListener("change",()=>{
    arr=[];
    nav_area.innerHTML = "";
    del_btn=null;
    current_item = 0;
    src.src = URL.createObjectURL(inp.files[current_item]);
    vid.load();
    for(let i =0; i < inp.files.length; i++){
        arr.push(inp.files[i]);
        let myElm = document.createElement("li");
        myElm.innerHTML=`<span>${arr[i].name}</span>
                        <button class="del">&#128473;</button>`;
        myElm.addEventListener("click",()=>{
            current_item = i;
            src.src = URL.createObjectURL(arr[i]);
            vid.load(); 
        });
        nav_area.appendChild(myElm);
    }
    if(inp.files.length <= 1){
        nav_right.style.display = "none";
        nav_left.style.display = "none";
    }else{
        nav_right.style.display = "block";
        nav_left.style.display = "block";
    }
    del_btn = nav_area.querySelectorAll(".del");
    del_btn = [...del_btn];
    del_btn.forEach((item)=>{
            item.addEventListener("click",()=>{
            current_item = del_btn.indexOf(item);
            var p = item.parentElement;
            p.parentElement.removeChild(p);
            arr.splice(del_btn.indexOf(item),1);
            del_btn.splice(del_btn.indexOf(item),1);
            if(arr.length == 1){
                nav_right.style.display = "none";
                nav_left.style.display = "none";
                src.src = URL.createObjectURL(arr[0]);
            }else if(arr.length == 0){
                    src.src = "";
                    vid.load();
                    arr = [];
                    header_text.innerHTML = "Please select something";
            }else{
                nav_right.style.display = "block";
                nav_left.style.display = "block";
                src.src = URL.createObjectURL(arr[current_item]);
            }
        });
    });
    current_item = 0;    
});
vid.addEventListener("canplay",()=>{
    header_text.innerHTML = `PLAYING: ${arr[current_item].name}`;
});
btn_inp.addEventListener("click",()=>{
    inp.click();
});
nav_left.addEventListener("click",()=>{
    current_item--;
    if(current_item < 0){
        current_item = arr.length - 1;
    }
    src.src = URL.createObjectURL(arr[current_item]);
    vid.load();
});
nav_right.addEventListener("click",()=>{
    current_item++;
    if(current_item >= arr.length){
        current_item = 0;
    }
    src.src = URL.createObjectURL(arr[current_item]);
    vid.load();
});

if ( 'serviceWorker' in navigator ) {
    console.log("123");
    var reg_prom = navigator.serviceWorker.register('serviceWorker.js');
    reg_prom
        .then(reg=>console.log("👍🏿👍🏿 Successfully reg..",reg))
        .catch( e=>console.log("👎🏿👎🏿 Failed to reg..", e));
}else{
    console.log("👎🏿👎🏿 No service worker..");
}