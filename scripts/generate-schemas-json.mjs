import { readdir } from 'node:fs/promises'
import { join } from 'node:path'
import { writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const SCHEMAS_DIR = 'schemas'
const OUTPUT_PATH = 'schemas.json'

const loadSchemas = async () => {
    const folders = await readdir( SCHEMAS_DIR, { withFileTypes: true } )
    const schemaFolders = folders
        .filter( ( f ) => f.isDirectory() )
        .map( ( f ) => f.name )
        .sort()

    const providers = {}

    const processingResults = await Promise.allSettled(
        schemaFolders.map( async ( folder ) => {
            const folderPath = join( SCHEMAS_DIR, folder )
            const files = await readdir( folderPath )
            const mjsFiles = files.filter( ( f ) => f.endsWith( '.mjs' ) )

            if ( !providers[folder] ) {
                providers[folder] = {
                    folder,
                    schemas: [],
                    toolCount: 0,
                    resourceCount: 0,
                    promptCount: 0,
                    skillCount: 0
                }
            }

            const schemaResults = await Promise.allSettled(
                mjsFiles.map( async ( file ) => {
                    const filePath = join( folderPath, file )
                    const fileUrl = pathToFileURL( join( process.cwd(), filePath ) ).href
                    const mod = await import( fileUrl )
                    const schema = mod.main || mod.schema

                    if ( !schema ) {
                        return null
                    }

                    const tools = schema.tools
                        ? Object.entries( schema.tools ).map( ( [ name, tool ] ) => ( {
                            name,
                            description: tool.description || '',
                            method: tool.method || 'GET'
                        } ) )
                        : []

                    const resources = schema.resources
                        ? Object.entries( schema.resources ).map( ( [ name, res ] ) => ( {
                            name,
                            description: res.description || ''
                        } ) )
                        : []

                    const prompts = schema.prompts
                        ? Object.entries( schema.prompts ).map( ( [ name, prompt ] ) => ( {
                            name,
                            description: prompt.description || ''
                        } ) )
                        : []

                    const skills = schema.skills
                        ? Object.entries( schema.skills ).map( ( [ name, skill ] ) => ( {
                            name,
                            description: skill.description || ''
                        } ) )
                        : []

                    return {
                        namespace: schema.namespace || folder,
                        name: schema.name || schema.namespace || folder,
                        description: schema.description || '',
                        root: schema.root || '',
                        version: schema.version || '',
                        requiresApiKey: ( schema.requiredServerParams || [] ).length > 0,
                        file: filePath,
                        tools,
                        resources,
                        prompts,
                        skills
                    }
                } )
            )

            schemaResults
                .filter( ( r ) => r.status === 'fulfilled' && r.value )
                .map( ( r ) => r.value )
                .forEach( ( entry ) => {
                    const prov = providers[folder]
                    prov.schemas.push( {
                        namespace: entry.namespace,
                        name: entry.name,
                        description: entry.description,
                        root: entry.root,
                        requiresApiKey: entry.requiresApiKey,
                        file: entry.file,
                        tools: entry.tools,
                        resources: entry.resources,
                        prompts: entry.prompts,
                        skills: entry.skills
                    } )
                    prov.toolCount += entry.tools.length
                    prov.resourceCount += entry.resources.length
                    prov.promptCount += entry.prompts.length
                    prov.skillCount += entry.skills.length
                } )
        } )
    )

    return providers
}

const main = async () => {
    const providers = await loadSchemas()
    const sorted = Object.values( providers ).sort( ( a, b ) => a.folder.localeCompare( b.folder ) )

    const output = {
        generated: new Date().toISOString(),
        totalProviders: sorted.length,
        totalSchemas: sorted.reduce( ( sum, p ) => sum + p.schemas.length, 0 ),
        totalTools: sorted.reduce( ( sum, p ) => sum + p.toolCount, 0 ),
        totalResources: sorted.reduce( ( sum, p ) => sum + p.resourceCount, 0 ),
        providers: sorted
    }

    await writeFile( OUTPUT_PATH, JSON.stringify( output, null, 4 ), 'utf-8' )
    console.log( `Generated ${OUTPUT_PATH}: ${sorted.length} providers, ${output.totalSchemas} schemas, ${output.totalTools} tools` )
}

main().catch( console.error )
