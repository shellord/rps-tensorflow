import { useState, useRef, useEffect } from 'react'
import './App.css'
import Webcam from 'react-webcam'
import * as tf from '@tensorflow/tfjs'
import * as handpose from '@tensorflow-models/handpose'
import { drawHand } from './utils/drawHand'
import * as fp from 'fingerpose'
import { paperGesture, rockGesture, scissorGesture } from './gestures'

function App() {
  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const [gesture, setGesture] = useState(null)

  useEffect(() => {
    console.log(gesture)
  }, [gesture])

  const GE = new fp.GestureEstimator([
    fp.Gestures.ThumbsUpGesture,
    paperGesture,
    rockGesture,
    scissorGesture,
  ])

  const runHandpose = async () => {
    const model = await handpose.load()
    console.log('Handpose model loaded.')

    setInterval(() => {
      detectGesture(model)
    }, 100)
  }

  const detectGesture = async (model) => {
    const video = webcamRef.current.video
    const hand = await model.estimateHands(video)
    if (hand.length > 0) {
      const estimatedGestures = await GE.estimate(hand[0].landmarks, 7.5)
      const maxConfidence = estimatedGestures.gestures.reduce(
        (prev, current) =>
          prev.confidence > current.confidence ? prev : current,
        { confidence: 0 }
      )
      setGesture(maxConfidence)
    }

    canvasRef.current.width = webcamRef.current.video.videoWidth
    canvasRef.current.height = webcamRef.current.video.videoHeight
    const ctx = canvasRef.current.getContext('2d')
    drawHand(hand, ctx)
  }

  return (
    <div className="App">
      <Webcam
        ref={webcamRef}
        onUserMedia={runHandpose}
        style={{
          position: 'absolute',
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
        }}
      />
    </div>
  )
}

export default App
