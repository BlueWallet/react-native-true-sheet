import { PureComponent, type ReactNode } from 'react';
import type { TrueSheetProps } from './TrueSheet.types';
interface TrueSheetState {
    contentHeight?: number;
    footerHeight?: number;
    scrollableHandle: number | null;
}
export declare class TrueSheet extends PureComponent<TrueSheetProps, TrueSheetState> {
    displayName: string;
    private readonly ref;
    /**
     * Map of sheet names against their handle.
     */
    private static readonly handles;
    constructor(props: TrueSheetProps);
    private static getHandle;
    /**
     * Present the sheet by given `name`.
     * See `name` prop.
     */
    static present(name: string, index?: number): Promise<void>;
    /**
     * Dismiss the sheet by given `name`.
     * See `name` prop.
     */
    static dismiss(name: string): Promise<void>;
    /**
     * Resize the sheet by given `name`.
     * See `name` prop.
     */
    static resize(name: string, index: number): Promise<void>;
    private get handle();
    private updateState;
    private onSizeChange;
    private onPresent;
    private onFooterLayout;
    private onContentLayout;
    private onDismiss;
    private onMount;
    /**
     * Present the sheet. Optionally accepts a size `index`.
     * See `sizes` prop
     */
    present(index?: number): Promise<void>;
    /**
     * Resizes the Sheet programmatically by `index`.
     * This is an alias of the `present(index)` method.
     */
    resize(index: number): Promise<void>;
    /**
     * Dismisses the Sheet
     */
    dismiss(): Promise<void>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    render(): ReactNode;
}
export {};
//# sourceMappingURL=TrueSheet.d.ts.map