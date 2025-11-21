import type { ChampionSpell, ParsedSpellTooltip, SpellCost, SpellVar } from '../types/champion.types'

export class SpellParser {
    private static replaceEffectPlaceholders(
        tooltip: string,
        effectBurn: string[],
    ): { text: string; variables: Record<string, string> } {
        const variables: Record<string, string> = {}
        let text = tooltip

        const effectMatches = tooltip.matchAll(/\{\{\s*e(\d+)\s*\}\}/g)

        for (const match of effectMatches) {
            const effectIndex = parseInt(match[1], 10)
            const value = effectBurn[effectIndex] || '0'
            variables[`e${effectIndex}`] = value
            text = text.replace(match[0], value)
        }

        return { text, variables }
    }

    private static replaceVarPlaceholders(
        tooltip: string,
        vars: SpellVar[],
    ): { text: string; variables: Record<string, string | number> } {
        const variables: Record<string, string | number> = {}
        let text = tooltip

        const varMatches = tooltip.matchAll(/\{\{\s*([af]\d+)\s*\}\}/g)

        for (const match of varMatches) {
            const varKey = match[1]
            const varData = vars.find(v => v.key === varKey)

            if (varData) {
                const value = Array.isArray(varData.coeff) ? varData.coeff[0] : varData.coeff
                variables[varKey] = value
                text = text.replace(match[0], String(value))
            }
        }

        return { text, variables }
    }

    static parseTooltip(spell: ChampionSpell): ParsedSpellTooltip {
        let tooltip = spell.tooltip
        const allVariables: Record<string, string | number> = {}

        const effectResult = this.replaceEffectPlaceholders(tooltip, spell.effectBurn)
        tooltip = effectResult.text
        Object.assign(allVariables, effectResult.variables)

        const varResult = this.replaceVarPlaceholders(tooltip, spell.vars)
        tooltip = varResult.text
        Object.assign(allVariables, varResult.variables)

        tooltip = tooltip.replace(/<[^>]+>/g, '')

        return {
            text: tooltip,
            variables: allVariables,
        }
    }

    static parseSpellCost(spell: ChampionSpell): SpellCost {
        const resource = spell.resource?.toLowerCase() || ''

        if (resource.includes('health')) {
            const healthMatch = resource.match(/\{\{\s*e(\d+)\s*\}\}/)
            return {
                type: 'health',
                value: spell.costBurn,
                healthCostEffect: healthMatch ? `e${healthMatch[1]}` : undefined,
            }
        }

        if (resource.includes('mana')) {
            return {
                type: 'mana',
                value: spell.costBurn,
            }
        }

        if (resource.includes('energy')) {
            return {
                type: 'energy',
                value: spell.costBurn,
            }
        }

        if (spell.costBurn === '0' || !spell.costBurn) {
            return {
                type: 'none',
                value: '0',
            }
        }

        return {
            type: resource || 'mana',
            value: spell.costBurn,
        }
    }

    static getSpellValueAtLevel(spell: ChampionSpell, effectIndex: number, level: number = 1): number | null {
        const adjustedLevel = Math.max(1, Math.min(level, spell.maxrank))
        const effectArray = spell.effect[effectIndex]

        if (!effectArray) return null

        return effectArray[adjustedLevel - 1] ?? null
    }

    static getCooldownAtLevel(spell: ChampionSpell, level: number = 1): number {
        const adjustedLevel = Math.max(1, Math.min(level, spell.maxrank))
        return spell.cooldown[adjustedLevel - 1] ?? 0
    }

    static getCostAtLevel(spell: ChampionSpell, level: number = 1): number {
        const adjustedLevel = Math.max(1, Math.min(level, spell.maxrank))
        const cost = spell.cost[adjustedLevel - 1] ?? 0

        const spellCost = this.parseSpellCost(spell)

        if (spellCost.type === 'health' && spellCost.healthCostEffect) {
            const effectIndex = parseInt(spellCost.healthCostEffect.substring(1), 10)
            return this.getSpellValueAtLevel(spell, effectIndex, level) ?? cost
        }

        return cost
    }

    static formatSpellDescription(spell: ChampionSpell, level: number = 1): string {
        const parsed = this.parseTooltip(spell)
        const cooldown = this.getCooldownAtLevel(spell, level)
        const cost = this.getCostAtLevel(spell, level)
        const costInfo = this.parseSpellCost(spell)

        let description = `${spell.name}\n\n${parsed.text}\n\n`

        if (cost > 0) {
            description += `Cost: ${cost} ${costInfo.type.charAt(0).toUpperCase() + costInfo.type.slice(1)}\n`
        }

        description += `Cooldown: ${cooldown}s`

        return description
    }
}
