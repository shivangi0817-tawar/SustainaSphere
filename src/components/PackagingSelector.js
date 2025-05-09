import React, { useState } from 'react';

function PackagingSelector({ onScoreChange }) {
  const [selectedPackaging, setSelectedPackaging] = useState('');

  const handleChange = (e) => {
    const selection = e.target.value;
    setSelectedPackaging(selection);
    updateScore(selection);  // Directly update the score
  };

  const updateScore = (selection) => {
    let points = 0;
    switch (selection) {
      case 'biodegradable':
        points = 10;
        break;
      case 'recycled-paper':
        points = 7;
        break;
      case 'glass':
        points = 5;
        break;
      case 'plastic':
        points = -5;
        break;
      case 'eco-fabric':  // New option
        points = 8;  // Assign some points for eco-friendly fabric
        break;
      default:
        points = 0;
        break;
    }
    onScoreChange(points);  // Call parent function to update the score
  };

  return React.createElement(
    'div',
    { className: 'packaging-selector' },
    React.createElement('h4', null, 'Select Eco-friendly Packaging'),
    React.createElement(
      'div',
      { className: 'form-group' },
      React.createElement(
        'label',
        null,
        React.createElement('input', {
          type: 'radio',
          name: 'packaging',
          value: 'biodegradable',
          checked: selectedPackaging === 'biodegradable',
          onChange: handleChange,
        }),
        'Biodegradable (10 points)'
      ),
      React.createElement(
        'br',
        null
      ),
      React.createElement(
        'label',
        null,
        React.createElement('input', {
          type: 'radio',
          name: 'packaging',
          value: 'recycled-paper',
          checked: selectedPackaging === 'recycled-paper',
          onChange: handleChange,
        }),
        'Recycled Paper (7 points)'
      ),
      React.createElement(
        'br',
        null
      ),
      React.createElement(
        'label',
        null,
        React.createElement('input', {
          type: 'radio',
          name: 'packaging',
          value: 'glass',
          checked: selectedPackaging === 'glass',
          onChange: handleChange,
        }),
        'Glass (5 points)'
      ),
      React.createElement(
        'br',
        null
      ),
      React.createElement(
        'label',
        null,
        React.createElement('input', {
          type: 'radio',
          name: 'packaging',
          value: 'plastic',
          checked: selectedPackaging === 'plastic',
          onChange: handleChange,
        }),
        'Plastic (-5 points)'
      ),
      React.createElement(
        'br',
        null
      ),
      // New option added here
      React.createElement(
        'label',
        null,
        React.createElement('input', {
          type: 'radio',
          name: 'packaging',
          value: 'eco-fabric',
          checked: selectedPackaging === 'eco-fabric',
          onChange: handleChange,
        }),
        'Eco-friendly Fabric (8 points)'  // New packaging option
      )
    )
  );
}

export default PackagingSelector;
