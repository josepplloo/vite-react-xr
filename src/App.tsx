import { useState } from 'react'
import { Interactive, XR, Controllers, VRButton, Hands } from '@react-three/xr'
import { Sky, Text } from '@react-three/drei'
import '@react-three/fiber'
import { Canvas } from '@react-three/fiber'
import './App.css'

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#666" />
    </mesh>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Box({ color, size, scale, children, ...rest }: any) {
  return (
    <mesh scale={scale} {...rest}>
      <boxGeometry args={size} />
      <meshPhongMaterial color={color} />
      {children}
    </mesh>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Button(props: any) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState(0x123456)

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0)
  }

  return (
    <Interactive onSelect={onSelect} onHover={() => setHover(true)} onBlur={() => setHover(false)}>
      <Box color={color} scale={hover ? [1.5, 1.5, 1.5] : [1, 1, 1]} size={[0.9, 0.1, 0.1]} {...props}>
        <Text position={[0, 0, 0.06]} fontSize={0.05} color="#fff" anchorX="center" anchorY="middle">
          We love React Meetup Montreal!
        </Text>
      </Box>
    </Interactive>
  )
}

function App() {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <Sky sunPosition={[0, 1, 0]} />
          <Floor />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Controllers />
          <Hands />
          <Button position={[0, 0.8, -1]} />
        </XR>
      </Canvas>
    </>
  )
}

export default App
