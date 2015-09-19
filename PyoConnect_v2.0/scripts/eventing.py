
# from tornado import websocket, web, ioloop
import json
# import http
import urllib2
# from threading import Timer

# test = 'I am here as a placeholder for the SocketHandler instance reference'

# class SocketHandler(websocket.WebSocketHandler):
#     def initialize(self, ref_object):
#         test = self
#         print('test2 ', test)
#         self.ref_object = ref_object

#     # Why do all of these methods need to pass in self
#     def open(self):
#         print('Socket opened.')

#     def on_close(self):
#         print('Socket closed.')

#     def on_message(self, message):
#         self.write_message('Echo!:' + message)

#     def sendPose(self, pose, edge):
#         print('SocketHandler sendPose called.')
#         self.write_message(json.dumps({ 'pose': pose, 'edge': edge }))

# class ApplicationServer():

#     def __init__(self):
#         self.ref_object = 1
#                                            # v What is this thing    v What is that thing
#         self.application = web.Application([(r'/ws', SocketHandler, {'ref_object' : self.ref_object})])
#         # self.socket = SocketHandler(self, '/ws')
#         # self.application = web.Application([(r'/ws', self.socket)])

#     def start(self):
#         self.application.listen(8888)
#         print('test', test)

#     def onPoseEdge(self, pose, edge):
#         print('ApplicationServer onPoseEdge called.')
#         # Access the SocketHandler reference some how
#         if !isinstance(test, basestring)
#             self.onPose(pose, edge)

h = urllib2.httplib.HTTPConnection('localhost:8080')

headers = {'Content-type': 'application/json'}

def onPoseEdge(pose, edge):
    print('Global onPoseEdge: ', pose, edge)
    data = json.dumps({'pose': pose, 'edge': edge})
    h.request('POST', '/pose', data, headers)
    r = h.getresponse()
    # app.onPoseEdge(pose, edge)

# if __name__ == '__main__':

    # app = ApplicationServer()
    # app.start()
    # onPoseEdge('one', 'two')

    # Definitely blocking.
    # ioloop.IOLoop.instance().start()

    # Maybe blocking
    # t = Timer(3.0, onPoseEdge(app, 'test1', 'test2'))
    # t.start()

    