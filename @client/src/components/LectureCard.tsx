import { createEffect } from 'solid-js'
import dayjs from 'dayjs'

import { CalendarIcon, LinkIcon } from './Icons'
import { applyParams, slugit } from '../util'
import { ButtonLink } from './Button'
import { Summary } from './Summary'

export const LectureCard = (p: { lecture: Lecture }) => {
  let ref: HTMLDivElement | null = null
  createEffect(() => {
    const deps = { ...p.lecture }
    setTimeout(() => {
      if (!ref || !deps) return
      ref.scrollTop = 0
    }, 150)
  })

  return (
    <div class="h-full max-h-full overflow-auto" ref={(x) => (ref = x)}>
      <div class="px-4 md:pl-0 md:pr-5 pt-5">
        <h2 onClick={() => document.getElementById(`${p.lecture.id}`)?.scrollIntoView()}>{p.lecture.title}</h2>

        <div>
          <p class="text-xs uppercase font-bold opacity-50">Host</p>
          <p class="py-1">{p.lecture.host.name}</p>
        </div>
        <div class="grid grid-cols-2 gap-3 pt-4">
          <div>
            <p class="text-xs uppercase font-bold opacity-50">Date and Time</p>
            <div class="pt-1 font-medium">
              <p>{p.lecture.time_start && dayjs(p.lecture.time_start).format('MMMM D')}</p>
              <p>
                <time dateTime={p.lecture.time_start}>
                  {p.lecture.time_start && dayjs(p.lecture.time_start).format('LT').toLowerCase()}
                </time>
                <time dateTime={p.lecture.time_end}>
                  {p.lecture.time_end && dayjs(p.lecture.time_end).format(' - LT').toLowerCase()}
                </time>
              </p>
            </div>
          </div>
          <div>
            <p class="text-xs uppercase font-bold opacity-50">Address</p>
            <p class="pt-1 text-sm sm:text-base">{p.lecture.location}</p>
            <p class="text-xs opacity-60">{(p.lecture.host as any).city || 'London'}</p>
          </div>
        </div>

        <div class="flex gap-3 mt-5 py-1 justify-between relative border-b border-t">
          <ButtonLink icon={<LinkIcon />} rel="noopener noreferrer" target="_blank" href={p.lecture.link}>
            Event link
          </ButtonLink>

          <ButtonLink
            icon={<CalendarIcon class="w-5 h-5" />}
            tabIndex={0}
            href={applyParams('/:host/:lecture/calendar.ics', {
              host: slugit(p.lecture.host.name),
              lecture: slugit(p.lecture.title),
            })}
          >
            calendar
          </ButtonLink>
        </div>
        <div class="overflow-auto pb-24">
          <Summary lecture={p.lecture} />
        </div>
      </div>
    </div>
  )
}
