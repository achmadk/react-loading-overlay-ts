import React, { FC, useCallback, useState } from 'react'

import { action } from '@storybook/addon-actions'

import LoadingOverlay, { LoadingOverLayProps } from '../src'

const FadeWrapper: FC<LoadingOverLayProps> = (props) => {
  const [active, setActive] = useState(true)
  const toggleActive = useCallback(() => {
    setActive(value => !value)
  }, [])
  return (
      <>
        <button
          type='button'
          onClick={toggleActive}
        >
          turn loader {active ? 'off' : 'on'}
        </button>
        <br />
        <br />
        <LoadingOverlay
          {...props}
          onClick={action('overlay-click')}
          active={active}
        />
      </>
    )
}

FadeWrapper.displayName = 'FadeWrapper'

export default FadeWrapper
