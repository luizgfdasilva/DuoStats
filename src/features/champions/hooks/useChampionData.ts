import { useState, useEffect, useCallback, useMemo } from 'react'
import type {
    ChampionListData,
    ChampionListItem,
    ChampionDetail,
    ChampionDetailData,
    UseChampionDataReturn,
    UseChampionDataOptions,
} from '../types/champion.types'
import championListData from '../data/champion-list.json'

const DDRAGON_VERSION = '15.23.1'
const DDRAGON_BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/data/en_US`

const championDetailCache = new Map<string, ChampionDetailData>()

export const useChampionData = (): UseChampionDataReturn => {
    const championList = useMemo(() => {
        try {
            const data = championListData as ChampionListData
            return Object.values(data.data)
        } catch {
            return null
        }
    }, [])

    const error = championList === null ? new Error('Failed to load champion list') : null
    const loading = false

    const getChampionById = useCallback(
        (id: string): ChampionListItem | null => {
            if (!championList) return null
            return championList.find(champ => champ.id === id) || null
        },
        [championList],
    )

    const getChampionByKey = useCallback(
        (key: string): ChampionListItem | null => {
            if (!championList) return null
            return championList.find(champ => champ.key === key) || null
        },
        [championList],
    )

    const searchChampions = useCallback(
        (query: string): ChampionListItem[] => {
            if (!championList) return []

            const lowerQuery = query.toLowerCase()
            return championList.filter(
                champ =>
                    champ.name.toLowerCase().includes(lowerQuery) ||
                    champ.title.toLowerCase().includes(lowerQuery) ||
                    champ.id.toLowerCase().includes(lowerQuery),
            )
        },
        [championList],
    )

    const filterByTags = useCallback(
        (tags: string[]): ChampionListItem[] => {
            if (!championList) return []

            const lowerTags = tags.map(tag => tag.toLowerCase())
            return championList.filter(champ => champ.tags.some(tag => lowerTags.includes(tag.toLowerCase())))
        },
        [championList],
    )

    return {
        champions: championList,
        getChampionById,
        getChampionByKey,
        searchChampions,
        filterByTags,
        loading,
        error,
    }
}

interface UseChampionDetailReturn {
    championDetail: ChampionDetailData | null
    fetchChampionDetail: (championId: string) => Promise<void>
    loading: boolean
    error: Error | null
}

export const useChampionDetail = (championId?: string, options: UseChampionDataOptions = {}): UseChampionDetailReturn => {
    const { autoFetch = false, cacheEnabled = true } = options
    const [championDetail, setChampionDetail] = useState<ChampionDetailData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchChampionDetail = useCallback(
        async (id: string) => {
            if (cacheEnabled && championDetailCache.has(id)) {
                setChampionDetail(championDetailCache.get(id)!)
                return
            }

            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`${DDRAGON_BASE_URL}/champion/${id}.json`)

                if (!response.ok) {
                    throw new Error(`Failed to fetch champion details: ${response.statusText}`)
                }

                const data: ChampionDetail = await response.json()
                const detail = data.data[id]

                if (!detail) {
                    throw new Error(`Champion ${id} not found in response`)
                }

                if (cacheEnabled) {
                    championDetailCache.set(id, detail)
                }

                setChampionDetail(detail)
            } catch (err) {
                const errorMessage = err instanceof Error ? err : new Error('Unknown error occurred')
                setError(errorMessage)
                setChampionDetail(null)
            } finally {
                setLoading(false)
            }
        },
        [cacheEnabled],
    )

    useEffect(() => {
        if (autoFetch && championId) {
            fetchChampionDetail(championId)
        }
    }, [autoFetch, championId, fetchChampionDetail])

    return {
        championDetail,
        fetchChampionDetail,
        loading,
        error,
    }
}

export const clearChampionCache = (): void => {
    championDetailCache.clear()
}

export const getCachedChampion = (championId: string): ChampionDetailData | null => {
    return championDetailCache.get(championId) || null
}
