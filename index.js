const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 2000;
canvas.height = 1500;

const SAFE = 2; // По заданию 2
const SCALE = 50; // По заданию 50


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
  data = {"detectors": [{"coords": [5, 5],
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
 "anomalies": [[11, 3, 200], [30, 25, 80], [19, 20, 60], [30, 10, 50]], "way": [[30, 20], [29, 20], [28, 20], [27, 20], [26, 20], [26, 19], [26, 18], [26, 17], [26, 16], [25, 16], [25, 15], [25, 14], [24, 14], [24, 13], [23, 13], [22, 13], [22, 12], [21, 12], [20, 12], [19, 12], [18, 12], [17, 12], [16, 12], [15, 12], [14, 12], [13, 12], [13, 13], [13, 14], [13, 15], [13, 16], [13, 17], [13, 18], [13, 19], [13, 20], [13, 21], [13, 22], [13, 23], [13, 
24], [13, 25], [14, 25], [14, 26], [15, 26], [15, 27], [15, 28], [15, 29], [15, 30], [15, 31], [15, 32], [15, 33], [14, 33], [14, 34], [13, 34], [13, 35], [12, 35], [11, 35], [10, 35], [9, 35], [8, 35], [7, 35], [7, 36], [7, 37], [7, 38]]};
  return data;
}
let data = {};
data = api_get_data();

function clear_screen(){
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas
  ctx.beginPath();
}
function draw_screen(){
  clear_screen();
  draw_detectors();
  draw_anomalies();
  draw_squares();
  draw_points();
  draw_way(data);
}
function draw_detectors(){
  for(let i = 0; i< data.detectors.length; i++){
  ctx.fillStyle = 'white';
  ctx.arc(data.detectors[i].coords[0]*SCALE,data.detectors[i].coords[1]*SCALE,20,0,Math.PI*2);
  ctx.fill();
  ctx.beginPath();
  /*
  for(let j = 0; j< data.detectors[i].anomalies.length; j++){
      
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.arc(data.detectors[i].coords[0]*SCALE,data.detectors[i].coords[1]*SCALE,data.detectors[i].anomalies[j].dist*SCALE,0,Math.PI*2);

    ctx.stroke();
    ctx.beginPath();
  }*/
}
}
function draw_anomalies(){
for(let i = 0; i< data.anomalies.length; i++){
  const gradient = ctx.createRadialGradient(data.anomalies[i][0]*SCALE, data.anomalies[i][1]*SCALE, 30, data.anomalies[i][0]*SCALE, data.anomalies[i][1]*SCALE, (Math.sqrt(data.anomalies[i][2]/SAFE))*SCALE);
  gradient.addColorStop(0, "rgba(255,0,255,1)");
  gradient.addColorStop(0.3, "rgba(255,0,128,0.5)");
  gradient.addColorStop(0.7, "rgba(255,0,128,0.5)");
  gradient.addColorStop(1, "rgba(255,0,0,0.3)");

  ctx.fillStyle = 'rgba(255,0,0,0.5)';
  ctx.fillStyle = gradient;


  ctx.arc(data.anomalies[i][0]*SCALE,data.anomalies[i][1]*SCALE,(Math.sqrt(data.anomalies[i][2]/SAFE))*SCALE,0,Math.PI*2);
  ctx.fill();
  ctx.beginPath();
}
}
function draw_squares(){
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
      ctx.fillStyle = 'rgba(255,0,0,0.3)';
    }else{
      ctx.fillStyle = 'rgba(255,255,255,0)';
    }
    ctx.rect(x*SCALE,y*SCALE,SCALE,SCALE);
    ctx.fill();
    ctx.beginPath();
  }
}
}

var Points = {
  'A': undefined, // (y, x) 
  'B': undefined
};

var next_point_for_drawing = 0;

