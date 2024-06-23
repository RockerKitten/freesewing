export const DraftMenu = ({ Design, pattern, state, Swizzled, update }) => {
  // Editor state
  const { control } = state
  // Swizzled methods
  const { t } = Swizzled.methods
  // Swizzled components
  const {
    OptionsIcon,
    DesignOptionsMenu,
    SettingsIcon,
    CoreSettingsMenu,
    UiIcon,
    UiSettingsMenu,
    FlagsAccordionTitle,
    FlagsAccordionEntries,
    Accordion,
  } = Swizzled.components

  const menuProps = { Design, state, Swizzled, pattern, update }

  const sections = [
    {
      name: 'designOptions',
      icon: <OptionsIcon className="w-8 h-8" />,
      menu: <DesignOptionsMenu {...menuProps} />,
    },
    //{
    //  name: 'coreSettings',
    //  icon: <SettingsIcon className="w-8 h-8" />,
    //  menu: <CoreSettingsMenu {...menuProps} />,
    //},
    //{
    //  name: 'uiSettings',
    //  icon: <UiIcon className="w-8 h-8" />,
    //  menu: <UiSettingsMenu {...menuProps} {...{ ui, view, setView }} />,
    //},
  ]

  // Show tip for lower User Experiences
  if (control <= 3)
    sections.push({
      name: 'missingSettings' + control,
      icon: <HelpIcon className="w-8 h-8" />,
    })

  const items = []
  const flags = pattern.setStores?.[0]?.plugins?.['plugin-annotations']?.flags

  if (flags)
    items.push([
      <FlagsAccordionTitle key={1} {...{ flags, Swizzled }} />,
      <FlagsAccordionEntries {...{ update, state, flags }} key={2} />,
      'flags',
    ])
  items.push(
    ...sections.map((section) => [
      <>
        <h5 className="flex flex-row gap-2 items-center justify-between w-full">
          <span>{t(`pe:${section.name}.t`)}</span>
          {section.icon}
        </h5>
        <p className="text-left">{t(`pe:${section.name}.d`)}</p>
      </>,
      section.menu,
      section.name,
    ])
  )

  return <Accordion items={items} />
}
