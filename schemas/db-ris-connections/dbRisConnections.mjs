export const main = {
    namespace: 'dbrisconnections',
    name: 'DB RIS::Connections',
    description: 'Access Deutsche Bahn connection/transfer options via RIS::Connections API. Find connecting services at stations — the core theme of the "Anschluss erreichen" hackathon. Requires DB Vertriebspartner access (paid, price on request).',
    version: '3.0.0',
    docs: [
        'https://developers.deutschebahn.com/db-api-marketplace/apis/product/ris-connections-netz',
        'https://developer-docs.deutschebahn.com/apis'
    ],
    tags: ['transport', 'railway', 'germany', 'connections', 'transfers', 'realtime', 'cacheTtlFrequent'],
    root: 'https://apis.deutschebahn.com/db-api-marketplace/apis/ris-connections-netz/v1',
    requiredServerParams: ['DB_CLIENT_ID', 'DB_API_KEY'],
    headers: {
        'DB-Client-ID': '{{DB_CLIENT_ID}}',
        'DB-Api-Key': '{{DB_API_KEY}}'
    },
    tools: {
        getConnections: {
            method: 'GET',
            path: '/connections',
            description: 'Find connection/transfer options at a station. Returns available connecting services with transfer times, platform changes, and feasibility. Essential for multimodal journey planning.',
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
                        key: 'journeyId',
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
                    _description: 'Get connections at Berlin Hbf',
                    evaNo: '8011160'
                },
                {
                    _description: 'Get connections at Jannowitzbruecke',
                    evaNo: '8089106'
                }
            ],
            output: {
                mimeType: 'application/json',
                schema: {
                    type: 'object',
                    properties: {
                        connections: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    feeder: {
                                        type: 'object',
                                        description: 'Feeder details'
                                    },
                                    distributor: {
                                        type: 'object',
                                        description: 'Distributor details'
                                    },
                                    isReachable: {
                                        type: 'boolean',
                                        description: 'Whether isReachable is true'
                                    },
                                    transferTime: {
                                        type: 'number',
                                        description: 'TransferTime numeric value'
                                    }
                                },
                                description: 'Individual item in the connections collection'
                            },
                            description: 'Collection of connections items'
                        }
                    }
                }
            }
        }
    }
}
