import React from 'react';

const Action = ({ action, onDelete }) => {
  return (
    <div className="tracked-action">
      <div>
        <span className="action-name">{action.name}</span>
        <span className="action-stats">
          Count: {action.count} | Total: {(action.co2Reduction * action.count).toFixed(2)} kg CO₂
        </span>
      </div>
      <button 
        className="delete-button"
        onClick={() => onDelete(action.id)}
      >
        Delete
      </button>
    </div>
  );
};

const ImpactSummary = ({ trackedActions, onClear, onDelete }) => {
  const totalCO2Reduction = trackedActions.reduce(
    (total, action) => total + action.co2Reduction * action.count,
    0
  );

  const treesEquivalent = Math.floor(totalCO2Reduction / 10);

  const getImpactClass = (co2Saved) => {
    if (co2Saved < 0.5) return "impact-low";
    if (co2Saved < 1) return "impact-medium";
    return "impact-high";
  };

  return (
    <div className="impact-summary-card">
      <div className="card-header">
        <h2 className="card-title">Impact Summary</h2>
      </div>
      <div className="card-content">
        {trackedActions.length === 0 ? (
          <div className="empty-state">No actions tracked yet</div>
        ) : (
          <>
            <div className={`impact-summary ${getImpactClass(totalCO2Reduction)}`}>
              <div className="total-reduction">
                Total CO₂ Reduction: {totalCO2Reduction.toFixed(2)} kg
              </div>
              {treesEquivalent > 0 && (
                <div className="trees-equivalent">
                  Equivalent to {treesEquivalent} trees planted! 🌳
                </div>
              )}
            </div>
            
            <div className="tracked-actions">
              {trackedActions.map((action) => (
                <Action
                  key={action.id}
                  action={action}
                  onDelete={onDelete}
                />
              ))}
            </div>
            
            <button 
              className="clear-button"
              onClick={onClear}
            >
              Clear All Actions
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImpactSummary;