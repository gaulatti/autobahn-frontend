/**
 * Manages WebSocket connections and provides methods for sending and receiving messages.
 *
 * @remarks
 * The WebSocketManager class is responsible for establishing a WebSocket connection and handling events such as onopen, onerror, onmessage, and onclose. It provides methods for adding listeners, sending messages, and flushing the message queue.
 * The class follows the singleton pattern, ensuring that only one instance of WebSocketManager is created.
 *
 * @example
 * ```typescript
 * const manager = WebSocketManager.getInstance();
 * manager.addListener((message) => {
 *   console.log('Received message:', message);
 * });
 * manager.sendMessage({ type: 'chat', content: 'Hello, world!' });
 * ```
 */
class WebSocketManager {
  private socket: WebSocket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_API_FQDN}/prod`);
  private isConnected: boolean = false;
  private messageQueue: object[] = [];
  private reconnectInterval: number = 5000;
  private static instance: WebSocketManager;

  private listeners: ((message: any) => void)[] = [];

  /**
   * Returns the singleton instance of WebSocketManager.
   *
   * @returns The singleton instance of WebSocketManager.
   */
  public static getInstance = () => {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }

    return WebSocketManager.instance;
  };

  /**
   * Constructs a new instance of the `sockets` class.
   * This private constructor is called internally to initialize the class.
   * It automatically calls the `connect` method to establish a connection.
   */
  private constructor() {
    this.connect();
  }

  /**
   * Establishes a WebSocket connection.
   *
   * @remarks
   * This method sets up event listeners for the WebSocket connection, including onopen, onerror, onmessage, and onclose.
   * When the connection is successfully established, the onopen event is triggered and the message queue is flushed.
   * If an error occurs during the connection, the onerror event is triggered and the isConnected flag is set to false.
   * When a message is received from the server, the onmessage event is triggered and the message is logged to the console.
   * If the connection is closed, the onclose event is triggered and an attempt to reconnect is made after a specified interval.
   */
  private connect = () => {
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
      this.listeners.forEach((listener) => listener(JSON.parse(event.data)));
    };

    this.socket.onclose = () => {
      console.warn('WebSocket connection closed. Attempting to reconnect...');
      this.isConnected = false;
      setTimeout(() => this.connect(), this.reconnectInterval);
    };
  };

  /**
   * Adds a listener function to the list of listeners.
   *
   * @param func - The listener function to be added.
   */
  public addListener = (func: (message: any) => void) => {
    this.listeners.push(func);
  };

  /**
   * Flushes the message queue by sending each message in the queue.
   */
  private flushMessageQueue = () => {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.sendMessage(message);
      }
    }
  };

  /**
   * Sends a message through the WebSocket connection.
   * If the WebSocket is open, the message is sent immediately.
   * If the WebSocket is not open, the message is queued for sending once the connection is established.
   * @param message - The message to be sent.
   */
  public sendMessage = (message: object) => {
    if (this.isConnected && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.connect;
      console.warn('WebSocket is not open. Queueing message.');
      this.messageQueue.push(message);
    }
  };
}

export { WebSocketManager };
