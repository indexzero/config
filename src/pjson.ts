import {Package} from 'read-pkg'

export interface PJSON {
  dependencies?: {[name: string]: string}
  anycli: {
    schema?: number
  }
}

export namespace PJSON {
  export interface Plugin extends PJSON, Package {
    name: string
    version: string
    anycli: PJSON['anycli'] & {
      schema?: number
      title?: string
      description?: string
      hooks?: { [name: string]: (string | string[]) }
      commands?: string
      plugins?: string[]
      devPlugins?: string[]
      topics?: {
        [k: string]: {
          description?: string
          subtopics?: Plugin['anycli']['topics']
          hidden?: boolean
        }
      }
    }
  }

  export interface CLI extends Plugin {
    anycli: Plugin['anycli'] & {
      schema?: number
      bin?: string
      npmRegistry?: string
      pluginScope?: string
      dirname?: string
    }
  }

  export interface User extends PJSON {
    private?: boolean
    anycli: PJSON['anycli'] & {
      plugins?: (string | PluginTypes.User | PluginTypes.Link)[] }
  }

  export type PluginTypes = PluginTypes.User | PluginTypes.Link
  export namespace PluginTypes {
    export interface User {
      type: 'user',
      name: string,
      tag?: string,
    }
    export interface Link {
      type: 'link'
      name: string
      root: string
    }
  }
}
