export class Logger {
  constructor() {
    this.logs = [];
  }

  info(message) {
    this.logs.push(`[${new Date().toISOString()}] [INFO] ${message}`);
  }

  error(message) {
    this.logs.push(`[${new Date().toISOString()}] [ERROR] ${message}`);
  }

  getLogs() {
    return this.logs.join('\n');
  }


  clear() {
    this.logs = [];
  }

}