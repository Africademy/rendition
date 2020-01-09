import * as React from 'react'
import { storiesOf } from '@storybook/react'
import withReadme from 'storybook-readme/with-readme'
import { Box, Img, Provider } from '../../'
import Logo from '../../stories/assets/etcher.svg'
import Readme from './README.md'

storiesOf('Core/Img', module)
  .addDecorator(withReadme(Readme))
  .add('Standard', () => {
    return (
      <Provider>
        <Box m={3} bg='#666'>
          <Img p={5} src={Logo} />
        </Box>
      </Provider>
    )
  })
