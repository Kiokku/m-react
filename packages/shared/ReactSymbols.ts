// 判断当前宿主环境是否支持Symbol
const supportSymbol = typeof Symbol === 'function' && Symbol.for;

export const REACT_ELEMENT_TYPE = supportSymbol
	? Symbol.for('react.element')
	: 0xeac7;

// Magic number
// 0xeac7 是 16 进制表示的 60615，这是 React 内部用于标识元素类型的魔数
// 0xeac8 是 16 进制表示的 60616，这是 React 内部用于标识 Portal 的魔数
// 0xeac9 是 16 进制表示的 60617，这是 React 内部用于标识 Fragment 的魔数
// 0xeaca 是 16 进制表示的 60618，这是 React 内部用于标识 StrictMode 的魔数
// etc.
