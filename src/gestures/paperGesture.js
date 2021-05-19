import * as fp from 'fingerpose'

const paperGesture = new fp.GestureDescription('paper')

fp.Finger.all.map((finger) =>
  paperGesture.addCurl(finger, fp.FingerCurl.NoCurl, 0.75)
)

export default paperGesture