function draw_points(){
  if (Points.A != undefined){
    ctx.font = "80px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText('A', Points.A[0]*50, Points.A[1]*50+SCALE);
    ctx.beginPath();
  }
  if (Points.B != undefined){
    ctx.font = "80px Arial";
    ctx.fillStyle = 'white';
    ctx.fillText('B', Points.B[0]*50, Points.B[1]*50+SCALE);
    ctx.beginPath();
  }
}
  
function get_data_of_map(data){
  let data_of_map = [];
  for(let y = 0; y< 30; y++){
    data_of_map.push([]);
    for(let x = 0; x< 40; x++){
      data_of_map[y].push(0);
    }
  }
  for(let i = 0; i< data.anomalies.length; i++){
    let anomaly = data.anomalies[i];
    for(let y = 0; y< 30; y++){
      for(let x = 0; x< 40; x++){
        let a_x = anomaly[0];
        let a_y = anomaly[1];
        let a_power = anomaly[2];

        let distance = Math.sqrt(Math.pow(x+0.5-a_x,2)+Math.pow(y+0.5-a_y,2));

        if (distance-0.5 < Math.sqrt(a_power/2)){
          data_of_map[y][x] = 1;
        }
      }
    }
  }
  return data_of_map;
}
// way
function draw_way(data){
  let way = data.way;
  if (way.length-1 > 0){
      
    for(let i = 0; i < way.length-1; i++){
      console.log('hello');
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 5;
      ctx.moveTo(way[i][1]*SCALE+SCALE/2,way[i][0]*SCALE+SCALE/2);
      ctx.lineTo(way[i+1][1]*SCALE+SCALE/2,way[i+1][0]*SCALE+SCALE/2);
    }
      ctx.stroke();
    ctx.beginPath();
  }
  /*
  if (Points.A == undefined){
    return 0;
  }
  if (Points.B == undefined){
    return 0;
  }

  try {
    
    let start = [Points.A[1],Points.A[0]];
    let goal = [Points.B[1],Points.B[0]];
    let way = aStar(start, goal, map);
    
    let way = data.way;
    if (way.length-1 > 0){
        
      for(let i = 0; i < way.length-1; i++){
        console.log('hello');
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        ctx.moveTo(way[i][1]*SCALE+SCALE/2,way[i][0]*SCALE+SCALE/2);
        ctx.lineTo(way[i+1][1]*SCALE+SCALE/2,way[i+1][0]*SCALE+SCALE/2);
      }
        ctx.stroke();
      ctx.beginPath();
    }
  
  } catch (err) {
  
  }*/

}
window.addEventListener(
  'click',
  function(event){

    let point = ['A','B'][next_point_for_drawing];
    Points[point] = [Math.floor(event.x/50),Math.floor(event.y/50)];
    next_point_for_drawing = (next_point_for_drawing+1)%2;

    draw_screen();
  }
);

draw_screen();

/*
function aStar(start, goal, map) {
  let openSet = [start];
  let cameFrom = {};
  let gScore = {[start]: 0};
  let fScore = {[start]: heuristic(start, goal)};
  
  while (openSet.length > 0) {
    let current = getLowestFScore(openSet, fScore);
    
    if (current === goal) {
      return reconstructPath(cameFrom, current);
    }
    
    openSet.splice(openSet.indexOf(current), 1);
    
    let neighbors = getNeighbors(current, map);
    
    for (let neighbor of neighbors) {
      let tentativeGScore = gScore[current] + 1;
      
      if (!gScore.hasOwnProperty(neighbor) || tentativeGScore < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] = tentativeGScore + heuristic(neighbor, goal);
        
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }
  
  return null;
}

function getLowestFScore(set, fScore) {
  let lowestScore = Infinity;
  let lowestNode = null;
  
  for (let node of set) {
    if (fScore[node] < lowestScore) {
      lowestScore = fScore[node];
      lowestNode = node;
    }
  }
  
  return lowestNode;
}

function heuristic(node, goal) {
  return Math.abs(goal[0] - node[0]) + Math.abs(goal[1] - node[1]);
}

function getNeighbors(node, map) {
  let neighbors = [];
  
  for (let dx of [-1, 0, 1]) {
    for (let dy of [-1, 0, 1]) {
      if (dx === 0 && dy === 0) {
        continue;
      }
      
      let x = node[0] + dx;
      let y = node[1] + dy;
      
      if (x < 0 || x >= map.length || y < 0 || y >= map[0].length) {
        continue;
      }
      
      if (map[x][y] === 1) {
        continue;
      }
      
      neighbors.push([x, y]);
    }
  }
  
  return neighbors;
}

function reconstructPath(cameFrom, current) {
  let path = [current];
  
  while (cameFrom.hasOwnProperty(current)) {
    current = cameFrom[current];
    path.push(current);
  }
  
  return path.reverse();
}

*/


