import React from 'react';
import './App.css';
import {createNodeFromReact, Group, Rect, Text} from "@antv/g6-react-node";
import G6 from "@antv/g6";
import {TreeTasksContainer} from "./ReactNode/TreeTasksContainer";
import {mockData} from "./mock/test.mock";
import {Tasks} from "./types";

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
            radius: [2],
            margin: [2, 8],
        }}
    >
        <Text style={{fill: '#fff'}}>{text}</Text>
    </Rect>
);

type CardProps = {
    cfg: Tasks
}
const Card = ({cfg}: CardProps) => {
    const strings = wrap(cfg.operatingUnitName, 24).split('\n');
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
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                }}
            >
                <Rect
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        margin: [5, 5],
                        height: 22
                    }}
                >
                    {
                        strings.map(value => {
                            return <Text
                                style={{
                                    fill: '#022b7e',
                                    fontSize: 12,
                                    fontWeight: 'bold',
                                    alignSelf: 'center',
                                    lineHeight: 1.2
                                }}
                            >
                                {value}
                            </Text>
                        })
                    }
                </Rect>
                <Rect style={{flexDirection: 'column', justifyContent: 'space-between'}}>
                    <Rect
                        style={{width: 'auto', flexDirection: 'row', justifyContent: 'space-between', margin: [5, 10]}}>
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
                                {`   % Kế hoạch: ${cfg.planPercentComplete}`}
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
                                {`   % Hoàn thành: ${cfg.realPercentComplete}`}
                            </Text>
                        </Rect>
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

        if (shape) {
            let index = 0;
            const lineDash = [4, 2, 1, 2];
            shape?.animate(() => {
                    index++;
                    if (index > 9) {
                        index = 0;
                    }
                    const res = {
                        lineDash,
                        lineDashOffset: -index,
                    };
                    return res;
                },
                {
                    repeat: true,
                    duration: 3000,
                },)
        }
        return shape;
    },
});

export default () => <TreeTasksContainer nodeType="tasks" height={900} edgeType={''} nodes={mockData}/>;


const wrap = (s: string, w: number) => s.replace(new RegExp(`(?![^\\n]{1,${w}}$)([^\\n]{1,${w}})\\s`, 'g'), '$1\n');