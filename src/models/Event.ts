export abstract class Event {
    abstract name: string;
    once: boolean = false;
    abstract execute(...args: any): Promise<void>;
}