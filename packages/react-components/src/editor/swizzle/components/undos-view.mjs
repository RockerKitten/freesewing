import { useState } from 'react'
import orderBy from 'lodash.orderby'

/**
 * The undos view shows the undo history, and allows restoring any undo state
 *
 * @param (object) props - All the props
 * @param {object} props.swizzled - An object with swizzled components, hooks, methods, config, and defaults
 * @param {object} designs - Object holding all designs
 * @param {object} update - ViewWrapper state update object
 */
export const UndosView = ({ designs, design, Design, Swizzled, update, state }) => {
  const [showDev, setShowDev] = useState(false)

  const steps = orderBy(state._.undos, 'time', 'desc')

  return (
    <>
      <Swizzled.components.HeaderMenu state={state} {...{ Swizzled, update, Design }} />
      <div className="text-left mt-8 mb-24 px-4 max-w-xl mx-auto">
        <h2>{Swizzled.methods.t('pe:view.undos.t')}</h2>
        <p>{Swizzled.methods.t('pe:view.undos.d')}</p>
        <small>
          <b>Tip:</b> Click on any change to undo all changes up to, and including, that change.
        </small>
        {steps.length < 1 ? (
          <Swizzled.components.Popout note>
            <h4>Your undo history is currently empty</h4>
            <p>When you make changes to your pattern, they will show up here.</p>
            <p>For example, you can click the button below to change the pattern rotation:</p>
            <button
              className="btn btn-primary capitalize"
              onClick={() => update.settings('ui.rotate', state.settings?.ui?.rotate ? 0 : 1)}
            >
              {Swizzled.methods.t('pe:example')}: {Swizzled.methods.t('pe:rotate.t')}
            </button>
            <p>As soon as you do, the change will show up here, and you can undo it.</p>
          </Swizzled.components.Popout>
        ) : (
          <div className="flex flex-col gap-2 mt-4">
            {steps.map((step) => (
              <Swizzled.components.UndoStep key={step.time} {...{ step, update, state, Design }} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export const UndoStepTimeAgo = ({ Swizzled, step }) => {
  if (!step.time) return null
  const secondsAgo = Math.floor((Date.now() - step.time) / 100) / 10
  const minutesAgo = Math.floor(secondsAgo / 60)
  const hoursAgo = Math.floor(minutesAgo / 60)

  return hoursAgo ? (
    <span>
      {hoursAgo} {Swizzled.methods.t('pe:hoursAgo')}
    </span>
  ) : minutesAgo ? (
    <span>
      {minutesAgo} {Swizzled.methods.t('pe:minutesAgo')}
    </span>
  ) : (
    <span>
      {secondsAgo} {Swizzled.methods.t('pe:secondsAgo')}
    </span>
  )
}

export const UndoStep = ({ Swizzled, update, state, step, Design }) => {
  const { t } = Swizzled.methods

  /*
   * Ensure path is always an array
   */
  if (!Array.isArray(step.path)) step.path = step.path.split('.')

  /*
   * Figure this out once
   */
  const imperial = state.settings?.units === 'imperial' ? true : false

  /*
   * Metadata can be ignored
   */
  if (step.name === 'settings' && step.path[1] === 'metadata') return null

  /*
   * Defer for anything else to this method
   */
  const data = Swizzled.methods.getUndoStepData({ step, state, Design, imperial })

  if (data === false) return <pre>{JSON.stringify(step, null, 2)}</pre> //null
  if (data === null) return <p>Unsupported</p>

  return (
    <div>
      <p className="text-sm italic font-medium opacity-70 text-right p-0 m-0 -mb-2 pr-2">
        <Swizzled.components.UndoStepTimeAgo step={step} />
      </p>
      <Swizzled.components.ButtonFrame>
        <div className="flex flex-row items-center justify-between gap-2 w-full m-0 p-0 -mt-2 text-lg">
          <span>{t(`pe:${data.optCode}`)}</span>
          <span className="opacity-70 flex flex-row gap-1 items-center text-base">
            {data.icon} {t(`pe:${data.titleCode}`)}
          </span>
        </div>
        <div className="flex flex-row gap-1 items-center align-start w-full">
          <span className="">{data.newVal}</span>
          <Swizzled.components.LeftIcon className="w-4 h-4 text-secondary shrink-0" stroke={4} />
          <span className="line-through decoration-1 opacity-70">{data.oldVal}</span>
        </div>
      </Swizzled.components.ButtonFrame>
    </div>
  )
}
