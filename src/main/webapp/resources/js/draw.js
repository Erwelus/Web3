$("#canvas_div")[0].innerHTML = '<canvas id="canvas" width="450px" height="450px" position="centre"></canvas>'

function drawCoordinateLine(context, x0, y0, x1, y1){
    const LENGTH = 6;

    context.fillStyle="black";

    context.beginPath();
    context.lineWidth = 2;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();

    context.beginPath();
    context.moveTo(x1, y1)
    context.lineTo(x1+(getSign(x0-x1)*LENGTH), y1+(getSign(x0-x1)*LENGTH));
    context.lineTo(x1-LENGTH,y1+LENGTH);
    context.fill();
}

function getSign(x) {
    if(x<0) return -1;
    else return 1;
}

function drawShapes(context) {

    let x = context.canvas.width/2;
    let y = context.canvas.height/2;

    let step = x/3;

    context.fillStyle = "#0c30e7";

    context.beginPath();
    context.moveTo(x, y);
    context.arc(x, y, 2*step, 0, Math.PI/2, false);
    context.fill();

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x-2*step, y);
    context.lineTo(x, y+2*step);
    context.fill();

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x-step, y);
    context.lineTo(x-step, y-2*step);
    context.lineTo(x, y-2*step);
    context.fill();
}

function drawSystem(context, val) {
    if(!isNaN(parseInt(val))){
        val = parseInt(val);
    }
    let vals = [val, val/2, -val/2, -val];
    let x = context.canvas.width/2;
    let y = context.canvas.height/2;
    let step = x/3;

    context.fillStyle = "black";
    context.strokeStyle = "black";

    let count=0;
    for (let i = -2; i <=2 ; i++) {
        if (i !==0){
            context.fillText(vals[count], x+6, y+step*i+5);
            context.beginPath();
            context.moveTo(x-4, y+step*i);
            context.lineTo(x+4, y+step*i);
            context.stroke();
            count++;
        }
    }
    count=3;
    for (let i = -2; i <=2 ; i++) {
        if (i !==0){
            context.fillText(vals[count], x+step*i-5, y-10)
            context.beginPath()
            context.moveTo(x+step*i, y+4)
            context.lineTo(x+step*i, y-4)
            context.stroke()
            count--;
        }
    }
    drawCoordinateLine(context, 0, context.canvas.height/2, context.canvas.width, context.canvas.height/2);
    drawCoordinateLine(context, context.canvas.width/2, context.canvas.height, context.canvas.width/2, 0);}

function draw() {

    //let colors=["#004A7FFF", "#006EBCFF", "#0094FFFF", "#3DAEFFFF", "#7FC9FFFF"];
    console.log("method called")
    let context = $('#canvas')[0].getContext('2d');

    //let r_vals = document.querySelectorAll("input[name='R']");
    let r = $("[id='form_id:R_hinput']")[0].value;
    let tbody_tr=$("tbody tr");
    if(!(parseFloat(r)>0) && tbody_tr.length>0){
        r = tbody_tr[tbody_tr.length-1].cells[2].textContent
    }
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillStyle = "black";
    drawCoordinateLine(context, 0, context.canvas.height/2, context.canvas.width, context.canvas.height/2);
    drawCoordinateLine(context, context.canvas.width/2, context.canvas.height, context.canvas.width/2, 0);

    /*for (var i = r_vals.length - 1; i >= 0; i--) {
        if(r_vals[i].checked){
            drawShapes(context, colors[i], r_vals[i].value);
        }
    }*/
    drawShapes(context)
    drawSystem(context, r)
    drawPoints();
    validate();
    //let max=0;
    // for (let i = r_vals.length - 1; i >= 0; i--) {
    //     localStorage.setItem(`R${i}`, 'false');
    //     if(r_vals[i].checked){
    //         drawSystem(context, r_vals[i].value);
    //         localStorage.setItem(`R${i}`, 'true');
    //         /*if(r_vals[i].value>max){
    //             max = r_vals[i].value;
    //             $("input[serialize='true'][name='R']:checked").attr('serialize','false');
    //             r_vals[i].setAttribute('serialize','true');
    //         }*/
    //     }
    // }
    //validate();
}

