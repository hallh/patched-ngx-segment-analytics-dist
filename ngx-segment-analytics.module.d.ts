import { ModuleWithProviders, InjectionToken } from '@angular/core';
import { SegmentConfig } from './ngx-segment-analytics.config';
/** Segment Configuration Injection Token */
export declare const SEGMENT_CONFIG: InjectionToken<SegmentConfig>;
/**
 * Window Wrapper for Angular AOT
 */
export declare class WindowWrapper {
    /** Segment Analytics.js instance */
    analytics: any;
}
/**
 * Window Provider for Angular AOT
 * @returns Browser Window instance
 */
export declare function getWindow(platformId: any): {};
/**
 * Segment Module
 */
export declare class SegmentModule {
    /**
     * Segment Module Initialisation
     *
     * @param config Segment Configuration
     * @returns Segment Module
     */
    static forRoot(config?: SegmentConfig): ModuleWithProviders;
    /**
     * Segment Module Constructor
     *
     * @param parentModule Must be null
     */
    constructor(parentModule: SegmentModule);
}
