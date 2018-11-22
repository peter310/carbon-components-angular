import {
	Component,
	Input,
	ContentChildren,
	QueryList,
	AfterContentInit,
	ContentChild,
	Query
} from "@angular/core";
import { Tab } from "./tab.component";
import { TabHeaders } from "./tab-headers.component";


/**
 * Build out your application's tabs using this neutrino component.
 * This is the parent of the `Tab` and `TabHeader` components.
 *
 * `Tabs` expects a set of `n-tab` elements
 *
 * ```html
 * <ibm-tabs>
 * 	<ibm-tab heading='tab1'>
 * 		tab 1 content
 * 	</ibm-tab>
 * 	<ibm-tab heading='tab1'>
 * 		tab 2 content
 * 	</ibm-tab>
 * 	<!-- ... -->
 * 	<ibm-tab heading='tab1'>
 * 		tab n content
 * 	</ibm-tab>
 * </ibm-tabs>
 * ```
 *
 * @export
 * @class Tabs
 * @implements {AfterContentInit}
 */
@Component({
	selector: "ibm-tabs",
	template: `
			<ibm-tab-headers
				*ngIf="hasTabHeaders() && position === 'top'"
				[tabs]="tabs"
				[automaticActivation]="automaticActivation"
				[cacheActive]="cacheActive">
			</ibm-tab-headers>
			<ng-content></ng-content>
			<ibm-tab-headers
				*ngIf="hasTabHeaders() && position === 'bottom'"
				[tabs]="tabs"
				[cacheActive]="cacheActive">
			</ibm-tab-headers>
	 `
})
export class Tabs implements AfterContentInit {
	/**
	 * Takes either the string value 'top' or 'bottom' to place TabHeader
	 * relative to the `TabPanel`s.
	 * @type string
	 * @memberof Tabs
	 */
	@Input() position: "top" | "bottom" = "top";
	/**
	 * Set to 'true' to have `Tab` items cached and not reloaded on tab switching.
	 * @memberof Tabs
	 */
	@Input() cacheActive = false;
	/**
	 * Set to 'true' to have tabs automatically activated and have their content displayed when they recieve focus.
	 * @memberof Tabs
	 */
	@Input() automaticActivation = false;

	/**
	 * Maintains a `QueryList` of the `Tab` elements and updates if `Tab`s are added or removed.
	 * @type {QueryList<Tab>}
	 * @memberof Tabs
	 */
	@ContentChildren(Tab, { descendants: false }) tabs: QueryList<Tab>;
	/**
	 * Content child of the projected header component
	 */
	@ContentChild(TabHeaders) tabHeaders;

	/**
	 * After content is initialized update `Tab`s to cache (if turned on) and set the inital
	 * selected Tab item.
	 * @memberof Tabs
	 */
	ngAfterContentInit() {
		if (this.tabHeaders) {
			this.tabHeaders.cacheActive = this.cacheActive;
		}
	}

	/**
	 * true if the n-tab's are passed directly to the component as children
	 */
	hasTabHeaders() {
		return this.tabs.length > 0;
	}
}