/*function setCheck() {
    let r_vals = document.querySelectorAll("input[name='R']");
    for (let i = localStorage.length - 1; i >= 0; i--) {
        if(localStorage.getItem(`R${i}`) === 'true'){
            r_vals[i].checked=localStorage.getItem(`R${i}`);
        }
    }
}*/

function drawResult(x, y, r, alpha, red,green) {
    let context =  $('#canvas')[0].getContext('2d');

    let step = context.canvas.width/(3*r);

    context.strokeStyle = `rgba(${red},${green},0,${alpha})`;
    context.fillStyle = `rgba(${red},${green},0,${alpha})`;

    //console.log(context.canvas.width);
    context.beginPath();
    context.moveTo(context.canvas.width/2 + x*step, context.canvas.height/2 - y*step);
    context.arc(context.canvas.width/2 + x*step, context.canvas.height/2 - y*step,4,0,2*Math.PI);
    context.fill();
    //console.log(context.canvas.width/2 + x*step)
    //console.log(context.canvas.width/2 - y*step)
}

function drawPoints(){
    //console.log("points drawn")
    let tbody_tr=$("tbody tr");
    let r = $("[id='form_id:R_hinput']")[0].value;
    if(!(parseFloat(r)>0)){
        r = tbody_tr[tbody_tr.length-1].cells[2].textContent
    }
    if (tbody_tr.length>0) {
        let i_old;
        let iter = 1;
        if (tbody_tr.length>5){
            i_old = tbody_tr.length -5;
        }else i_old=0;

        //console.log(tbody_tr.length);
        for (let i = tbody_tr.length-1; i >= i_old ; i--) {
            //console.log("kek")
            if (tbody_tr[i].cells[3].textContent.trim() === "true")
                drawResult(parseFloat(tbody_tr[i].cells[0].textContent), parseFloat(tbody_tr[i].cells[1].textContent),parseFloat(r),5 / (5 * iter),0,255)
            else drawResult(parseFloat(tbody_tr[i].cells[0].textContent), parseFloat(tbody_tr[i].cells[1].textContent), parseFloat(r),5 / (5 * iter),255,0)
        }
    }
}
function validate() {
    $("[id='form_id:j_idt23']")[0].disabled = !(
        ($("[id='form_id:R_hinput']")[0].value !== "") &&
        ($("[id='form_id:Y_hinput']")[0].value !== "") &&
        ($("[id='form_id:R_hinput']")[0].value > 0)
    )
}

$(window).on("load",()=>{
    draw();
    $("input").on("change", draw);
});
$(window).resize(draw);
$('#canvas').click(function (event) {
    let r = $("[id='form_id:R_hinput']")[0].value;
    //console.log(r)
    if (r!=="") {
        const ctx = $("#canvas")[0].getContext('2d');
        let step = ctx.canvas.width/(3*r);
        let x = (event.offsetX - ctx.canvas.width/2) / step;
        let y = (ctx.canvas.height/2 - event.offsetY) / step;
        const x_items = $("option");
        //console.log(x_items.length)
        //console.log(y)
        if ((x >= -4 && x <= 4) &&
            (y >= -5 && y <= 3)) {
            //console.log($("[id='form_id:X']")[0].value)
            if (x.toFixed().toString()==="-0") x=0;
            for (let item of x_items) {
                if(item.value===x.toFixed().toString()){
                    item.selected=true;
                }
            }
            $("[id='form_id:Y_hinput']")[0].value = y.toFixed(10).toString();
            $("[id='form_id:j_idt23']")[0].disabled = false;
            $("[id='form_id:j_idt23']")[0].click();
        }else{
            alert("Координаты точки не удовлетворяют ограничениям:\n-4<=X<=4\n-5<=Y<=3")
        }
    }else{
        alert("Введите R")
    }
});
//$("[id='form_id:R_hinput']").on("change", draw);