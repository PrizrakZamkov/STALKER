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
    "anomalies": anomalies
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
data_res = str(data).replace("\'", "\"")
data_res = data_res.replace("},", "},\n")
data_res = data_res.replace(', "anomalies"', ',\n "anomalies"')
#print(data_res)


ss = ['*','?','0','C']
ii = 0

display = []
for y in range(30):
    display.append([])
    for x in range(40):
        display[y].append('')
        
for anomaly in data["anomalies"]:
    for y in range(30):
        for x in range(40):
            is_anomaly = False
            a_x, a_y, a_power = anomaly[0], anomaly[1], anomaly[2]
            distance = ((x+0.5-a_x)**2+(y+0.5-a_y)**2)**0.5
            if distance-0.5 < (a_power/2)**0.5:
                display[y][x] = ss[ii]*2
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
    
    
    
    
