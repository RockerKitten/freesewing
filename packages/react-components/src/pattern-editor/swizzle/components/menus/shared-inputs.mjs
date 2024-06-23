import { useMemo, useCallback } from 'react'

/** A boolean version of {@see MenuListInput} that sets up the necessary configuration */
export const MenuBoolInput = (props) => {
  const { name, config, Swizzled } = props
  const boolConfig = useBoolConfig(name, config)

  return <Swizzled.components.MenuListInput {...props} config={boolConfig} />
}

/** A placeholder for an input to handle constant values */
export const MenuConstantInput = ({
  type = 'number',
  name,
  current,
  updateHandler,
  changed,
  config,
}) => (
  <>
    <input
      type={type}
      className={`
      input input-bordered w-full text-base-content
      input-${changed ? 'secondary' : 'accent'}
    `}
      value={changed ? current : config.dflt}
      onChange={(evt) => updateHandler([name], evt.target.value)}
    />
  </>
)

/** A {@see MenuSliderInput} to handle degree values */
export const MenuDegInput = (props) => {
  const { updateHandler } = props
  const { MenuSliderInput } = props.swizzled.components
  const { round } = props.swizzled.methods
  const degUpdateHandler = useCallback(
    (path, newVal) => {
      updateHandler(path, newVal === undefined ? undefined : Number(newVal))
    },
    [updateHandler]
  )
  return (
    <MenuSliderInput {...props} suffix="°" valFormatter={round} updateHandler={degUpdateHandler} />
  )
}

/**
 * An input for selecting and item from a list
 * @param  {String}  options.name       the name of the property this input changes
 * @param  {Object}  options.config     configuration for the input
 * @param  {String|Number}  options.current    the current value of the input
 * @param  {Function}  options.updateFunc the function called by the event handler to update the value
 * @param  {Boolean} options.compact    include descriptions with the list items?
 * @param  {Function}  options.t          translation function
 * @param  {String}  design  name of the design
 * @param  {Boolean} isDesignOption  Whether or not it's a design option
 */
export const MenuListInput = ({
  name,
  config,
  current,
  updateHandler,
  compact = false,
  t,
  changed,
  design,
  isDesignOption = false,
  Swizzled,
}) => {
  const handleChange = useSharedHandlers({
    dflt: config.dflt,
    updateHandler,
    name,
  })

  return config.list.map((entry) => {
    const titleKey = config.choiceTitles
      ? config.choiceTitles[entry]
      : isDesignOption
      ? `${design}:${name}.${entry}`
      : `${name}.o.${entry}`
    const title = config.titleMethod ? config.titleMethod(entry, t) : t(`${titleKey}.t`)
    const desc = config.valueMethod ? config.valueMethod(entry, t) : t(`${titleKey}.d`)
    const sideBySide = config.sideBySide || desc.length + title.length < 42

    return (
      <Swizzled.components.ButtonFrame
        dense={config.dense || false}
        key={entry}
        active={
          changed
            ? Array.isArray(current)
              ? current.includes(entry)
              : current === entry
            : entry === config.dflt
        }
        onClick={() => handleChange(entry)}
      >
        <div
          className={`w-full flex items-start ${
            sideBySide ? 'flex-row justify-between gap-2' : 'flex-col'
          }`}
        >
          <div className="font-bold text-lg shrink-0">{title}</div>
          {compact ? null : <div className="text-base font-normal">{desc}</div>}
        </div>
      </Swizzled.components.ButtonFrame>
    )
  })
}

/** a toggle input for list/boolean values */
export const MenuListToggle = ({ config, changed, updateHandler, name }) => {
  const boolConfig = useBoolConfig(name, config)
  const handleChange = useSharedHandlers({ dflt: boolConfig.dflt, updateHandler, name })

  const dfltIndex = boolConfig.list.indexOf(boolConfig.dflt)

  const doToggle = () =>
    handleChange(boolConfig.list[changed ? dfltIndex : Math.abs(dfltIndex - 1)])

  const checked = boolConfig.dflt == false ? changed : !changed

  return (
    <input
      type="checkbox"
      className={`toggle ${changed ? 'toggle-accent' : 'toggle-secondary'}`}
      checked={checked}
      onChange={doToggle}
      onClick={(evt) => evt.stopPropagation()}
    />
  )
}

