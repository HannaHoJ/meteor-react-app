//JS entrypoint

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom'

import App from '../imports/client/ui/App.js';

import './main.html';

Meteor.startup(() => {
  render(<App />, document.getElementById('render-target'));
});
