import { cn } from 'mcn'
import { For } from 'solid-js'

import { ArrowLeftIcon } from './Icons'
import { router } from '../router'
import { useStore } from '../data'

export const Header = () => {
  const [value, update] = router.query('query')
  const [city, setCity] = router.query('city')
  const [host, setHost] = router.query('host')
  const m = router.match('/:host/:lecture')
  const [state, api] = router.use()
  const [data] = useStore()

  const locations = () => {
    const all = data.lectures.reduce(
      (acc, l) => {
        const c = (l.host as any).city || 'London'
        if (!acc[c]) acc[c] = new Set()
        acc[c].add(l.host.name)
        return acc
      },
      {} as Record<string, Set<string>>,
    )
    return Object.entries(all)
      .map(([c, h]) => ({ city: c, hosts: [...h].sort() }))
      .sort((a, b) => {
        if (a.city === 'London') return -1
        if (b.city === 'London') return 1
        return a.city.localeCompare(b.city)
      })
  }

  const shouldGoBack = () =>
    /http:\/\/localhost|lectures\.london/.test(state.previous?.url || '') && state.previous?.pathname === '/'

  return (
    <div class="px-2 md:px-3 sticky top-0 z-20 bg-bg [height:var(--header-height)] flex items-end">
      <div class={cn('py-2 sm:p-2 flex items-end w-full border-b')}>
        <a
          class={cn('leading-4 w-min', [!!m(), 'hidden md:block'])}
          {...router.link({ to: '/', params: {}, state: {} })}
        >
          lectures london
        </a>
        <a
          {...router.link({ to: '/', params: {}, state: {} })}
          class={cn('border-fg whitespace-nowrap flex items-end gap-2 leading-none', [
            !!m(),
            'block md:hidden',
            'hidden',
          ])}
          onClick={(e) => {
            e.preventDefault()
            if (shouldGoBack()) api.back('/', {}, {})
            else api.push('/', {}, {})
          }}
        >
          <ArrowLeftIcon class="w-6 h-6 relative top-1.5" />
          {shouldGoBack() ? 'back' : 'lectures'}
        </a>
        <input
          class={cn('bg-transparent flex-1 px-3 focus:outline-none text-base relative top-1', [
            !!m(),
            'hidden md:block',
          ])}
          placeholder="Search"
          onInput={(e: any) => update(e.target.value || '')}
          value={value() || ''}
        />
        <select
          class={cn('bg-transparent border-none outline-none text-base relative top-1 max-w-[150px] cursor-pointer', [
            !!m(),
            'hidden md:block',
          ])}
          value={host() ? `host:${host()}` : city() ? `city:${city()}` : ''}
          onChange={(e) => {
            const val = e.currentTarget.value
            if (!val) {
              setCity('')
              setHost('')
            } else if (val.startsWith('city:')) {
              setCity(val.replace('city:', ''))
              setHost('')
            } else if (val.startsWith('host:')) {
              const h = val.replace('host:', '')
              const l = data.lectures.find((x) => x.host.name === h)
              if (l) setCity((l.host as any).city || 'London')
              setHost(h)
            }
          }}
        >
          <option value="">All Locations</option>
          <For each={locations()}>
            {(g) => (
              <>
                {g.hosts.length > 1 && <option value={`city:${g.city}`}>{g.city} (all)</option>}
                <optgroup label={g.city}>
                  <For each={g.hosts}>{(h) => <option value={`host:${h}`}>{h}</option>}</For>
                </optgroup>
              </>
            )}
          </For>
        </select>
      </div>
    </div>
  )
}
