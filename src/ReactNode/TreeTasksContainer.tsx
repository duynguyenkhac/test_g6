// @flow 
import * as React from 'react';
import {useEffect} from "react";
import G6 from "@antv/g6";
import {TreeGraphData} from "@antv/g6-core/lib/types";
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
                    stroke: "#CED4D9"
                }
            },
            layout: {
                type: "compactBox",
                direction: "TB",
                indent: 300,
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
    }, [height, nodes]);


    return <div id="container"/>;
};