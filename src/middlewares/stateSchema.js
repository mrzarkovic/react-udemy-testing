export default {
  type: 'object',
  properties: {
    comments: {
      type: 'array',
      items: {
        type: 'string',
        default: '',
        examples: ['Comment #1', 'Comment #2']
      }
    },
    auth: {
      type: 'boolean',
      default: false,
      examples: [true]
    }
  }
};
