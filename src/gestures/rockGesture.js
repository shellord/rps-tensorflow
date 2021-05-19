import * as fp from 'fingerpose'

const rockGesture = new fp.GestureDescription('rock')

fp.Finger.all.map((finger) =>
  rockGesture.addCurl(finger, fp.FingerCurl.FullCurl, 0.75)
)

fp.Finger.all.map((finger) =>
  rockGesture.addCurl(finger, fp.FingerCurl.HalfCurl, 0.75)
)

export default rockGesture
