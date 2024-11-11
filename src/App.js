import React, { useState, useEffect } from 'react';
import ActionList from './components/ActionList';
import ImpactSummary from './components/ImpactSummary';
import './App.css';

const App = () => {
  const [trackedActions, setTrackedActions] = useState([]);

  useEffect(() => {
    const savedActions = localStorage.getItem('trackedActions');
    if (savedActions) {
      setTrackedActions(JSON.parse(savedActions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('trackedActions', JSON.stringify(trackedActions));
  }, [trackedActions]);

  const handleAddAction = (action) => {
    setTrackedActions(prev => {
      const existingAction = prev.find(a => a.id === action.id);
      if (existingAction) {
        return prev.map(a =>
          a.id === action.id
            ? { ...a, count: a.count + 1 }
            : a
        );
      }
      return [...prev, { ...action, count: 1 }];
    });
  };

  const handleDeleteAction = (actionId) => {
    setTrackedActions(prev => prev.filter(a => a.id !== actionId));
  };

  const handleClear = () => {
    setTrackedActions([]);
  };

  const totalCO2Reduction = trackedActions.reduce(
    (total, action) => total + action.co2Reduction * action.count,
    0
  );

  return (
    <div className="app-container">
      <h1 className="app-title">Eco Action Tracker</h1>
      
      {totalCO2Reduction >= 0.5 && totalCO2Reduction < 1 && (
        <div className="alert progress-alert">
          You're making progress! Add more actions to increase your impact.
        </div>
      )}
      
      {totalCO2Reduction >= 1 && (
        <div className="alert success-alert">
          Great job! Your actions are making a significant impact.
        </div>
      )}

      <ActionList onActionAdd={handleAddAction} />
      <ImpactSummary 
        trackedActions={trackedActions}
        onClear={handleClear}
        onDelete={handleDeleteAction}
      />
    </div>
  );
};

export default App;