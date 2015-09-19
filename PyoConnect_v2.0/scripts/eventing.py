
import tornado.ioloop
import tornado.web
import json

class MainHandler(tornado.web.RequestHandler):
  def get(self):
    self.write("Hello, world")
  
  def sendPose(pose, edge)
    self.write(json.dumps({ pose: pose, edge: edge}))

def onPoseEdge(pose, edge):
  MainHandler.sendPose(pose, edge)

application = tornado.web.Application([
    url(r"/", MainHandler),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.current().start()