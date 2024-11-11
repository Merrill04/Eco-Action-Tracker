import React from 'react';

const ActionList = ({ onActionAdd }) => {
  const ecoActions = [
    { id: 1, name: "Use a reusable water bottle", co2Reduction: 0.5 },
    { id: 2, name: "Take public transport", co2Reduction: 2.6 },
    { id: 3, name: "Eat a plant-based meal", co2Reduction: 0.8 },
    { id: 4, name: "Use energy-efficient light bulbs", co2Reduction: 0.1 },
    { id: 5, name: "Recycle paper", co2Reduction: 0.2 },
  ];

  return (
    <div className="action-list-card">
      <div className="card-header">
        <h2 className="card-title">Available Actions</h2>
      </div>
      <div className="card-content">
        <div className="action-grid">
          {ecoActions.map((action) => (
            <div key={action.id} className="action-item">
              <div>
                <span className="action-name">{action.name}</span>
                <span className="action-reduction">
                  ({action.co2Reduction} kg CO₂)
                </span>
              </div>
              <button 
                className="add-button"
                onClick={() => onActionAdd(action)}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActionList;