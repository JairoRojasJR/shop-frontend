import { type SVGProps } from '@/types'

export default function SquareMinus(props: SVGProps): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-square-minus'
      height='1em'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z' />
      <path d='M9 12l6 0' />
    </svg>
  )
}
