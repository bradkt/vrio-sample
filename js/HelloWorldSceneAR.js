'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
  ViroSpotLight,
  ViroAmbientLight,
  ViroQuad,
  ViroNode,
  Viro3DObject
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR...",
      num : 45
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  componentDidMount() {
    let _this = this;
    let rand = -2;

    setInterval(() => {
      rand = rand * -1
    }, 7000);

    setInterval(() => {
      _this.setState({ num: this.state.num + rand })
    }, 100);
  }
  // [x, y, z]
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroText text={this.state.text} scale={[.5, .5, .5]} position={[0, 0, -1]} style={styles.helloWorldTextStyle} />
        {/* <ViroBox position={[0, -.5, -1]} scale={[.3, .3, .1]} materials={["grid"]} /> */}
                {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}

        {/* <ViroNode position={[0,0,0]} rotation={[0, 0, 0]} scale={[2.0, 2.0, 2.0]} FixedToPlane> */}
   
  
          <ViroAmbientLight color="#ffffff" />
  
          <Viro3DObject
              source={require('./res/seahorse.obj')}
              highAccuracyEvents={true}
              position={[0, -5, -30]}
              scale={[2, 2, 2]}
              rotation={[-5, this.state.num, 0]}
              type="OBJ"
              // transformBehaviors={["billboard"]}
              materials={["grid"]}
            />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : ""
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/seahorseTxt.png'),
  },
});

module.exports = HelloWorldSceneAR;