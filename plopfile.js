module.exports = (
    /** @type {import('plop').NodePlopAPI} */
    plop,
  ) => {
    plop.setGenerator('Component', {
      description: `Component creating`,
      prompts: [],
  
      actions: function (data) {
        const actions = []
  
        const path = process.argv[process.argv.length - 1]
  
        const pathChunks = path.split('/')
        data.name = pathChunks[pathChunks.length - 1]
  
        actions.push({
          type: 'add',
          path: path + '{{destinationpath}}/{{kebabCase name}}.tsx',
          templateFile: './plop-templates/component-template.tsx.hbs',
        })
        actions.push({
          type: 'add',
          path: path + '/{{kebabCase name}}.stories.tsx',
          templateFile: './plop-templates/component-template.stories.tsx.hbs',
        })
        actions.push({
          type: 'add',
          path: path + '/index.ts',
          templateFile: 'plop-templates/component-index.ts.hbs',
        })
  
        return actions
      },
    })
  }
  