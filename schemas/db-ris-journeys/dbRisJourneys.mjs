export const main = {
    namespace: 'dbrisjourneys',
    name: 'DB RIS::Journeys + Disruptions',
    description: 'Access Deutsche Bahn journey and disruption data via RIS APIs. Get real-time journey details with all stops, delays, and current position. Query disruptions affecting services. Requires DB Vertriebspartner access (paid, price on request).',
    version: '3.0.0',
    docs: [
        'https://developers.deutschebahn.com/db-api-marketplace/apis/product/ris-journeys-netz',
        'https://developer-docs.deutschebahn.com/apis'
    ],
    tags: ['transport', 'railway', 'germany', 'journeys', 'disruptions', 'realtime', 'cacheTtlFrequent'],
    root: 'https://apis.deutschebahn.com/db-api-marketplace/apis/ris-journeys-netz/v2',
    requiredServerParams: ['DB_CLIENT_ID', 'DB_API_KEY'],
    headers: {
        'DB-Client-ID': '{{DB_CLIENT_ID}}',
        'DB-Api-Key': '{{DB_API_KEY}}'
    },
    tools: {
        getJourneyByJourneyId: {
            method: 'GET',
            path: '/journeys/:journeyId',
            description: 'Get detailed journey information by journey ID. Returns all stops with planned/actual times, delays, platform changes, and current vehicle position. Use searchJourneys for related data.',
            parameters: [
                {
                    position: {
                        key: 'journeyId',
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
                { _description: 'Get journey details (use journeyId from boards)', journeyId: '1' },
                {
                    _description: 'Additional test for getJourneyByJourneyId',
                    journeyId: '1'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        journey: {
                            type: 'object',
                            properties: {
                                journeyId: {
                                    type: 'string',
                                    description: 'JourneyId value'
                                },
                                transport: {
                                    type: 'object',
                                    description: 'Transport details'
                                },
                                stops: {
                                    type: 'array',
                                    items: {
                                        type: 'object'
                                    },
                                    description: 'Collection of stops items'
                                },
                                currentPosition: {
                                    type: 'object',
                                    description: 'CurrentPosition details'
                                }
                            },
                            description: 'Journey details'
                        }
                    }
                }
            }
        },
        searchJourneys: {
            method: 'GET',
            path: '/journeys',
            description: 'Search for journeys by station and time. Returns matching journeys with basic info and journey IDs for detailed lookup. Use getJourneyByJourneyId for related data.',
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
                    _description: 'Search journeys at Berlin Hbf',
                    evaNo: '8011160'
                },
                {
                    _description: 'Additional test for searchJourneys',
                    evaNo: '8011160 alt'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        journeys: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    journeyId: {
                                        type: 'string',
                                        description: 'JourneyId value'
                                    },
                                    transport: {
                                        type: 'object',
                                        description: 'Transport details'
                                    },
                                    departure: {
                                        type: 'object',
                                        description: 'Departure details'
                                    },
                                    arrival: {
                                        type: 'object',
                                        description: 'Arrival details'
                                    }
                                },
                                description: 'Individual item in the journeys collection'
                            },
                            description: 'Collection of journeys items'
                        }
                    }
                }
            }
        }
    }
}
