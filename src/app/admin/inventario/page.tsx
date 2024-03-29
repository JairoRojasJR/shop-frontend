'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Head from 'next/head'
import { useIsAuthContext } from '@/context/isAuth'
import Layout from '@/components/global/Layout'
import Adminlayout from '@/components/admin/main/AdminLayout'
import PlusNavLayout from '@/components/admin/main/PlusNavLayout'
import NewProduct from '@/components/admin/main/NewProduct'
import SectionsComponent from '@/components/admin/main/Sections'
import SubNav from '@/components/admin/utils/SubNav'
import CardProduct from '@/components/utils/CardProduct'
import Actions from '@/components/admin/main/Actions'
import { MultiTrash, runMultiTrash } from '@/components/admin/main/Trash'
import { getSections, getProducts } from '@/services/public/inventory'
import { deleteProduct } from '@/services/admin/inventory'
import type {
  AdminAction,
  AdminLogistics,
  Product,
  OnSuccesServer,
  Sections,
  Toggle,
  AdminLogisticsObject
} from '@/types'
// import { type GetServerSidePropsContext } from 'next'

export default function Inventory(): JSX.Element {
  const searchParams = useSearchParams()
  const { isAuthContext } = useIsAuthContext()
  const [sections, setSections] = useState<Sections>([])
  const [products, setProducts] = useState<Product[]>([])
  const [currentSection, setCurrentSection] = useState('')
  const [plusInAction, setPlusInAction] = useState<AdminLogistics>('')
  const [action, setAction] = useState<AdminAction>('')
  const [selecteds, setSelecteds] = useState<Product[]>([])

  const reloadSections = (): void => {
    getSections(setSections).catch((e: Error) => {
      console.log(e.message)
    })
  }

  const reloadProducts: OnSuccesServer = (): void => {
    getProducts({ section: currentSection }, setProducts).catch((e: Error) => {
      console.log(e.message)
    })
  }

  const updateActionSelected = (
    updated: AdminAction,
    resetSelecteds: Toggle
  ): void => {
    setAction(updated)
    if (resetSelecteds === 1) setSelecteds([])
  }

  const runMultiTrashProducts = (): void => {
    const reset = (): void => {
      reloadProducts()
      setSelecteds([])
    }

    const Component = (
      <MultiTrash
        Card={CardProduct}
        items={selecteds}
        wish='eliminar estos productos'
        target='product'
        send={deleteProduct}
        onSuccess={reset}
      />
    )

    runMultiTrash(selecteds.length > 1, Component)
  }

  let finishedRouter = false
  useEffect(() => {
    if (finishedRouter) return
    const section = searchParams.get('section') ?? 'Todo'

    if (typeof section === 'string') {
      if (selecteds.length > 1) setSelecteds([])
      if (isAuthContext.serverStatus === 'connected') {
        setCurrentSection(section)
        getSections(setSections).catch((e: Error) => {
          console.log(e)
        })
        getProducts({ section }, setProducts).catch((e: Error) => {
          console.log(e)
        })
      }
      finishedRouter = true
    }
  }, [searchParams, isAuthContext])

  // Html content required
  const plusIn = (): JSX.Element => {
    const options: AdminLogisticsObject[] = [
      { name: 'Nuevo producto' },
      { name: 'Secciones' }
    ]

    return (
      <PlusNavLayout
        options={options}
        plusInAction={plusInAction}
        setPlusInAction={setPlusInAction}
      >
        {plusInAction === options[0].name ? (
          <NewProduct reloadProducts={reloadProducts} />
        ) : null}
        {plusInAction === options[1].name ? (
          <SectionsComponent
            sections={sections}
            reloadSections={reloadSections}
            reloadProducts={reloadProducts}
          />
        ) : null}
      </PlusNavLayout>
    )
  }

  const plusOut = (): JSX.Element => (
    <SubNav sections={sections} pathBrowsing='/admin/inventario' />
  )

  return (
    <Layout>
      <Head>
        <title>Admin - Inventario</title>
      </Head>
      {isAuthContext.serverStatus === 'connected' &&
      isAuthContext.isAdminAuthenticated ? (
        <Adminlayout plusIn={plusIn()} plusOut={plusOut()}>
          <section className='flex flex-col gap-2 min-[500px]:grid min-[500px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map(product => (
              <CardProduct
                key={`inventarioCardProduct-${product._id}`}
                data={product}
                action={action}
                selecteds={selecteds}
                setSelecteds={setSelecteds}
                reloadProducts={reloadProducts}
                showSection={currentSection === 'Todo'}
              />
            ))}
          </section>
          {products.length > 0 ? (
            <section className='fixed bottom-0 left-0 z-50 w-full min-w-[350px] px-8'>
              <Actions
                selected={action}
                updateSelected={updateActionSelected}
                isMultiTrashReady={selecteds.length > 1}
                runMultiTrash={runMultiTrashProducts}
              />
            </section>
          ) : null}
        </Adminlayout>
      ) : null}
    </Layout>
  )
}

// TODO: Migration server side props (nextjs 14)

// type ServerSideProps = {
//   props: {
//     isAuthenticated: boolean
//   }
// }

// export async function getServerSideProps(
//   context: GetServerSidePropsContext
// ): Promise<ServerSideProps> {
//   return await checkAuth(context)
// }
