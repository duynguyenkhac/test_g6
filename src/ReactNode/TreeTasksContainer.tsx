// @flow
import * as React from 'react';
import {useEffect} from 'react';
import G6 from "@antv/g6";
import {Tasks} from "../types";

type Props = {
    nodes: Tasks,
    nodeType: string,
    edgeType: string,
    height: number;
};

export const TreeTasksContainer = ({
                                       nodes,
                                       nodeType,
                                       edgeType,
                                       height = 500
                                   }: Props) => {
    useEffect(() => {
        const width = document.getElementById('container')?.clientWidth || 800;
        const graph = new G6.TreeGraph({
            container: "container",
            width,
            height,
            linkCenter: true,
            modes: {
                default: ["zoom-canvas", "drag-canvas"]
            },
            fitView: true,
            animate: true,
            defaultNode: {
                type: nodeType,
                size: [200, 40]
            },
            defaultEdge: {
                type: "hvh",
                style: {
                    stroke: "#af3000",
                }
            },
            layout: {
                type: "compactBox",
                direction: "TB",
                indent: 500,
                getWidth: () => {
                    return 200;
                },
                getHeight: () => {
                    return 120;
                }
            }
        });
        graph.data(nodes);
        const time = new Date();
        graph.render();
        console.log(
            `Nodes rendered`,
            "Render time:",
            (Number(new Date()) - Number(time)) / 1000,
            "s"
        );

        return () => graph.destroy();
    }, [height, nodeType, nodes]);


    return <div id="container"/>;
};