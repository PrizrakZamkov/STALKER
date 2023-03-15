const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 2000;
canvas.height = 1500;

const SAFE = 2; // По заданию 2

/*
var background = new Image();
background.src = "map.png";

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0);   
}

ctx.fillStyle = 'red';
ctx.arc(100,100,100,0,Math.PI*2);
ctx.fill();
*/


function api_get_data(){
    data = {
      "detectors": [{"coords": [5, 5],
 "anomalies": [{"dist": 6.325, "int": 4.999},
 {"dist": 32.016, "int": 0.078},
 {"dist": 20.518, "int": 0.143},
 {"dist": 25.495, "int": 0.077}]},
 {"coords": [10, 5],
 "anomalies": [{"dist": 2.236, "int": 40.002},
 {"dist": 28.284, "int": 0.1},
 {"dist": 17.493, "int": 0.196},
 {"dist": 20.616, "int": 0.118}]},
 {"coords": [5, 10],
 "anomalies": [{"dist": 9.22, "int": 2.353},
 {"dist": 29.155, "int": 0.094},
 {"dist": 17.205, "int": 0.203},
 {"dist": 25.0, "int": 0.08}]},
 {"coords": [8, 9],
 "anomalies": [{"dist": 6.708, "int": 4.445},
 {"dist": 27.203, "int": 0.108},
 {"dist": 15.556, "int": 0.248},
 {"dist": 22.023, "int": 0.103}]},
 {"coords": [23, 13],
 "anomalies": [{"dist": 15.62, "int": 0.82},
 {"dist": 13.892, "int": 0.415},
 {"dist": 8.062, "int": 0.923},
 {"dist": 7.616, "int": 0.862}]},
 {"coords": [13, 23],
 "anomalies": [{"dist": 20.1, "int": 0.495},
 {"dist": 17.117, "int": 0.273},
 {"dist": 6.708, "int": 1.333},
 {"dist": 21.401, "int": 0.109}]},
 {"coords": [28, 20],
 "anomalies": [{"dist": 24.042, "int": 0.346},
 {"dist": 5.385, "int": 2.759},
 {"dist": 9.0, "int": 0.741},
 {"dist": 10.198, "int": 0.481}]},
 {"coords": [25, 35],
 "anomalies": [{"dist": 34.928, "int": 0.164},
 {"dist": 11.18, "int": 0.64},
 {"dist": 16.155, "int": 0.23},
 {"dist": 25.495, "int": 0.077}]},
 {"coords": [27, 25],
 "anomalies": [{"dist": 27.203, "int": 0.27},
 {"dist": 3.0, "int": 8.889},
 {"dist": 9.434, "int": 0.674},
 {"dist": 15.297, "int": 0.214}]}],
 "anomalies": [[11, 3, 200], [30, 25, 80], [19, 20, 60], [30, 10, 50]]
      
      
          ,
            'way':[
            
            [
              11,
              3
            ],
            [
              30,
              25
            ],
            [
              19,
              20
            ],
            [
              1,
              5
            ],
            [
              10,
              20
            ]
          ]
    };
    return data;
}
let data = {};
data = api_get_data();


for(let i = 0; i< data.detectors.length; i++){
console.log(data.detectors[i].coords[0]*50,data.detectors[i].coords[1]*50);
  ctx.fillStyle = 'white';
  ctx.arc(data.detectors[i].coords[0]*50,data.detectors[i].coords[1]*50,20,0,Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  /*
  for(let j = 0; j< data.detectors[i].anomalies.length; j++){
      
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.arc(data.detectors[i].coords[0]*50,data.detectors[i].coords[1]*50,data.detectors[i].anomalies[j].dist*50,0,Math.PI*2);

    ctx.stroke();
    ctx.beginPath();
  }*/
}


for(let i = 0; i< data.anomalies.length; i++){
  console.log(data.anomalies[i][0]*50,data.anomalies[i][1]*50);

  const gradient = ctx.createRadialGradient(data.anomalies[i][0]*50, data.anomalies[i][1]*50, 30, data.anomalies[i][0]*50, data.anomalies[i][1]*50, (Math.sqrt(data.anomalies[i][2]/SAFE))*50);
  gradient.addColorStop(0, "rgba(255,0,255,0.7)");
  gradient.addColorStop(0.7, "rgba(255,0,128,0.5)");
  gradient.addColorStop(1, "rgba(255,0,0,0.3)");

  ctx.fillStyle = 'rgba(255,0,0,0.5)';
  ctx.fillStyle = gradient;


  ctx.arc(data.anomalies[i][0]*50,data.anomalies[i][1]*50,(Math.sqrt(data.anomalies[i][2]/SAFE))*50,0,Math.PI*2);
  ctx.fill();
  ctx.beginPath();
}

// way
if (data.way.length-1 > 0){
    
  for(let i = 0; i< data.way.length-1; i++){
    console.log(data.way[i][0]*50,data.way[i][1]*50);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.moveTo(data.way[i][0]*50,data.way[i][1]*50);
    ctx.lineTo(data.way[i+1][0]*50,data.way[i+1][1]*50);
  }
    ctx.stroke();
  ctx.beginPath();
}

// squares
for(let x = 0; x<40; x++){
  for(let y = 0; y<30; y++){
    let is_anomaly = false;
    
    for(let i = 0; i<data.anomalies.length; i++){
      let a_x = data.anomalies[i][0];
      let a_y = data.anomalies[i][1];
      let a_power = data.anomalies[i][2];
      let distance = Math.sqrt(Math.pow(x+0.5-a_x,2)+Math.pow(y+0.5-a_y,2));
      if (distance-0.5 < Math.sqrt(a_power/SAFE)){
          is_anomaly = true;
      }
    }

    if (is_anomaly){
      ctx.fillStyle = 'rgba(255,0,0,0.6)';
    }else{
      ctx.fillStyle = 'rgba(255,255,255,0.1)';
    }
    ctx.rect(x*50,y*50,50,50);
    ctx.fill();
    ctx.beginPath();
  }
}

            