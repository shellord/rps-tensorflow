import * as fp from 'fingerpose'

const scissorGesture = new fp.GestureDescription('scissor')

//Index
scissorGesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl, 1.0)
scissorGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.VerticalUp,
  0.75
)
scissorGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
)
scissorGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalLeft,
  1.0
)
scissorGesture.addDirection(
  fp.Finger.Index,
  fp.FingerDirection.HorizontalRight,
  1.0
)

//Middle
scissorGesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl, 1.0)
scissorGesture.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.VerticalUp,
  0.75
)
scissorGesture.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.DiagonalUpRight,
  1.0
)
scissorGesture.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.HorizontalLeft,
  1.0
)
scissorGesture.addDirection(
  fp.Finger.Middle,
  fp.FingerDirection.HorizontalRight,
  1.0
)

//Thumb
scissorGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.HalfCurl, 0.5)
scissorGesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl, 0.5)
scissorGesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.VerticalUp, 1.0)
scissorGesture.addDirection(
  fp.Finger.Thumb,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
)

//Pinky
scissorGesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.FullCurl, 1.0)
scissorGesture.addDirection(fp.Finger.Pinky, fp.FingerDirection.VerticalUp, 0.2)
scissorGesture.addDirection(
  fp.Finger.Pinky,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
)
scissorGesture.addDirection(
  fp.Finger.Pinky,
  fp.FingerDirection.HorizontalLeft,
  0.2
)

//Ring
scissorGesture.addCurl(fp.Finger.Ring, fp.FingerCurl.FullCurl, 1.0)
scissorGesture.addDirection(fp.Finger.Ring, fp.FingerDirection.VerticalUp, 0.2)
scissorGesture.addDirection(
  fp.Finger.Ring,
  fp.FingerDirection.DiagonalUpLeft,
  1.0
)
scissorGesture.addDirection(
  fp.Finger.Ring,
  fp.FingerDirection.HorizontalLeft,
  0.2
)

// give additional weight to index and ring fingers
scissorGesture.setWeight(fp.Finger.Index, 2)
scissorGesture.setWeight(fp.Finger.Middle, 2)

export default scissorGesture
