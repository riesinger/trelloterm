import {log} from "./log";

export class EventBus {
  private listeners: Map<string, Function[]>;

  constructor() {
    this.listeners = new Map();
  }

  public subscribeAsync = (topic: string): Promise<void> => {
    return new Promise((resolve) => {
      this.subscribeTo(topic, () => resolve());
    });
  }

  public subscribeTo = (topic: string, listener: Function) => {
    const currentListeners = this.listeners.get(topic) || [];
    this.listeners.set(topic, [listener, ...currentListeners]);
  }

  public publish = (topic: string, message?: any) => {
    log(`[EventBus] Publishing to topic ${topic}`, message);

    for (let listener of this.listeners.get(topic) || []) {
      listener(message);
    }
  }
}
