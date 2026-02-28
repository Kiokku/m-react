// ReactElement

import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	ElementType,
	Key,
	Ref,
	Props,
	ReactElementType
} from 'shared/ReactTypes';

const ReactElement = function (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
): ReactElementType {
	// ReactElement
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props,
		__mark: 'Mow'
	};

	return element;
};

export const jsx = (
	type: ElementType,
	config: any,
	...maybeChildren: any[]
) => {
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];
		if (prop === 'key') {
			if (val !== undefined) {
				key = '' + val;
			}
		} else if (prop === 'ref') {
			if (val !== undefined) {
				ref = val;
			}
		} else if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	// 处理 children
	const maybeChildrenLength = maybeChildren.length;
	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
