import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroQuad,
  ViroAnimations,
} from '@viro-community/react-viro';
import CompassHeading from 'react-native-compass-heading';

const HelloWorldSceneAR = (dis) => {
  const [text, setText] = useState('Initializing AR...');

  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    if (state === ViroConstants.TRACKING_NORMAL) {
      setText(`${dis} KM`);
    } else if (state === ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      <ViroAmbientLight color={"#aaaaaa"} />
      <ViroARPlaneSelector>
        <ViroNode position={[0, -.5, 0]} dragType="FixedToWorld" onDrag={() => { }} >
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0, -1, -.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />
          <Viro3DObject
            position={[0, .1, 0]}
            scale={[.2, .2, .2]}
            type="VRX"
            source={require('../assets/emoji_smile.vrx')}
            lightReceivingBitMask={3}
            shadowCastingBitMask={2}
            transformBehaviors={['billboardY']} />
          <ViroQuad
            rotation={[-90, 0, 0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={2} />
        </ViroNode>
      </ViroARPlaneSelector>
      {/* <ViroNode position={[0, 0, -1]} dragType="FixedToWorld" onDrag={() => { }} >
        <Viro3DObject
          source={require('./emoji_smile.vrx')}
          position={[0, .1, 0]}
          scale={[.2, .2, .2]}
          type="VRX"
        />
      </ViroNode> */}
    </ViroARScene>
  );
};

const Qibla = ({navigation, route}) => {
  const { dis } = route.params;
  const [heading, setHeading] = useState("");
  const [accuracy, setAccuracy] = useState("");

  useEffect(() => {
    const degree_update_rate = 3;

    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      console.log('CompassHeading: ', heading, accuracy);
      setHeading(heading);
      setAccuracy(accuracy);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: () => HelloWorldSceneAR(dis),
      }}
      style={{flex: 1}}
    />
  );
}

const styles = StyleSheet.create({
  
});

export default Qibla;