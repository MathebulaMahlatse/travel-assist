import {dijkstra} from '../shortestGraphAlgorithm';

describe('ShortestGraphAlgorithm', function () {
    describe('dijkstra', function () {
        it('should find the shortest path', () => {
            const graph = {
                start: {A: 5, B: 2},
                A: {C: 4, D: 2},
                B: {A: 8, D: 7},
                C: {D: 6, finish: 3},
                D: {finish: 1},
                finish: {}
            };

            const shortestPath = dijkstra(graph);

            expect(shortestPath).toEqual({distance: 8, path: ['start', 'A', 'D', 'finish']})
        });
    });
});