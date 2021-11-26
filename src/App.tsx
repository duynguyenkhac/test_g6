import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Circle, createNodeFromReact, Group, Rect, Text} from "@antv/g6-react-node";
import G6 from "@antv/g6";
import {G6MiniDemo} from "./ReactNode/demo";
import {TreeTasksContainer} from "./ReactNode/TreeTasksContainer";
import {mockData} from "./mock/test.mock";
import {ModelConfig} from "@antv/g6-core";
import {Tasks} from "./types";
import {TextStyle} from "@antv/g6-react-node/src/ReactNode/Shape/Text";

type TagProps = {
    text: string,
    color: string
}

const Tag = ({text, color}: TagProps) => (
    <Rect
        style={{
            fill: color,
            padding: [4, 8],
            width: 'auto',
            radius: [4],
            margin: [0, 8],
        }}
    >
        <Text style={{fill: '#fff'}}>{text}</Text>
    </Rect>
);

type CardProps = {
    cfg: Tasks
}
const Card = ({cfg}: CardProps) => {
    console.log(cfg);
    return (
        <Group>
            <Rect
                style={{
                    width: 220,
                    height: 'auto',
                    fill: '#fff',
                    stroke: '#ccc',
                    shadowColor: '#eee',
                    shadowBlur: 10,
                    radius: [4],
                }}
            >
                {/*{*/}
                {/*    wrapText(cfg.operatingUnitName).map(value => {*/}

                {/*        return <Text*/}
                {/*            style={{*/}
                {/*                maxWidth: 100,*/}
                {/*                fill: '#000',*/}
                {/*                margin: [0, 4],*/}
                {/*                fontSize: 10,*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            {cfg.operatingUnitName}*/}
                {/*        </Text>*/}
                {/*    })*/}
                {/*}*/}
                <Text
                    style={{
                        maxWidth: 100,
                        fill: '#000',
                        margin: [5, 5],
                        fontSize: 11,
                        fontWeight: 'bold'
                    }}
                >
                    {cfg.operatingUnitName}
                </Text>
                <Rect style={{width: 'auto', flexDirection: 'row', justifyContent: 'space-between', margin: [5, 10]}}>
                    <Rect style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={{fill: '#000', fontSize: 10}}>Tổng</Text>
                        <Tag color="#66ccff" text={cfg.finCount.toString()}/>
                    </Rect>
                    <Rect style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={{fill: '#000', fontSize: 10}}>Đúng</Text>
                        <Tag color="#10ab17" text={cfg.onScheduleFinCount.toString()}/>
                    </Rect>
                    <Rect style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={{fill: '#000', fontSize: 10}}>Trễ</Text>
                        <Tag color="#dc2c2c" text={cfg.behindScheduleFinCount.toString()}/>
                    </Rect>
                    <Rect style={{flexDirection: 'column', alignItems: 'center'}}>
                        <Text style={{fill: '#000', fontSize: 10}}>Hoàn thành</Text>
                        <Tag color="#0a67b3" text={cfg.completeFinCount.toString()}/>
                    </Rect>
                </Rect>
                <Rect
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: 'auto',
                        height: 20,
                        fill: "#fff",
                        stroke: '#ccc',
                        strokeOpacity: 0.3,
                    }}
                >
                    <Rect
                        style={{
                            width: cfg.planPercentComplete * 220 / 100,
                            height: 20,
                            fill: '#72de2d',
                            fillOpacity: 0.5,
                            strokeOpacity: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                width: 'auto',
                                fill: "#000",
                                fontSize: 10,
                                padding: [0, 0, 0, 10]
                            }}
                        >
                            {`% Kế hoạch: ${cfg.planPercentComplete}`}
                        </Text>
                    </Rect>
                </Rect>

                <Rect
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: 'auto',
                        height: 20,
                        fill: "#fff",
                        stroke: '#ccc',
                        strokeOpacity: 0.3,
                        radius: [0, 0, 4, 4,],
                    }}
                >
                    <Rect
                        style={{
                            width: cfg.realPercentComplete * 220 / 100,
                            height: 20,
                            fill: '#0a67b3',
                            fillOpacity: 0.7,
                            strokeOpacity: 0,
                            flexDirection: 'row',
                            alignItems: 'center',
                            radius: [0, 0, 0, 4],
                        }}
                    >
                        <Text
                            style={{
                                flexDirection: 'row',
                                width: 'auto',
                                justifyContent: 'center',
                                fill: "#000",
                                fontSize: 10,
                            }}
                        >
                            {`% Hoàn thành: ${cfg.realPercentComplete}`}
                        </Text>
                    </Rect>
                </Rect>
            </Rect>
        </Group>
    );
};


// @ts-ignore
G6.registerNode('tasks', createNodeFromReact(Card));

G6.registerEdge('hvh', {
    // @ts-ignore
    draw(cfg, group) {
        const startPoint = cfg?.startPoint;
        const endPoint = cfg?.endPoint;

        // @ts-ignore
        const {style} = cfg;
        // @ts-ignore
        const shape = group?.addShape('path', {
            attrs: {
                stroke: style.stroke,
                endArrow: style.endArrow,
                path: [
                    // @ts-ignore
                    ['M', startPoint.x, startPoint.y],
                    // @ts-ignore
                    ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
                    // @ts-ignore
                    ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
                    // @ts-ignore
                    ['L', endPoint.x, endPoint.y],
                ],
            },
        });

        return shape;
    },
});

export default () => <TreeTasksContainer nodeType="tasks" height={900} edgeType={''} nodes={mockData}/>;


const wrapText = (text: string) => {
    let idealSplit = 20,
        maxSplit = 25,
        lineCounter = 0,
        lineIndex = 0,
        lines = [""],
        i = 0;
    for (i = 0; i < text.length; i++) {
        let ch = text[i];
        if ((lineCounter >= idealSplit && ch === " ") || lineCounter >= maxSplit) {
            ch = "";
            lineCounter = -1;
            lineIndex++;
            lines.push("");
        }
        lines[lineIndex] += ch;
        lineCounter++;
    }

    return lines;
}