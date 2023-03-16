import math

detectors = [
    [5,5],
    [10,5],
    [5,10],
    [8,9],
    [23,13],
    [13,23],
    [28,20],
    [25,35],
    [27,25]
]

anomalies = [
    [11, 3, 200],
    [30, 25, 80],
    [19, 20, 60],
    [30, 10, 50]
]

data = {
    "detectors": [
    
    ],
    "anomalies": anomalies,
    'way': []
}

for i in range(len(detectors)):
    detector = detectors[i]
    data["detectors"].append({
        "coords": [detector[0], detector[1]],
        "anomalies": []
    })
    for an in range(len(anomalies)):
        anomaly = anomalies[an]
        dist = round(math.dist((detector[0], detector[1]), (anomaly[0], anomaly[1])), 3)
        int = round(anomaly[2] / (dist ** 2), 3)
        data["detectors"][i]["anomalies"].append({
            "dist": dist,
            "int": int
        })


ss = ['*','?','0','C']
ii = 0

data_of_map = []
display = []
for y in range(30):
    display.append([])
    data_of_map.append([])
    for x in range(40):
        display[y].append('')
        data_of_map[y].append(0)
        
for anomaly in data["anomalies"]:
    for y in range(30):
        for x in range(40):
            is_anomaly = False
            a_x, a_y, a_power = anomaly[0], anomaly[1], anomaly[2]
            distance = ((x+0.5-a_x)**2+(y+0.5-a_y)**2)**0.5
            if distance-0.5 < (a_power/2)**0.5:
                display[y][x] = ss[ii]*2
                data_of_map[y][x] = 1
            else:
                if display[y][x] == '':
                    display[y][x] = '--'
    ii += 1
    ii = ii%4
    
'''
print('MAPPPP')
for line in display:
    for sym in line:
        print(sym,end='')
    print()
'''  



import os
clear = lambda: os.system('cls')

class Player:
    def __init__(self,x=5,y=25, player = '@@'):
        self.player = player
        self.x = x
        self.y = y
    def move_up(self):
        if self.y > 0:
            self.y -= 1
    def move_down(self):
        if self.y < 30:
            self.y += 1
    def move_left(self):
        if self.x > 0:
            self.x -= 1
    def move_right(self):
        if self.x < 40:
            self.x += 1
    def draw(self, display):
        clear()
        for line in range(len(display)):
            for row in range(len(display[line])):
                if line == self.y and row == self.x:
                    print(self.player,end='')
                else:
                    print(display[line][row],end='')
            print()
    def __str__(self):
        return f'{self.x}, {self.y}'
'''
# GAME

player = Player()
player.draw(display)
from pynput.keyboard import Listener

def on_press(key):
    key = "{0}".format(key)[1:-1]
    #print(key)
    if key == 'w' or key == 'ey.u':
        player.move_up()
    if key == 's' or key == 'ey.dow':
        player.move_down()
    if key == 'a' or key == 'ey.lef':
        player.move_left()
    if key == 'd' or key == 'ey.righ':
        player.move_right()
    player.draw(display)
    #print(player)

def on_release(key):
    pass
with Listener(on_press=on_press, on_release=on_release) as listener:
    listener.join()
    
'''
    
    
import heapq

def astar(start, goal, graph):  
    """
    Implementation of A* algorithm for finding the shortest path
    from start to goal on a graph.

    Args:
        start (tuple): Coordinates of the starting node.
        goal (tuple): Coordinates of the goal node.
        graph (list[list[int]]): 2D array representing the graph.

    Returns:
        path (list[tuple]): List of coordinates representing the
        shortest path from start to goal.
    """
    # Heuristic function for estimating the distance from a node to the goal.
    def heuristic(node):
        return abs(node[0] - goal[0]) + abs(node[1] - goal[1])
    
    # Priority queue for holding nodes to be expanded.
    pq = [(0, start)]
    # Dictionary for keeping track of the cost of reaching each node.
    cost_so_far = {start: 0}
    # Dictionary for keeping track of the parent of each node in the path.
    came_from = {}
    
    while pq:
        # Pop the node with the lowest cost from the priority queue.
        current_cost, current_node = heapq.heappop(pq)
        
        if current_node == goal:
            # Goal reached, reconstruct the path and return it.
            path = []
            while current_node in came_from:
                path.append(current_node)
                current_node = came_from[current_node]
            path.append(start)
            return path[::-1]
        
        # Check neighbors of the current node.
        for neighbor in [(current_node[0]+1, current_node[1]), (current_node[0]-1, current_node[1]),
                         (current_node[0], current_node[1]+1), (current_node[0], current_node[1]-1)]:
            if neighbor[0] < 0 or neighbor[0] >= len(graph) or neighbor[1] < 0 or neighbor[1] >= len(graph[0]):
                # Neighbor is outside the grid, skip it.
                continue
            if graph[neighbor[0]][neighbor[1]] == 1:
                # Neighbor is a wall, skip it.
                continue
            
            new_cost = cost_so_far[current_node] + 1
            if neighbor not in cost_so_far or new_cost < cost_so_far[neighbor]:
                # Update cost and priority of the neighbor.
                cost_so_far[neighbor] = new_cost
                priority = new_cost + heuristic(neighbor)
                heapq.heappush(pq, (priority, neighbor))
                # Update parent of the neighbor.
                came_from[neighbor] = current_node
    
    # No path found.
    return None



print('MAPPPP')
for line in data_of_map:
    for sym in line:
        print(sym,end='')
    print()

map = data_of_map

start = (0, 0)
goal = (29,36)

path = astar(start, goal, map)

path_for_res = [list(i) for i in path]
path_for_res = [[i[1], i[0]] for i in path]
#print(path)

data['way'] = path_for_res

data_res = str(data).replace("\'", "\"")
data_res = data_res.replace("},", "},\n")
data_res = data_res.replace(', "anomalies"', ',\n "anomalies"')
print(f'data = {data_res};')



