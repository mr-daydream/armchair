
from tornado import websocket, web, ioloop
import json
from threading import Timer

def onPoseEdge(pose, edge):
    print('Global onPoseEdge called.')
    MainHandler.sendPose(pose, edge)

class SocketHandler(websocket.WebSocketHandler):
    def check_origin(self, origin):
        return True

    def open(self):
        print('Socket opened.')

    def on_close(self):
        print('Socket closed.')

    def on_message(self, message):
        self.write_message(u"You said: " + message)

    def sendPose(self, pose, edge):
        print('sendPose called')
        self.write(json.dumps({ pose: pose, edge: edge }))

app = web.Application([
    (r'/ws', SocketHandler)
])

if __name__ == '__main__':
    app.listen(8888)
    ioloop.IOLoop.instance().start()
    t = Timer(3.0, onPoseEdge(MainHandler, "pose", "edge"))
    t.start()