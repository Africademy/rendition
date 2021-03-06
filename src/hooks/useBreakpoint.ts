import * as React from 'react';
import { BreakpointContext } from '../contexts/BreakpointContext';
import { breakpoints } from '../theme';

// Custom hook that return one of the passed values depending on the
// screen resolution and provider theme breakpoints.
// This allows to have different behaviors on different resolutions.
// Min values: 1; Max values: Theme breakpoints length
// Passing less than the max values the array will automatically be filled with the last value passed.
// E.g. tablet breakpoint: useBreakpoint(['mobile', 'tablet', 'landscape', 'desktop']) will return 'tablet'
export const useBreakpoint = <T extends any>(values: T[]): T => {
	if (values.length > breakpoints.length) {
		throw new Error(
			`There should be no more than ${breakpoints.length} value entries`,
		);
	}
	const { currentBreakpoint } = React.useContext(BreakpointContext);
	const missingValues = Array(breakpoints.length - values.length).fill(
		values[values.length - 1],
	);
	const newValues = [...values, ...missingValues];

	return newValues[currentBreakpoint];
};
