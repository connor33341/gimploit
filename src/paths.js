// Based off of gimmick/src/path.js
export default [
    {
        match: /\.(png|jpg|jpeg|svg|webm|ico|gif|ttf|otf|atlas)$/,
        handler: 'content'
    },
    {
        match: /\.(mp3|mp4|m4a)$/,
        handler: 'audio'
    },
    {
        match: /\.(js|json|css)/,
        handler: 'static'
    },
    {
        match: /^\/(pages|api)\//,
        handler: 'static'
    },
    {
        match: /^\/$/,
        handler: 'page'
    }
];