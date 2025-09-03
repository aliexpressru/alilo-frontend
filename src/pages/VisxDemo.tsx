// /* eslint-disable arrow-body-style */
// import React, { useState } from 'react';
// import { FlexibleHeightXYPlot, VerticalGridLines, HorizontalGridLines, LineMarkSeries, XAxis, YAxis, LineMarkSeriesPoint, Hint } from 'react-vis';
// import 'react-vis/dist/style.css';
// import RunReportCheckoutMock from './../mocks/RunReportCheckoutMock.json';
// import { GetRunReportResponse } from '../types/RunReportTypes';
// // const data = [
// //     { x: 0, y: 8 },
// //     { x: 1, y: 5 },
// //     { x: 2, y: 4 },
// //     { x: 3, y: 9 },
// //     { x: 4, y: 1 },
// //     { x: 5, y: 7 },
// //     { x: 6, y: 6 },
// //     { x: 7, y: 3 },
// //     { x: 8, y: 2 },
// //     { x: 9, y: 0 }
// // ];

// const VisxDemo: React.FC = () => {
//     // eslint-disable-next-line max-len
//     const [hintValue, setHintValue] = useState<LineMarkSeriesPoint | null>(null);

//     const mockData = RunReportCheckoutMock as GetRunReportResponse;
//     const mockScript = mockData.script_summary[0];
//     const mockMetric = mockScript.script_runs_metrics[0];
//     const mockValues = mockMetric.data.result
//         ? mockMetric.data.result[0].values
//         : [];
//     const mockGraphData = mockValues.map((v) => {
//         return {
//             x: v.timestamp,
//             y: v.data ?? 0
//         };
//     });

//     return (<FlexibleHeightXYPlot height={400} width={900}>
//         <VerticalGridLines />
//         <HorizontalGridLines />
//         <XAxis />
//         <YAxis />
//         <LineMarkSeries
//             className="linemark-series-example"
//             style={{
//                 // strokeWidth: '3px'
//             }}
//             // lineStyle={{ stroke: 'red' }}
//             // markStyle={{ stroke: 'blue' }}
//             // data={[{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }]}
//             // eslint-disable-next-line max-len
//             data={mockGraphData}
//             onValueMouseOver={(datapoint) => setHintValue(datapoint)}
//             onValueMouseOut={() => setHintValue(null)}
//         />
//         <LineMarkSeries
//             className="linemark-series-example"
//             style={{
//                 // strokeWidth: '3px'
//             }}
//             // lineStyle={{ stroke: 'red' }}
//             // markStyle={{ stroke: 'blue' }}
//             // data={[{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }]}
//             // eslint-disable-next-line max-len
//             data={mockGraphData}
//             onValueMouseOver={(datapoint) => setHintValue(datapoint)}
//             onValueMouseOut={() => setHintValue(null)}
//         />
//         {/* <LineMarkSeries
//             className="linemark-series-example-2"
//             curve={'curveMonotoneX'}
//             data={[{ x: 1, y: 11 }, { x: 1.5, y: 29 }, { x: 3, y: 7 }]}
//             onValueMouseOver={(datapoint) => setHintValue(datapoint)}
//             onValueMouseOut={() => setHintValue(null)}
//         /> */}
//         {hintValue && <Hint value={hintValue} />}
//     </FlexibleHeightXYPlot>);
// };

// export default VisxDemo;
