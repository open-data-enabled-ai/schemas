export const main = {
    namespace: 'dbrisstations',
    name: 'DB RIS::Stations',
    description: 'Access Deutsche Bahn station data via RIS::Stations API. Search stations by name, position, or key (EVA, DS100, DHID). Get platforms, sectors, connecting times, equipment, and local services. Free test access (2 months, 10K/month). Paid plans from 4,200 EUR/year.',
    version: '3.0.0',
    docs: [
        'https://developers.deutschebahn.com/db-api-marketplace/apis/product/ris-stations',
        'https://developer-docs.deutschebahn.com/apis'
    ],
    tags: ['transport', 'railway', 'germany', 'stations', 'infrastructure', 'cacheTtlDaily'],
    root: 'https://apis.deutschebahn.com/db-api-marketplace/apis/ris-stations/v1',
    requiredServerParams: ['DB_CLIENT_ID', 'DB_API_KEY'],
    headers: {
        'DB-Client-ID': '{{DB_CLIENT_ID}}',
        'DB-Api-Key': '{{DB_API_KEY}}'
    },
    tools: {
        searchStations: {
            method: 'GET',
            path: '/stations',
            description: 'Search for railway stations. Returns station ID, name, metropolis, available transports, and position. Use getStationsByPosition for related data. Use getStopPlaceByName for related data.',
            parameters: [
                {
                    position: {
                        key: 'searchstring',
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
                        key: 'limit',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'number()',
                        options: ['optional()', 'default(10)', 'max(100)']
                    }
                }
            ],
            tests: [
                {
                    _description: 'Search Berlin stations',
                    searchstring: 'Berlin',
                    limit: 5
                },
                {
                    _description: 'Search Potsdam',
                    searchstring: 'Potsdam',
                    limit: 5
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        stations: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    stationID: {
                                        type: 'string',
                                        description: 'StationID value'
                                    },
                                    names: {
                                        type: 'object',
                                        description: 'Names details'
                                    },
                                    metropolis: {
                                        type: 'object',
                                        description: 'Metropolis details'
                                    },
                                    position: {
                                        type: 'object',
                                        description: 'Position details'
                                    }
                                },
                                description: 'Individual item in the stations collection'
                            },
                            description: 'Collection of stations items'
                        }
                    }
                }
            }
        },
        getStationsByPosition: {
            method: 'GET',
            path: '/stations/by-position',
            description: 'Find stations near geographic coordinates. Returns stations sorted by distance with full details. Use searchStations for related data. Use getStopPlaceByName for related data.',
            parameters: [
                {
                    position: {
                        key: 'latitude',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'number()',
                        options: []
                    }
                },
                {
                    position: {
                        key: 'longitude',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'number()',
                        options: []
                    }
                },
                {
                    position: {
                        key: 'radius',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'number()',
                        options: ['optional()', 'default(1000)']
                    }
                },
                {
                    position: {
                        key: 'limit',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'number()',
                        options: ['optional()', 'default(10)']
                    }
                }
            ],
            tests: [
                {
                    _description: 'Find stations near Berlin Hbf',
                    latitude: 52.525607,
                    longitude: 13.369072,
                    radius: 2000,
                    limit: 5
                },
                {
                    _description: 'Additional test for getStationsByPosition',
                    latitude: 53.525607,
                    longitude: 14.369072
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        stations: {
                            type: 'array',
                            items: {
                                type: 'object'
                            },
                            description: 'Collection of stations items'
                        }
                    }
                }
            }
        },
        getStopPlaceByName: {
            method: 'GET',
            path: '/stop-places/by-name/:query',
            description: 'Search stop places by name with fuzzy matching. Returns EVA numbers, DHID, coordinates, and available transports. Use searchStations for related data. Use getStationsByPosition for related data.',
            parameters: [
                {
                    position: {
                        key: 'query',
                        value: '{{USER_PARAM}}',
                        location: 'insert'
                    },
                    z: {
                        primitive: 'string()',
                        options: []
                    }
                },
                {
                    position: {
                        key: 'limit',
                        value: '{{USER_PARAM}}',
                        location: 'query'
                    },
                    z: {
                        primitive: 'number()',
                        options: ['optional()', 'default(10)']
                    }
                }
            ],
            tests: [
                {
                    _description: 'Search Jannowitzbruecke',
                    query: 'Jannowitzbrücke',
                    limit: 3
                },
                {
                    _description: 'Search Bad Belzig',
                    query: 'Bad Belzig',
                    limit: 3
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        stopPlaces: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    evaNumber: {
                                        type: 'string',
                                        description: 'EvaNumber value'
                                    },
                                    names: {
                                        type: 'object',
                                        description: 'Names details'
                                    },
                                    position: {
                                        type: 'object',
                                        description: 'Position details'
                                    },
                                    availableTransports: {
                                        type: 'array',
                                        description: 'Collection of availableTransports items'
                                    }
                                },
                                description: 'Individual item in the stopPlaces collection'
                            },
                            description: 'Collection of stopPlaces items'
                        }
                    }
                }
            }
        },
        getStopPlaceByEva: {
            method: 'GET',
            path: '/stop-places/:evaNumber',
            description: 'Get detailed stop place information by EVA number. Returns name, position, available transports, and group members. Use searchStations for related data. Use getStationsByPosition for related data.',
            parameters: [
                {
                    position: {
                        key: 'evaNumber',
                        value: '{{USER_PARAM}}',
                        location: 'insert'
                    },
                    z: {
                        primitive: 'string()',
                        options: []
                    }
                }
            ],
            tests: [
                {
                    _description: 'Get Berlin Hbf stop place',
                    evaNumber: '8011160'
                },
                {
                    _description: 'Get Potsdam Hbf stop place',
                    evaNumber: '8012666'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        evaNumber: {
                            type: 'string',
                            description: 'EvaNumber value'
                        },
                        names: {
                            type: 'object',
                            description: 'Names details'
                        },
                        position: {
                            type: 'object',
                            description: 'Position details'
                        },
                        availableTransports: {
                            type: 'array',
                            description: 'Collection of availableTransports items'
                        }
                    }
                }
            }
        },
        getPlatforms: {
            method: 'GET',
            path: '/platforms/:evaNumber',
            description: 'Get platform information for a station including tracks, sectors, height, length, and accessibility details. Use searchStations for related data. Use getStationsByPosition for related data.',
            parameters: [
                {
                    position: {
                        key: 'evaNumber',
                        value: '{{USER_PARAM}}',
                        location: 'insert'
                    },
                    z: {
                        primitive: 'string()',
                        options: []
                    }
                }
            ],
            tests: [
                {
                    _description: 'Get Berlin Hbf platforms',
                    evaNumber: '8011160'
                },
                {
                    _description: 'Additional test for getPlatforms',
                    evaNumber: '8011160 alt'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        platforms: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        description: 'Display name'
                                    },
                                    height: {
                                        type: 'number',
                                        description: 'Height measurement'
                                    },
                                    length: {
                                        type: 'number',
                                        description: 'Length measurement'
                                    },
                                    sectors: {
                                        type: 'array',
                                        description: 'Collection of sectors items'
                                    }
                                },
                                description: 'Individual item in the platforms collection'
                            },
                            description: 'Collection of platforms items'
                        }
                    }
                }
            }
        },
        getConnectingTimes: {
            method: 'GET',
            path: '/connecting-times/:evaNumber',
            description: 'Get connecting/transfer times at a station. Returns minimum transfer times between different transport modes and platforms. Use searchStations for related data. Use getStationsByPosition for related data.',
            parameters: [
                {
                    position: {
                        key: 'evaNumber',
                        value: '{{USER_PARAM}}',
                        location: 'insert'
                    },
                    z: {
                        primitive: 'string()',
                        options: []
                    }
                }
            ],
            tests: [
                {
                    _description: 'Get connecting times at Berlin Hbf',
                    evaNumber: '8011160'
                },
                {
                    _description: 'Get connecting times at Jannowitzbruecke',
                    evaNumber: '8089106'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        connectingTimes: {
                            type: 'array',
                            items: {
                                type: 'object'
                            },
                            description: 'Collection of connectingTimes items'
                        }
                    }
                }
            }
        }
    }
}
