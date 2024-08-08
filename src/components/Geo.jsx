import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, MeshDistortMaterial, Shadow, AccumulativeShadows, RandomizedLight, MeshRefractionMaterial, useEnvironment, Text, Html } from '@react-three/drei'
import state from './state'
import { suspend } from "suspend-react"
export default function Model(props) {
  const group = useRef()
  const shadow = useRef()
  const { nodes } = useGLTF('/inf2.glb', true)
  const env = useEnvironment({ files: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/peppermint_powerplant_2_1k.hdr' })
  useFrame(({ clock }) => {
    const t = (3 + Math.sin(clock.getElapsedTime() * 1.5)) / 2
    group.current.position.y = t / 3
    // shadow.current.scale.y = shadow.current.scale.z = 1 + t
    // shadow.current.scale.x = (1 + t) * 1.25
    group.current.rotation.x = group.current.rotation.y += 0.009
    // group.current.rotation.x = group.current.rotation.x += 0.009
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, state.mouse[0] / 2, 0.05)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, state.mouse[1] / 4, 0.03)
  })
  return (
    <group {...props} dispose={null}>
   
      <group ref={group} scale={10} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.inf.geometry} castShadow receiveShadow>
          <MeshRefractionMaterial color={"'#02ff45"} side={THREE.DoubleSide} envMap={env} aberrationStrength={0.1} toneMapped={false} />
        </mesh>
       
        {/* <mesh geometry={nodes.inf.geometry}>
          <meshBasicMaterial color="#0d94f5" wireframe />
        </mesh> */}
      </group>
      <group position={[1.25, -0.5, 0]}>
        <Text position={[0, 0, 0]} fontSize={0.07} lineHeight={1} letterSpacing={-0.05}>
          03
          <meshBasicMaterial color="#c5c5c5" toneMapped={false} />
        </Text>
        <Text bold position={[-0.01, -0.1, 0]} fontSize={0.1} lineHeight={1} letterSpacing={-0.05} color="black">
          {`Poimandres,\nThe vision of Hermes`}
        </Text>
      </group>

    </group>
  )
}


// import React, { useRef } from 'react'
// import { useGLTF } from '@react-three/drei'

// export default function Model(props) {
//   const groupRef = useRef()
//   const { nodes, materials } = useGLTF('/inf2.glb')
//   return (
//     <group ref={groupRef} {...props} dispose={null}>
//       <mesh castShadow receiveShadow geometry={nodes.} material={materials['Material.001']} />
//       <mesh castShadow receiveShadow geometry={nodes} material={materials['Material.002']} />
//     </group>
//   )
// }

// useGLTF.preload('/inf2.glb')

const inter = import("@pmndrs/assets/fonts/inter_regular.woff")
function Status(props) {
  const text =  "/knot" 
  return (
    <Text fontSize={14} letterSpacing={-0.025} font={suspend(inter).default} color="black" {...props}>
      {text}
      <Html style={{ color: "transparent", fontSize: "33.5em" }} transform>
        {text}
      </Html>
    </Text>
  )
}