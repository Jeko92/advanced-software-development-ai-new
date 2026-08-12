type Handler<Payload> = (payload: Payload) => void;

export class EventEmitter<Events extends Record<string, unknown>> {
  private handlers: { [K in keyof Events]?: Handler<Events[K]>[] } = {};

  on<K extends keyof Events>(event: K, handler: Handler<Events[K]>): void {
    const existing = this.handlers[event];

    if (existing) {
      existing.push(handler);
    } else {
      this.handlers[event] = [handler];
    }
  }

  emit<K extends keyof Events>(event: K, payload: Events[K]): void {
    const listeners = this.handlers[event];

    if (!listeners) {
      return;
    }

    for (const handler of listeners) {
      handler(payload);
    }
  }
}
