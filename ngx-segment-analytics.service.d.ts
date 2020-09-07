import { WindowWrapper } from './ngx-segment-analytics.module';
import { SegmentConfig } from './ngx-segment-analytics.config';
/** @dynamic */
export declare class SegmentService {
    private w;
    private doc;
    private config;
    /**
     * @param w Browser window
     * @param doc Browser DOM
     * @param config Segment configuration
     */
    constructor(w: WindowWrapper, doc: Document, config: SegmentConfig);
    /**
     * The identify method is how you associate your users and their actions to a recognizable userId and traits.
     *
     * @param userId The database ID for the user.
     * @param traits A dictionary of traits you know about the user, like their email or name
     * @param options A dictionary of options.
     *
     * @returns
     */
    identify(userId?: string, traits?: any, options?: any): Promise<SegmentService>;
    /**
     * The track method lets you record any actions your users perform.
     *
     * @param event The name of the event you’re tracking.
     * @param properties A dictionary of properties for the event.
     * @param options A dictionary of options.
     *
     * @returns
     */
    track(event: string, properties?: any, options?: any): Promise<SegmentService>;
    /**
     * The page method lets you record page views on your website, along with optional extra information about the page being viewed.
     *
     * @param name The name of the page.
     * @param properties A dictionary of properties of the page.
     * @param options A dictionary of options.
     *
     * @returns
     */
    page(name?: string, properties?: any, options?: any): Promise<SegmentService>;
    /**
     * The page method lets you record page views on your website, along with optional extra information about the page being viewed.
     *
     * @param category The category of the page.
     * @param name The name of the page.
     * @param properties A dictionary of properties of the page.
     * @param options A dictionary of options.
     *
     * @returns
     */
    page(category: string, name: string, properties?: any, options?: any): Promise<SegmentService>;
    /**
     * The group method associates an identified user with a company, organization, project, workspace, team, tribe, platoon,
     * assemblage, cluster, troop, gang, party, society or any other name you came up with for the same concept.
     *
     * @param groupId The Group ID to associate with the current user.
     * @param traits A dictionary of traits for the group.
     *
     * @returns
     */
    group(groupId: string, traits?: any): Promise<SegmentService>;
    /**
     * The alias method combines two previously unassociated user identities.
     *
     * @param userId The new user ID you want to associate with the user.
     * @param previousId The previous ID that the user was recognized by. This defaults to the currently identified user’s ID.
     * @param options A dictionary of options.
     *
     * @returns
     */
    alias(userId: string, previousId?: string, options?: any): Promise<SegmentService>;
    /**
     * The ready method allows you execute a promise that will be called as soon as all of your enabled destinations have loaded
     * and analytics.js has completed initialization.
     *
     * @returns
     */
    ready(): Promise<SegmentService>;
    /**
     * Return informations about the currently identified user
     *
     * @returns Informations about the currently identified user
     */
    user(): any;
    /**
     * Return identifier about the currently identified user
     *
     * @returns Identifier about the currently identified user
     */
    id(): string | null;
    /**
     * Return traits about the currently identified user
     *
     * @returns Traits about the currently identified user
     */
    traits(): any;
    /**
     * Reset the id, including anonymousId, and clear traits for the currently identified user and group.
     */
    reset(): void;
    /**
     * Turn on/off debug mode, logging helpful messages to the console.
     *
     * @param enabled Enable or not the debug mode
     */
    debug(enabled?: boolean): void;
    /**
     * Set listeners for these events and run your own custom code.
     *
     * @param method Name of the method to listen for
     * @param callback A function to execute after each the emitted method
     */
    on(method: string, callback: (event?: string, properties?: any, options?: any) => any): void;
    /**
     * Attaches the `track` call as a handler to a link
     *
     * @param elements DOM element or an array of DOM elements to be bound with track method.
     * @param event The name of the event, passed to the `track` method or a function that returns a string to be used
     *              as the name of the track event.
     * @param properties A dictionary of properties to pass with the `track` method.
     */
    trackLink(elements: HTMLElement | HTMLElement[], event: string | Function, properties?: any | Function): void;
    /**
     * Binds a `track` call to a form submission.
     *
     * @param forms The form element to track or an array of form
     * @param event The name of the event, passed to the `track` method.
     * @param properties A dictionary of properties to pass with the `track` method.
     */
    trackForm(forms: HTMLElement | HTMLElement[], event: string | Function, properties?: any | Function): void;
    /**
     * Set the length (in milliseconds) of the callbacks and helper functions
     *
     * @param timeout Number of milliseconds
     */
    timeout(timeout: number): void;
    /**
     * Add a source middleware called on events
     *
     * @param middleware Custom function
     */
    addSourceMiddleware(middleware: ({integrations, payload, next}) => void): void;
}
