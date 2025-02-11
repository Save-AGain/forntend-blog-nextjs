import Link from 'next/link'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <div className="mb-3 flex space-x-4">
          <SocialIcon kind="instagram" href="https://www.instagram.com/gain2re/" size={6} />
          <SocialIcon kind="youtube" href="https://www.youtube.com/@gain2re146" size={6} />
          <SocialIcon kind="github" href="https://github.com/Save-AGain" size={6} />
        </div>
        <div className="mb-2 flex space-x-2 text-sm">
          <div>Save AGain</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">home</Link>
        </div>
      </div>
    </footer>
  )
}
