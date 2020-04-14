import Home from './views/Home'
import TestRoom from './views/TestRoom'
import OpenRoom from './views/OpenRoom'
import Room from './views/Room'
import IFrameRoom from './views/IFrameRoom'

export default [
  {
    path: '/',
    component: Home
  },
  {
    path: '/test-room',
    component: TestRoom
  },
  {
    path: '/open-room',
    component: OpenRoom
  },
  {
    path: '/room/:roomName',
    name: 'room',
    component: Room,
    props: (route) => ({creatorView: true, ...route.params})
  },
  {
    path: '/clap/:roomName',
    name: 'clap',
    component: Room,
    props: true

  },
  {
    path: '/iframe/:roomName',
    name: 'iframeRoom',
    component: IFrameRoom,
    props: true
  }
]
