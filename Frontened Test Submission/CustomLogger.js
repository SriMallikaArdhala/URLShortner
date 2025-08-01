class CustomLogger {
  log(message, data = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      data,
      level: 'INFO'
    };
    
    // In a real app, this would send to a logging service
    console.log('[CustomLogger]', logEntry);
    
    // Store logs in localStorage for demo purposes
    const logs = JSON.parse(localStorage.getItem('appLogs')) || [];
    logs.push(logEntry);
    localStorage.setItem('appLogs', JSON.stringify(logs));
  }
  
  error(message, data = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      message,
      data,
      level: 'ERROR'
    };
    
    console.error('[CustomLogger]', logEntry);
    
    const logs = JSON.parse(localStorage.getItem('appLogs')) || [];
    logs.push(logEntry);
    localStorage.setItem('appLogs', JSON.stringify(logs));
  }
}

export default CustomLogger;