export const MenuMmInput = (props) => {
  const { units, updateHandler, current, config } = props
  const { MenuSliderInput } = props.swizzled.components
  const mmUpdateHandler = useCallback(
    (path, newCurrent) => {
      const calcCurrent =
        typeof newCurrent === 'undefined' ? undefined : measurementAsMm(newCurrent, units)
      updateHandler(path, calcCurrent)
    },
    [updateHandler, units]
  )

  // add a default step that's appropriate to the unit. can be overwritten by config
  const defaultStep = units === 'imperial' ? 0.125 : 0.1

  return (
    <MenuSliderInput
      {...props}
      {...{
        config: {
          step: defaultStep,
          ...config,
          dflt: measurementAsUnits(config.dflt, units),
        },
        current: current === undefined ? undefined : measurementAsUnits(current, units),
        updateHandler: mmUpdateHandler,
        valFormatter: (val) => (units === 'imperial' ? formatFraction128(val, null) : val),
        suffix: units === 'imperial' ? '"' : 'cm',
      }}
    />
  )
}

/**
 * A number input that accepts comma or period decimal separators.
 * Because our use case is almost never going to include thousands, we're using a very simple way of accepting commas:
 * The validator checks for the presence of a single comma or period followed by numbers
 * The parser replaces a single comma with a period
 *
 * optionally accepts fractions
 * @param  {Number}  options.val       the value of the input
 * @param  {Function}  options.onUpdate  a function to handle when the value is updated to a valid value
 * @param  {Boolean} options.fractions should the input allow fractional input
 */
export const MenuNumberInput = ({
  value,
  onUpdate,
  onMount,
  className,
  fractions = true,
  min = -Infinity,
  max = Infinity,
  swizzled,
}) => {
  const valid = useRef(validateVal(value, fractions, min, max))

  const handleChange = useCallback(
    (newVal) => {
      // only actually update if the value is valid
      if (typeof onUpdate === 'function') {
        onUpdate(valid.current, newVal)
      }
    },
    [onUpdate, valid]
  )

  // onChange
  const onChange = useCallback(
    (evt) => {
      const newVal = evt.target.value
      // set validity so it will display
      valid.current = validateVal(newVal, fractions, min, max)

      // handle the change
      handleChange(newVal)
    },
    [fractions, min, max, valid]
  )

  const val = typeof value === 'undefined' ? config.dflt : value

  useEffect(() => {
    if (typeof onMount === 'function') {
      onMount(valid.current)
    }
  }, [onMount, valid])

  return (
    <input
      type="text"
      inputMode="number"
      className={`input input-secondary ${className || 'input-sm grow text-base-content'}
        ${valid.current === false && 'input-error'}
        ${valid.current && 'input-success'}
      `}
      value={val}
      onChange={onChange}
    />
  )
}

/** A {@see SliderInput} to handle percentage values */
export const MenuPctInput = ({ current, changed, updateHandler, config, Swizzled, ...rest }) => {
  const factor = 100
  let pctCurrent = changed ? Swizzled.methods.menuRoundPct(current, factor) : current
  const pctUpdateHandler = useCallback(
    (path, newVal) =>
      updateHandler(
        path,
        newVal === undefined ? undefined : Swizzled.methods.menuRoundPct(newVal, 1 / factor)
      ),
    [updateHandler]
  )

  return (
    <Swizzled.components.MenuSliderInput
      {...{
        ...rest,
        config: { ...config, dflt: Swizzled.methods.menuRoundPct(config.dflt, factor) },
        current: pctCurrent,
        updateHandler: pctUpdateHandler,
        suffix: '%',
        valFormatter: Swizzled.methods.round,
        changed,
      }}
    />
  )
}

