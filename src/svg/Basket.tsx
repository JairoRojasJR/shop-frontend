export default function Basket(
  props: React.SVGAttributes<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='icon icon-tabler icon-tabler-basket'
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
      <path d='M10 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
      <path d='M5.001 8h13.999a2 2 0 0 1 1.977 2.304l-1.255 7.152a3 3 0 0 1 -2.966 2.544h-9.512a3 3 0 0 1 -2.965 -2.544l-1.255 -7.152a2 2 0 0 1 1.977 -2.304z' />
      <path d='M17 10l-2 -6' />
      <path d='M7 10l2 -6' />
    </svg>
  )
}
