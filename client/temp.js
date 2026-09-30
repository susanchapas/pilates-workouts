import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/pages/OverviewPage.tsx");const React = __vite__cjsImport0_react;const _jsxDEV = __vite__cjsImport2_react_jsxDevRuntime["jsxDEV"];import __vite__cjsImport0_react from "/node_modules/.vite/deps/react.js?v=4e4eacfb";
import { useNavigate } from "/node_modules/.vite/deps/react-router-dom.js?v=f9212062";
var _jsxFileName = "/Users/susanchapas/code/pilates-workouts/client/src/pages/OverviewPage.tsx";
import __vite__cjsImport2_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=4e4eacfb";
var _s = $RefreshSig$();
// Mock data for demo
const mockExercises = [
	{
		id: "1",
		name: "Hundred",
		muscleGroup: "Core",
		difficulty: 1,
		equipment: ["mat"],
		duration: 60,
		instructions: "..."
	},
	{
		id: "2",
		name: "Roll Up",
		muscleGroup: "Core",
		difficulty: 2,
		equipment: ["mat"],
		duration: 60,
		instructions: "..."
	},
	{
		id: "3",
		name: "Teaser",
		muscleGroup: "Core",
		difficulty: 3,
		equipment: ["mat"],
		duration: 60,
		instructions: "..."
	},
	{
		id: "4",
		name: "Swan",
		muscleGroup: "Back",
		difficulty: 2,
		equipment: ["mat"],
		duration: 60,
		instructions: "..."
	},
	{
		id: "5",
		name: "Childs Pose",
		muscleGroup: "Full Body",
		difficulty: 1,
		equipment: ["mat"],
		duration: 60,
		instructions: "..."
	}
];
export const OverviewPage = () => {
	_s();
	const navigate = useNavigate();
	return /* @__PURE__ */ _jsxDEV("div", {
		className: "min-h-screen bg-gray-50 p-6 max-w-4xl mx-auto",
		children: [
			/* @__PURE__ */ _jsxDEV("h1", {
				className: "text-3xl font-bold text-gray-900 mb-8 mt-4",
				children: "Your Routine is Ready"
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 19,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white shadow rounded-lg overflow-hidden mb-8",
				children: [/* @__PURE__ */ _jsxDEV("div", {
					className: "px-6 py-4 border-b border-gray-200",
					children: /* @__PURE__ */ _jsxDEV("h2", {
						className: "text-xl font-semibold text-gray-800",
						children: "45-Minute Core Focus"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 23,
						columnNumber: 11
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 22,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("table", {
					className: "min-w-full divide-y divide-gray-200",
					children: [/* @__PURE__ */ _jsxDEV("thead", {
						className: "bg-gray-50",
						children: /* @__PURE__ */ _jsxDEV("tr", { children: [
							/* @__PURE__ */ _jsxDEV("th", {
								className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Exercise"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 28,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("th", {
								className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Target"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 29,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("th", {
								className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Time"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 30,
								columnNumber: 15
							}, this),
							/* @__PURE__ */ _jsxDEV("th", {
								className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
								children: "Difficulty"
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 31,
								columnNumber: 15
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 27,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 26,
						columnNumber: 11
					}, this), /* @__PURE__ */ _jsxDEV("tbody", {
						className: "bg-white divide-y divide-gray-200",
						children: mockExercises.map((ex, idx) => /* @__PURE__ */ _jsxDEV("tr", { children: [
							/* @__PURE__ */ _jsxDEV("td", {
								className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
								children: ex.name
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 37,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("td", {
								className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
								children: ex.muscleGroup
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 38,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("td", {
								className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
								children: [ex.duration, "s"]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 39,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ _jsxDEV("td", {
								className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
								children: /* @__PURE__ */ _jsxDEV("div", {
									className: "flex space-x-1",
									children: [
										1,
										2,
										3
									].map((level) => /* @__PURE__ */ _jsxDEV("div", { className: `h-2 w-4 rounded ${level <= ex.difficulty ? "bg-blue-600" : "bg-gray-200"}` }, level, false, {
										fileName: _jsxFileName,
										lineNumber: 43,
										columnNumber: 23
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 41,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 40,
								columnNumber: 17
							}, this)
						] }, idx, true, {
							fileName: _jsxFileName,
							lineNumber: 36,
							columnNumber: 15
						}, this))
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 34,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 25,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 21,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "bg-white shadow rounded-lg p-6 mb-8",
				children: [/* @__PURE__ */ _jsxDEV("h3", {
					className: "text-lg font-semibold text-gray-800 mb-4",
					children: "Difficulty Arc"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 54,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("div", {
					className: "h-32 flex items-end space-x-2",
					children: mockExercises.map((ex, idx) => /* @__PURE__ */ _jsxDEV("div", {
						className: "flex-1 flex flex-col justify-end group relative h-full",
						children: [/* @__PURE__ */ _jsxDEV("div", {
							className: "bg-blue-500 rounded-t w-full transition-all",
							style: { height: `${ex.difficulty / 3 * 100}%` }
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 58,
							columnNumber: 15
						}, this), /* @__PURE__ */ _jsxDEV("div", {
							className: "absolute bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs p-1 rounded whitespace-nowrap z-10 left-1/2 transform -translate-x-1/2",
							children: ex.name
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 62,
							columnNumber: 15
						}, this)]
					}, idx, true, {
						fileName: _jsxFileName,
						lineNumber: 57,
						columnNumber: 13
					}, this))
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 55,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 53,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ _jsxDEV("div", {
				className: "flex justify-end space-x-4",
				children: [/* @__PURE__ */ _jsxDEV("button", {
					onClick: () => navigate("/"),
					className: "px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium",
					children: "Back"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 71,
					columnNumber: 9
				}, this), /* @__PURE__ */ _jsxDEV("button", {
					onClick: () => navigate("/player"),
					className: "px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium",
					children: "Start Workout"
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 77,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 70,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 18,
		columnNumber: 5
	}, this);
};
_s(OverviewPage, "CzcTeTziyjMsSrAVmHuCCb6+Bfg=", false, function() {
	return [useNavigate];
});
_c = OverviewPage;
var _c;
$RefreshReg$(_c, "OverviewPage");
import * as RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
import * as __vite_react_currentExports from "/src/pages/OverviewPage.tsx?t=1790811646432";
if (import.meta.hot && !inWebWorker) {
  if (!window.$RefreshReg$) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong."
    );
  }

  const currentExports = __vite_react_currentExports;
  queueMicrotask(() => {
    RefreshRuntime.registerExportsForReactRefresh("/Users/susanchapas/code/pilates-workouts/client/src/pages/OverviewPage.tsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate("/Users/susanchapas/code/pilates-workouts/client/src/pages/OverviewPage.tsx", currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}
function $RefreshReg$(type, id) { return RefreshRuntime.register(type, "/Users/susanchapas/code/pilates-workouts/client/src/pages/OverviewPage.tsx" + ' ' + id); }
function $RefreshSig$() { return RefreshRuntime.createSignatureFunctionForTransform(); }

//# sourceMappingURL=data:application/json;base64,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SUFDRTs7OztZQUNGOzs7Ozs7R0FFTCx3QkFBQyxPQUFEO0lBQUssV0FBVTtjQUFmLENBQ0Usd0JBQUMsVUFBRDtLQUNFLGVBQWUsU0FBUyxHQUFHO0tBQzNCLFdBQVU7ZUFDWDtJQUVPOzs7O2NBQ1Isd0JBQUMsVUFBRDtLQUNFLGVBQWUsU0FBUyxTQUFTO0tBQ2pDLFdBQVU7ZUFDWDtJQUVPOzs7O1lBQ0w7Ozs7OztFQUNGOzs7Ozs7QUFFVCIsIm5hbWVzIjpbXSwic291cmNlcyI6WyJPdmVydmlld1BhZ2UudHN4Il0sInZlcnNpb24iOjMsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VOYXZpZ2F0ZSB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHR5cGUgeyBFeGVyY2lzZSB9IGZyb20gJy4uL3R5cGVzL2V4ZXJjaXNlJztcblxuLy8gTW9jayBkYXRhIGZvciBkZW1vXG5jb25zdCBtb2NrRXhlcmNpc2VzOiBFeGVyY2lzZVtdID0gW1xuICB7IGlkOiAnMScsIG5hbWU6ICdIdW5kcmVkJywgbXVzY2xlR3JvdXA6ICdDb3JlJywgZGlmZmljdWx0eTogMSwgZXF1aXBtZW50OiBbJ21hdCddLCBkdXJhdGlvbjogNjAsIGluc3RydWN0aW9uczogJy4uLicgfSxcbiAgeyBpZDogJzInLCBuYW1lOiAnUm9sbCBVcCcsIG11c2NsZUdyb3VwOiAnQ29yZScsIGRpZmZpY3VsdHk6IDIsIGVxdWlwbWVudDogWydtYXQnXSwgZHVyYXRpb246IDYwLCBpbnN0cnVjdGlvbnM6ICcuLi4nIH0sXG4gIHsgaWQ6ICczJywgbmFtZTogJ1RlYXNlcicsIG11c2NsZUdyb3VwOiAnQ29yZScsIGRpZmZpY3VsdHk6IDMsIGVxdWlwbWVudDogWydtYXQnXSwgZHVyYXRpb246IDYwLCBpbnN0cnVjdGlvbnM6ICcuLi4nIH0sXG4gIHsgaWQ6ICc0JywgbmFtZTogJ1N3YW4nLCBtdXNjbGVHcm91cDogJ0JhY2snLCBkaWZmaWN1bHR5OiAyLCBlcXVpcG1lbnQ6IFsnbWF0J10sIGR1cmF0aW9uOiA2MCwgaW5zdHJ1Y3Rpb25zOiAnLi4uJyB9LFxuICB7IGlkOiAnNScsIG5hbWU6ICdDaGlsZHMgUG9zZScsIG11c2NsZUdyb3VwOiAnRnVsbCBCb2R5JywgZGlmZmljdWx0eTogMSwgZXF1aXBtZW50OiBbJ21hdCddLCBkdXJhdGlvbjogNjAsIGluc3RydWN0aW9uczogJy4uLicgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBPdmVydmlld1BhZ2U6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBuYXZpZ2F0ZSA9IHVzZU5hdmlnYXRlKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBiZy1ncmF5LTUwIHAtNiBtYXgtdy00eGwgbXgtYXV0b1wiPlxuICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQtM3hsIGZvbnQtYm9sZCB0ZXh0LWdyYXktOTAwIG1iLTggbXQtNFwiPllvdXIgUm91dGluZSBpcyBSZWFkeTwvaDE+XG4gICAgICBcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctd2hpdGUgc2hhZG93IHJvdW5kZWQtbGcgb3ZlcmZsb3ctaGlkZGVuIG1iLThcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC02IHB5LTQgYm9yZGVyLWIgYm9yZGVyLWdyYXktMjAwXCI+XG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1zZW1pYm9sZCB0ZXh0LWdyYXktODAwXCI+NDUtTWludXRlIENvcmUgRm9jdXM8L2gyPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cIm1pbi13LWZ1bGwgZGl2aWRlLXkgZGl2aWRlLWdyYXktMjAwXCI+XG4gICAgICAgICAgPHRoZWFkIGNsYXNzTmFtZT1cImJnLWdyYXktNTBcIj5cbiAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPkV4ZXJjaXNlPC90aD5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlRhcmdldDwvdGg+XG4gICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweC02IHB5LTMgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tZWRpdW0gdGV4dC1ncmF5LTUwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5UaW1lPC90aD5cbiAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB4LTYgcHktMyB0ZXh0LWxlZnQgdGV4dC14cyBmb250LW1lZGl1bSB0ZXh0LWdyYXktNTAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPkRpZmZpY3VsdHk8L3RoPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgIDx0Ym9keSBjbGFzc05hbWU9XCJiZy13aGl0ZSBkaXZpZGUteSBkaXZpZGUtZ3JheS0yMDBcIj5cbiAgICAgICAgICAgIHttb2NrRXhlcmNpc2VzLm1hcCgoZXgsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICA8dHIga2V5PXtpZHh9PlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LWdyYXktOTAwXCI+e2V4Lm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHgtNiBweS00IHdoaXRlc3BhY2Utbm93cmFwIHRleHQtc20gdGV4dC1ncmF5LTUwMFwiPntleC5tdXNjbGVHcm91cH08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSB0ZXh0LWdyYXktNTAwXCI+e2V4LmR1cmF0aW9ufXM8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweC02IHB5LTQgd2hpdGVzcGFjZS1ub3dyYXAgdGV4dC1zbSB0ZXh0LWdyYXktNTAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggc3BhY2UteC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIHtbMSwyLDNdLm1hcChsZXZlbCA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2xldmVsfSBjbGFzc05hbWU9e2BoLTIgdy00IHJvdW5kZWQgJHtsZXZlbCA8PSBleC5kaWZmaWN1bHR5ID8gJ2JnLWJsdWUtNjAwJyA6ICdiZy1ncmF5LTIwMCd9YH0gLz5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHNoYWRvdyByb3VuZGVkLWxnIHAtNiBtYi04XCI+XG4gICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtc2VtaWJvbGQgdGV4dC1ncmF5LTgwMCBtYi00XCI+RGlmZmljdWx0eSBBcmM8L2gzPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMzIgZmxleCBpdGVtcy1lbmQgc3BhY2UteC0yXCI+XG4gICAgICAgICAge21vY2tFeGVyY2lzZXMubWFwKChleCwgaWR4KSA9PiAoXG4gICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWVuZCBncm91cCByZWxhdGl2ZSBoLWZ1bGxcIj5cbiAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ibHVlLTUwMCByb3VuZGVkLXQgdy1mdWxsIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyBoZWlnaHQ6IGAkeyhleC5kaWZmaWN1bHR5IC8gMykgKiAxMDB9JWAgfX1cbiAgICAgICAgICAgICAgPjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS1mdWxsIG1iLTIgaGlkZGVuIGdyb3VwLWhvdmVyOmJsb2NrIGJnLWdyYXktODAwIHRleHQtd2hpdGUgdGV4dC14cyBwLTEgcm91bmRlZCB3aGl0ZXNwYWNlLW5vd3JhcCB6LTEwIGxlZnQtMS8yIHRyYW5zZm9ybSAtdHJhbnNsYXRlLXgtMS8yXCI+XG4gICAgICAgICAgICAgICAge2V4Lm5hbWV9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWVuZCBzcGFjZS14LTRcIj5cbiAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnLycpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTYgcHktMyBib3JkZXIgYm9yZGVyLWdyYXktMzAwIHJvdW5kZWQtbGcgdGV4dC1ncmF5LTcwMCBob3ZlcjpiZy1ncmF5LTUwIGZvbnQtbWVkaXVtXCJcbiAgICAgICAgPlxuICAgICAgICAgIEJhY2tcbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gbmF2aWdhdGUoJy9wbGF5ZXInKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJweC02IHB5LTMgYmctYmx1ZS02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGhvdmVyOmJnLWJsdWUtNzAwIGZvbnQtbWVkaXVtXCJcbiAgICAgICAgPlxuICAgICAgICAgIFN0YXJ0IFdvcmtvdXRcbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXX0=