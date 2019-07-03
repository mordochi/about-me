import React, { Component } from 'react';
import * as THREE from 'three';

import createBilly from '../../share/billy.js';
import createMandy from '../../share/mandy.js';
import createMordecai from '../../share/mordecai.js';
import createRigby from '../../share/rigby.js';
import createGoofy from '../../share/goofy.js';
import createDonaldDuck from '../../share/donaldDuck.js';

import './index.css';

export default class FourthStop extends Component {
  componentDidMount() {
    this.billy = createBilly(this.props.scene);
    this.billy.position.x = -3300;
    this.billy.position.y = this.props.groundHeight + 350;
    this.billy.position.z = -4400;
    this.props.scene.add(this.billy);

    this.mandy = createMandy(this.props.scene);
    this.mandy.position.x = -3300;
    this.mandy.position.y = this.props.groundHeight + 350;
    this.mandy.position.z = -8000;
    this.props.scene.add(this.mandy);

    this.mordecai = createMordecai(this.props.scene);
    this.mordecai.position.x = -1600;
    this.mordecai.position.y = this.props.groundHeight + 350;
    this.mordecai.position.z = -7200;
    this.props.scene.add(this.mordecai);

    this.rigby = createRigby(this.props.scene);
    this.rigby.position.x = -700;
    this.rigby.position.y = this.props.groundHeight + 350;
    this.rigby.position.z = -5800;
    this.props.scene.add(this.rigby);

    this.goofy = createGoofy(this.props.scene);
    this.goofy.position.x = -5000;
    this.goofy.position.y = this.props.groundHeight + 350;
    this.goofy.position.z = -5300;
    this.props.scene.add(this.goofy);

    this.donaldDuck = createDonaldDuck(this.props.scene);
    this.donaldDuck.position.x = -3300;
    this.donaldDuck.position.y = this.props.groundHeight + 350;
    this.donaldDuck.position.z = -6100;
    this.props.scene.add(this.donaldDuck);

  }

  render() {
    return (
      <div id="fourth-stop"></div>
    );
  }
}