
import {run} from "../core/core";
import {applicationState} from "../state/applicationState";
import {createTriangleWithDefaults, Entity} from "../interface/video";

const test1: Entity = {
    triangles: [[{
        x: -70,
        y: 400
    },
    {
        x: 390,
        y: 0
    },
    {
        x: -10,
        y: 0
    }]],
    descriptor: "test1",
    transform: {
        position: {
            x: 150,
            y: 0
        }
        ,
        rotation: 0,
        scale: { x: 0, y: 0 }
    }
};

const test2: Entity = createTriangleWithDefaults("test2", [
    [{
        x: 0,
        y: 0
    },
    {
        x: 0,
        y: 100
    },
    {
        x: 100,
        y: 0
    }]
]);

const fLetter: Entity = createTriangleWithDefaults("f-letter", [
    [
        {
            x: 0,
            y: 0
        },
        {
            x: 30,
            y: 0
        },
        {
            x: 0,
            y: 150
        }
    ],
    [
        {
            x: 0,
            y: 150
        },
        {
            x: 30,
            y: 0
        },
        {
            x: 30,
            y: 150
        }
    ],
    [
        {
            x: 30,
            y: 0
        },
        {
            x: 100,
            y: 0
        },
        {
            x: 30,
            y: 30
        }
    ],
    [
        {
            x: 30,
            y: 30
        },
        {
            x: 100,
            y: 0
        },
        {
            x: 100,
            y: 30
        }
    ],
    [
        {
            x: 30,
            y: 60
        },
        {
            x: 67,
            y: 60
        },
        {
            x: 30,
            y: 90
        }
    ],
    [
        {
            x: 30,
            y: 90
        },
        {
            x: 67,
            y: 60
        },
        {
            x: 67,
            y: 90
        }
    ]
]);

export const exampleProgram = () => {
    // applicationState.putEntity(test1);
    //applicationState.putEntity(test2)
    // applicationState.putEntity(createRectangleWithDefaults('quad1', 200, 100))
    applicationState.putEntity(fLetter)
    run();
}