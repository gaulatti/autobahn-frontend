import { EventSourcePlus } from 'event-source-plus';

/**
 * Manages SSE connections using event-source-plus and provides methods for receiving messages.
 *
 * @remarks
 * The SSEManager class establishes an SSE connection with advanced features such as custom headers,
 * customizable retry strategies, and event hooks. It follows the singleton pattern to ensure only one instance
 * of SSEManager is created.
 *
 * @example
 * ```typescript
 * const manager = SSEManager.getInstance('your-auth-token');
 * manager.addListener((message) => {
 *   console.log('Received message:', message);
 * });
 * ```
 */
class SSEManager {
  /**
   * The singleton instance of SSEManager.
   */
  private static instance: SSEManager;

  /**
   * The EventSourcePlus instance used to establish the SSE connection.
   */
  private eventSource: EventSourcePlus | null = null;

  /**
   * The list of listener functions to process incoming messages.
   */
  private listeners: ((message: any) => void)[] = [];

  /**
   * The maximum number of retries to attempt before giving up.
   */
  private maxRetryCount = 100;

  /**
   * The maximum interval between retries in milliseconds.
   */
  private maxRetryInterval = 30000;

  /**
   * Returns the singleton instance of SSEManager.
   *
   * @param token - The authorization token to include in the connection.
   * @returns The singleton instance of SSEManager.
   */
  public static getInstance(token?: string): SSEManager {
    if (!SSEManager.instance) {
      SSEManager.instance = new SSEManager(token!);
    }
    return SSEManager.instance;
  }

  /**
   * Constructs a new instance of SSEManager.
   *
   * @param token - The authorization token to include in the connection.
   */
  private constructor(token: string) {
    this.connect(token);
  }

  /**
   * Establishes a Server-Sent Events (SSE) connection using the provided token.
   * The connection will be made to the appropriate host based on the current environment.
   *
   * @param token - The authentication token to be used for the SSE connection.
   *
   * The method initializes an `EventSourcePlus` instance with the specified headers and retry configurations.
   * It sets up listeners for various events such as message reception, request initiation, response reception,
   * response errors, and request errors.
   *
   * - `onMessage`: Parses the received message data and notifies all registered listeners.
   * - `onRequest`: Logs the initiation of a request.
   * - `onResponse`: Logs the status of the received response.
   * - `onResponseError`: Logs the status and body of a response error.
   * - `onRequestError`: Logs any errors that occur during the request.
   *
   * Logs are generated to indicate the initialization and successful establishment of the SSE connection.
   */
  private connect(token: string) {
    console.log('Initializing SSE connection...');
    const sseHost = window.location.origin.includes('localhost') ? `http://localhost:3000` : import.meta.env.VITE_API_FQDN;
    this.eventSource = new EventSourcePlus(`${sseHost}/notifications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      maxRetryCount: this.maxRetryCount,
      maxRetryInterval: this.maxRetryInterval,
    });

    this.eventSource.listen({
      onMessage: (message) => {
        const messagePayload = JSON.parse(message.data);
        this.listeners.forEach((listener) => listener(messagePayload));
      },
      onRequest: ({ request, options }) => {
        console.log('Request initiated:', request, options);
      },
      onResponse: ({ response }) => {
        console.log('Response received:', response.status);
      },
      onResponseError: ({ response }) => {
        console.error('Response error:', response.status, response.body);
      },
      onRequestError: ({ error }) => {
        console.error('Request error:', error);
      },
    });

    console.log('SSE connection initialized.');
  }

  /**
   * Adds a listener function to process incoming messages.
   *
   * @param func - The listener function to be added.
   */
  public addListener(func: (message: any) => void) {
    this.listeners.push(func);
  }

  /**
   * Removes a previously added listener function.
   *
   * @param func - The listener function to be removed.
   */
  public removeListener(func: (message: any) => void) {
    this.listeners = this.listeners.filter((listener) => listener !== func);
  }

  /**
   * Closes the SSE connection.
   *
   * @remarks
   * This method should be called when the SSE connection is no longer needed.
   */
  public close() {
    if (this.eventSource) {
      this.eventSource = null;
      console.log('SSE connection terminated.');
    }
  }
}

export { SSEManager };
