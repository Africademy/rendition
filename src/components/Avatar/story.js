import * as React from 'react'
import { storiesOf } from '@storybook/react'
import withReadme from 'storybook-readme/with-readme'
import { Avatar, Flex } from '../../'
import Readme from './README.md'

storiesOf('Next/Avatar', module)
  .addDecorator(withReadme(Readme))
  .add('Image url', () => {
    return (
      <Flex justifyContent='center' p={2}>
        <Flex
          flexDirection='column'
          p={2}
          alignItems='center'
          width='250px'
          px={2}
        >
          <Avatar src={null} firstName='Test' lastName='User' />
          <span>Name and Email with null src</span>
        </Flex>
        <Flex
          flexDirection='column'
          p={2}
          alignItems='center'
          width='250px'
          px={2}
        >
          <Avatar src='https://dashboard.balena-cloud.com/img/logo.svg' />
          <span>Image url</span>
        </Flex>
      </Flex>
    )
  })
  .add('Initials', () => {
    return (
      <Flex justifyContent='center' p={2}>
        <Flex
          flexDirection='column'
          p={2}
          alignItems='center'
          width='250px'
          px={2}
        >
          <Avatar
            style={{ backgroundColor: 'gray' }}
            firstName='test'
            lastName='user'
          />
          <span>Firstname and LastName : test user</span>
        </Flex>
        <Flex
          flexDirection='column'
          p={2}
          alignItems='center'
          width='250px'
          px={2}
        >
          <Avatar
            emphasized
            style={{ backgroundColor: 'gray' }}
            firstName='test'
          />
          <span>Emphasized firstname only : test</span>
        </Flex>
        <Flex
          flexDirection='column'
          p={2}
          alignItems='center'
          width='250px'
          px={2}
        >
          <Avatar style={{ backgroundColor: 'gray' }} lastName='user' />
          <span>lastName only : user</span>
        </Flex>
      </Flex>
    )
  })
  .add('Custom Element', () => {
    return (
      <Flex justifyContent='center' p={2}>
        <Flex
          flexDirection='column'
          p={2}
          alignItems='center'
          width='250px'
          px={2}
        >
          <Avatar style={{ backgroundColor: 'gray' }}>
            <Flex
              color='white'
              backgroundColor='darkgray'
              p={1}
              style={{ transform: 'rotate(45deg)', borderRadius: '5px' }}
            >
              B
            </Flex>
          </Avatar>
          <span>Custom element with text: B </span>
        </Flex>
      </Flex>
    )
  })
