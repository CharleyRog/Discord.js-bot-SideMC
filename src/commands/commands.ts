const commands: any = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'hello',
    description: 'Says hello to you!',
  },
  {
    name: 'say',
    description: 'Repeat what you say',
    options: [
      {
        name: 'message',
        description: 'The message to repeat',
        type: 3,
        required: true,
      },
    ],
  },
]

export default commands
