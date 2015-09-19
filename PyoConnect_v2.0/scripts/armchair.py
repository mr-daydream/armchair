import json

def onPoseEdge(pose, edge):
    print('Global onPoseEdge: ', pose, edge)
    f = open("armchair.txt","w")
    f.write(json.dumps({ "pose": pose, "edge": edge}))
    f.close()