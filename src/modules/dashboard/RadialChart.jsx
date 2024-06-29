import React from 'react'

import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
export const RadialChart = ({circleSize}) => {
    const circulardata = [
        { name: 'L1', value: 4 }
    ]; 
    return (
        <>
            <RadialBarChart
                width={circleSize}
                height={circleSize}
                innerRadius={circleSize / 2.5} // Adjust the inner radius based on your design preference
                outerRadius={circleSize / 2} // Adjust the outer radius based on your design preference
                barSize={4} // Adjust the bar size based on your design preference
                data={circulardata}
                startAngle={90}
                endAngle={-270}
            >
                <PolarAngleAxis
                    type="number"
                    domain={[0, 10]}
                    angleAxisId={0}
                    tick={false}
                />
                <RadialBar
                    background
                    clockWise
                    dataKey="value"
                    cornerRadius={circleSize / 2}
                    fill="#8C62FF"
                />
                <text
                    x={circleSize / 2}
                    y={circleSize / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="progress-label"
                    fontSize={15} // Adjust font size as needed
                >
                    {circulardata[0].value}/10
                </text>
            </RadialBarChart>
        </>
    )
}
