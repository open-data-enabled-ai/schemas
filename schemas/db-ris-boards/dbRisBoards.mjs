export const main = {
    namespace: 'dbrisboards',
    name: 'DB RIS::Boards',
    description: 'Access Deutsche Bahn departure and arrival boards via RIS::Boards API. Get real-time departure/arrival information with delays, platform changes, and train details for any station. Requires DB Vertriebspartner access (paid, price on request).',
    version: '3.0.0',
    docs: [
        'https://developers.deutschebahn.com/db-api-marketplace/apis/product/ris-boards-netz',
        'https://developer-docs.deutschebahn.com/apis'
    ],
    tags: ['transport', 'railway', 'germany', 'timetable', 'realtime', 'cacheTtlFrequent'],
    root: 'https://apis.deutschebahn.com/db-api-marketplace/apis/ris-boards-netz/v1',
    requiredServerParams: ['DB_CLIENT_ID', 'DB_API_KEY'],
    headers: {
        'DB-Client-ID': '{{DB_CLIENT_ID}}',
        'DB-Api-Key': '{{DB_API_KEY}}'
    },
    tools: {
        getDepartures: {
            method: 'GET',
            path: '/boards/departures',
            description: 'Get departure board for a station. Returns real-time departures with planned/actual times, platform, train category, line, direction, and delay. Filter by EVA number and time range. Use getArrivals for related data.',
            parameters: [
                {
                    position: {
                        key: 'evaNo',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'string()',
                        options: []
                    }
                },
                {
                    position: {
                        key: 'timeStart',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'string()',
                        options: ['optional()']
                    }
                },
                {
                    position: {
                        key: 'timeEnd',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'string()',
                        options: ['optional()']
                    }
                },
                {
                    position: {
                        key: 'filterTransports',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'string()',
                        options: ['optional()']
                    }
                }
            ],
            tests: [
                {
                    _description: 'Get departures at Berlin Hbf',
                    evaNo: '8011160'
                },
                {
                    _description: 'Get departures at Potsdam Hbf',
                    evaNo: '8012666'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        departures: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    timeSchedule: {
                                        type: 'string',
                                        description: 'TimeSchedule value'
                                    },
                                    timeType: {
                                        type: 'string',
                                        description: 'TimeType value'
                                    },
                                    timePredicted: {
                                        type: 'string',
                                        description: 'TimePredicted value'
                                    },
                                    platform: {
                                        type: 'object',
                                        description: 'Platform details'
                                    },
                                    transport: {
                                        type: 'object',
                                        description: 'Transport details'
                                    },
                                    via: {
                                        type: 'array',
                                        description: 'Collection of via items'
                                    }
                                },
                                description: 'Individual item in the departures collection'
                            },
                            description: 'Collection of departures items'
                        }
                    }
                }
            }
        },
        getArrivals: {
            method: 'GET',
            path: '/boards/arrivals',
            description: 'Get arrival board for a station. Returns real-time arrivals with origin, planned/actual times, platform, and delay information. Use getDepartures for related data.',
            parameters: [
                {
                    position: {
                        key: 'evaNo',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'string()',
                        options: []
                    }
                },
                {
                    position: {
                        key: 'timeStart',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'string()',
                        options: ['optional()']
                    }
                },
                {
                    position: {
                        key: 'timeEnd',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'string()',
                        options: ['optional()']
                    }
                }
            ],
            tests: [
                {
                    _description: 'Get arrivals at Berlin Hbf',
                    evaNo: '8011160'
                },
                {
                    _description: 'Get arrivals at Jannowitzbruecke',
                    evaNo: '8089106'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        arrivals: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    timeSchedule: {
                                        type: 'string',
                                        description: 'TimeSchedule value'
                                    },
                                    timePredicted: {
                                        type: 'string',
                                        description: 'TimePredicted value'
                                    },
                                    platform: {
                                        type: 'object',
                                        description: 'Platform details'
                                    },
                                    transport: {
                                        type: 'object',
                                        description: 'Transport details'
                                    },
                                    origin: {
                                        type: 'object',
                                        description: 'Origin details'
                                    }
                                },
                                description: 'Individual item in the arrivals collection'
                            },
                            description: 'Collection of arrivals items'
                        }
                    }
                }
            }
        }
    }
}