/**
 * An input component that uses a slider to change a number value
 * @param  {String}   options.name         the name of the property being changed by the input
 * @param  {Object}   options.config       configuration for the input
 * @param  {Number}   options.current      the current value of the input
 * @param  {Function}   options.updateHandler   the function called by the event handler to update the value
 * @param  {Function}   options.t            translation function
 * @param  {Boolean}   options.override     open the text input to allow override of the slider?
 * @param  {String}   options.suffix       a suffix to append to value labels
 * @param  {Function} options.valFormatter a function that accepts a value and formats it for display as a label
 * @param  {Function}   options.setReset     a setter for the reset function on the parent component
 */
export const MenuSliderInput = ({
  name,
  config,
  current,
  updateHandler,
  t,
  override,
  suffix = '',
  valFormatter = (val) => val,
  setReset,
  children,
  changed,
  swizzled,
}) => {
  const { max, min } = config
  const handleChange = useSharedHandlers({
    current,
    dflt: config.dflt,
    updateHandler,
    name,
    setReset,
  })

  const val = typeof current === 'undefined' ? config.dflt : current

  return (
    <>
      <div className="flex flex-row justify-between">
        {override ? (
          <EditCount
            {...{
              current: val,
              handleChange,
              min,
              max,
              t,
            }}
          />
        ) : (
          <>
            <span className="opacity-50">
              <span dangerouslySetInnerHTML={{ __html: valFormatter(min) + suffix }} />
            </span>
            <span className={`font-bold ${val === config.dflt ? 'text-secondary' : 'text-accent'}`}>
              <span dangerouslySetInnerHTML={{ __html: valFormatter(val) + suffix }} />
            </span>
            <span className="opacity-50">
              <span dangerouslySetInnerHTML={{ __html: valFormatter(max) + suffix }} />
            </span>
          </>
        )}
      </div>
      <input
        type="range"
        {...{ min, max, value: val, step: config.step || 0.1 }}
        onChange={(evt) => handleChange(evt.target.value)}
        className={`
          range range-sm mt-1
          ${changed ? 'range-accent' : 'range-secondary'}
        `}
      />
      {children}
    </>
  )
}

/** A component that shows a number input to edit a value */
const MenuEditCount = (props) => {
  const { handleChange } = props
  const onUpdate = useCallback(
    (validVal) => {
      if (validVal !== null && validVal !== false) handleChange(validVal)
    },
    [handleChange]
  )

  return (
    <div className="form-control mb-2 w-full">
      <label className="label">
        <span className="label-text text-base-content">{props.min}</span>
        <span className="label-text font-bold text-base-content">{props.current}</span>
        <span className="label-text text-base-content">{props.max}</span>
      </label>
      <label className="input-group input-group-sm">
        <NumberInput value={props.current} onUpdate={onUpdate} min={props.min} max={props.max} />
        <span className="text-base-content font-bold">#</span>
      </label>
    </div>
  )
}

/**
 * A hook to get the change handler for an input.
 * @param  {Number|String|Boolean} options.dflt       the default value for the input
 * @param  {Function}              options.updateHandler the onChange
 * @param  {string}                options.name       the name of the property being changed
 * @return the change handler for the input
 */
const useSharedHandlers = ({ dflt, updateHandler, name }) => {
  return useCallback(
    (newCurrent = '__UNSET__') => {
      if (newCurrent === dflt) newCurrent = '__UNSET__'
      updateHandler([name], newCurrent)
    },
    [dflt, updateHandler, name]
  )
}

/** get the configuration that allows a boolean value to use the list input */
const useBoolConfig = (name, config) => {
  return useMemo(
    () => ({
      list: [false, true],
      choiceTitles: {
        false: `${name}No`,
        true: `${name}Yes`,
      },
      valueTitles: {
        false: 'no',
        true: 'yes',
      },
      ...config,
    }),
    [name, config]
  )
}
