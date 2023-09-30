import { type SVGProps } from '@/types'

export default function CubePlus(props: SVGProps): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-cube-plus'
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
      <path d='M21 12.5v-4.509a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-7 4.007c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0' />
      <path d='M12 22v-10' />
      <path d='M12 12l8.73 -5.04' />
      <path d='M3.27 6.96l8.73 5.04' />
      <path d='M16 19h6' />
      <path d='M19 16v6' />
    </svg>
  )
}