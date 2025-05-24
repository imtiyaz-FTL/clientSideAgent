import type { WindowInfo, IActiveWindow, InitializeOptions } from './types';
declare class ActiveWindowClass implements IActiveWindow {
    private options;
    private encodeWindowInfo;
    initialize(options?: InitializeOptions): void;
    requestPermissions(): boolean;
    getActiveWindow(): WindowInfo;
    subscribe(callback: (windowInfo: WindowInfo | null) => void): number;
    unsubscribe(watchId: number): void;
}
declare const ActiveWindow: ActiveWindowClass;
export * from './types';
export { ActiveWindow };
export default ActiveWindow;
