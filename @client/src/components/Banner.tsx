import { BlueskyIcon, CalenderIcon, GithubIcon, TwitterIcon } from './Icons'
import { ButtonLink } from './Button'
import { useStore } from '../data'

export const Banner = () => {
  const [data, { toggleOxfordCambridge }] = useStore()

  return (
    <div class="sm:px-2 pt-6 space-y-6">
      <div class="space-y-2 sm:columns-1">
        <p class="max-w-sm">Find free to attend lectures from leading universities and institutions around London</p>
        <div class="w-full flex flex-wrap gap-3 pb-2">
          <ButtonLink icon={<CalenderIcon />} rel="noopener noreferrer" target="_blank" href="/calender.ics">
            Calender
          </ButtonLink>
          <ButtonLink icon={<GithubIcon />} href="https://github.com/Pingid/lectures.london" target="_blank">
            Github
          </ButtonLink>
          <ButtonLink
            icon={<TwitterIcon class="w-4 h-4" />}
            href="https://x.com/lectures_london"
            target="_blank"
          ></ButtonLink>
          <ButtonLink
            icon={<BlueskyIcon />}
            href="https://bsky.app/profile/lectureslondon.bsky.social"
            target="_blank"
          ></ButtonLink>
        </div>
        <div class="pt-2">
          <label class="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={data.includeOxfordCambridge}
              onChange={toggleOxfordCambridge}
              class="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
            />
            <span>Include Oxford and Cambridge?</span>
          </label>
        </div>
      </div>
    </div>
  )
}
