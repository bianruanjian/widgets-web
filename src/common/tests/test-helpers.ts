import { CustomComparator, harness } from '@dojo/test-extras/harness';
import { WidgetBaseInterface, WNode } from '@dojo/widget-core/interfaces';

export const isStringComparator = (value: any) => typeof value === 'string';
export const compareWidgetId = {
	selector: '*',
	property: 'id',
	comparator: isStringComparator
};

export const createHarness = (globalCompares: CustomComparator[]) => {
	return (renderFunction: () => WNode<WidgetBaseInterface>, compares: CustomComparator[] = []) => {
		return harness(renderFunction, [...globalCompares, ...compares]);
	};
};