function aStar(start, goal, map) {
  const neighbors = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, -1], [-1, 1], [1, -1], [1, 1]]; // list of possible neighbor positions
  //const neighbors = [[-1, 0], [0, -1], [1, 0], [0, 1]]; // list of possible neighbor positions
  const closedSet = new Set(); // set of visited nodes
  const openSet = new Set([start]); // set of nodes to explore
  const cameFrom = new Map(); // map of parent nodes
  const gScore = new Map().set(start, 0); // map of g-scores (costs from start to node)
  const fScore = new Map().set(start, heuristic(start, goal)); // map of f-scores (estimated total cost from start to goal through node)

  while (openSet.size > 0) {
    const current = lowestFScore(openSet, fScore); // get node with lowest f-score
    if (current[0] === goal[0] && current[1] === goal[1]) {
      return reconstructPath(cameFrom, current); // found goal node, reconstruct path and return it
    }

    openSet.delete(current); // remove current node from open set
    closedSet.add(current); // add current node to closed set

    for (const [i, j] of neighbors) { // iterate over neighbor positions
      const neighbor = [current[0] + i, current[1] + j]; // calculate neighbor position
      if (neighbor[0] < 0 || neighbor[0] >= map.length || neighbor[1] < 0 || neighbor[1] >= map[0].length || map[neighbor[0]][neighbor[1]] === 1 || closedSet.has(neighbor)) {
        continue; // skip invalid or visited neighbors
      }

      const tentativeGScore = gScore.get(current) + distance(current, neighbor); // calculate tentative g-score
      if (!openSet.has(neighbor) || tentativeGScore < gScore.get(neighbor)) {
        cameFrom.set(neighbor, current); // set neighbor's parent to current node
        gScore.set(neighbor, tentativeGScore); // set neighbor's g-score to tentative value
        fScore.set(neighbor, tentativeGScore + heuristic(neighbor, goal)); // set neighbor's f-score to tentative value plus heuristic
        openSet.add(neighbor); // add neighbor to open set if it's not already there
      }
    }
  }

  return null; // failed to find path
}

function lowestFScore(set, scores) {
  let lowest = null;
  for (const node of set) {
    if (lowest === null || scores.get(node) < scores.get(lowest)) {
      lowest = node;
    }
  }
  return lowest;
}

function distance(a, b) {
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);
  return Math.max(dx, dy);
}

function heuristic(a, b) {
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);
  return dx + dy;
}

function reconstructPath(cameFrom, current) {
  const path = [current];
  while (cameFrom.has(current)) {
    current = cameFrom.get(current);
    path.unshift(current);
  }
  return path;
}

    /*
    console.log('path_');
    let map = get_data_of_map(data);
    
    let start = [0, 0];
    let goal = [15, 4];
    //let path = aStar(start, goal, map);
    let path = aStar(start, goal, map);
    console.log(start,goal);
    console.log(map);
    
    console.log(path); // output: [[0, 0], [1, 1], [2, 2], [3, 3], [3, 4]]
    console.log('_path');
*/
