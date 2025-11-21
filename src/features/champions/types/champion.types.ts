export interface UseChampionDataOptions {
    autoFetch?: boolean
    cacheEnabled?: boolean
}

export interface UseChampionDataReturn {
    champions: ChampionListItem[] | null
    getChampionById: (id: string) => ChampionListItem | null
    getChampionByKey: (key: string) => ChampionListItem | null
    searchChampions: (query: string) => ChampionListItem[]
    filterByTags: (tags: string[]) => ChampionListItem[]
    loading: boolean
    error: Error | null
}

export interface ChampionImage {
    full: string
    sprite: string
    group: string
    x: number
    y: number
    w: number
    h: number
}

export interface ChampionInfo {
    attack: number
    defense: number
    magic: number
    difficulty: number
}

export interface ChampionStats {
    hp: number
    hpperlevel: number
    mp: number
    mpperlevel: number
    movespeed: number
    armor: number
    armorperlevel: number
    spellblock: number
    spellblockperlevel: number
    attackrange: number
    hpregen: number
    hpregenperlevel: number
    mpregen: number
    mpregenperlevel: number
    crit: number
    critperlevel: number
    attackdamage: number
    attackdamageperlevel: number
    attackspeedperlevel: number
    attackspeed: number
}

export interface ChampionListItem {
    version: string
    id: string
    key: string
    name: string
    title: string
    blurb: string
    info: ChampionInfo
    image: ChampionImage
    tags: string[]
    partype: string
    stats: ChampionStats
}

export interface ChampionListData {
    type: string
    format: string
    version: string
    data: Record<string, ChampionListItem>
}

export interface SpellVar {
    link: string
    coeff: number | number[]
    key: string
}

export interface SpellImage {
    full: string
    sprite: string
    group: string
    x: number
    y: number
    w: number
    h: number
}

export interface ChampionSpell {
    id: string
    name: string
    description: string
    tooltip: string
    leveltip?: {
        label: string[]
        effect: string[]
    }
    maxrank: number
    cooldown: number[]
    cooldownBurn: string
    cost: number[]
    costBurn: string
    datavalues?: Record<string, unknown>
    effect: (number[] | null)[]
    effectBurn: string[]
    vars: SpellVar[]
    costType: string
    maxammo: string
    range: number[]
    rangeBurn: string
    image: SpellImage
    resource: string
}

export interface ChampionPassive {
    name: string
    description: string
    image: ChampionImage
}

export interface ChampionSkin {
    id: string
    num: number
    name: string
    chromas: boolean
}

export interface ChampionDetailData {
    id: string
    key: string
    name: string
    title: string
    image: ChampionImage
    skins: ChampionSkin[]
    lore: string
    blurb: string
    allytips: string[]
    enemytips: string[]
    tags: string[]
    partype: string
    info: ChampionInfo
    stats: ChampionStats
    spells: ChampionSpell[]
    passive: ChampionPassive
    recommended: unknown[]
}

export interface ChampionDetail {
    type: string
    format: string
    version: string
    data: Record<string, ChampionDetailData>
}

export interface ParsedSpellTooltip {
    text: string
    variables: Record<string, string | number>
}

export interface SpellCost {
    type: 'mana' | 'energy' | 'health' | 'none' | string
    value: string
    healthCostEffect?: string
}
