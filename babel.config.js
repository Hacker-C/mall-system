module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  chunks: ['manifest', 'vendor', pathname],
  chunksSortMode: 'manual',
}
