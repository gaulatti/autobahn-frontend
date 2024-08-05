class WebSocketManager {
  private socket: WebSocket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_API_FQDN}/prod`);
  private isConnected: boolean = false;
  private messageQueue: object[] = [];
  private reconnectInterval: number = 5000;
  private static instance: WebSocketManager;

  public static getInstance = () => {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }

    return WebSocketManager.instance;
  };

  private constructor() {
    this.connect();
  }

  private connect() {
    this.socket.onopen = () => {
      console.log('WebSocket connection established');
      this.isConnected = true;
      this.flushMessageQueue();
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error', error);
      this.isConnected = false;
    };

    this.socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
    };

    this.socket.onclose = () => {
      console.warn('WebSocket connection closed. Attempting to reconnect...');
      this.isConnected = false;
      setTimeout(() => this.connect(), this.reconnectInterval);
    };
  }

  private flushMessageQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.sendMessage(message);
      }
    }
  }

  public sendMessage(message: object) {
    if (this.isConnected && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.connect;
      console.warn('WebSocket is not open. Queueing message.');
      this.messageQueue.push(message);
    }
  }
}

export { WebSocketManager };
