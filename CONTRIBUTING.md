# Contributing — Open Data Enabled AI

Thank you for your interest in contributing!

## Two Ways to Contribute

### 1. As a Data Partner (Pilot Program)

If you provide public data and want to make it AI-ready:

1. Fill out our [partner form](https://open-data-enabled-ai.github.io/docs/partner)
2. We create a draft schema for your API
3. You review and give feedback (15-30 min)
4. We iterate together until the schema is validated
5. The schema gets merged — your data is now in 100+ AI apps

**Application deadline: April 30, 2026**

### 2. As a Developer

#### Adding a Schema

1. Fork this repository
2. Create a branch: `schema/provider-name`
3. Add your schema file under `schemas/` in the appropriate category
4. Open a Pull Request

Schema categories:

| Folder | Description |
|--------|-------------|
| `schemas/transport/` | Public transit, bike sharing, routing |
| `schemas/umwelt/` | Weather, air quality, environment |
| `schemas/infrastruktur/` | Stations, charging, road data |
| `schemas/geodaten/` | Geocoding, mapping, location |

#### Adding an Agent

1. Create a folder under `agents/` with your agent name
2. Include `agent.mjs` (manifest), `skills/` (workflows), `prompts/` (system prompt)
3. Your agent should use existing schemas from `schemas/`
4. Open a Pull Request

Agent structure:

```
agents/my-agent/
  agent.mjs        Agent manifest (model, tools, system prompt)
  skills/          Step-by-step workflows
    my-skill.mjs
  prompts/         System prompt and context
    about.mjs
```

## Schema Format

Schemas follow [FlowMCP v3.0.0](https://docs.flowmcp.org):

```javascript
export const main = {
    namespace: 'provider-name',
    name: 'Provider Display Name',
    description: 'What data this provides',
    version: '3.0.0',
    docs: ['https://api-docs-url'],
    tags: ['category', 'topic'],
    root: 'https://api.provider.com',
    requiredServerParams: [],
    tools: {
        toolName: {
            method: 'GET',
            path: '/endpoint',
            description: 'What this tool does',
            parameters: [ ... ],
            tests: [ ... ]
        }
    }
}
```

## Agent Format

```javascript
export const agent = {
    name: 'agent-name',
    description: 'What this agent does',
    version: 'flowmcp/3.0.0',
    model: 'anthropic/claude-haiku-4.5',
    tools: {
        'schema/tool/toolName': null
    },
    skills: {
        'skill-name': { file: './skills/skill-name.mjs' }
    }
}
```

## Rules

- One schema file per data source (max 10 tools per schema)
- All tools must have at least one test case
- No API keys in code — use `requiredServerParams`
- Agents are organized by task, not by data source
- English code, English or German descriptions

## Questions?

Open an issue or visit our [partner page](https://open-data-enabled-ai.github.io/docs/partner).
