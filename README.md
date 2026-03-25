# Open Data Enabled AI

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![FlowMCP v3.0.0](https://img.shields.io/badge/FlowMCP-v3.0.0-blue.svg)](https://docs.flowmcp.org)
[![Pilot Program](https://img.shields.io/badge/Pilot_Program-Open-brightgreen.svg)](https://open-data-enabled-ai.github.io/docs/partner)

**AI-ready schemas and agents for public data sources — validated, tested, open source.**

> 3rd place — "Anschluss erreichen" Hackathon (DB mindbox, Berlin, March 2026)

<img src="https://open-data-enabled-ai.github.io/docs/assets/pilot-programm-flyer.png" alt="Pilot Program — Become a Data Partner" width="500" />

---

## What Is This?

This repository contains two things:

1. **Schemas** — validated connections to public data APIs (weather, transit, infrastructure, geodata)
2. **Agents** — task-oriented AI assistants that combine multiple schemas to solve real problems

Both are built on the [Model Context Protocol (MCP)](https://modelcontextprotocol.io) and [FlowMCP](https://docs.flowmcp.org), and work with **100+ AI applications** including ChatGPT, Claude, Cursor, VS Code Copilot, and more.

---

## Schemas

A **schema** connects one public API to the MCP ecosystem. It describes available endpoints, parameters, and tests — so any AI client can use the data immediately.

```
schemas/
  transport/        Public transit, bike sharing, routing
  umwelt/           Weather, air quality, environment
  infrastruktur/    Stations, charging, road data
  geodaten/         Geocoding, mapping, location
```

Each schema is a single `.mjs` file following [FlowMCP v3.0.0](https://docs.flowmcp.org):

```javascript
export const main = {
    namespace: 'bright-sky',
    name: 'Bright Sky',
    description: 'German weather data from DWD',
    version: '3.0.0',
    root: 'https://api.brightsky.dev',
    requiredServerParams: [],
    tools: {
        getCurrentWeather: {
            method: 'GET',
            path: '/current_weather',
            description: 'Current weather for a location',
            parameters: [ ... ],
            tests: [ ... ]
        }
    }
}
```

**One schema = one data source. Max 10 tools per schema.**

> This repository is currently empty — schemas will be added through the [Pilot Program](#become-a-data-partner) together with data providers.

---

## Agents

An **agent** is a task-oriented AI assistant that uses multiple schemas to solve a specific problem. Each agent brings its own AI model, system prompt, skills, and elicitation logic.

```
agents/
  ticketkauf/           Compare DB vs. FlixBus prices
    agent.mjs           Agent manifest (model, tools, prompt)
    skills/             Step-by-step workflows
    prompts/            System prompt and context
  anschluss-navigator/  Check connections during delays
  radparken/            Find secure bike parking at stations
  bahnhofs-ueberleben/  Emergency help when stranded at night
  stadt-navigator/      Navigate unknown cities from the station
```

Each agent has an `agent.mjs` manifest:

```javascript
export const agent = {
    name: 'ticketkauf',
    description: 'Compare DB Sparpreise and FlixBus prices',
    version: 'flowmcp/3.0.0',
    model: 'anthropic/claude-haiku-4.5',
    tools: {
        'transportrestdb/tool/planJourney': null,
        'flixbus/tool/searchTrips': null,
        'brightsky/tool/getForecast': null
    },
    skills: {
        'price-compare': { file: './skills/price-compare.mjs' }
    }
}
```

**Key difference: Agents are organized by task, not by data source.** The ticket agent uses transit data AND weather data AND pricing data. The bike parking agent uses infrastructure data AND weather data AND sharing data. A coordinator agent routes user questions to the right specialist.

> Agent definitions will be added as schemas are validated with partners.

---

## How It All Fits Together

```
User asks a question
       |
  Coordinator Agent
       |
  Routes to specialist
       |
  +-----------+-----------+-----------+
  |           |           |           |
Ticketkauf  Radparken  Navigator  Emergency
  |           |           |           |
  Uses:       Uses:       Uses:       Uses:
  - DB API    - OSM       - DB API    - OSM
  - FlixBus   - Weather   - VBB       - Weather
  - Weather   - Nextbike  - Weather   - Hotels
```

At the hackathon, we demonstrated this with **5 agents, 9 schemas, and 27 tools**. Every new schema that gets added makes every agent smarter.

---

## Become a Data Partner

We are building this library **together with data providers** — not in isolation.

If you provide public data with a machine-readable interface:

- We create a validated schema for your data
- Your data becomes usable in 100+ AI applications
- You get visibility as a pilot program partner
- Your input shapes which agents get built

**Application deadline: April 30, 2026**

**[Become a Data Partner](https://open-data-enabled-ai.github.io/docs/partner)**

---

## Quickstart

```bash
# Clone
git clone https://github.com/open-data-enabled-ai/schemas.git

# Use a schema as MCP server (once schemas are added)
npx flowmcp serve schemas/umwelt/bright-sky.mjs

# Or add to your FlowMCP agent
npx flowmcp add bright-sky
```

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add schemas, build agents, or become a data partner.

## Links

- [Documentation](https://open-data-enabled-ai.github.io/docs)
- [Become a Data Partner](https://open-data-enabled-ai.github.io/docs/partner)
- [FlowMCP Framework](https://docs.flowmcp.org)
- [Hackathon Project](https://github.com/open-data-enabled-ai/hackathon-anschluss-erreichen)

## License

MIT — see [LICENSE](LICENSE)
