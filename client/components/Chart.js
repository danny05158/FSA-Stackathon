// import React from 'react'
// import {appleStock} from '@vx/mock-data'
// import {Group} from '@vx/group'
// import {scaleTime, scaleLinear} from '@vx/scale'
// import {AreaClosed} from '@vx/shape'
// import {AxisLeft, AxisBottom} from '@vx/axis'
// import {LinearGradient} from '@vx/gradient'
// import {extent, max} from 'd3-array'
// import { connect } from 'react-redux'

// class Chart extends React.Component {

//       render() {

//         const width = 800
//         const height = 800

//         //every x and y value
//         const x = d => d.name
//         const y = d => d.importance

//         // Bounds
//         const margin = {
//           top: 60,
//           bottom: 60,
//           left: 80,
//           right: 80
//         }

//         // Margins
//         const xMax = width - margin.left - margin.right
//         const yMax = height - margin.top - margin.bottom

//         const xScale = scaleLinear({
//         range: [0, xMax],
//         domain: [1, extent(this.props.search, x)]

//         })

//       const yScale = scaleLinear({
//         range: [yMax, 0],
//         domain: [0, max(this.props.search, y)]
//       })

//     return (
//       <div>
//         <svg width={width} height={height}>
//           <LinearGradient from="#fbc2eb" to="#a6c1ee" id="gradient" />

//           <Group top={margin.top} left={margin.left}>

//             <AreaClosed
//               data={this.props.search}
//               xScale={xScale}
//               yScale={yScale}
//               x={x}
//               y={y}
//               fill={'url(#gradient)'}
//               stroke={''}
//             />

//             <AxisLeft
//               scale={yScale}
//               top={0}
//               left={0}
//               label={'Importance'}
//               stroke={'#1b1a1e'}
//               tickTextFill={'#1b1a1e'}
//             />

//             <AxisBottom
//               scale={xScale}
//               top={yMax}
//               label={'Words'}
//               stroke={'#1b1a1e'}
//               tickTextFill={'#1b1a1e'}
//             />
//           </Group>
//         </svg>
//       </div>
//     )
//   }
// }

// const mapState = state => ({
//   search: state.search
// })

// export default connect(mapState)(Chart)

import React, { Component } from 'react';
import { BarGroupHorizontal } from '@vx/shape';
import { Group } from '@vx/group';
import { AxisLeft } from '@vx/axis';
import { cityTemperature } from '@vx/mock-data';
import { scaleBand, scaleLinear, scaleOrdinal } from '@vx/scale';
import { timeParse, timeFormat } from 'd3-time-format';
import { extent, max } from 'd3-array';
import { connect } from 'react-redux'


const data = cityTemperature.slice(0, 4);
const keys = Object.keys(data[0]).filter(d => d !== 'date');
const parseDate = timeParse('%Y%m%d');
const format = timeFormat('%b %d');
const formatDate = date => format(parseDate(date));

// accessors
const y0 = d => d.date;
const x = d => d.value;


// const events = false
const width = 800
const height = 800

const margin = {
  top: 20,
  left: 50,
  right: 10,
  bottom: 0
}
  // graph bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - 100

  // scales
  const y0Scale = scaleBand({
    rangeRound: [0, yMax],
    domain: data.map(y0),
    padding: 0.2,
    //tickFormat: () => val => formatDate(val)
  });


  const y1Scale = scaleBand({
    rangeRound: [0, y0Scale.bandwidth()],
    domain: keys,
    padding: 0.1
  });

  const xScale = scaleLinear({
    rangeRound: [xMax, 0],
    domain: [
      0,
      max(data, d => {
        return max(keys, key => d[key]);
      })
    ]
  });

    const zScale = scaleOrdinal({
    domain: keys,
    range: ['#aeeef8', '#e5fd3d', '#9caff6']
  });


class Chart extends Component {
  render() {
    return (
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill='#612efb' rx={14} />
        <Group top={margin.top} left={margin.left}>
          <BarGroupHorizontal
            data={data}
            keys={keys}
            width={xMax}
            y0={y0}
            y0Scale={y0Scale}
            y1Scale={y1Scale}
            xScale={xScale}
            zScale={zScale}
            rx={4}
          />
          <AxisLeft
            scale={y0Scale}
            stroke="#e5fd3d"
            tickStroke="#e5fd3d"
            hideAxisLine
            tickLabelProps={(value, index) => ({
              fill: '#e5fd3d',
              fontSize: 11,
              textAnchor: 'end',
              dy: '0.33em'
            })}
          />
        </Group>
      </svg>
    );
  }
}

const mapState = state => ({
   search: state.search
})

 export default connect(mapState)(Chart)

