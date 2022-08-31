export default (lang, fastify) => {
    return {
        'en': {
            version: ['Version', fastify.latestDeployment.version],
            update: ['Last updated:', fastify.latestDeployment.time],
            app_name: '',
            menu: {
                self: 'MyBest API',
                contents: ['Get started', 'My first API', 'My second API', 'Errors', 'Show/hide examples']
            },
        },
    }[lang]
}