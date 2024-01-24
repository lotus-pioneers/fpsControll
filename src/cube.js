import { useBox, useCylinder, useConvexPolyhedron } from "@react-three/cannon";

export const Cube = (props) => {
  const [ref] = useBox(() => ({
    type: "Static",
    args: props.boxArgs,
    position: props.position
  }));

  return (
    <mesh ref={ref} receiveShadow castShadow position={props.position}>
      {props.isBox && <boxGeometry args={props.boxArgs} />}
    </mesh>
  );
};
