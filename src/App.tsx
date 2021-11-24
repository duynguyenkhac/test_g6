import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Circle, createNodeFromReact, Group, Rect, Text} from "@antv/g6-react-node";
import G6 from "@antv/g6";
import {G6MiniDemo} from "./ReactNode/demo";

type TagProps = {
    text: string,
    color: string
}

const Tag = ({text, color}: TagProps) => (
    <Rect
        style={{
            fill: color,
            padding: [5, 10],
            width: 'auto',
            radius: [4],
            margin: [0, 8],
        }}
    >
        <Text style={{fill: '#fff'}}>{text}</Text>
    </Rect>
);

const Card = () => {
    return (
        <Group>
            <Rect
                style={{
                    width: 400,
                    height: 'auto',
                    fill: '#fff',
                    stroke: '#ddd',
                    shadowColor: '#eee',
                    shadowBlur: 30,
                    radius: [8],
                    justifyContent: 'center',
                    padding: [18, 0],
                }}
                draggable
            >
                <Text
                    style={{
                        fill: '#000',
                        margin: [0, 24],
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                >
                    这是一个卡片
                </Text>
                <Text style={{fill: '#ccc', fontSize: 12, margin: [12, 24]}}>
                    我是一段特别特别特别特别特别特别特别长的描述
                </Text>
                <Rect style={{width: 'auto', flexDirection: 'row', padding: [4, 12]}}>
                    <Tag color="#66ccff" text="我是"/>
                    <Tag color="#66ccff" text="很多个"/>
                    <Tag color="#66ccff" text="很多个的"/>
                    <Tag color="#66ccff" text="标签"/>
                </Rect>
                <Circle
                    style={{
                        x: 380,
                        y: 20,
                        r: 5,
                        fill: 'red',
                        cursor: 'pointer',
                    }}
                />
            </Rect>
        </Group>
    );
};

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

G6.registerNode('test', createNodeFromReact(Card));

export default () => <G6MiniDemo nodeType="test" count={20} height={600}/>;
