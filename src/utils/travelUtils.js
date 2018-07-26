import {dijkstra} from './shortestGraphAlgorithm';

export const getCities = (deals) => {
    const cities = {
        departure: [],
        arrival: []
    };

    deals.forEach(tripDetails => {
        cities.departure.push(tripDetails.departure);
        cities.arrival.push(tripDetails.arrival);
    });

    const uniqueDeparture = Array.from(new Set(cities.departure));
    const uniqueArrival = Array.from(new Set(cities.arrival));

    return {departure: uniqueDeparture, arrival:uniqueArrival};
};

export const getShortestRoute = (deals, departure, arrival, tripType) => {
    const cheapestGraph = getConnectedRoutesAsGraph(deals, departure, arrival, tripType);
    return dijkstra(cheapestGraph);
};

export const getConnectedRoutesAsGraph = (deals, departure, arrival) => {
    let graph = {
        start: {},
        finish: {}
    };

    deals.forEach(deal => {
        if(arrival === deal.arrival && deal.departure === departure) {
            if(graph.start['finish']) {
                const cost = graph.start['finish'];

                if(cost > (deal.cost)) {
                    graph.start['finish'] = (deal.cost);
                }
            } else {
                graph.start['finish'] = deal.cost;
            }
        }
        else if(deal.departure === departure ) {
            if(graph.start[deal.arrival]) {
                const cost = graph.start[deal.arrival];

                if(cost > (deal.cost)) {
                    graph.start[deal.arrival] = deal.cost;
                }
            } else {
                graph.start[deal.arrival] = deal.cost;
            }
        }
    });

    let thereIsMoreKeys =  true;
    let keys = Object.keys(graph.start);

    if (keys.includes('finish')) {
        return graph;
    }

    while(thereIsMoreKeys) {
        getPath(deals, keys, graph, departure, arrival);

        keys = [];

        Object.keys(graph).forEach(key => {
            if(!(key === 'start' || key === 'finish')) {
                if(graph[key]) {
                    Object.keys(graph[key]).forEach(keyOfKey => {
                        if(keyOfKey === 'finish') {
                            thereIsMoreKeys = false;
                        }
                        if(!graph[keyOfKey] && keyOfKey !== departure) {
                            keys.push(keyOfKey);
                        }
                    })
                }
            }
        });

        if(keys.length > 0){
            keys = Array.from(new Set(keys));
        } else {
            thereIsMoreKeys = false;
        }
    }

    return graph;
};

export const getPath = (deals, keys, graph, originalDeparture, originalDestination) => {
    keys.forEach(key => {
        if(!graph[key] && originalDestination !== key) {
            graph[key] = {};
        }

        deals.forEach(deal => {
            if(deal.departure === key && originalDeparture !== deal.arrival && originalDestination !== deal.arrival) {
                if(graph[key][deal.arrival]) {
                    const cost = graph[key][deal.arrival];
                    if(cost > (deal.cost)) {
                        graph[key][deal.arrival] = deal.cost;
                    }
                }
                else {
                    graph[key][deal.arrival] = deal.cost;
                }
            } else if (deal.departure === key && originalDeparture !== deal.arrival && originalDestination === deal.arrival) {

                if(graph[key]['finish']) {
                    const cost = graph[key]['finish'];

                    if(cost > (deal.cost)) {
                        graph[key]['finish'] = deal.cost;
                    }
                } else {
                    graph[key]['finish'] = deal.cost;
                }
            }
        });
    });
};

export const getConnectedRoutes = (deals, shortestRoute, departure, arrival, travelType) => {
    let routes = [];
    shortestRoute.path.forEach((city, index) => {
        if(city === 'start') {
            const relevantArrival = (shortestRoute.path[index + 1] === 'finish' ? arrival : shortestRoute.path[index + 1] );

            const relevantDeals = deals.filter(deal => {
                return deal.departure === departure && deal.arrival === relevantArrival;
            });

            if(travelType === 'CHEAPEST') {
                relevantDeals.sort(compare)
            }

            routes.push(relevantDeals[0])
        }  else {
            if(shortestRoute.path.length > index + 1) {
                const relevantArrival = shortestRoute.path[index + 1] === 'finish' ? arrival : shortestRoute.path[index + 1];

                const relevantDeals = deals.filter(deal => {
                    return deal.departure === city && deal.arrival === relevantArrival;
                });

                if(travelType === 'CHEAPEST') {
                    relevantDeals.sort(compare)
                }

                routes.push(relevantDeals[0])
            }
        }
    });

    return routes;
};

export const findRoutesToArrival = (deals, departure, arrival, tripType) => {
    const shortestRoutes = getShortestRoute(deals, departure, arrival, tripType);
    return getConnectedRoutes(deals, shortestRoutes, departure, arrival, tripType)
};

function compare(a,b) {
    if (a.cost < b.cost)
        return -1;
    if (a.cost > b.cost)
        return 1;
    return 0;
}