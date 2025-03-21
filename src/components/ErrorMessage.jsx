import '../styles/ErrorMessage.css';

function ErrorMessage({ error, className = "red-text", onDismiss }) {
  if (!error) return null;
  
  return (
    <div className={`error-message ${className}`}>
      {error}
      {onDismiss && (
        <button 
          className="btn-flat btn-small transparent right" 
          onClick={onDismiss}
        >
          ×
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;