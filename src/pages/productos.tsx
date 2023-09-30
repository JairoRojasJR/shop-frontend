import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/global/Layout'
import SubNav from '@/components/admin/utils/SubNav'
import CardProduct from '@/components/utils/CardProduct'
import { getProducts, getSections } from '@/services/public/inventory'
import type { Products, Sections } from '@/types'

export default function Productos(): JSX.Element {
  const router = useRouter()
  const [products, setProducts] = useState<Products>([])
  const [currentSection, setCurrentSection] = useState<string>('')
  const [sections, setSections] = useState<Sections>([])
  const headerRef: React.MutableRefObject<HTMLElement | null> = useRef(null)
  const mainRef: React.MutableRefObject<HTMLElement | null> = useRef(null)

  useEffect(() => {
    const navHTML = globalThis.navMainHTML
    if (headerRef.current !== null && mainRef.current !== null) {
      headerRef.current.style.top = `${navHTML.clientHeight}px`
      mainRef.current.style.marginTop = `${headerRef.current.clientHeight}px`
    }
    getSections(setSections).catch((e: Error) => {
      console.log(e.message)
    })
  }, [])

  let finishedRouter = false
  useEffect(() => {
    if (finishedRouter) return
    const query = router.query
    const section = (query.section as string) ?? 'Todo'
    setCurrentSection(section)
    getSections(setSections).catch((e: Error) => {
      console.log(e.message)
    })
    getProducts({ section }, setProducts).catch((e: Error) => {
      console.log(e)
    })
    finishedRouter = true
  }, [router])

  return (
    <Layout>
      <header
        ref={headerRef}
        className='pf lf0 w100p'
        style={{ padding: '0 var(--remLX)', zIndex: 900 }}
      >
        <SubNav sections={sections} pathBrowsing='/productos' />
      </header>
      <main ref={mainRef} className='pgLX df fdc gpM'>
        {products?.map(product => {
          const { _id } = product
          return (
            <CardProduct
              key={`productosCardProduct-${_id}`}
              data={product}
              showSection={currentSection === 'Todo'}
            />
          )
        })}
      </main>
    </Layout>
  )
}