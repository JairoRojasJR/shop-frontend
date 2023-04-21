import PropTypes from 'prop-types'
import { closeModal } from '@/components/global/Modal'

export default function WarnUnsaved({ setWarnUnsaved }) {
  return (
    <span className='pa df aic jcc w100p h100p pgL' style={{ zIndex: 100 }}>
      <div className='bcD pa w100p h100p' style={{ opacity: '.8' }} />
      <section className='bcDp crDs  pr df fdc pgL brS gpL'>
        <p>Hay cambios sin guardar, ¿seguro que desea continuar?</p>
        <div className='df jcc gpL'>
          <button
            className='bcP crDs pgL brS cp'
            onClick={() => setWarnUnsaved(false)}
          >
            Cancelar
          </button>
          <button className='bcDr pgL brS cp' onClick={() => closeModal()}>
            Si, cerrar
          </button>
        </div>
      </section>
    </span>
  )
}

WarnUnsaved.propTypes = {
  setWarnUnsaved: PropTypes.func.isRequired
}